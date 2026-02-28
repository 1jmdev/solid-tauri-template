import { Progress as KobalteProgress } from "@kobalte/core/progress";
import { type Component, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type ProgressProps = {
  class?: string;
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  getValueLabel?: (params: { value: number; max: number }) => string;
};

const Progress: Component<ProgressProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "showValue"]);
  return (
    <KobalteProgress
      class={cn("flex flex-col gap-1.5 w-full", local.class)}
      {...others}
    >
      {(local.label || local.showValue) && (
        <div class="flex justify-between items-center">
          {local.label && (
            <KobalteProgress.Label class="text-sm font-medium leading-none">
              {local.label}
            </KobalteProgress.Label>
          )}
          {local.showValue && (
            <KobalteProgress.ValueLabel class="text-sm text-muted-foreground" />
          )}
        </div>
      )}
      <KobalteProgress.Track class="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <KobalteProgress.Fill class="h-full bg-primary transition-all data-[progress=complete]:bg-primary" />
      </KobalteProgress.Track>
    </KobalteProgress>
  );
};

export { Progress };
export type { ProgressProps };
