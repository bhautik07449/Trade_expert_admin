import { useToast } from "../ui/use-toast";

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map(({ id, title, description, variant, open }) =>
        open ? (
          <div
            key={id}
            className={`rounded-lg px-4 py-3 shadow-lg text-white
              ${variant === "success" ? "bg-green-600" : ""}
              ${variant === "error" ? "bg-red-600" : ""}
              ${variant === "default" ? "bg-gray-800" : ""}
            `}
          >
            <p className="font-semibold">{title}</p>
            {description && (
              <p className="text-sm opacity-90">{description}</p>
            )}
          </div>
        ) : null
      )}
    </div>
  )
}
