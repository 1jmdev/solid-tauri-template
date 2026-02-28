import { type Component, type ComponentProps, splitProps, createSignal } from "solid-js";
import { cn } from "@/lib/utils";

type AvatarProps = ComponentProps<"span"> & {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "default" | "lg" | "xl";
};

const sizeMap = {
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

const Avatar: Component<AvatarProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "src", "alt", "fallback", "size"]);
  const [imgError, setImgError] = createSignal(false);

  return (
    <span
      class={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        sizeMap[local.size ?? "default"],
        local.class
      )}
      {...others}
    >
      {local.src && !imgError() ? (
        <img
          class="aspect-square h-full w-full object-cover"
          src={local.src}
          alt={local.alt ?? ""}
          onError={() => setImgError(true)}
        />
      ) : (
        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground uppercase">
          {local.fallback ?? local.alt?.slice(0, 2) ?? "??"}
        </span>
      )}
    </span>
  );
};

const AvatarImage: Component<ComponentProps<"img">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <img
      class={cn("aspect-square h-full w-full object-cover", local.class)}
      {...others}
    />
  );
};

const AvatarFallback: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      class={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium",
        local.class
      )}
      {...others}
    />
  );
};

export { Avatar, AvatarImage, AvatarFallback };
