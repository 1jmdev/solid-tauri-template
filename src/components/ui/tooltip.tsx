import { Tooltip as KobalteTooltip } from "@kobalte/core/tooltip";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const TooltipProvider = KobalteTooltip;

type TooltipProps = {
  children?: JSX.Element;
  content: JSX.Element;
  placement?: "top" | "bottom" | "left" | "right";
  class?: string;
  delay?: number;
};

const Tooltip: Component<TooltipProps> = (props) => {
  return (
    <KobalteTooltip openDelay={props.delay ?? 400} placement={props.placement ?? "top"}>
      <KobalteTooltip.Trigger as="span" class={cn("inline-flex", props.class)}>
        {props.children}
      </KobalteTooltip.Trigger>
      <KobalteTooltip.Portal>
        <KobalteTooltip.Content
          class={cn(
            "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          )}
        >
          <KobalteTooltip.Arrow />
          {props.content}
        </KobalteTooltip.Content>
      </KobalteTooltip.Portal>
    </KobalteTooltip>
  );
};

const TooltipTrigger = KobalteTooltip.Trigger;
const TooltipContent: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteTooltip.Portal>
      <KobalteTooltip.Content
        class={cn(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          local.class
        )}
        {...others}
      >
        <KobalteTooltip.Arrow />
        {props.children}
      </KobalteTooltip.Content>
    </KobalteTooltip.Portal>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
