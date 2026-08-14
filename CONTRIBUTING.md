# Contributing to RoboAtlas

Thank you for your interest in contributing to **RoboAtlas**!

## Development Workflow

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/<your-username>/RoboAtlas.git
   cd RoboAtlas
   npm install
   ```

2. **Branching**:
   Create a descriptive branch for your feature or algorithm:
   ```bash
   git checkout -b feature/a-star-planner
   ```

3. **Code Quality Standards**:
   - Ensure all algorithm implementations are pure TypeScript placed in `algorithms/` or `lib/math/`.
   - Never embed algorithm business logic directly into JSX components.
   - Run typecheck and tests before committing:
     ```bash
     npm run typecheck
     npm test
     npm run build
     ```

4. **Educational Requirements**:
   - Every algorithm must include:
     1. Problem motivation and intuition
     2. Mathematical formula with KaTeX
     3. Algorithm pseudocode
     4. TypeScript implementation
     5. Time and space complexity analysis
     6. Paper citation / academic reference
