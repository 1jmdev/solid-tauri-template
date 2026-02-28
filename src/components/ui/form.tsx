import { type Component, type ComponentProps, type JSX, splitProps, createContext, useContext } from "solid-js";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type FormFieldContextValue = {
  name: string;
  error?: string;
};

const FormFieldContext = createContext<FormFieldContextValue>({ name: "" });

const useFormField = () => {
  return useContext(FormFieldContext);
};

type FormProps = ComponentProps<"form">;

const Form: Component<FormProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <form class={cn("space-y-6", local.class)} {...others} />;
};

type FormFieldProps = {
  name: string;
  error?: string;
  children?: JSX.Element;
};

const FormField: Component<FormFieldProps> = (props) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name, error: props.error }}>
      {props.children}
    </FormFieldContext.Provider>
  );
};

const FormItem: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div class={cn("grid gap-2", local.class)} {...others} />
  );
};

const FormLabel: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const field = useFormField();
  return (
    <Label
      class={cn(field.error && "text-destructive", local.class)}
      {...others}
    />
  );
};

const FormControl: Component<{ children?: JSX.Element }> = (props) => {
  const field = useFormField();
  return (
    <div aria-invalid={!!field.error} aria-describedby={field.error ? `${field.name}-error` : undefined}>
      {props.children}
    </div>
  );
};

const FormDescription: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <p class={cn("text-sm text-muted-foreground", local.class)} {...others} />
  );
};

const FormMessage: Component<{ class?: string; children?: JSX.Element }> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const field = useFormField();
  const body = field.error ?? local.children;

  if (!body) return null;

  return (
    <p
      class={cn("text-sm font-medium text-destructive", local.class)}
      id={`${field.name}-error`}
      {...others}
    >
      {body}
    </p>
  );
};

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField };
