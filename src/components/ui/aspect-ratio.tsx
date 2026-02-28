import { type Component, type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type AspectRatioProps = ComponentProps<"div"> & {
  ratio?: number;
};

const AspectRatio: Component<AspectRatioProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "ratio", "style"]);
  const ratio = local.ratio ?? 1;
  return (
    <div
      style={{ position: "relative", width: "100%", "padding-bottom": `${(1 / ratio) * 100}%` }}
      class={cn(local.class)}
    >
      <div
        style={{ position: "absolute", inset: "0" }}
        {...others}
      />
    </div>
  );
};

export { AspectRatio };
