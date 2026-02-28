import { Collapsible as KobalteCollapsible } from "@kobalte/core/collapsible";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const Collapsible = KobalteCollapsible;
const CollapsibleTrigger = KobalteCollapsible.Trigger;

const CollapsibleContent: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteCollapsible.Content
      class={cn(
        "overflow-hidden text-sm data-expanded:animate-accordion-down data-closed:animate-accordion-up",
        local.class
      )}
      {...others}
    />
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
