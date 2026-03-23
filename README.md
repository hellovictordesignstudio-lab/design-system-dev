# Design System — hellovictordesignstudio-lab

> Professional Design System built with React 18, TypeScript, Styled Components v6, and Storybook 8.

🔗 **Live:** https://hellovictordesignstudio-lab.github.io/design-system-dev

---

## Stack técnico

| Herramienta | Versión | Rol |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Styled Components | v6 | CSS-in-JS + theming |
| Storybook | 8.6.18 | Documentación interactiva |
| Vite | 5 | Build tool |
| GitHub Pages | — | Hosting gratuito |

---

## Arquitectura

### Tokens
```
src/tokens/
  primitives.ts   ← valores crudos (blue/500, neutral/900...)
  semantic.ts     ← tokens con significado (color/bg/primary...)
```

### Theme
```
src/theme/
  theme.ts           ← lightTheme, darkTheme, Theme type
  ThemeProvider.tsx  ← contexto de tema
  useColorMode.ts    ← hook para cambiar modo
  GlobalStyles.ts    ← CSS global + variables
  LangContext.tsx    ← contexto de idioma
  i18n.ts            ← traducciones EN/ES/FR
```

### Componentes
```
src/components/
  ComponentName/
    ComponentName.tsx        ← componente principal
    ComponentName.styles.ts  ← styled-components
    ComponentName.types.ts   ← TypeScript interfaces
    ComponentName.stories.tsx← stories Storybook
    index.ts                 ← exports
```

---

## Decisiones de arquitectura

**¿Por qué Styled Components v6 y no Tailwind?**
El DS necesita theming dinámico con tokens semánticos que cambien en runtime (Light/Dark/System). Styled Components permite pasar el tema como prop y acceder a tokens desde cualquier componente sin clases utilitarias.

**¿Por qué `context.globals` en el decorator y no `useGlobals`?**
`useGlobals` es un hook de React que falla en el build de producción de Storybook. El decorator recibe `context` como segundo parámetro que contiene los globals directamente — sin hooks, sin problemas en producción.

**¿Por qué el base path importa?**
Storybook buildea assets con rutas relativas al `base`. Si el repo se llama `design-system-dev` pero el base es `/design-system/`, los assets dan 404 en GitHub Pages.

---

## Componentes completados (39)

| Categoría | Componentes |
|---|---|
| **Inputs** | Button, Checkbox, Radio, Switch, TextInput, Select, DatePicker, ColorPicker, FileUpload |
| **Display** | Avatar, Badge, Card, Carousel, Divider, EmptyState, Kbd, ProgressBar, Rating, StatCard |
| **Feedback** | Alert, Modal, Drawer, Popover, Toast, NotificationCenter |
| **Navigation** | Breadcrumb, Navigation, Pagination, Tabs |
| **Overlay** | ContextMenu, CommandPalette |
| **Layout** | Accordion |
| **Utility** | Tooltip, Spinner, Skeleton |

---

## Features

- 🌗 **Light / Dark / System** mode — persiste en localStorage
- 🌐 **EN / ES / FR** — selector de idioma en Storybook toolbar
- ♿ **A11y** — addon de accesibilidad en cada story
- 📋 **Autodocs** — props table auto-generada desde TypeScript
- ⚡ **GitHub Actions** — deploy automático en cada `git push`

---

## Cómo agregar un componente nuevo
```bash
# 1. Crear la carpeta
mkdir src/components/NombreComponente

# 2. Crear los 5 archivos
touch src/components/NombreComponente/NombreComponente.tsx
touch src/components/NombreComponente/NombreComponente.styles.ts
touch src/components/NombreComponente/NombreComponente.types.ts
touch src/components/NombreComponente/NombreComponente.stories.tsx
touch src/components/NombreComponente/index.ts

# 3. Exportar desde el índice principal
# Agregar en src/components/index.ts:
export * from './NombreComponente';
```

### Template mínimo de story
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NombreComponente } from './NombreComponente';

const meta: Meta<typeof NombreComponente> = {
  title: 'Components/NombreComponente',
  component: NombreComponente,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NombreComponente>;

export const Default: Story = {
  args: {},
};
```

---

## Scripts
```bash
npm run storybook        # Dev server en localhost:6006
npm run build-storybook  # Build para producción
npm run build            # Build de la librería
```

---

## Deploy

Cada `git push` a `main` dispara el GitHub Action `.github/workflows/deploy.yml` que:
1. Instala dependencias
2. Corre `build-storybook`
3. Publica en GitHub Pages automáticamente