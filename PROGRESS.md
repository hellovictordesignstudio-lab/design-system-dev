# Design System — Progress Log

## Sesión 1 — Setup inicial
- Proyecto creado con React 18 + TypeScript + Styled Components v6
- Storybook 8.6.18 configurado
- ThemeProvider con Light/Dark/System mode
- LangContext con EN/ES/FR
- Design tokens: primitivos y semánticos

## Sesión 2 — Componentes batch 1-4
- 39 componentes completados
- GitHub Actions configurado
- Deploy en GitHub Pages

## Sesión 3 — Fix producción (hoy)
**Problema:** Fondo negro en canvas + "Importing a module script failed"
**Causa:** `useGlobals` hook en decorator de Storybook rompe el build
**Fix:** Reemplazado por `context.globals` como segundo parámetro del decorator

**Problema:** GitHub Actions fallaba con 404
**Causa:** Repo era privado — GitHub Pages requiere repo público (plan gratuito)
**Fix:** Repo puesto público en Settings → General → Danger Zone

**Problema:** Assets daban 404 en producción
**Causa:** `base: '/design-system/'` incorrecto — repo se llama `design-system-dev`
**Fix:** Corregido a `base: '/design-system-dev/'` en `.storybook/main.ts`

**Resultado:** https://hellovictordesignstudio-lab.github.io/design-system-dev funcionando ✅

---

## Pendiente
- [ ] Documentación Figma conectada en tab Design de cada componente
- [ ] Tests unitarios
- [ ] npm publish como paquete