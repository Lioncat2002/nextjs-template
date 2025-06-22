🧩 features/ Layer — Interactive Logic & Use Cases

Encapsulates specific business interactions involving one or more entities. Represents user-driven flows like submitting a form, toggling a state, or triggering an API call.

📁 components/

Purpose:

Form or action-oriented components tightly coupled to one use case.

Example:

export function LoginForm() {
  const { mutate: login } = useLogin();
  // handle form submit, call login, etc
}

📁 hooks/

Purpose:

Action logic or composite mutations/fetches related to a feature.

Example:

export function useLogin() {
  return useMutation(loginUser); // from entities/user/api.ts
}

📁 model.ts (optional)

Purpose:

Encapsulates internal state or logic used by components/hooks.

✅ Summary

File/Folder

Purpose

components/

Forms or UIs tied to a specific action

hooks/

Use-case hooks that invoke domain logic

model.ts

Internal state/constants if needed

📌 features/ trigger changes, often write-heavy. They glue together domain logic into a flow.

