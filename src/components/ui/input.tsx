import { type Component, type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type InputProps = ComponentProps<"input">;

const Input: Component<InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "type"]);
  return (
    <input
      type={local.type ?? "text"}
      class={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        local.class
      )}
      {...others}
    />
  );
};

export { Input };
export type { InputProps };
