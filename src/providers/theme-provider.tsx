import { useTheme } from "@/hooks/useTheme";
import React from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  void useTheme();
  return children;
}
