import { type Component, type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type SkeletonProps = ComponentProps<"div">;

const Skeleton: Component<SkeletonProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("animate-pulse rounded-md bg-primary/10", local.class)}
      {...others}
    />
  );
};

export { Skeleton };
