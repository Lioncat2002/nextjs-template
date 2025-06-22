🧰 shared/ Layer — Common Utilities & Building Blocks

The shared/ layer contains reusable, low-level utilities and atomic components that can be used across any part of the application — including entities, features, widgets, and views.

This is your design system, utility toolkit, and infrastructure layer.

📁 ui/

Purpose:

Atomic visual components like Button, Card, Input, Label

Implement design tokens and Tailwind variants

Example:

export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="px-4 py-2 rounded bg-blue-500 text-white" {...props}>{children}</button>;
}

📌 Think: presentational, stateless, universally reusable.

📁 lib/

Purpose:

Utility functions and helpers

Date formatters, string manipulation, number formatting, etc.

Example:

export function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

📌 No business logic. Only helpers.

📁 hooks/

Purpose:

Generic reusable hooks (e.g., useMediaQuery, useDebounce, useOnClickOutside)

Not tied to any entity or business logic

Example:

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounced;
}

📁 styles/

Purpose:

Tailwind config extensions

CSS module themes, global CSS resets

📁 api/ (optional)

Purpose:

Global axios/ky instance, interceptors, or base API client wrappers

Not entity-specific — used by all layers