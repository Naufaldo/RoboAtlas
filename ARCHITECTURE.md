# Architecture Specification: RoboAtlas

## 1. Architectural Philosophy

RoboAtlas is built on strict separation of concerns to ensure maintainability, testability, and framework independence.

```
Layer 1: Educational Content Layer (KaTeX, MDX, Explanations)
                     ↓
Layer 2: Pure Algorithm Layer (Framework-Agnostic TypeScript)
                     ↓
Layer 3: Simulation Engine (Kinematics, Timesteps, Raycasting)
                     ↓
Layer 4: Visualization Layer (2D Canvas, High-DPI Renderers)
                     ↓
Layer 5: Interactive UI Layer (Controls, Telemetry, Parameter Sliders)
```

---

## 2. Layer Specifications

### Layer 1: Educational Content
- Explains the **Why**, **Intuition**, **Mathematical Formulations**, and **Tradeoffs** before presenting implementation code.
- Equations rendered using client-side **KaTeX** with progressive disclosure (Intuition → Equation → Variable Table → Code).

### Layer 2: Pure Algorithm Layer (`lib/` / `algorithms/`)
- Written in **pure TypeScript** with zero React or DOM dependencies.
- Deterministic execution with reproducible random seeds.
- Exposes structured states (e.g. `exploredNodes`, `openSet`, `path`, `cost`) rather than directly manipulating rendering contexts.

### Layer 3: Simulation Engine (`simulation/`)
- Manages continuous-time physics integration, mobile robot kinematics ($SE(2)$ forward/inverse), collision bounding volumes, and sensor raycasting.
- Serializable simulation state allowing rewind, step-by-step single iteration execution, and state persistence.

### Layer 4: Visualization Layer (`components/simulation/`)
- Canvas 2D render loops executing via `requestAnimationFrame`.
- Avoids rendering thousands of React DOM nodes for grid cells to maintain 60 FPS performance on mobile and desktop.

### Layer 5: Interactive UI Layer (`components/` & `app/`)
- React 18 / Next.js 14 App Router.
- Tailwind CSS with an engineering dark-mode design system.

---

## 3. Static Export & Deployment Constraints

- **Zero Backend Dependences**: 100% of mathematical evaluations, physics integration, and path calculations run client-side.
- **GitHub Pages Base Path**: Configured using `process.env.NEXT_PUBLIC_BASE_PATH` to ensure assets and routing function both locally (`/`) and inside repository subpaths (`/RoboAtlas/`).
