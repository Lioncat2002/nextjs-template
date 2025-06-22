🖼 views/ Layer — Page-Level Composition

Each view is a screen in the app — like LoginView, DashboardView, or CheckoutView. Views glue together widgets to fulfill a business flow.

📁 views/<ViewName>

Purpose:

Represent the UI for a route or step in a flow

Fetch or compose data from multiple sources

Example:

export function DashboardView() {
  return (
    <>
      <HeaderWidget />
      <UserProfileWidget />
      <RecentOrdersWidget />
    </>
  );
}

✅ May use side effects, guards, routing
⛔ Should not contain fine-grained business logic