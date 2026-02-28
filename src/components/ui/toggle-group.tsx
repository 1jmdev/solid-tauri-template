import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";


type ToggleGroupProps = {
  class?: string;
  children?: JSX.Element;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  type?: "single" | "multiple";
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
};

const ToggleGroup: Component<ToggleGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size", "type", "value", "onChange"]);
  return (
    <div
      class={cn("flex items-center justify-center gap-1", local.class)}
      role="group"
      {...others}
    />
  );
};

type ToggleGroupItemProps = {
  class?: string;
  children?: JSX.Element;
  value: string;
  disabled?: boolean;
  pressed?: boolean;
  onClick?: () => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
};

const ToggleGroupItem: Component<ToggleGroupItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size", "pressed", "onClick"]);
  return (
    <button
      data-pressed={local.pressed}
      class={cn(
        toggleVariants({ variant: local.variant, size: local.size }),
        "data-pressed:bg-accent data-pressed:text-accent-foreground",
        local.class
      )}
      onClick={local.onClick}
      {...others}
    />
  );
};

export { ToggleGroup, ToggleGroupItem };
