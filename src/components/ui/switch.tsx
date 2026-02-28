import { Switch as KobalteSwitch } from "@kobalte/core/switch";
import { type Component, splitProps, type JSX } from "solid-js";
import { cn } from "@/lib/utils";

type SwitchProps = {
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

const Switch: Component<SwitchProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteSwitch
      class={cn("flex items-center gap-2", local.class)}
      {...others}
    >
      <KobalteSwitch.Input />
      <KobalteSwitch.Control
        class={cn(
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-input"
        )}
      >
        <KobalteSwitch.Thumb
          class={cn(
            "pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-checked:translate-x-4 data-unchecked:translate-x-0"
          )}
        />
      </KobalteSwitch.Control>
      {local.children && (
        <KobalteSwitch.Label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {local.children}
        </KobalteSwitch.Label>
      )}
    </KobalteSwitch>
  );
};

export { Switch };
export type { SwitchProps };
