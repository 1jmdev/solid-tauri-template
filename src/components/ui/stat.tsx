import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type StatProps = {
  class?: string;
  label?: string;
  value?: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: JSX.Element;
};

const Stat: Component<StatProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "value", "description", "trend", "trendValue", "icon"]);
  return (
    <div
      class={cn(
        "rounded-xl border bg-card text-card-foreground shadow p-6",
        local.class
      )}
      {...others}
    >
      <div class="flex flex-row items-center justify-between space-y-0 pb-2">
        {local.label && (
          <p class="text-sm font-medium text-muted-foreground">{local.label}</p>
        )}
        {local.icon && (
          <div class="text-muted-foreground">{local.icon}</div>
        )}
      </div>
      {local.value !== undefined && (
        <div class="text-2xl font-bold">{local.value}</div>
      )}
      {(local.description || local.trend) && (
        <p class="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {local.trend && (
            <span class={cn(
              "inline-flex items-center",
              local.trend === "up" && "text-green-600 dark:text-green-400",
              local.trend === "down" && "text-red-600 dark:text-red-400"
            )}>
              {local.trend === "up" && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3">
                  <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
                </svg>
              )}
              {local.trend === "down" && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3">
                  <path d="m19 12-7 7-7-7" /><path d="M12 5v14" />
                </svg>
              )}
              {local.trendValue}
            </span>
          )}
          {local.description}
        </p>
      )}
    </div>
  );
};

export { Stat };
export type { StatProps };
