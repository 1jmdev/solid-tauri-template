import { RadioGroup as KobalteRadioGroup } from "@kobalte/core/radio-group";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type RadioGroupProps = {
  class?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  orientation?: "horizontal" | "vertical";
  children?: JSX.Element;
  label?: string;
};

const RadioGroup: Component<RadioGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children", "label", "orientation"]);
  return (
    <KobalteRadioGroup
      class={cn(
        "grid gap-2",
        local.orientation === "horizontal" ? "grid-flow-col" : "",
        local.class
      )}
      orientation={local.orientation ?? "vertical"}
      {...others}
    >
      {local.label && (
        <KobalteRadioGroup.Label class="text-sm font-medium leading-none">
          {local.label}
        </KobalteRadioGroup.Label>
      )}
      {local.children}
    </KobalteRadioGroup>
  );
};

type RadioGroupItemProps = {
  class?: string;
  value: string;
  children?: JSX.Element;
  disabled?: boolean;
};

const RadioGroupItem: Component<RadioGroupItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteRadioGroup.Item
      class={cn("flex items-center gap-2", local.class)}
      {...others}
    >
      <KobalteRadioGroup.ItemInput />
      <KobalteRadioGroup.ItemControl
        class={cn(
          "aspect-square size-4 rounded-full border border-primary text-primary shadow-xs focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-primary"
        )}
      >
        <KobalteRadioGroup.ItemIndicator class="flex items-center justify-center">
          <div class="size-2 rounded-full bg-primary fill-primary" />
        </KobalteRadioGroup.ItemIndicator>
      </KobalteRadioGroup.ItemControl>
      {local.children && (
        <KobalteRadioGroup.ItemLabel class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {local.children}
        </KobalteRadioGroup.ItemLabel>
      )}
    </KobalteRadioGroup.Item>
  );
};

export { RadioGroup, RadioGroupItem };
