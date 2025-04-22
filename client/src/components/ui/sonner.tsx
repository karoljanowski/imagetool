"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "#1A1A28",
          "--normal-text": "text-white",
          "--normal-border": "#FFFFFF25",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
