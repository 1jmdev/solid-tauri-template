import { HoverCard as KobalteHoverCard } from "@kobalte/core/hover-card";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const HoverCard = KobalteHoverCard;
const HoverCardTrigger = KobalteHoverCard.Trigger;

type HoverCardContentProps = {
  class?: string;
  children?: JSX.Element;
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

const HoverCardContent: Component<HoverCardContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "align", "sideOffset", "children"]);
  return (
    <KobalteHoverCard.Portal>
      <KobalteHoverCard.Content
        class={cn(
          "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95",
          local.class
        )}
        {...others}
      >
        <KobalteHoverCard.Arrow />
        {local.children}
      </KobalteHoverCard.Content>
    </KobalteHoverCard.Portal>
  );
};

export { HoverCard, HoverCardTrigger, HoverCardContent };
