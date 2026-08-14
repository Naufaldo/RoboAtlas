# RoboAtlas System & Technical Specification

## 1. Product Vision & Philosophy

**RoboAtlas** is an interactive robotics educational platform and algorithm laboratory. It operates under the core learning loop:

$$\text{Concept} \longrightarrow \text{Mathematics} \longrightarrow \text{Algorithm} \longrightarrow \text{Visualization} \longrightarrow \text{Simulation} \longrightarrow \text{Code} \longrightarrow \text{Experiment}$$

The platform is designed to be:
1. **Visual-First**: 2D animated kinematic models, sensor raycasting, and state space graphs communicate concepts dynamically.
2. **Mathematically Rigorous**: Mathematical equations are rendered clearly via KaTeX, with every variable defined and explained progressively.
3. **Interactive & Deterministic**: Browser simulations run at 60 FPS, with step-by-step iteration controls, replayability, and seedable randomness.
4. **100% Client-Side**: Static export architecture without server-side runtimes, databases, or external compute backends for Phase 1.

---

## 2. 5-Layer System Architecture

RoboAtlas is partitioned into five distinct layers to enforce separation of concerns and ensure algorithm portability:

```
Layer 1: Educational Content Layer (KaTeX, Markdown, Conceptual Explanations)
                     ↓
Layer 2: Pure Algorithm Layer (Framework-Agnostic Pure TypeScript)
                     ↓
Layer 3: Simulation Engine (Kinematics, Timesteps, Raycasting, Physics)
                     ↓
Layer 4: Visualization Layer (2D Canvas, High-DPI Renderers)
                     ↓
Layer 5: Interactive UI Layer (Controls, Sliders, HUD Telemetry)
```

### Layer 1: Educational Content
- Explains the **Why**, **Intuition**, **Assumptions**, and **Tradeoffs** before showing code.
- Progressive disclosure: Intuition → KaTeX Equation → Variable Table → Step-by-Step Pseudocode.

### Layer 2: Pure Algorithm Layer (`lib/` / `algorithms/`)
- Written in **pure TypeScript** with zero React or DOM dependencies.
- Returns structured execution state (`exploredNodes`, `openSet`, `path`, `cost`, `covariance`).
- Independent of JSX, DOM, and Canvas contexts for easy unit testing and portability.

### Layer 3: Simulation Engine (`simulation/`)
- Manages continuous-time physics integration, robot kinematics ($SE(2)$ forward/inverse models), obstacle collision detection, and LiDAR sensor raycasting.
- Maintains serializable simulation state supporting step execution, pause, reset, and state restoration.

### Layer 4: Visualization Layer (`components/simulation/`)
- Canvas 2D render loops executing via `requestAnimationFrame`.
- Avoids excessive React DOM nodes for grid cells to maintain high frame rates on both mobile and desktop.

### Layer 5: Interactive UI Layer (`components/` & `app/`)
- Built with React 18 / Next.js 14 App Router and Tailwind CSS.
- Sleek engineering dark-mode design system with responsive layouts and accessibility support (`prefers-reduced-motion`).

---

## 3. Educational Page Template

Every algorithm page must follow a uniform educational structure:

```markdown
# [Algorithm Name]

## 1. What problem does it solve?
Explain motivation, difficulty, and physical context.

## 2. Intuition & Visual Explanation
Physical metaphor or spatial intuition.

## 3. Mathematical Model & Variables
KaTeX equations with comprehensive variable descriptions.

## 4. Step-by-Step Algorithmic Logic
How state transitions occur at each iteration.

## 5. Interactive Simulation Laboratory
Interactive 2D Canvas with playback and parameter controls.

## 6. Pseudocode
Language-independent execution logic.

## 7. TypeScript Implementation
Clean, pure TypeScript code matching the algorithm.

## 8. Complexity & Tradeoffs
Time complexity, space complexity, optimality, and edge cases.

## 9. Real Robotics Applications
Industrial, autonomous vehicle, or aerospace use cases.

## 10. References & Classical Citations
Academic papers and foundational textbooks.
```

---

## 4. GitHub Pages Static Export Constraints

For Phase 1, the platform strictly targets static hosting on GitHub Pages:
- `output: 'export'` with `trailingSlash: true` in `next.config.mjs`.
- Base path configuration using `process.env.NEXT_PUBLIC_BASE_PATH` to support repository subpaths (`https://<username>.github.io/<repo>/`).
- No server actions, runtime databases, or server-side API routes.
- Images configured with `unoptimized: true`.

---

## 5. Performance & Quality Standards

- **Strict TypeScript**: `compilerOptions.strict: true` with zero `any` usage in algorithm cores.
- **Canvas Rendering**: High-DPI scaling (`window.devicePixelRatio`), avoiding large graphics engines where Canvas 2D suffices.
- **Accessibility**: Keyboard navigation, readable fonts, and reduced-motion fallbacks for all animated simulations.
