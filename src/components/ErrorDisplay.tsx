import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorDisplayProps {
  errorMessage: string;
  onReset: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorMessage,
  onReset,
}) => {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center py-16">
      <Card className="w-full max-w-lg overflow-hidden rounded-none border-l-4 border-l-[var(--color-bg-accent)]">
        <CardContent className="p-8">
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2 font-code text-xs uppercase tracking-[0.08em] text-[var(--color-text-danger)]">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Package lookup failed</span>
            </div>
            <h2 className="mb-0 text-3xl leading-tight tracking-[-0.035em]">
              We could not load that package.
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">{errorMessage}</p>
            <Button onClick={onReset} variant="outline" className="mt-4">
              <RotateCcw className="h-4 w-4" />
              Search again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorDisplay;
