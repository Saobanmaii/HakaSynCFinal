import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#25262B] text-white hover:bg-[#25262B]/90",
        primary: "bg-[#FFD034] text-[#25262B] hover:bg-[#FFD034]/90",
        coral: "bg-[#FF6B6B] text-white hover:bg-[#FF6B6B]/90",
        outline: "border border-[#25262B] bg-transparent text-[#25262B] hover:bg-[#25262B] hover:text-white",
        ghost: "hover:bg-[#F4F0EB] text-[#25262B]",
        link: "text-[#FF6B6B] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2 rounded-[99px]",
        sm: "h-8 px-4 text-xs rounded-[99px]",
        lg: "h-12 px-8 rounded-[99px]",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
