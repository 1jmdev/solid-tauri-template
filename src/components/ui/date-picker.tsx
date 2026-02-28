import { type Component, createSignal } from "solid-js";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

type DatePickerProps = {
  class?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  disabledDates?: (date: Date) => boolean;
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

const DatePicker: Component<DatePickerProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const [selected, setSelected] = createSignal<Date | undefined>(props.value);

  const handleSelect = (date: Date) => {
    setSelected(date);
    props.onChange?.(date);
    setOpen(false);
  };

  return (
    <Popover open={open()} onOpenChange={setOpen}>
      <PopoverTrigger
        as={Button}
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-left font-normal",
          !selected() && "text-muted-foreground",
          props.class
        )}
        disabled={props.disabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 size-4">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        {selected() ? formatDate(selected()!) : <span>{props.placeholder ?? "Pick a date"}</span>}
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected()}
          onSelect={handleSelect}
          disabled={props.disabledDates}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
