import { type VariantProps, cva } from "class-variance-authority";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/80",
        warning:
          "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900 dark:text-yellow-400 [&>svg]:text-current",
        success:
          "text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400 [&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type AlertProps = ComponentProps<"div"> & VariantProps<typeof alertVariants>;

const Alert: Component<AlertProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"]);
  return (
    <div
      role="alert"
      class={cn(alertVariants({ variant: local.variant }), local.class)}
      {...others}
    />
  );
};

const AlertTitle: Component<ComponentProps<"h5">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <h5
      data-slot="alert-title"
      class={cn("col-start-2 font-medium leading-none tracking-tight", local.class)}
      {...others}
    />
  );
};

const AlertDescription: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="alert-description"
      class={cn("col-start-2 text-sm [&_p]:leading-relaxed", local.class)}
      {...others}
    />
  );
};

export { Alert, AlertTitle, AlertDescription };
