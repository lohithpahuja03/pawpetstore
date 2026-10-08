"use client";

import { useSyncExternalStore, useCallback } from "react";

export type Theme = "light" | "dark";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  const storedTheme = localStorage.getItem("pawpetstore-theme") as Theme | null;
  if (storedTheme) return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    media.removeEventListener("change", callback);
  };
}

function applyThemeClass(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (t === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

  // Synchronize DOM class with current theme
  if (typeof window !== "undefined") {
    applyThemeClass(theme);
  }

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    localStorage.setItem("pawpetstore-theme", next);
    applyThemeClass(next);
    window.dispatchEvent(new Event("storage"));
  }, [theme]);

  return { theme, toggleTheme, mounted: true };
}

export default useTheme;
