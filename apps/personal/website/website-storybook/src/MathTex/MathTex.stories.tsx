import { MathTex, ProseWrapper } from "@rs/ryan-personal-website-components";

import type { Meta, StoryObj } from "storybook-solidjs-vite";

const meta = {
  title: "Components/MathTex",
  component: MathTex,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof MathTex>;

export default meta;

type Story = StoryObj<typeof meta>;

// TeX strings use JavaScript expression literals so backslash commands reach
// KaTeX as `\frac`, not JSX text-attribute `\\frac`.
export const InlineAndDisplay: Story = {
  render: () => (
    <ProseWrapper>
      <h2>Math in prose</h2>
      <p>
        The quadratic formula is <MathTex tex={"x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"} />.
      </p>
      <MathTex tex={"\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}"} displayMode />
      <p>
        Custom macros work too:{" "}
        <MathTex tex={"f: \\R \\to \\R"} macros={{ "\\R": "\\mathbb{R}" }} />.
      </p>
    </ProseWrapper>
  ),
};

export const AuthoringErrors: Story = {
  render: () => (
    <ProseWrapper>
      <h2>Authoring errors</h2>
      <p>
        Default rendering keeps invalid source visible without crashing:{" "}
        <MathTex tex={"\\notacommand{"} />
      </p>
      <p>
        Strict mode reports the parse error as text: <MathTex tex={"\\notacommand{"} throwOnError />
      </p>
    </ProseWrapper>
  ),
};
