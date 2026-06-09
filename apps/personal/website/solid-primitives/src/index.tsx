import { createComputed, createSignal, type Accessor, type Component } from "solid-js";
export { Button } from "./primitives/Button";
export { Carousel } from "./primitives/Carousel";
export * as carouselStyles from "./primitives/Carousel/style.css";
export type {
  AtLeastThree,
  AtLeastThreeImages,
  CarouselClassNames,
  CarouselDirection,
  CarouselImage,
  CarouselImagesProps,
  CarouselProps,
  CarouselSlidesProps,
} from "./primitives/Carousel";
export { Calendar } from "./primitives/Calendar";
export * as calendarStyles from "./primitives/Calendar/style.css";
export type {
  CalendarCellProps,
  CalendarCellTriggerProps,
  CalendarHeadCellProps,
  CalendarLabelProps,
  CalendarNavProps,
  CalendarRootProps,
  CalendarTableProps,
} from "./primitives/Calendar";
export { Dialog } from "./primitives/Dialog";
export * as dialogStyles from "./primitives/Dialog/style.css";
export type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogLabelProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps,
  DialogTriggerProps,
} from "./primitives/Dialog";
export { Accordion, AccordionItem, Root } from "./primitives/Accordion";
export * as accordionStyles from "./primitives/Accordion/style.css";
export type {
  AccordionIcon,
  AccordionItemProps,
  AccordionSize,
  AccordionVariant,
} from "./primitives/Accordion";
export { VirtualizedDataTable } from "./primitives/DataTables/Virtualized/VirtualizedDataTable";
export type { VirtualizedDataTableProps } from "./primitives/DataTables/Virtualized/VirtualizedDataTable";
export {
  createFuseSearch,
  type FuseSearch,
} from "./primitives/DataTables/Virtualized/VirtualizedDataTable/create-fuse-search";
export * as virtualizedDataTableStyles from "./primitives/DataTables/Virtualized/VirtualizedDataTable/style.css";
export { tokens, transition, vars } from "./styles/theme.css";

export const createHello = (): [Accessor<string>, (to: string) => void] => {
  const [hello, setHello] = createSignal("Hello World!");

  return [
    hello,
    (to: string) => {
      setHello(`Hello ${to}!`);
    },
  ];
};

export const Hello: Component<{ readonly to?: string }> = (props) => {
  const [hello, setHello] = createHello();

  // Console calls will be removed in production if `dropConsole` is enabled

  // eslint-disable-next-line no-console
  console.log("Hello World!");

  createComputed(() => {
    if (typeof props.to === "string") {
      setHello(props.to);
    }
  });

  return (
    <>
      <div>{hello()}</div>
    </>
  );
};
