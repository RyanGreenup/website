import { createSignal, onMount, Show } from "solid-js";

type Mode = "light" | "dark";

function systemMode(): Mode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [mode, setMode] = createSignal<Mode | null>(null);

  onMount(() => {
    const stored = localStorage.getItem("theme") as Mode | null;
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
      setMode(stored);
    } else {
      setMode(systemMode());
    }
  });

  const toggle = () => {
    const next: Mode = mode() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setMode(next);
  };

  return (
    <button
      type="button"
      class="theme-toggle"
      onClick={toggle}
      aria-label="Toggle colour theme"
      aria-pressed={mode() === "dark"}
      title={mode() === "dark" ? "Switch to light" : "Switch to dark"}
    >
      <Show
        when={mode() === "dark"}
        fallback={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
        }
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </Show>
    </button>
  );
}
