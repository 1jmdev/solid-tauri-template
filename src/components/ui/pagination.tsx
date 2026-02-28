import { type Component, type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Pagination: Component<ComponentProps<"nav">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      class={cn("mx-auto flex w-full justify-center", local.class)}
      {...others}
    />
  );
};

const PaginationContent: Component<ComponentProps<"ul">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ul class={cn("flex flex-row items-center gap-1", local.class)} {...others} />
  );
};

const PaginationItem: Component<ComponentProps<"li">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <li class={cn(local.class)} {...others} />;
};

type PaginationLinkProps = ComponentProps<"a"> & {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
};

const PaginationLink: Component<PaginationLinkProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "isActive", "size"]);
  return (
    <a
      aria-current={local.isActive ? "page" : undefined}
      class={cn(
        buttonVariants({
          variant: local.isActive ? "outline" : "ghost",
          size: local.size ?? "icon",
        }),
        local.class
      )}
      {...others}
    />
  );
};

const PaginationPrevious: Component<ComponentProps<"a">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <PaginationLink aria-label="Go to previous page" size="default" class={cn("gap-1 pl-2.5", local.class)} {...others}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span>Previous</span>
    </PaginationLink>
  );
};

const PaginationNext: Component<ComponentProps<"a">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <PaginationLink aria-label="Go to next page" size="default" class={cn("gap-1 pr-2.5", local.class)} {...others}>
      <span>Next</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </PaginationLink>
  );
};

const PaginationEllipsis: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      aria-hidden
      class={cn("flex size-9 items-center justify-center", local.class)}
      {...others}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
      <span class="sr-only">More pages</span>
    </span>
  );
};

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis };
