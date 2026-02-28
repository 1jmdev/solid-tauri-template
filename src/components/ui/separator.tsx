import { Separator as KobalteSeperator } from "@kobalte/core/separator";
import { type Component, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type SeparatorProps = {
  class?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

const Separator: Component<SeparatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"]);
  return (
    <KobalteSeperator
      class={cn(
        "shrink-0 bg-border",
        local.orientation === "vertical" ? "h-full w-px" : "h-px w-full",
        local.class
      )}
      orientation={local.orientation ?? "horizontal"}
      {...others}
    />
  );
};

export { Separator };
export type { SeparatorProps };
