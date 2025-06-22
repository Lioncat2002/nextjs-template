🧱 widgets/ Layer — Composite UI Blocks

Widgets are reusable, medium-to-large visual building blocks made of entities, shared, and features. They represent a coherent piece of the UI.

📁 widgets/<WidgetName>

Purpose:

Build meaningful business UI (e.g., CartSummary, UserProfileCard).

Layouts using multiple entities/features.

Example:

export function CartSummaryWidget() {
  const cart = useCartStore();
  return (
    <div>
      {cart.items.map(item => <ProductCard key={item.id} product={item} />)}
    </div>
  );
}

✅ Can include state, conditional logic, layout
⛔ Should not trigger routing or manage page-level flows

