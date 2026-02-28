import { type Component, type ComponentProps, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const Timeline: Component<ComponentProps<"ol">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ol class={cn("relative border-l border-border", local.class)} {...others} />
  );
};

type TimelineItemProps = {
  class?: string;
  children?: JSX.Element;
  date?: string;
  title?: string;
  description?: string;
  icon?: JSX.Element;
};

const TimelineItem: Component<TimelineItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children", "date", "title", "description", "icon"]);
  return (
    <li class={cn("mb-10 ml-6", local.class)} {...others}>
      <span class="absolute -left-3 flex size-6 items-center justify-center rounded-full bg-primary ring-8 ring-background">
        {local.icon ?? (
          <svg class="size-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
        )}
      </span>
      {local.date && (
        <time class="mb-1 text-sm font-normal leading-none text-muted-foreground">{local.date}</time>
      )}
      {local.title && (
        <h3 class="text-base font-semibold text-foreground">{local.title}</h3>
      )}
      {local.description && (
        <p class="mb-4 text-sm font-normal text-muted-foreground">{local.description}</p>
      )}
      {local.children}
    </li>
  );
};

export { Timeline, TimelineItem };
