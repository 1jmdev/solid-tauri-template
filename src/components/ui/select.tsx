import { Select as KobalteSelect } from "@kobalte/core/select";
import { type Component, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  class?: string;
  options: SelectOption[];
  value?: SelectOption | null;
  defaultValue?: SelectOption;
  onChange?: (value: SelectOption | null) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  label?: string;
};

const Select: Component<SelectProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "options", "placeholder", "label"]);
  return (
    <KobalteSelect<SelectOption>
      options={local.options}
      optionValue="value"
      optionTextValue="label"
      optionDisabled="disabled"
      multiple={false}
      placeholder={local.placeholder ?? "Select an option..."}
      itemComponent={(itemProps) => (
        <KobalteSelect.Item
          item={itemProps.item}
          class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
        >
          <KobalteSelect.ItemIndicator class="absolute left-2 flex size-3.5 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </KobalteSelect.ItemIndicator>
          <KobalteSelect.ItemLabel>{itemProps.item.rawValue.label}</KobalteSelect.ItemLabel>
        </KobalteSelect.Item>
      )}
      class={cn("flex flex-col gap-1.5", local.class)}
      {...others}
    >
      {local.label && (
        <KobalteSelect.Label class="text-sm font-medium leading-none">
          {local.label}
        </KobalteSelect.Label>
      )}
      <KobalteSelect.Trigger class="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-[3px] focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
        <KobalteSelect.Value<SelectOption>>
          {(state) => state.selectedOption().label}
        </KobalteSelect.Value>
        <KobalteSelect.Icon class="ml-auto shrink-0 opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        </KobalteSelect.Icon>
      </KobalteSelect.Trigger>
      <KobalteSelect.Portal>
        <KobalteSelect.Content class="relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95">
          <KobalteSelect.Listbox class="p-1" />
        </KobalteSelect.Content>
      </KobalteSelect.Portal>
    </KobalteSelect>
  );
};

export { Select };
export type { SelectProps, SelectOption };
