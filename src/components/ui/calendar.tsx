import { type Component, createSignal, For } from "solid-js";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type CalendarProps = {
  class?: string;
  selected?: Date | Date[];
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  mode?: "single" | "multiple" | "range";
  defaultMonth?: Date;
  showOutsideDays?: boolean;
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const Calendar: Component<CalendarProps> = (props) => {
  const today = new Date();
  const [viewDate, setViewDate] = createSignal(props.defaultMonth ?? today);
  const [selected, setSelected] = createSignal<Date | null>(
    Array.isArray(props.selected) ? props.selected[0] ?? null : props.selected ?? null
  );

  const year = () => viewDate().getFullYear();
  const month = () => viewDate().getMonth();

  const prevMonth = () => setViewDate(new Date(year(), month() - 1, 1));
  const nextMonth = () => setViewDate(new Date(year(), month() + 1, 1));

  const daysInMonth = () => getDaysInMonth(year(), month());
  const firstDay = () => getFirstDayOfMonth(year(), month());
  const daysInPrevMonth = () => getDaysInMonth(year(), month() - 1);

  const isSelected = (date: Date) => {
    const s = selected();
    if (!s) return false;
    return (
      date.getDate() === s.getDate() &&
      date.getMonth() === s.getMonth() &&
      date.getFullYear() === s.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleSelect = (date: Date) => {
    setSelected(date);
    props.onSelect?.(date);
  };

  const cells = () => {
    const items: { date: Date; outside: boolean }[] = [];
    // Previous month days
    for (let i = firstDay() - 1; i >= 0; i--) {
      items.push({ date: new Date(year(), month() - 1, daysInPrevMonth() - i), outside: true });
    }
    // Current month days
    for (let d = 1; d <= daysInMonth(); d++) {
      items.push({ date: new Date(year(), month(), d), outside: false });
    }
    // Next month days to fill grid
    const remaining = 42 - items.length;
    for (let d = 1; d <= remaining; d++) {
      items.push({ date: new Date(year(), month() + 1, d), outside: true });
    }
    return items;
  };

  return (
    <div class={cn("p-3", props.class)}>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <button
            onClick={prevMonth}
            class={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100")}
            aria-label="Previous month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div class="text-sm font-medium">
            {MONTHS[month()]} {year()}
          </div>
          <button
            onClick={nextMonth}
            class={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100")}
            aria-label="Next month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-7 gap-y-1">
          <For each={DAYS}>
            {(day) => (
              <div class="text-center text-muted-foreground text-[0.8rem] font-normal">
                {day}
              </div>
            )}
          </For>
          <For each={cells()}>
            {(cell) => {
              const isDisabled = props.disabled?.(cell.date) ?? false;
              return (
                <button
                  onClick={() => !isDisabled && handleSelect(cell.date)}
                  disabled={isDisabled}
                  class={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-8 p-0 font-normal",
                    cell.outside && "text-muted-foreground opacity-50",
                    isSelected(cell.date) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    isToday(cell.date) && !isSelected(cell.date) && "bg-accent text-accent-foreground",
                    isDisabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  {cell.date.getDate()}
                </button>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
};

export { Calendar };
export type { CalendarProps };
