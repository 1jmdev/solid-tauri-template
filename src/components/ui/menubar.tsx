import { Menubar as KobalteMenubar } from "@kobalte/core/menubar";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const Menubar: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteMenubar
      class={cn(
        "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
        local.class
      )}
      {...others}
    />
  );
};

const MenubarMenu = KobalteMenubar.Menu;

const MenubarTrigger: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteMenubar.Trigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-expanded:bg-accent data-expanded:text-accent-foreground",
        local.class
      )}
      {...others}
    />
  );
};

const MenubarContent: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteMenubar.Portal>
      <KobalteMenubar.Content
        class={cn(
          "z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95",
          local.class
        )}
        {...others}
      />
    </KobalteMenubar.Portal>
  );
};

const MenubarItem: Component<{ class?: string; children?: JSX.Element; inset?: boolean; disabled?: boolean; onSelect?: () => void }> = (props) => {
  const [local, others] = splitProps(props, ["class", "inset"]);
  return (
    <KobalteMenubar.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        local.inset && "pl-8",
        local.class
      )}
      {...others}
    />
  );
};

const MenubarSeparator: Component<{ class?: string }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteMenubar.Separator
      class={cn("-mx-1 my-1 h-px bg-muted", local.class)}
      {...others}
    />
  );
};

const MenubarLabel: Component<{ class?: string; children?: JSX.Element; inset?: boolean }> = (props) => {
  const [local, others] = splitProps(props, ["class", "inset"]);
  return (
    <KobalteMenubar.GroupLabel
      class={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...others}
    />
  );
};

const MenubarGroup = KobalteMenubar.Group;
const MenubarSub = KobalteMenubar.Sub;
const MenubarSubTrigger = KobalteMenubar.SubTrigger;

const MenubarSubContent: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteMenubar.Portal>
      <KobalteMenubar.SubContent
        class={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-expanded:animate-in data-closed:animate-out data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95",
          local.class
        )}
        {...others}
      />
    </KobalteMenubar.Portal>
  );
};

const MenubarCheckboxItem: Component<{
  class?: string;
  children?: JSX.Element;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteMenubar.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        local.class
      )}
      {...others}
    >
      <span class="absolute left-2 flex size-3.5 items-center justify-center">
        <KobalteMenubar.ItemIndicator>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </KobalteMenubar.ItemIndicator>
      </span>
      {local.children}
    </KobalteMenubar.CheckboxItem>
  );
};

const MenubarShortcut: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      class={cn("ml-auto text-xs tracking-widest text-muted-foreground", local.class)}
      {...others}
    />
  );
};

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarGroup,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarShortcut,
};
