import { type Component, type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const Code: Component<ComponentProps<"code">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <code
      class={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        local.class
      )}
      {...others}
    />
  );
};

const Pre: Component<ComponentProps<"pre">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <pre
      class={cn(
        "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
        local.class
      )}
      {...others}
    />
  );
};

export { Code, Pre };
