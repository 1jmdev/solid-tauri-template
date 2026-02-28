import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type ResizablePanelGroupProps = {
  class?: string;
  children?: JSX.Element;
  direction?: "horizontal" | "vertical";
  onLayout?: (sizes: number[]) => void;
};

const ResizablePanelGroup: Component<ResizablePanelGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "direction"]);
  return (
    <div
      data-panel-group-direction={local.direction ?? "horizontal"}
      class={cn(
        "flex h-full w-full overflow-hidden",
        local.direction === "vertical" ? "flex-col" : "flex-row",
        local.class
      )}
      {...others}
    />
  );
};

type ResizablePanelProps = {
  class?: string;
  children?: JSX.Element;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
};

const ResizablePanel: Component<ResizablePanelProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "defaultSize", "minSize", "maxSize"]);
  return (
    <div
      class={cn("flex-1 overflow-auto", local.class)}
      style={{
        "flex-basis": local.defaultSize ? `${local.defaultSize}%` : undefined,
        "min-width": local.minSize ? `${local.minSize}%` : undefined,
        "max-width": local.maxSize ? `${local.maxSize}%` : undefined,
      }}
      {...others}
    />
  );
};

type ResizableHandleProps = {
  class?: string;
  withHandle?: boolean;
  direction?: "horizontal" | "vertical";
};

const ResizableHandle: Component<ResizableHandleProps> = (props) => {
  const [local] = splitProps(props, ["class", "withHandle", "direction"]);
  const isVertical = local.direction === "vertical";

  return (
    <div
      class={cn(
        "relative flex items-center justify-center bg-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        isVertical ? "h-px w-full cursor-row-resize" : "w-px h-full cursor-col-resize",
        local.class
      )}
      role="separator"
    >
      {local.withHandle && (
        <div class={cn(
          "z-10 flex items-center justify-center rounded-sm border bg-border",
          isVertical ? "h-4 w-8" : "h-8 w-4"
        )}>
          {isVertical ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-2.5">
              <path d="M5 12h14" /><path d="M5 6h14" /><path d="M5 18h14" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-2.5">
              <path d="M12 5v14" /><path d="M6 5v14" /><path d="M18 5v14" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
