import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] border border-transparent text-sm font-semibold transition-[background-color,border-color,transform,color] hover:-translate-y-px disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-45",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] hover:bg-[var(--button-primary-bg-hover)]",
        destructive:
          "bg-[var(--color-text-danger)] text-white hover:opacity-90",
        outline:
          "border-[var(--button-border)] bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] hover:bg-[var(--color-bg-subtle)]",
        secondary:
          "bg-[var(--color-bg-subtle)] text-[var(--color-text-brand)] hover:bg-[var(--color-border-default)]",
        ghost:
          "bg-transparent text-[var(--color-text-brand)] hover:bg-[var(--color-bg-subtle)]",
        link: "text-[var(--color-text-brand)] underline-offset-4 hover:translate-y-0 hover:underline",
      },
      size: {
        default: "min-h-11 px-4 py-2.5",
        sm: "min-h-9 px-3 text-xs",
        lg: "min-h-12 px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
