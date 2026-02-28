import { Popover as KobaltePopover } from "@kobalte/core/popover";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const Popover = KobaltePopover;
const PopoverTrigger = KobaltePopover.Trigger;

type PopoverContentProps = {
  class?: string;
  children?: JSX.Element;
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

const PopoverContent: Component<PopoverContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children", "align", "sideOffset"]);
  return (
    <KobaltePopover.Portal>
      <KobaltePopover.Content
        class={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95",
          local.class
        )}
        {...others}
      >
        <KobaltePopover.Arrow />
        {local.children}
      </KobaltePopover.Content>
    </KobaltePopover.Portal>
  );
};

const PopoverHeader: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div class={cn("flex flex-col space-y-1.5", local.class)} {...others} />
  );
};

const PopoverTitle: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobaltePopover.Title
      class={cn("font-semibold leading-none tracking-tight", local.class)}
      {...others}
    />
  );
};

const PopoverDescription: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobaltePopover.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...others}
    />
  );
};

const PopoverClose = KobaltePopover.CloseButton;

export { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverClose };
