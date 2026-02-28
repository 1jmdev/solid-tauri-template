import { type Component, type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type ScrollAreaProps = ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal" | "both";
};

const ScrollArea: Component<ScrollAreaProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children", "orientation"]);
  const orientation = local.orientation ?? "vertical";
  return (
    <div
      class={cn("relative overflow-hidden", local.class)}
      {...others}
    >
      <div
        class={cn(
          "h-full w-full rounded-[inherit]",
          orientation === "vertical" && "overflow-y-auto overflow-x-hidden",
          orientation === "horizontal" && "overflow-x-auto overflow-y-hidden",
          orientation === "both" && "overflow-auto",
          "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border",
          "scrollbar-thin"
        )}
      >
        {local.children}
      </div>
    </div>
  );
};

export { ScrollArea };
