import {
  projectCard,
  projectCardDesc,
  projectCardHead,
  projectCardLink,
  projectCardLinks,
  projectCardNote,
  projectCardTech,
  projectCardTitle,
} from "@rs/ryan-personal-website-design/recipes";
import { For, Show } from "solid-js";

import { ComingSoonBadge } from "../ComingSoonBadge/ComingSoonBadge";
import { TagChip } from "../TagChip/TagChip";

import type { JSX } from "solid-js";

export interface ProjectCardProps {
  title: string;
  description: string;
  tech: readonly string[];
  github?: string;
  live?: string;
  /** Short status note, e.g. "Open source" or "Production". */
  note?: string;
  /** When true, renders a "Coming Soon" badge to indicate a private, unreleased project. */
  comingSoon?: boolean;
}

/**
 * Bordered project summary card for selected work grids.
 *
 * Styling is owned by the design system's `projectCard` recipe family. The
 * markup mirrors the lifted Astro component and composes `TagChip` for tech
 * metadata.
 */
export function ProjectCard(props: ProjectCardProps): JSX.Element {
  return (
    <article class={projectCard}>
      <header class={projectCardHead}>
        <h3 class={projectCardTitle}>{props.title}</h3>
        <Show when={props.comingSoon}>
          <ComingSoonBadge />
        </Show>
        <Show when={!props.comingSoon && props.note}>
          {(note) => <span class={projectCardNote}>{note()}</span>}
        </Show>
      </header>

      <p class={projectCardDesc}>{props.description}</p>

      <div class={projectCardTech}>
        <For each={props.tech}>{(technology) => <TagChip label={technology} mono />}</For>
      </div>

      <footer class={projectCardLinks}>
        <Show when={props.github}>
          {(github) => (
            <a class={projectCardLink} href={github()} rel="noopener">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.52.1.71-.23.71-.5v-1.8c-2.9.63-3.52-1.4-3.52-1.4-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.94 1.6 2.46 1.14 3.06.87.1-.68.36-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.16 0-1.14.4-2.07 1.07-2.8-.1-.27-.46-1.34.1-2.78 0 0 .87-.28 2.86 1.06a9.9 9.9 0 0 1 5.2 0c1.98-1.34 2.85-1.06 2.85-1.06.57 1.44.21 2.51.1 2.78.67.73 1.07 1.66 1.07 2.8 0 4.01-2.45 4.9-4.78 5.15.38.32.71.95.71 1.92v2.85c0 .28.19.61.72.5A10.5 10.5 0 0 0 12 1.5Z" />
              </svg>
              <span>Source</span>
            </a>
          )}
        </Show>

        <Show when={props.live}>
          {(live) => (
            <a class={projectCardLink} href={live()} rel="noopener">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M10 14 21 3M15 3h6v6M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
              </svg>
              <span>Live</span>
            </a>
          )}
        </Show>
      </footer>
    </article>
  );
}
