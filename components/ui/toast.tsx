"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "success" | "error"
}

export function Toast({ title, description, variant = "default" }: ToastProps) {
  const bgColor = variant === "error" ? "bg-[#DC2626]" : variant === "success" ? "bg-green-600" : "bg-[#D2691E]"
  
  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2 rounded-lg border border-[#C8A05C] p-4 shadow-lg",
      bgColor,
      "text-white"
    )}>
      {title && <div className="font-semibold">{title}</div>}
      {description && <div className="text-sm opacity-90">{description}</div>}
    </div>
  )
}

