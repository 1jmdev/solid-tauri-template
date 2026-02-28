import { Combobox } from "@kobalte/core/combobox";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type CommandOption = {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
  icon?: JSX.Element;
};

type CommandProps = {
  class?: string;
  options: CommandOption[];
  placeholder?: string;
  emptyMessage?: string;
  onSelect?: (value: CommandOption) => void;
  defaultValue?: CommandOption;
  value?: CommandOption | null;
  onChange?: (value: CommandOption | null) => void;
};

const Command: Component<CommandProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "options", "placeholder", "emptyMessage", "onSelect"]);

  return (
    <Combobox<CommandOption>
      options={local.options}
      optionValue="value"
      optionTextValue="label"
      optionDisabled="disabled"
      optionGroupChildren="items"
      multiple={false}
      itemComponent={(itemProps) => (
        <Combobox.Item
          item={itemProps.item}
          class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50"
        >
          <Combobox.ItemLabel>{itemProps.item.rawValue.label}</Combobox.ItemLabel>
          <Combobox.ItemIndicator class="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </Combobox.ItemIndicator>
        </Combobox.Item>
      )}
      class={cn("flex flex-col", local.class)}
      {...others}
    >
      <div class="flex items-center border-b px-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4 shrink-0 opacity-50">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <Combobox.Input
          class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={local.placeholder ?? "Search..."}
        />
      </div>
      <Combobox.Portal>
        <Combobox.Content class="z-50 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95">
          <Combobox.Listbox class="max-h-64 overflow-y-auto p-1" />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox>
  );
};

const CommandInput: Component<{ class?: string; placeholder?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div class="flex items-center border-b px-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4 shrink-0 opacity-50">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        class={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          local.class
        )}
        {...others}
      />
    </div>
  );
};

const CommandList: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", local.class)}
      {...others}
    />
  );
};

const CommandEmpty: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <p class={cn("py-6 text-center text-sm", local.class)} {...others} />
  );
};

const CommandGroup: Component<{ class?: string; children?: JSX.Element; heading?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class", "heading"]);
  return (
    <div
      class={cn("overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground", local.class)}
      {...others}
    >
      {local.heading && (
        <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">{local.heading}</div>
      )}
      {props.children}
    </div>
  );
};

const CommandItem: Component<{
  class?: string;
  children?: JSX.Element;
  onSelect?: () => void;
  disabled?: boolean;
}> = (props) => {
  const [local, others] = splitProps(props, ["class", "onSelect"]);
  return (
    <div
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        local.class
      )}
      onClick={local.onSelect}
      {...others}
    />
  );
};

const CommandSeparator: Component<{ class?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={cn("-mx-1 h-px bg-border", local.class)} {...others} />;
};

const CommandShortcut: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      class={cn("ml-auto text-xs tracking-widest text-muted-foreground", local.class)}
      {...others}
    />
  );
};

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};
