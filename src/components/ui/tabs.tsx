import { Tabs as KobalteTabs } from "@kobalte/core/tabs";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type TabsProps = {
  class?: string;
  children?: JSX.Element;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};

const Tabs: Component<TabsProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteTabs
      class={cn("flex flex-col gap-2", local.class)}
      {...others}
    />
  );
};

type TabsListProps = {
  class?: string;
  children?: JSX.Element;
};

const TabsList: Component<TabsListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteTabs.List
      class={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        local.class
      )}
      {...others}
    />
  );
};

type TabsTriggerProps = {
  class?: string;
  value: string;
  children?: JSX.Element;
  disabled?: boolean;
};

const TabsTrigger: Component<TabsTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteTabs.Trigger
      class={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-selected:bg-background data-selected:text-foreground data-selected:shadow",
        local.class
      )}
      {...others}
    />
  );
};

type TabsContentProps = {
  class?: string;
  value: string;
  children?: JSX.Element;
};

const TabsContent: Component<TabsContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteTabs.Content
      class={cn(
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        local.class
      )}
      {...others}
    />
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
