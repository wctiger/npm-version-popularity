import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IconButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "children" | "size"> {
  label: string;
  children: React.ReactNode;
  tooltipAlign?: "center" | "start";
  tooltipClassName?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      label,
      children,
      className,
      tooltipAlign = "center",
      tooltipClassName,
      ...props
    },
    ref
  ) => {
    const tooltipId = React.useId();

    return (
      <span className="group relative inline-flex">
        <Button
          ref={ref}
          size="icon"
          className={cn("rounded-full", className)}
          aria-label={label}
          aria-describedby={tooltipId}
          {...props}
        >
          {children}
        </Button>
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            "pointer-events-none absolute top-full z-50 mt-2 whitespace-nowrap rounded-[var(--radius-subtle)] border border-[var(--color-border-default)] bg-[var(--color-bg-inverse)] px-2.5 py-1.5 font-code text-[0.68rem] text-[var(--color-text-inverse)] opacity-0 shadow-[var(--shadow-raised)] transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
            tooltipAlign === "start"
              ? "left-0 translate-x-0 sm:left-1/2 sm:-translate-x-1/2"
              : "left-1/2 -translate-x-1/2",
            tooltipClassName
          )}
        >
          {label}
        </span>
      </span>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton };
