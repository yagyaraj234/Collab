"use client";

import { forwardRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  defaultValue?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      defaultValue,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className=" flex flex-col gap-2">
        <div>
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold my-2 text-neutral-700"
            >
              {label}
            </Label>
          )}
        </div>
        <div>
          <Input
            onBlur={onBlur}
            ref={ref}
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            name={id}
            disabled={pending || disabled}
            className={cn("text-sm px-2 py-1 h-7", className)}
            aria-describedby={`${id}-error`}
          />
          <FormErrors id={id} errors={errors} />
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
