import { Slider as KobalteSlider } from "@kobalte/core/slider";
import { type Component, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type SliderProps = {
  class?: string;
  value?: number[];
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  label?: string;
  showValue?: boolean;
};

const Slider: Component<SliderProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "showValue", "orientation"]);
  return (
    <KobalteSlider
      class={cn(
        "relative flex touch-none select-none",
        local.orientation === "vertical"
          ? "h-full flex-col items-center w-5"
          : "w-full flex-col gap-1",
        local.class
      )}
      orientation={local.orientation ?? "horizontal"}
      {...others}
    >
      {(local.label || local.showValue) && (
        <div class="flex items-center justify-between">
          {local.label && (
            <KobalteSlider.Label class="text-sm font-medium leading-none">
              {local.label}
            </KobalteSlider.Label>
          )}
          {local.showValue && (
            <KobalteSlider.ValueLabel class="text-sm text-muted-foreground" />
          )}
        </div>
      )}
      <KobalteSlider.Track
        class={cn(
          "relative grow rounded-full bg-secondary",
          local.orientation === "vertical" ? "w-1.5 h-full" : "h-1.5 w-full"
        )}
      >
        <KobalteSlider.Fill class="absolute rounded-full bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full data-[orientation=vertical]:bottom-0" />
        <KobalteSlider.Thumb
          class="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 top-1/2 -translate-y-1/2 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:translate-y-0"
        >
          <KobalteSlider.Input />
        </KobalteSlider.Thumb>
      </KobalteSlider.Track>
    </KobalteSlider>
  );
};

export { Slider };
export type { SliderProps };
