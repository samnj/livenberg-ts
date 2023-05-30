"use client"

import { CheckCircle2, Megaphone, XCircle } from "lucide-react"
import { Toaster, resolveValue, toast } from "react-hot-toast"

const toastTypeStyles = {
  success: "border-success",
  error: "border-destructive",
  default: "border-blue-400",
}

const toastTypeIcons = {
  success: <CheckCircle2 className="h-5 w-5 text-success" />,
  error: <XCircle className="h-5 w-5 text-destructive" />,
  default: <Megaphone className="h-5 w-5 text-blue-400" />,
}

function TailwindToaster() {
  return (
    <Toaster position="top-center" toastOptions={{ duration: 20000 }}>
      {(t) => {
        const typeStyle =
          toastTypeStyles[t.type as keyof typeof toastTypeStyles] ||
          toastTypeStyles.default
        const typeIcon =
          toastTypeIcons[t.type as keyof typeof toastTypeIcons] ||
          toastTypeIcons.default
        return (
          <div
            className={`flex cursor-pointer items-center gap-4 rounded-md border bg-background px-6 py-4 text-sm ${typeStyle}`}
            onClick={() => toast.remove()}
          >
            {typeIcon}
            <p>{resolveValue(t.message, t)}</p>
          </div>
        )
      }}
    </Toaster>
  )
}

export default TailwindToaster
