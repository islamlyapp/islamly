import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/10 text-primary hover:bg-primary/15",
        secondary:
          "border-transparent bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
        destructive:
          "border-transparent bg-destructive/10 text-destructive-foreground hover:bg-destructive/20",
        outline:
          "border border-input bg-background hover:bg-slate-800/60 text-foreground",
        success:
          "border-transparent bg-green-500/10 text-green-500 hover:bg-green-500/15",
        warning:
          "border-transparent bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/15",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
