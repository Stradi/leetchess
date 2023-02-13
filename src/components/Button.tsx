import { cn } from "@/utils/tw";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
  disabled?: boolean;
}
export default function Button({
  variant = "primary",
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-3xl px-4 py-2 ring-1 outline-none",
        "text-sm font-medium select-none",
        !disabled && "transition duration-100",
        !disabled && "hover:ring-2",
        !disabled && "active:scale-[0.97]",
        !disabled && "focus:ring-2",
        disabled && "opacity-50 cursor-not-allowed",

        variant === "primary" && "ring-neutral-900 bg-neutral-900 text-white",
        variant === "secondary" &&
          "bg-neutral-100 ring-neutral-900 text-neutral-900",
        className
      )}
    >
      {children}
    </button>
  );
}
