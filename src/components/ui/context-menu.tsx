import { ContextMenu as KobalteContextMenu } from "@kobalte/core/context-menu";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const ContextMenu = KobalteContextMenu;
const ContextMenuTrigger = KobalteContextMenu.Trigger;
const ContextMenuGroup = KobalteContextMenu.Group;
const ContextMenuSeparator = KobalteContextMenu.Separator;
const ContextMenuSub = KobalteContextMenu.Sub;
const ContextMenuSubTrigger = KobalteContextMenu.SubTrigger;

type ContextMenuContentProps = {
  class?: string;
  children?: JSX.Element;
};

const ContextMenuContent: Component<ContextMenuContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteContextMenu.Portal>
      <KobalteContextMenu.Content
        class={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95",
          local.class
        )}
        {...others}
      >
        {local.children}
      </KobalteContextMenu.Content>
    </KobalteContextMenu.Portal>
  );
};

type ContextMenuItemProps = {
  class?: string;
  children?: JSX.Element;
  disabled?: boolean;
  onSelect?: () => void;
  inset?: boolean;
};

const ContextMenuItem: Component<ContextMenuItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "inset"]);
  return (
    <KobalteContextMenu.Item
      class={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        local.inset && "pl-8",
        local.class
      )}
      {...others}
    />
  );
};

const ContextMenuLabel: Component<{ class?: string; children?: JSX.Element; inset?: boolean }> = (props) => {
  const [local, others] = splitProps(props, ["class", "inset"]);
  return (
    <KobalteContextMenu.GroupLabel
      class={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...others}
    />
  );
};

const ContextMenuCheckboxItem: Component<{
  class?: string;
  children?: JSX.Element;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteContextMenu.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        local.class
      )}
      {...others}
    >
      <span class="absolute left-2 flex size-3.5 items-center justify-center">
        <KobalteContextMenu.ItemIndicator>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </KobalteContextMenu.ItemIndicator>
      </span>
      {local.children}
    </KobalteContextMenu.CheckboxItem>
  );
};

const ContextMenuSubContent: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteContextMenu.Portal>
      <KobalteContextMenu.SubContent
        class={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95",
          local.class
        )}
        {...others}
      />
    </KobalteContextMenu.Portal>
  );
};

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuCheckboxItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};
