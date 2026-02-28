import { type Component, type ComponentProps, createSignal, splitProps, For, createEffect } from "solid-js";
import { cn } from "@/lib/utils";

type InputOTPProps = {
  class?: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  pattern?: RegExp;
  disabled?: boolean;
};

const InputOTP: Component<InputOTPProps> = (props) => {
  const [local] = splitProps(props, ["class", "length", "value", "onChange", "pattern", "disabled"]);
  const length = local.length ?? 6;
  const [values, setValues] = createSignal<string[]>(Array(length).fill(""));

  createEffect(() => {
    if (local.value) {
      const chars = local.value.split("").slice(0, length);
      setValues([...chars, ...Array(length - chars.length).fill("")]);
    }
  });

  const handleChange = (index: number, val: string) => {
    const pattern = local.pattern ?? /^\d*$/;
    if (!pattern.test(val)) return;

    const newValues = [...values()];
    newValues[index] = val.slice(-1);
    setValues(newValues);
    local.onChange?.(newValues.join(""));

    if (val && index < length - 1) {
      const nextInput = document.querySelector<HTMLInputElement>(`[data-otp-index="${index + 1}"]`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === "Backspace" && !values()[index] && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(`[data-otp-index="${index - 1}"]`);
      prevInput?.focus();
    }
  };

  return (
    <div class={cn("flex items-center gap-2", local.class)}>
      <For each={Array.from({ length })}>
        {(_, i) => (
          <input
            data-otp-index={i()}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={values()[i()]}
            onInput={(e) => handleChange(i(), e.currentTarget.value)}
            onKeyDown={(e) => handleKeyDown(i(), e)}
            disabled={local.disabled}
            class="relative flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent text-center text-sm shadow-xs transition-all outline-none focus:ring-[3px] focus:ring-ring/50 focus:border-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        )}
      </For>
    </div>
  );
};

const InputOTPGroup: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={cn("flex items-center", local.class)} {...others} />;
};

const InputOTPSlot: Component<ComponentProps<"div"> & { index: number; char?: string; hasFakeCaret?: boolean; isActive?: boolean }> = (props) => {
  const [local, others] = splitProps(props, ["class", "index", "char", "hasFakeCaret", "isActive"]);
  return (
    <div
      class={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        local.isActive && "z-10 ring-[3px] ring-ring/50 border-ring",
        local.class
      )}
      {...others}
    >
      {local.char}
      {local.hasFakeCaret && (
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
};

const InputOTPSeparator: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div role="separator" class={cn(local.class)} {...others}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <path d="M5 12h14" />
      </svg>
    </div>
  );
};

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
