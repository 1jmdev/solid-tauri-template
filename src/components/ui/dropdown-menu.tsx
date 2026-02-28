import { DropdownMenu as KobalteDropdownMenu } from "@kobalte/core/dropdown-menu";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const DropdownMenu = KobalteDropdownMenu;
const DropdownMenuTrigger = KobalteDropdownMenu.Trigger;
const DropdownMenuGroup = KobalteDropdownMenu.Group;
const DropdownMenuSeparator = KobalteDropdownMenu.Separator;
const DropdownMenuSub = KobalteDropdownMenu.Sub;
const DropdownMenuSubTrigger = KobalteDropdownMenu.SubTrigger;

type DropdownMenuContentProps = {
  class?: string;
  children?: JSX.Element;
  sideOffset?: number;
};

const DropdownMenuContent: Component<DropdownMenuContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteDropdownMenu.Portal>
      <KobalteDropdownMenu.Content
        class={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95",
          local.class
        )}
        {...others}
      >
        {local.children}
      </KobalteDropdownMenu.Content>
    </KobalteDropdownMenu.Portal>
  );
};

type DropdownMenuItemProps = {
  class?: string;
  children?: JSX.Element;
  disabled?: boolean;
  onSelect?: () => void;
  inset?: boolean;
};

const DropdownMenuItem: Component<DropdownMenuItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "inset"]);
  return (
    <KobalteDropdownMenu.Item
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        local.inset && "pl-8",
        local.class
      )}
      {...others}
    />
  );
};

const DropdownMenuLabel: Component<{ class?: string; children?: JSX.Element; inset?: boolean }> = (props) => {
  const [local, others] = splitProps(props, ["class", "inset"]);
  return (
    <KobalteDropdownMenu.GroupLabel
      class={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...others}
    />
  );
};

type DropdownMenuCheckboxItemProps = {
  class?: string;
  children?: JSX.Element;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

const DropdownMenuCheckboxItem: Component<DropdownMenuCheckboxItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteDropdownMenu.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        local.class
      )}
      {...others}
    >
      <span class="absolute left-2 flex size-3.5 items-center justify-center">
        <KobalteDropdownMenu.ItemIndicator>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </KobalteDropdownMenu.ItemIndicator>
      </span>
      {local.children}
    </KobalteDropdownMenu.CheckboxItem>
  );
};

const DropdownMenuSubContent: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteDropdownMenu.Portal>
      <KobalteDropdownMenu.SubContent
        class={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95",
          local.class
        )}
        {...others}
      />
    </KobalteDropdownMenu.Portal>
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
