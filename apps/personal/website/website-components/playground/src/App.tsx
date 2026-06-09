import { Button } from "../../src";

import type { JSX } from "solid-js";

const row: JSX.CSSProperties = {
  display: "flex",
  "align-items": "center",
  gap: "1rem",
  "flex-wrap": "wrap",
  padding: "2rem",
};

export function App() {
  return (
    <main style={row}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>
      <Button href="#">As link</Button>
    </main>
  );
}
