import { type Component, type JSX, splitProps, createSignal } from "solid-js";
import { cn } from "@/lib/utils";

type CarouselProps = {
  class?: string;
  children?: JSX.Element;
  orientation?: "horizontal" | "vertical";
  defaultIndex?: number;
};

const Carousel: Component<CarouselProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"]);
  return (
    <div
      class={cn("relative", local.class)}
      role="region"
      aria-roledescription="carousel"
      {...others}
    />
  );
};

const CarouselContent: Component<{
  class?: string;
  children?: JSX.Element;
  currentIndex?: number;
}> = (props) => {
  const [local, others] = splitProps(props, ["class", "currentIndex", "children"]);
  return (
    <div class="overflow-hidden">
      <div
        class={cn("flex transition-transform duration-300 ease-in-out", local.class)}
        style={{ transform: `translateX(-${(local.currentIndex ?? 0) * 100}%)` }}
        {...others}
      >
        {local.children}
      </div>
    </div>
  );
};

const CarouselItem: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", local.class)}
      role="group"
      aria-roledescription="slide"
      {...others}
    />
  );
};

const CarouselPrevious: Component<{
  class?: string;
  onClick?: () => void;
}> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <button
      class={cn(
        "absolute left-[-48px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background shadow-sm inline-flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        local.class
      )}
      {...others}
      aria-label="Previous slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
};

const CarouselNext: Component<{
  class?: string;
  onClick?: () => void;
}> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <button
      class={cn(
        "absolute right-[-48px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background shadow-sm inline-flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        local.class
      )}
      {...others}
      aria-label="Next slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
};

export function useCarousel(count: number, defaultIndex = 0) {
  const [currentIndex, setCurrentIndex] = createSignal(defaultIndex);

  const next = () => setCurrentIndex((i) => Math.min(i + 1, count - 1));
  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goTo = (index: number) => setCurrentIndex(Math.max(0, Math.min(index, count - 1)));

  return { currentIndex, next, prev, goTo };
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
