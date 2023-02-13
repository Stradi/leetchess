import { cn } from "@/utils/tw";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {}
export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-3xl bg-neutral-100 border-neutral-200 border-2",
        "[&>*]:px-4 [&>*]:py-4 divide-y-2 divide-neutral-200",
        className
      )}
    >
      {children}
    </div>
  );
}
