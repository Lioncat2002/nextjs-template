### 🧠 `entities/` Layer — Business-Level Models

Each folder in `entities/` represents a core business object (like `User`, `Product`, `Order`) and contains logic directly related to that domain. This is your source of truth for domain knowledge.

---

## 📁 `store.ts`

### Purpose:

Defines state management for this entity using Zustand, Jotai, or similar libraries.

### When to use:

* You need persistent state (e.g. current user, cart) across views/widgets.
* The state is directly tied to the entity and updated from many places.

### Example:

```ts
import { create } from 'zustand';
import type { User } from './types';

export const useUserStore = create<{ user: User | null; setUser: (user: User) => void }>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));
```

⛔ Avoid using store for one-off data or things handled by React Query.

---

## 📁 `types.ts`

### Purpose:

Defines the shape of the entity: interfaces, enums, and types.

### When to use:

* To type-check data from API responses.
* To create reusable types for props, components, stores.

### Example:

```ts
export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}
```

📌 These types define the truth of what the entity is.

---

## 📁 `api.ts`

### Purpose:

Encapsulates all API logic directly related to this entity.

### When to use:

* To fetch, create, update, or delete the entity from the backend.
* To hide fetch logic from widgets/features.

### Example:

```ts
export async function fetchProductById(id: string) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}
```

📌 These functions are raw; combine them in `features/` if needed.

---

## 📁 `schema.ts`

### Purpose:

Defines validation rules or transformation schemas for the entity.

### When to use:

* When validating forms or API inputs.
* When structuring entity data consistently.

### Example:

```ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
});
```

✅ Keeps validation close to the data structure.

---

## 📁 `<EntityComponent>.tsx`

### Purpose:

Defines tiny, pure UI components tied directly to the entity.

### When to use:

* For small, visual representations (e.g., `UserAvatar`, `ProductBadge`).
* When no additional logic or composition is needed.

### Example:

```tsx
import { User } from './types';

export function UserAvatar({ user }: { user: User }) {
  return <img src={user.avatarUrl} alt={user.name} />;
}
```

⛔ Do not add layout or composed components here — that belongs in `widgets/`.

---

## ✅ Summary

| File            | Purpose                             | Used In         |
| --------------- | ----------------------------------- | --------------- |
| `store.ts`      | Entity-scoped global or local state | widgets, views  |
| `types.ts`      | Domain model type definitions       | everywhere      |
| `api.ts`        | Fetch/update logic for the entity   | features, views |
| `schema.ts`     | Validation schemas (zod/yup/etc.)   | features, forms |
| `Component.tsx` | Simple, pure visual element         | widgets, views  |

📌 The `entities/` layer should only express what an entity *is*, how it’s *fetched*, how it’s *typed*, and how it’s *validated* — nothing more.
