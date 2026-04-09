"use client";
import { useFormState } from "react-dom";

export default function PostForm({ action, children }) {
  const [state, formAction] = useFormState(action, {});

  return (
    <>
      <form action={formAction}>{children}</form>
      {state.errors && (
        <ul className="form-errors">
          {state.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </>
  );
}
