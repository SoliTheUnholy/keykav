import * as React from "react";

import { cn } from "@/lib/utils";
import { Card } from "./card";

export function GradientCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card
      className={cn(
        "bg-card text-card-foreground flex w-[90vw] max-w-xl flex-col gap-2 rounded-xl border from-[#080808] to-[#101010] p-6 shadow-sm dark:bg-gradient-to-tr",
        className,
      )}
      {...props}
    />
  );
}
