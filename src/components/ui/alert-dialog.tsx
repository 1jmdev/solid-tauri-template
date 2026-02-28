import { AlertDialog as KobalteAlertDialog } from "@kobalte/core/alert-dialog";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = KobalteAlertDialog;
const AlertDialogTrigger = KobalteAlertDialog.Trigger;

type AlertDialogContentProps = {
  class?: string;
  children?: JSX.Element;
};

const AlertDialogOverlay: Component<{ class?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteAlertDialog.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-black/80 data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0",
        local.class
      )}
      {...others}
    />
  );
};

const AlertDialogContent: Component<AlertDialogContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteAlertDialog.Portal>
      <AlertDialogOverlay />
      <KobalteAlertDialog.Content
        class={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-closed:slide-out-to-left-1/2 data-closed:slide-out-to-top-[48%] data-expanded:slide-in-from-left-1/2 data-expanded:slide-in-from-top-[48%] sm:rounded-lg",
          local.class
        )}
        {...others}
      >
        {local.children}
      </KobalteAlertDialog.Content>
    </KobalteAlertDialog.Portal>
  );
};

const AlertDialogHeader: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col space-y-2 text-center sm:text-left", local.class)}
      {...others}
    />
  );
};

const AlertDialogFooter: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", local.class)}
      {...others}
    />
  );
};

const AlertDialogTitle: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteAlertDialog.Title
      class={cn("text-lg font-semibold", local.class)}
      {...others}
    />
  );
};

const AlertDialogDescription: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteAlertDialog.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...others}
    />
  );
};

const AlertDialogAction: Component<{ class?: string; children?: JSX.Element; onClick?: () => void }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteAlertDialog.CloseButton
      class={cn(buttonVariants(), local.class)}
      {...others}
    />
  );
};

const AlertDialogCancel: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteAlertDialog.CloseButton
      class={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", local.class)}
      {...others}
    />
  );
};

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
