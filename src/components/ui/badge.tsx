import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-2.5 py-1 font-code text-[0.7rem] font-semibold transition-colors before:h-1.5 before:w-1.5 before:rounded-full before:bg-current before:content-[''] focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-bg-brand)] text-[var(--color-text-inverse)]",
        secondary:
          "border-transparent bg-[var(--color-bg-subtle)] text-[var(--color-text-brand)]",
        destructive:
          "border-transparent bg-[var(--color-bg-danger)] text-[var(--color-text-danger)]",
        outline:
          "border-[var(--color-border-default)] bg-transparent text-[var(--color-text-secondary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
