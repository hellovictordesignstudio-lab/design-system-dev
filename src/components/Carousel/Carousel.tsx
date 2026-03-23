import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Children,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CarouselProps } from './Carousel.types';
import { Root, Viewport, Track, Slide, ArrowBtn, DotsRow, Dot } from './Carousel.styles';

export function Carousel({
  children,
  autoPlay = false,
  interval = 4000,
  loop = true,
  showArrows = true,
  showDots = true,
  visibleItems = 1,
  gap = 16,
  onChange,
  initialIndex = 0,
}: CarouselProps) {
  const slides = Children.toArray(children);
  const total = slides.length;
  const [current, setCurrent] = useState(Math.max(0, Math.min(initialIndex, total - 1)));
  const [isHovered, setIsHovered] = useState(false);
  const isPaused = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, total - visibleItems);

  const goTo = useCallback(
    (index: number) => {
      let next = index;
      if (loop) {
        next = ((index % total) + total) % total;
        next = Math.min(next, maxIndex);
      } else {
        next = Math.max(0, Math.min(index, maxIndex));
      }
      setCurrent(next);
      onChange?.(next);
    },
    [loop, total, maxIndex, onChange],
  );

  const prev = useCallback(() => {
    goTo(current === 0 ? (loop ? total - 1 : 0) : current - 1);
  }, [current, loop, total, goTo]);

  const next = useCallback(() => {
    goTo(current >= maxIndex ? (loop ? 0 : maxIndex) : current + 1);
  }, [current, maxIndex, loop, goTo]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const ticker = setInterval(() => {
      if (!isPaused.current) {
        setCurrent((c) => {
          const n = c >= maxIndex ? (loop ? 0 : c) : c + 1;
          onChange?.(n);
          return n;
        });
      }
    }, interval);

    return () => clearInterval(ticker);
  }, [autoPlay, interval, loop, maxIndex, onChange]);

  // Pause on hover
  useEffect(() => {
    isPaused.current = isHovered;
  }, [isHovered]);

  // Pause when tab hidden
  useEffect(() => {
    function onVisibility() {
      isPaused.current = document.visibilityState === 'hidden';
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Keyboard
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    if (e.key === 'End') { e.preventDefault(); goTo(maxIndex); }
  }

  // Track offset
  const itemWidthPct = 100 / visibleItems;
  const offsetPct = current * (itemWidthPct + (gap / (/* approx */ 600)) * 100);
  // Use px-based approach for accurate gap handling
  const translateX = `calc(-${current} * (100% / ${visibleItems} + ${gap / visibleItems}px))`;

  const showPrev = showArrows && (loop || current > 0);
  const showNext = showArrows && (loop || current < maxIndex);

  return (
    <Root
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-label="Carousel"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ outline: 'none' }}
    >
      <Viewport>
        <Track
          $gap={gap}
          $visibleItems={visibleItems}
          style={{
            transform: `translateX(calc(-${current} * (100% / ${visibleItems}) - ${current * gap}px + ${current > 0 ? 0 : 0}px))`,
          }}
          aria-live="polite"
        >
          {slides.map((slide, i) => (
            <Slide key={i} $gap={gap} $visibleItems={visibleItems} aria-hidden={i < current || i >= current + visibleItems}>
              {slide}
            </Slide>
          ))}
        </Track>
      </Viewport>

      {/* Arrows */}
      <ArrowBtn
        $side="left"
        $visible={showPrev}
        type="button"
        onClick={prev}
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </ArrowBtn>

      <ArrowBtn
        $side="right"
        $visible={showNext}
        type="button"
        onClick={next}
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </ArrowBtn>

      {/* Dots */}
      {showDots && total > 1 && (
        <DotsRow aria-label="Slide indicators">
          {Array.from({ length: Math.min(total, maxIndex + 1) }).map((_, i) => (
            <Dot
              key={i}
              type="button"
              $isActive={i === current}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
            />
          ))}
        </DotsRow>
      )}
    </Root>
  );
}
