import { defineConfig } from "oxlint";
defineConfig(
  // Accessibility lint config — jsx-a11y rules for SolidJS.
  //
  // OWNERSHIP: If a rule fires and you believe it is a false positive, edit THIS file.
  // For all other lint issues, edit .oxlintrc.json instead.
  // Never use eslint-disable comments.
  //
  // Run: mise run lint:a11y
  // No --type-aware: a11y rules are AST-only and do not need type information.
  {
    plugins: ["jsx-a11y"],

    // SolidJS diverges from React in ways that matter for a11y rules.
    // This settings block corrects the most common resolution failures.
    settings: {
      "jsx-a11y": {
        attributes: {
          // SolidJS uses <label for="x">, not React's htmlFor.
          // Without this mapping, label-has-associated-control fires on every label element.
          for: ["htmlFor", "for"],
        },
        components: {
          // TanStack Router navigation — treated as <a> for anchor-is-valid, anchor-has-content, etc.
          A: "a",
          Link: "a",
        },
        // DaisyUI and headless component libraries use <Box as="button"> polymorphic pattern.
        // This lets the rule understand the resolved element type.
        polymorphicPropName: "as",
      },
    },

    rules: {
      // ── Error — always wrong, no SolidJS false positives ──────────────────────────────

      // Missing alt text is a hard accessibility failure for screen readers
      "jsx-a11y/alt-text": "error",

      // <a> elements with no text content are invisible to screen readers
      "jsx-a11y/anchor-has-content": "error",

      // Catches href="#", href="javascript:void(0)", and missing href on links.
      "jsx-a11y/anchor-is-valid": "error",

      // Elements managing focus via aria-activedescendant must be keyboard-reachable
      "jsx-a11y/aria-activedescendant-has-tabindex": "error",

      // Catches typos and invented aria-* attributes (aria-labeledby vs aria-labelledby)
      "jsx-a11y/aria-props": "error",

      // aria-checked="yes" is wrong — values must match the ARIA spec
      "jsx-a11y/aria-proptypes": "error",

      // role="buton" (typo) and other invalid roles are silent no-ops for AT
      "jsx-a11y/aria-role": "error",

      // Certain HTML elements cannot carry ARIA roles (e.g., <meta aria-label>)
      "jsx-a11y/aria-unsupported-elements": "error",

      // <h1>–<h6> with no text content are meaningless to screen readers
      "jsx-a11y/heading-has-content": "error",

      // <html> must declare a language so screen readers use the correct voice
      "jsx-a11y/html-has-lang": "error",

      // <iframe> without title is opaque to assistive technology
      "jsx-a11y/iframe-has-title": "error",

      // Access keys conflict with browser and screen reader shortcuts
      "jsx-a11y/no-access-key": "error",

      // aria-hidden on a focusable element traps keyboard focus in an invisible element
      "jsx-a11y/no-aria-hidden-on-focusable": "error",

      // <marquee> and <blink> cause motion/flicker and are deprecated HTML
      "jsx-a11y/no-distracting-elements": "error",

      // role="navigation" on <nav> is redundant — the implicit role already provides it
      "jsx-a11y/no-redundant-roles": "error",

      // Every role with required aria-* attributes must have them present
      "jsx-a11y/role-has-required-aria-props": "error",

      // Catches aria-* attributes that are not supported by the element's role
      "jsx-a11y/role-supports-aria-props": "error",

      // scope attribute is only valid on <th> elements
      "jsx-a11y/scope": "error",

      // tabIndex > 0 creates a tab order that differs from visual order — always wrong
      "jsx-a11y/tabindex-no-positive": "error",

      // ── Warn — real concern, but SolidJS or oxlint caveats apply ─────────────────────

      // Dynamic autocomplete values are opaque to static analysis — warn, don't block
      "jsx-a11y/autocomplete-valid": "warn",

      // Valid a11y concern. Warn (not error) because custom interactive SolidJS components
      // may handle keyboard events in ways the static checker cannot see.
      "jsx-a11y/click-events-have-key-events": "warn",

      // oxlint bug #19336: substring-match false positives on camelCase strings containing
      // "image" (e.g., alt="imageProcessing" incorrectly fires). Promote to "error" once
      // you confirm your oxlint version includes the fix from PR #19367.
      "jsx-a11y/img-redundant-alt": "warn",

      // SolidJS control flow: <Show when={hasCaptions}><track /></Show> wraps the <track>
      // in a component that is invisible to the AST checker (upstream #838). Warn so
      // developers are prompted to verify captions exist at runtime without blocking
      // valid dynamic implementations.
      "jsx-a11y/media-has-caption": "warn",

      // Same caveat as click-events-have-key-events
      "jsx-a11y/mouse-events-have-key-events": "warn",

      // Autofocus has legitimate uses (modal dialogs opened by user action, search fields).
      // Warn so each use is reviewed rather than blanket-blocked.
      "jsx-a11y/no-autofocus": "warn",

      // DaisyUI scroll regions and some focus traps require tabIndex={0} on a non-interactive
      // wrapper. Warn so each instance is reviewed; promote to "error" if none are found.
      "jsx-a11y/no-noninteractive-tabindex": "warn",

      // Same caveat as click-events-have-key-events
      "jsx-a11y/no-static-element-interactions": "warn",

      // ── Off — confirmed false positives that are not settings-fixable ─────────────────

      // DISABLED: upstream issue #920 — fires on <div role="status"> and <div role="alert">
      // (correct ARIA live region patterns used by every toast/notification component in a
      // DaisyUI codebase) and on <svg role="img"> (correct inline SVG accessibility pattern).
      // Re-enable when the upstream plugin can distinguish live-region and SVG roles from
      // roles where a semantic HTML substitute genuinely exists.
      "jsx-a11y/prefer-tag-over-role": "off",
    },

    // ── Not yet implemented in oxlint (audit on each major oxlint version bump) ─────────
    //
    // These rules exist in eslint-plugin-jsx-a11y but are not yet ported to oxlint's
    // native Rust implementation. Check for them on each oxlint upgrade:
    //
    //   jsx-a11y/control-has-associated-label
    //   jsx-a11y/interactive-supports-focus
    //   jsx-a11y/no-interactive-element-to-noninteractive-role
    //   jsx-a11y/no-noninteractive-element-interactions
    //   jsx-a11y/no-noninteractive-element-to-interactive-role

    ignorePatterns: [
      "**/node_modules",
      "**/dist",
      "**/out",
      "**/*.d.ts",
      "e2e/**",
      "playwright.config.ts",
    ],

    // ── Per-file overrides for deliberate patterns ────────────────────────────────────────
    //
    // Each override is surgical (specific file, not whole directory) and includes
    // the rationale so the intent is preserved for future reviewers.
    overrides: [
      {
        // TanStack Router <Link to="..."> renders as <a href="..."> at runtime, but the static
        // AST checker does not resolve the "to" prop to a valid href even with the Link→a component
        // mapping. Downgrade to warn for all TSX source files; real href-less anchors are still flagged.
        files: ["src/**/*.tsx"],
        rules: {
          "jsx-a11y/anchor-is-valid": "warn",
        },
      },
      {
        // Backdrop/overlay divs in the app layout that close a mobile drawer on click.
        // They carry aria-hidden={true} when visible (set dynamically), so screen readers
        // do not interact with them — keyboard events would be unreachable and misleading.
        files: ["src/routes/_app.tsx"],
        rules: {
          "jsx-a11y/click-events-have-key-events": "off", // aria-hidden overlay, not keyboard-reachable
          "jsx-a11y/no-static-element-interactions": "off",
        },
      },
      {
        // Mobile drawer backdrop in ChatThreadSidebar. Behaves identically to the _app.tsx
        // overlay — aria-hidden when open so AT skips it; click dismisses the drawer.
        // Keyboard users close via Escape (handled in the aside itself).
        files: ["src/components/chat/ChatThreadSidebar.tsx"],
        rules: {
          "jsx-a11y/click-events-have-key-events": "off", // aria-hidden backdrop overlay
          "jsx-a11y/no-static-element-interactions": "off",
        },
      },
      {
        // Skeleton loading overlay that covers a panel during data fetch.
        // It has aria-hidden implicitly (no role, no focusable content) and is
        // removed from the DOM once data loads. The click handler is a debug/dev tool.
        files: ["src/components/layout/mask-components.tsx"],
        rules: {
          "jsx-a11y/click-events-have-key-events": "off", // transient skeleton overlay, not AT-reachable
          "jsx-a11y/no-static-element-interactions": "off",
        },
      },
      {
        // TreeRowShell uses <div role="treeitem"> which IS an interactive role.
        // The rule fires because the outer div has onClick but no keydown — however,
        // keyboard navigation for the tree is handled at the tree root level (arrow keys,
        // Enter) so per-row handlers would duplicate logic. The element has tabIndex={-1}
        // (programmatically focusable, not in tab order) per WAI-ARIA tree pattern.
        files: ["src/components/Tree/components/TreeShell.tsx"],
        rules: {
          "jsx-a11y/click-events-have-key-events": "off", // keyboard nav handled at tree root
        },
      },
      {
        // ChatThreadRow click handler — thread list items where keyboard navigation
        // is managed by the parent list component. Similar pattern to TreeShell.
        files: ["src/components/chat/ChatThreadRow.tsx"],
        rules: {
          "jsx-a11y/click-events-have-key-events": "off", // keyboard nav managed by parent
          "jsx-a11y/no-static-element-interactions": "off",
        },
      },
      {
        // DaisyUI tab pattern: <a role="tab"> is used as a tab button without href
        // because it doesn't navigate — it switches the active panel. The DaisyUI
        // component system renders tabs as <a> elements styled via role="tab".
        // click-events: keyboard support is provided by the parent tablist container.
        files: ["src/components/tabs.tsx"],
        rules: {
          "jsx-a11y/click-events-have-key-events": "off", // DaisyUI tab: keyboard handled at tablist
        },
      },
      // {
      //   // Example/demo charts use <label> wrapping a custom <Toggle> component.
      //   // Toggle renders an <input type="checkbox"> internally, which satisfies the
      //   // association requirement at runtime. The static checker cannot see through
      //   // the custom component boundary to find the underlying input element.
      //   files: [
      //     "src/components/echarts/examples/area-chart.tsx",
      //     "src/components/echarts/examples/bar-chart/variants-section.tsx",
      //     "src/components/echarts/examples/combo-chart.tsx",
      //     "src/components/echarts/examples/donut-chart.tsx",
      //     "src/components/echarts/examples/spark-chart.tsx",
      //     "src/components/echarts/examples/tracker.tsx",
      //   ],
      //   rules: {
      //     "jsx-a11y/label-has-associated-control": "off", // Toggle renders <input> internally; static checker cannot see through component boundary
      //   },
      // },
    ],
  },
);
