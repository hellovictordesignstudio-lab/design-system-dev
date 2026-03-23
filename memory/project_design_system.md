---
name: Design System project overview
description: Stack, folder structure, theme/lang system, scripts, components completed, and deploy info
type: project
---

Stack: React 18 + TypeScript + Styled Components v6 + Storybook 8.6.18

Repo: hellovictordesignstudio-lab/design-system-dev (GitHub)

**Why:** Building a professional design system for learning and portfolio purposes.

**How to apply:** Use these conventions when adding components, tokens, or config changes.

## Folder structure
- src/components/[Name]/ → [Name].tsx · [Name].styles.ts · [Name].types.ts · [Name].stories.tsx · index.ts
- src/theme/ → theme.ts · ThemeProvider.tsx · useColorMode.ts · LangContext.tsx · i18n.ts
- src/tokens/semantic.ts → color tokens, spacing, typography, borderRadius, shadows, transitions

## Theme system
- lightTheme / darkTheme exported from theme.ts
- Dark mode: [data-theme='dark'] &, .dark & CSS selectors in styled-components
- useColorMode() → { colorMode, resolvedMode, setColorMode }, persists to localStorage 'ds-color-mode'

## Lang system
- useLang() → { lang, setLang, t(key) }, persists to localStorage 'ds-lang'
- Languages: 'en' | 'es' | 'fr'
- Translation keys defined in src/theme/i18n.ts (strongly typed TranslationKey union)

## Design language
- Cards: border 1px solid #E2E5ED, border-radius 14px, box-shadow 0 2px 8px rgba(0,0,0,0.05)
- Buttons: pill radius (9999px), brand blue #0055FF
- Inputs: border 1.5px solid #C8D4E8, border-radius 14px
- Focus ring: 0 0 0 3px rgba(0,85,255,0.12)
- Font: Nunito Sans
- Primary text: #111827 · Secondary: #6B7694 · Tertiary: #9BA5BE
- Dark bg panel: #1A1F35 · Dark border: #2E3550 · Dark text: #F0F2F5

## Components completed (39 total as of 2026-03-23)
Batch 1-3: Button · Badge · Alert · Spinner · TextInput · Card · Modal · Toast · Checkbox · Radio · Switch · Avatar · ProgressBar · Breadcrumb · Select · Tooltip · Skeleton · Pagination · Tabs · Popover · Table · DatePicker · CommandPalette · Navigation
Batch 4-5: Divider · Kbd · StatCard · EmptyState · Rating · Accordion · Stepper · Timeline · TagInput · Drawer
Batch 6: FileUpload · ColorPicker · NotificationCenter · ContextMenu · Carousel

## Key conventions
- Portals: createPortal to document.body, position: fixed, zIndex 9999
- Smart flip: calculate spaceBelow vs panelHeight to open up or down
- Portal positioning: getBoundingClientRect() on trigger, recalculate on open
- Stories: CSF3, autodocs, Playground + States/Variants + Languages + DarkMode stories
- DarkMode story: wrap in <ThemeProvider defaultColorMode="dark"> + darkTheme bg
- Languages story: wrap in <LangProvider defaultLang="es|fr|en">

## Notable components
- ColorPicker: pure JS/CSS, no external color lib, HSV internal model, hex input with validation
- NotificationCenter: useNotifications() hook persists to localStorage 'ds-notifications'
- ContextMenu: compound items array API, sub-menus on hover (150ms delay), portal
- Carousel: CSS transform-based, autoPlay pauses on hover + visibilitychange

## Scripts
- npm run storybook → starts on port 6006 (or 6007 if busy)
- npm run build → tsc --emitDeclarationOnly + rollup (note: build has pre-existing tsconfig error, use npx tsc --noEmit for type check)
- npx tsc --noEmit → TypeScript type check (0 errors as of batch 6)
