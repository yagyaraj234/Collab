"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "transparent";
}

export const FormSubmitButton = ({
  children,
  disabled,
  className,
  variant,
}: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      size={"sm"}
      className={cn(className)}
      variant={variant || "default"}
    >
      {children}
    </Button>
  );
};
