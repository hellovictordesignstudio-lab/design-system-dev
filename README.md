# VDS Design System

**VDS Design System** (VDS) is a React component library with semantic design tokens, light and dark appearance, and Storybook documentation. This repository ships the package `@design-system/core` and the published Storybook site.

**Live documentation:** https://hellovictordesignstudio-lab.github.io/design-system-dev

Writing for this project follows **VDS Tone** and **VDS Voice**—see the Storybook page **VDS Design System → VDS Tone and Voice** for terminology, structure, and style. That page is the source of truth for how VDS documentation should read and sound.

---

## Technology

| Tool | Version | Role |
| --- | --- | --- |
| React | 18 | UI |
| TypeScript | 5 | Types |
| Styled Components | v6 | Theming and styles |
| Storybook | 8.6.x | Docs and dev |
| Vite | 5 | Build |
| GitHub Pages | — | Hosted Storybook |

---

## Repository layout

### Tokens

```
src/tokens/
  primitives.ts   ← raw values (e.g. blue/500, neutral/900)
  semantic.ts     ← semantic roles (e.g. color/bg/primary)
```

### Theme

```
src/theme/
  theme.ts           ← lightTheme, darkTheme, Theme
  ThemeProvider.tsx
  useColorMode.ts
  GlobalStyles.ts
  LangContext.tsx
  i18n.ts            ← EN / ES / FR
```

### Components

```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.styles.ts
  ComponentName.types.ts
  ComponentName.stories.tsx
  index.ts
```

---

## Architecture notes

**Styled Components instead of utility-only CSS:** Appearance (light / dark / system) is driven at runtime through semantic tokens. The theme is available to every styled component.

**Storybook decorator:** Color mode and language come from `context.globals` in the preview decorator (not `useGlobals` in the decorator path), so production Storybook builds stay stable.

**Base URL:** Storybook’s Vite `base` in `.storybook/main.ts` must match the GitHub Pages path (today `/design-system-dev/`). If the repo URL changes, update `base` and `homepage` in `package.json`.

---

## Exported components

Inventory matches `src/components/index.ts`. **Chip** is an alias of **Tag**; **Menu** is often used with **DropdownMenu**.

| Category | Components |
| --- | --- |
| **Inputs** | Button, ButtonGroup, Checkbox, Radio, Switch, TextInput, Textarea, Select, DatePicker, ColorPicker, FileUpload, NumberInput, Slider, PinInput, SegmentedControl, TagInput, Combobox, TimePicker, RichTextEditor |
| **Display** | Avatar, Badge, Card, Carousel, Divider, EmptyState, Kbd, ProgressBar, Rating, StatCard, Tag, Table, Timeline, List |
| **Feedback** | Alert, Modal, Drawer, Popover, Toast, NotificationCenter |
| **Navigation** | Breadcrumb, Navigation, Pagination, Tabs, BottomNavigation, Link |
| **Overlay** | ContextMenu, CommandPalette |
| **Layout** | Accordion, Stepper, Wizard |
| **Menus** | DropdownMenu, SplitButton |
| **Marketing** | PricingTable, Testimonial, Footer |
| **Data** | Charts (BarChart, LineChart, PieChart, DonutChart, Sparkline, container) |
| **Utility** | Tooltip, Spinner, Skeleton, TreeView |

---

## Behavior

- **Appearance:** Light, dark, or system (toolbar in Storybook).
- **Language:** English, Spanish, or French for demo strings (toolbar).
- **Accessibility:** Use the Storybook Accessibility addon on stories.
- **Docs:** Autodocs and MDX; props tables from TypeScript where configured.

---

## Add a component

```bash
mkdir src/components/YourComponent
touch src/components/YourComponent/YourComponent.tsx
touch src/components/YourComponent/YourComponent.styles.ts
touch src/components/YourComponent/YourComponent.types.ts
touch src/components/YourComponent/YourComponent.stories.tsx
touch src/components/YourComponent/index.ts
```

Export from `src/components/index.ts`:

```ts
export * from './YourComponent';
```

Minimal story:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
  args: {},
};
```

---

## Scripts

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # output: storybook-static
npm run build            # library build
```

---

## Deploy

GitHub Actions builds Storybook and publishes to GitHub Pages on push to `main`. The published URL is the same as **Live documentation** above.
