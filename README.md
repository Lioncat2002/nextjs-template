
---

## 🔍 Layer Breakdown

### `app/`
Responsible for routing, page-level layouts, and global app behavior.  
**Examples:** `src/app/layout.tsx`, `src/app/page.tsx`, route-level loading/error components.  
The app router (e.g., Next.js or React Router) bootstraps here.

---

### `config/`
Global settings and constants.

Includes:
- `env.ts`
- `theme.ts`
- `routes.ts`
- `featureFlags.ts`

💡 *Keeps configuration separate from logic and UI.*

---

### `shared/`
Reusable, low-level modules that can be used anywhere.

Includes:
- `ui/` – atomic design components (e.g., `Button`, `Card`)
- `lib/` – general-purpose utilities
- `hooks/` – shared React hooks
- `styles/` – Tailwind configs, global styles
- `api/` – SDK wrappers or `axios`/`ky` clients

---

### `entities/`
Core **domain models** with their own state, types, and logic.  
Think of them as rich models, not plain types.

Examples:
- `User/`: state (Zustand/Recoil), model types, server calls
- `Product/`: fetch product list, handle product schema, etc.

---

### `widgets/`
Mid-level composite UI units tied to business context.  
Built using `entities` and `shared` components.

Examples:
- `UserProfileWidget/`
- `ProductSearchBar/`
- `CartSummary/`

---

### `views/`
Page or feature-specific containers composed from `widgets` and `entities`.  
Represents business "screens" or flows.

Examples:
- `DashboardView/`
- `CheckoutFlowView/`
- `LoginView/`

---

## 🧠 Why FSD?

- ✅ Scales better than feature folders or MVC
- ✅ Makes business domains explicit
- ✅ Separates global UI concerns from business logic
- ✅ Improves team collaboration and ownership

---

## 🧰 Tips for Working in This Structure

- ⚠️ Avoid deep nesting — shallow, flat modules per layer are preferred
- 🚧 Stick to boundaries — `entities` shouldn't import `widgets`, etc.
- 🛡 Use `eslint-plugin-boundaries` for layer isolation enforcement
