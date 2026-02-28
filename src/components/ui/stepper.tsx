import { type Component, For, createSignal } from "solid-js";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description?: string;
};

type StepperProps = {
  class?: string;
  steps: Step[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
};

const Stepper: Component<StepperProps> = (props) => {
  const [activeStep, setActiveStep] = createSignal(props.currentStep ?? 0);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    props.onStepChange?.(index);
  };

  const currentStep = () => props.currentStep ?? activeStep();

  return (
    <div
      class={cn(
        "flex",
        props.orientation === "vertical" ? "flex-col gap-2" : "items-center",
        props.class
      )}
    >
      <For each={props.steps}>
        {(step, i) => (
          <div
            class={cn(
              "flex",
              props.orientation === "vertical" ? "items-start gap-4" : "items-center"
            )}
          >
            <div class="flex flex-col items-center">
              <button
                class={cn(
                  "flex size-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                  i() < currentStep() && "border-primary bg-primary text-primary-foreground",
                  i() === currentStep() && "border-primary text-primary",
                  i() > currentStep() && "border-muted-foreground/30 text-muted-foreground/60"
                )}
                onClick={() => handleStepClick(i())}
              >
                {i() < currentStep() ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  i() + 1
                )}
              </button>
              {props.orientation !== "vertical" && i() < props.steps.length - 1 && (
                <div
                  class={cn(
                    "absolute h-0.5 w-full top-1/2 left-1/2",
                    i() < currentStep() ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
            <div class={cn(props.orientation === "vertical" ? "pb-4" : "ml-2")}>
              <p class={cn(
                "text-sm font-medium",
                i() === currentStep() ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.title}
              </p>
              {step.description && (
                <p class="text-xs text-muted-foreground">{step.description}</p>
              )}
            </div>
            {props.orientation === "vertical" && i() < props.steps.length - 1 && (
              <div class={cn("w-0.5 h-8 ml-5 mt-1", i() < currentStep() ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        )}
      </For>
    </div>
  );
};

export { Stepper };
export type { StepperProps, Step };
