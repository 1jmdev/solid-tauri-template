import { Toast as KobalteToast } from "@kobalte/core/toast";
import { type VariantProps, cva } from "class-variance-authority";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--kb-toast-swipe-end-x) data-[swipe=move]:translate-x-(--kb-toast-swipe-move-x) data-[swipe=move]:transition-none data-expanded:slide-in-from-top-full data-closed:slide-out-to-right-full data-expanded:animate-in data-closed:animate-out data-closed:fade-out-80",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/20 dark:text-green-400",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950/20 dark:text-yellow-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type ToastProps = {
  class?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  children?: JSX.Element;
  toastId: number;
};

const ToastRegion: Component<{ class?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteToast.Region
      class={cn(
        "fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        local.class
      )}
      {...others}
    />
  );
};

const ToastList: Component<{ class?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteToast.List
      class={cn("flex flex-col gap-2", local.class)}
      {...others}
    />
  );
};

const Toast: Component<ToastProps & VariantProps<typeof toastVariants>> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "children"]);
  return (
    <KobalteToast
      class={cn(toastVariants({ variant: local.variant }), local.class)}
      {...others}
    >
      {local.children}
    </KobalteToast>
  );
};

const ToastTitle: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteToast.Title
      class={cn("text-sm font-semibold", local.class)}
      {...others}
    />
  );
};

const ToastDescription: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteToast.Description
      class={cn("text-sm opacity-90", local.class)}
      {...others}
    />
  );
};

const ToastCloseButton: Component<{ class?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteToast.CloseButton
      class={cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50",
        local.class
      )}
      {...others}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </KobalteToast.CloseButton>
  );
};

// Helper to show a toast
export function showToast(options: {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  duration?: number;
}) {
  const render = (data: { toastId: number }) => {
    const variant = options.variant;
    return (
      <Toast toastId={data.toastId} variant={variant}>
        <div class="flex flex-col gap-1">
          {options.title && <ToastTitle>{options.title}</ToastTitle>}
          {options.description && <ToastDescription>{options.description}</ToastDescription>}
        </div>
        <ToastCloseButton />
      </Toast>
    );
  };
  return KobalteToast.toaster.show(render);
}

export { Toast, ToastRegion, ToastList, ToastTitle, ToastDescription, ToastCloseButton };
