export interface CarouselProps {
  children: React.ReactNode;
  /** Auto-advance slides (default: false) */
  autoPlay?: boolean;
  /** Auto-advance interval in ms (default: 4000) */
  interval?: number;
  /** Loop at the end back to start (default: true) */
  loop?: boolean;
  /** Show prev/next arrows (default: true) */
  showArrows?: boolean;
  /** Show dot indicators (default: true) */
  showDots?: boolean;
  /** Number of visible items at once (default: 1) */
  visibleItems?: 1 | 2 | 3;
  /** Gap between items in px (default: 16) */
  gap?: number;
  /** Called when the active index changes */
  onChange?: (index: number) => void;
  /** Starting index (default: 0) */
  initialIndex?: number;
}
