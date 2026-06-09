import {
  brand,
  brandMark,
  brandName,
  headerActions,
  headerInner,
  nav,
  navBackdrop,
  navIndex,
  navLink,
  navList,
  navOverlay,
  navSheet,
  navSheetClose,
  navSheetHead,
  navSheetLink,
  navSheetTitle,
  navToggle,
  siteHeader,
} from "@rs/ryan-personal-website-design/recipes";
import { createEffect, createSignal, For, onCleanup, Show } from "solid-js";

import type { JSX } from "solid-js";

export interface SiteHeaderNavItem {
  href: string;
  label: string;
}

export interface SiteHeaderProps {
  /** Primary navigation items. Defaults to the lifted Astro header nav. */
  navItems?: readonly SiteHeaderNavItem[];
  /** Current location pathname for aria-current matching. */
  currentPath?: string;
  brandHref?: string;
  brandLabel?: string;
  brandMark?: string;
  brandName?: string;
  /** Right-side control slot, typically the theme toggle island. */
  actions?: JSX.Element;
  /** Controlled mobile menu state for Storybook/tests/app shells. */
  mobileMenuOpen?: boolean;
  onMobileMenuOpenChange?: (open: boolean) => void;
}

export const defaultSiteHeaderNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly SiteHeaderNavItem[];

export function normalizeSiteHeaderPath(path: string | undefined): string {
  return path?.replace(/\/+$/, "") || "/";
}

export function isSiteHeaderLinkActive(href: string, currentPath: string | undefined): boolean {
  const path = normalizeSiteHeaderPath(currentPath);
  const normalizedHref = normalizeSiteHeaderPath(href);

  if (normalizedHref === "/") return path === "/";
  return path === normalizedHref || path.startsWith(`${normalizedHref}/`);
}

/**
 * Sticky portfolio header with brand lockup, primary navigation, optional theme
 * action slot, and a token-driven mobile menu sheet.
 */
export function SiteHeader(props: SiteHeaderProps): JSX.Element {
  const [internalOpen, setInternalOpen] = createSignal(false);
  const navItems = (): readonly SiteHeaderNavItem[] =>
    props.navItems ?? defaultSiteHeaderNavItems;
  const isOpen = (): boolean => props.mobileMenuOpen ?? internalOpen();
  const setOpen = (open: boolean): void => {
    props.onMobileMenuOpenChange?.(open);
    if (props.mobileMenuOpen === undefined) setInternalOpen(open);
  };
  const isActive = (href: string): boolean => isSiteHeaderLinkActive(href, props.currentPath);

  // While the sheet is open: lock body scroll and close on Escape. Both are
  // torn down when it closes, so nothing leaks once the menu is dismissed.
  createEffect(() => {
    if (!isOpen() || typeof document === "undefined") return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    onCleanup(() => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    });
  });

  return (
    <header class={siteHeader}>
      <div class={headerInner}>
        <a
          class={brand}
          href={props.brandHref ?? "/"}
          aria-label={props.brandLabel ?? `${props.brandName ?? "Dana Reyes"} - home`}
        >
          <span class={brandMark} aria-hidden="true">
            {props.brandMark ?? "DR"}
          </span>
          <span class={brandName}>{props.brandName ?? "Dana Reyes"}</span>
        </a>

        <nav class={nav} aria-label="Primary">
          <ul class={navList}>
            <For each={navItems()}>
              {(item) => (
                <li>
                  <a
                    href={item.href}
                    class={navLink}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </nav>

        <div class={headerActions}>
          <Show when={props.actions}>{(actions) => actions()}</Show>
          <button
            type="button"
            class={navToggle}
            aria-label="Open navigation"
            aria-expanded={isOpen()}
            aria-controls="site-header-mobile-nav"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div class={navOverlay}>
        <button
          type="button"
          class={navBackdrop}
          data-open={isOpen()}
          tabindex={isOpen() ? 0 : -1}
          aria-label="Close navigation"
          aria-hidden={!isOpen()}
          onClick={() => setOpen(false)}
        />
        <nav
          id="site-header-mobile-nav"
          class={navSheet}
          data-open={isOpen()}
          aria-label="Primary"
          aria-hidden={!isOpen()}
        >
          <div class={navSheetHead}>
            <span class={navSheetTitle}>Menu</span>
            <button
              type="button"
              class={navSheetClose}
              aria-label="Close navigation"
              tabindex={isOpen() ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <For each={navItems()}>
            {(item, index) => (
              <a
                href={item.href}
                class={navSheetLink}
                tabindex={isOpen() ? 0 : -1}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span class={navIndex}>{String(index() + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </a>
            )}
          </For>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon(): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon(): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
