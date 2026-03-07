"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "../../lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-4 right-4 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const toastVariants = cva(
  "group relative flex items-start gap-3 w-full overflow-hidden rounded-xl border backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 shadow-xl p-4 pr-8 transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "border-neutral-200 text-neutral-900",
        success: "border-green-200 bg-green-50 text-green-900",
        error: "border-red-200 bg-red-50 text-red-900",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap = {
  success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  error: <AlertCircle className="h-5 w-5 text-red-600" />,
  warning: <AlertCircle className="h-5 w-5 text-yellow-600" />,
  default: <Info className="h-5 w-5 text-blue-600" />,
};

const Toast = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(
          toastVariants({ variant }),
          "data-[state=open]:animate-toast-in data-[state=closed]:animate-toast-out",
          className
        )}
        {...props}
      >
        <div className="flex gap-3">
          {iconMap[variant]}
          <div className="flex flex-col">{children}</div>
        </div>
      </ToastPrimitives.Root>
    );
  }
);
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-80", className)}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-neutral-500 hover:text-neutral-900 transition",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = "ToastClose";

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};