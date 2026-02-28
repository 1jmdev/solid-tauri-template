import { type VariantProps, cva } from "class-variance-authority";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "size-4",
        default: "size-6",
        lg: "size-8",
        xl: "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type SpinnerProps = ComponentProps<"span"> & VariantProps<typeof spinnerVariants>;

const Spinner: Component<SpinnerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <span
      role="status"
      aria-label="Loading"
      class={cn(spinnerVariants({ size: local.size }), local.class)}
      {...others}
    >
      <span class="sr-only">Loading...</span>
    </span>
  );
};

export { Spinner };
export type { SpinnerProps };
