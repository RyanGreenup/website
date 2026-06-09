import {
  ProseWrapper,
  SyntaxHighlightedCode,
} from "@rs/ryan-personal-website-components";

import type { Meta, StoryObj } from "storybook-solidjs-vite";

// Reading-column wrapper for Markdown-like content. The story exemplars use
// native descendants so the design recipe's global prose selectors are visible.
const meta = {
  title: "Components/ProseWrapper",
  component: ProseWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ProseWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Article-style prose with headings, paragraphs, lists, links, and quotes. */
export const ArticleExemplar: Story = {
  render: () => (
    <ProseWrapper>
      <h2>Lorem Ipsum Dolor</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae
        fermentum lectus. <strong>Praesent commodo</strong> sapien vel mi
        tincidunt, sed gravida justo facilisis.
      </p>
      <p>
        Curabitur at <a href="#example">magna vitae sem</a> tempor porta. Sed
        non risus nec arcu dignissim efficitur in at erat.
      </p>
      <h3>Aliquam Fringilla</h3>
      <ul>
        <li>Donec faucibus neque a quam posuere, vitae suscipit ipsum congue.</li>
        <li>Morbi consequat justo id risus faucibus, non porttitor lacus dictum.</li>
        <li>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.</li>
      </ul>
      <blockquote>
        Nulla facilisi. Suspendisse potenti. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames.
      </blockquote>
      <p>
        Duis finibus lacus vel eros ultricies, a pretium justo commodo. Etiam
        vitae lectus sed neque volutpat luctus.
      </p>
    </ProseWrapper>
  ),
};

/** Prose with inline code, preformatted code, a divider, and a small table. */
export const TechnicalExemplar: Story = {
  render: () => (
    <ProseWrapper>
      <h2>Technical Notes</h2>
      <p>
        Use <code>ProseWrapper</code> around rendered Markdown so descendant
        elements inherit the long-form typography contract.
      </p>
      <SyntaxHighlightedCode
        language="tsx"
        code={`export function Example() {
  return <ProseWrapper>{content}</ProseWrapper>;
}`}
      />
      <hr />
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>layout.proseMax</td>
            <td>Caps the reading column.</td>
          </tr>
          <tr>
            <td>leading.relaxed</td>
            <td>Sets comfortable long-form line height.</td>
          </tr>
        </tbody>
      </table>
    </ProseWrapper>
  ),
};

/** Dense lorem ipsum to check paragraph rhythm and line length. */
export const DenseLorem: Story = {
  render: () => (
    <ProseWrapper>
      <h2>Vestibulum Consequat</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        sagittis nisi nec lectus feugiat, sed sagittis dolor pharetra. Maecenas
        gravida, lectus sed efficitur vehicula, risus massa vestibulum purus, a
        pulvinar justo turpis a nibh.
      </p>
      <p>
        Aenean euismod tortor at nisl luctus, non interdum urna facilisis.
        Integer varius massa eget turpis porta, non vestibulum justo rhoncus.
        Vivamus laoreet sem at nunc aliquet, sit amet cursus ligula posuere.
      </p>
      <p>
        Sed posuere magna in quam feugiat, a accumsan magna rhoncus. Cras sed
        orci quis ipsum consectetur tempor. Nunc non nibh ut neque porta
        tincidunt vitae et leo.
      </p>
    </ProseWrapper>
  ),
};
