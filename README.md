# A & G Tech — Next.js 15

Sitio web inmersivo para A & G Tech (Real Estate Technology Solutions).
Construido con **Next.js 15 (App Router) · React 19 · Three.js**.

---

## Requisitos previos

- **Node.js 20** o superior — comprueba con `node -v`
- **npm 10+** (ya viene con Node 20)
- Un editor — recomendado: **Google Antigravity** o **VS Code**

---

## 1 · Instalar dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará Next.js, React, React DOM y Three.js (~120 MB en `node_modules/`).

---

## 2 · Levantar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
El servidor se recarga automáticamente al guardar cualquier archivo.

---

## 3 · Build de producción

```bash
npm run build
npm start
```

- `npm run build` compila la app optimizada en `.next/`
- `npm start` la sirve en producción (puerto 3000 por defecto)

---

## Abrir en Google Antigravity

Antigravity es el IDE en la nube de Google. Para cargar este proyecto:

### Opción A — Subir el zip directamente

1. Entra a [antigravity.google.com](https://antigravity.google.com) y crea un nuevo workspace.
2. En el panel lateral, haz clic en **Import project** → **Upload ZIP**.
3. Selecciona `ag-tech-nextjs.zip`. Antigravity descomprime y abre la carpeta automáticamente.
4. Abre la terminal integrada (`Ctrl/Cmd + ` `) y corre:
   ```bash
   npm install
   npm run dev
   ```
5. Antigravity expondrá automáticamente el puerto 3000 — clica en el badge **"Open preview"** que aparece en la parte inferior derecha.

### Opción B — Conectar desde GitHub

1. Descomprime el zip en tu máquina.
2. Crea un repo en GitHub: `gh repo create ag-tech-nextjs --public --source=. --push`
3. En Antigravity → **Import project** → **From GitHub** → selecciona el repo.
4. Repite los pasos 4–5 de la opción A.

### Opción C — Drag & drop carpeta

1. Descomprime el zip.
2. Arrastra toda la carpeta `ag-tech-nextjs/` directamente sobre la ventana de Antigravity.
3. Repite los pasos 4–5 de la opción A.

---

## Estructura del proyecto

```
ag-tech-nextjs/
├── app/
│   ├── layout.js          # Root layout · fuentes Inter / Inter Tight / JetBrains Mono
│   ├── page.js            # Página principal
│   └── globals.css        # Sistema de diseño · 27KB
├── components/
│   ├── Hero.jsx           # Hero con titular animado + CTA
│   ├── HeroCanvas.jsx     # Escena Three.js · esfera wireframe + estrellas + flares
│   ├── PreTitle.jsx       # Eyebrow animado con punto pulsante
│   ├── MagneticCursor.jsx # Cursor con física de muelle
│   ├── MagneticBtn.jsx    # Botón magnético atraído al cursor
│   ├── ScrollProgress.jsx # Barra de progreso de scroll
│   ├── Nav.jsx            # Navegación flotante con toggle día/noche
│   ├── Sun.jsx            # Sol gigante que se eleva en modo claro
│   ├── ThemeFlash.jsx     # Wash cálido durante la transición
│   ├── Marquee.jsx        # Tira de texto en bucle
│   ├── Services.jsx       # Ecosistema de servicios · cards expandibles
│   ├── Stack.jsx          # Código animado + diagrama de nodos
│   ├── Philosophy.jsx     # Proceso 01–04 + métricas
│   ├── CTA.jsx            # Llamada a la acción final
│   ├── Footer.jsx
│   ├── SplitWords.jsx     # Animación de revelado por palabra
│   ├── useMagnetic.js     # Hook · efecto magnético
│   └── useReveal.js       # Hook · reveal on scroll (IntersectionObserver)
├── package.json
├── next.config.mjs
├── jsconfig.json
└── .gitignore
```

---

## Personalización rápida

### Cambiar el color de acento

Edita la constante `ACCENT` al inicio de `app/page.js`:

```js
const ACCENT = "#38BDF8"; // celeste — prueba "#7DD3FC", "#0EA5E9", "#00D4FF"
```

### Cambiar el titular

Mismo archivo, prop `title` de `<Hero>`:

```jsx
title={{ l1: "Technology", l2: "Built By", l3: "Experts." }}
```

### Cambiar la variante 3D

Prop `heroVariant`: `"wireframe"` (defecto), `"detailed"`, o `"particles"`.

### Editar servicios, código, métricas

Cada sección expone sus datos en constantes al inicio del componente
(`SERVICES`, `CODE_LINES`, `PHIL`, etc). Edita el array y guarda.

---

## Despliegue

### Vercel (recomendado para Next.js)

```bash
npm install -g vercel
vercel
```

### Cualquier host Node.js

```bash
npm run build
npm start
```

Asegúrate de exponer el puerto 3000 (o configurar `PORT` env var).

---

## Modo día / modo noche

El botón ☀️/🌙 en la barra de navegación cambia entre tema oscuro (por defecto)
y tema claro con una animación de amanecer de **~6.8 segundos**:

- Un sol gigante (980px) se eleva desde fuera de la pantalla hasta anclarse en la esquina superior derecha.
- Un wash cálido ámbar barre el viewport.
- Las variables CSS interpolan suavemente entre paletas (cream cálido ⇄ negro espacial).
- El canvas 3D atenúa al 55% en modo claro.
- El ícono del navbar muestra **un sol con halo cálido y rayos giratorios** cuando es de día, una luna cuando es de noche.

---

## Notas técnicas

- **Three.js carga solo en cliente** — el componente `<HeroCanvas>` está marcado `"use client"`. No hay SSR de la escena 3D.
- **next/font** auto-optimiza Inter, Inter Tight y JetBrains Mono — cero requests externos a Google Fonts en producción.
- **Cursor magnético** se oculta en pantallas táctiles vía `@media (pointer: coarse)`.
- **Reveal on scroll** usa IntersectionObserver — sin librerías de animación pesadas.
- **No incluye Tweaks panel** — esa función es exclusiva del entorno de prototipado original.

---

© 2026 A & G Tech — Real Estate Technology Solutions
