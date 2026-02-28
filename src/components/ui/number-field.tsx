import { NumberField as KobalteNumberField } from "@kobalte/core/number-field";
import { type Component, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type NumberFieldProps = {
  class?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  formatOptions?: Intl.NumberFormatOptions;
};

const NumberField: Component<NumberFieldProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "placeholder"]);
  return (
    <KobalteNumberField
      class={cn("flex flex-col gap-1.5", local.class)}
      {...others}
    >
      {local.label && (
        <KobalteNumberField.Label class="text-sm font-medium leading-none">
          {local.label}
        </KobalteNumberField.Label>
      )}
      <div class="flex items-center">
        <KobalteNumberField.DecrementTrigger
          class="inline-flex items-center justify-center rounded-l-md border border-input bg-transparent h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50 border-r-0"
          aria-label="Decrease"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
            <path d="M5 12h14" />
          </svg>
        </KobalteNumberField.DecrementTrigger>
        <KobalteNumberField.Input
          class="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-base shadow-xs text-center transition-all outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder={local.placeholder}
        />
        <KobalteNumberField.IncrementTrigger
          class="inline-flex items-center justify-center rounded-r-md border border-input bg-transparent h-9 w-9 hover:bg-accent hover:text-accent-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50 border-l-0"
          aria-label="Increase"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
            <path d="M5 12h14" /><path d="M12 5v14" />
          </svg>
        </KobalteNumberField.IncrementTrigger>
      </div>
      <KobalteNumberField.ErrorMessage class="text-sm font-medium text-destructive" />
    </KobalteNumberField>
  );
};

export { NumberField };
