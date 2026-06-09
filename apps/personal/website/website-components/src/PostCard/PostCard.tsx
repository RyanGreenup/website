import {
  postCard,
  postCardDate,
  postCardDesc,
  postCardLink,
  postCardMore,
  postCardTags,
  postCardTitle,
} from "@rs/ryan-personal-website-design/recipes";
import { For, Show } from "solid-js";

import { TagChip } from "../TagChip/TagChip";

import type { JSX } from "solid-js";

export interface PostCardProps {
  href: string;
  title: string;
  date: Date | string | number;
  description: string;
  tags?: readonly string[];
}

export interface FormattedPostDate {
  iso: string;
  label: string;
}

export function formatPostDate(date: Date | string | number): FormattedPostDate {
  const value = new Date(date);

  return {
    iso: value.toISOString().slice(0, 10),
    label: value.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };
}

/**
 * Blog list row with a linked date, title, excerpt, read-more affordance, and
 * optional technology/content tags.
 */
export function PostCard(props: PostCardProps): JSX.Element {
  const date = (): FormattedPostDate => formatPostDate(props.date);
  const tags = (): readonly string[] => props.tags ?? [];

  return (
    <article class={postCard}>
      <a class={postCardLink} href={props.href}>
        <time class={postCardDate} datetime={date().iso}>
          {date().label}
        </time>
        <h3 class={postCardTitle}>{props.title}</h3>
        <p class={postCardDesc}>{props.description}</p>
        <span class={postCardMore}>Read post -&gt;</span>
      </a>

      <Show when={tags().length > 0}>
        <div class={postCardTags}>
          <For each={tags()}>{(tag) => <TagChip label={tag} mono />}</For>
        </div>
      </Show>
    </article>
  );
}
