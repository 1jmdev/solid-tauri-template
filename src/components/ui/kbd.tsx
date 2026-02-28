import { type Component, type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const Kbd: Component<ComponentProps<"kbd">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <kbd
      class={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
        local.class
      )}
      {...others}
    />
  );
};

export { Kbd };
