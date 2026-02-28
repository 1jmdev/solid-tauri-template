import { Checkbox as KobalteCheckbox } from "@kobalte/core/checkbox";
import { type Component, splitProps, type JSX } from "solid-js";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  class?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
  children?: JSX.Element;
};

const Checkbox: Component<CheckboxProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteCheckbox
      class={cn("flex items-center gap-2", local.class)}
      {...others}
    >
      <KobalteCheckbox.Input />
      <KobalteCheckbox.Control
        class={cn(
          "peer size-4 shrink-0 rounded-sm border border-primary shadow-xs transition-shadow focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-checked:text-primary-foreground data-indeterminate:bg-primary data-indeterminate:text-primary-foreground"
        )}
      >
        <KobalteCheckbox.Indicator class="flex items-center justify-center text-current">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-3.5"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </KobalteCheckbox.Indicator>
      </KobalteCheckbox.Control>
      {local.children && (
        <KobalteCheckbox.Label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {local.children}
        </KobalteCheckbox.Label>
      )}
    </KobalteCheckbox>
  );
};

export { Checkbox };
export type { CheckboxProps };
