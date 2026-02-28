import { Accordion as KobalteAccordion } from "@kobalte/core/accordion";
import { type Component, type JSX, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

type AccordionProps = {
  class?: string;
  children?: JSX.Element;
  collapsible?: boolean;
  multiple?: boolean;
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const Accordion: Component<AccordionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteAccordion
      class={cn("w-full", local.class)}
      {...others}
    />
  );
};

type AccordionItemProps = {
  class?: string;
  value: string;
  children?: JSX.Element;
  disabled?: boolean;
};

const AccordionItem: Component<AccordionItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <KobalteAccordion.Item
      class={cn("border-b", local.class)}
      {...others}
    />
  );
};

type AccordionTriggerProps = {
  class?: string;
  children?: JSX.Element;
};

const AccordionTrigger: Component<AccordionTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteAccordion.Header class="flex">
      <KobalteAccordion.Trigger
        class={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-expanded]>svg]:rotate-180",
          local.class
        )}
        {...others}
      >
        {local.children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4 shrink-0 text-muted-foreground transition-transform duration-200"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </KobalteAccordion.Trigger>
    </KobalteAccordion.Header>
  );
};

type AccordionContentProps = {
  class?: string;
  children?: JSX.Element;
};

const AccordionContent: Component<AccordionContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <KobalteAccordion.Content
      class={cn(
        "overflow-hidden text-sm data-expanded:animate-accordion-down data-closed:animate-accordion-up",
        local.class
      )}
      {...others}
    >
      <div class="pb-4 pt-0">{local.children}</div>
    </KobalteAccordion.Content>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
