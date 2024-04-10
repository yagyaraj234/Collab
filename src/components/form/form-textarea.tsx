"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onclick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onKeyDown,
      defaultValue,
      onclick,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold  text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Textarea
            ref={ref}
            id={id}
            name={id}
            placeholder={placeholder}
            required={required}
            disabled={pending || disabled}
            className={cn(
              "resize-none focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            defaultValue={defaultValue}
            onClick={onclick}
          />
          <FormErrors id={id} errors={errors} />
        </div>
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
