import { useTheme } from "@/hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex">
      <button
        className={`px-3 py-1  ${
          theme === "light"
            ? "bg-slate-900 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-stone-900 dark:text-stone-100"
        }`}
        onClick={() => toggleTheme("light")}
      >
        Light
      </button>
      <button
        className={`px-3 py-1  ${
          theme === "dark"
            ? "bg-slate-900 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-stone-900 dark:text-stone-100"
        }`}
        onClick={() => toggleTheme("dark")}
      >
        Dark
      </button>
      <button
        className={`px-3 py-1  ${
          theme === "system"
            ? "bg-slate-900 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-stone-900 dark:text-stone-100"
        }`}
        onClick={() => toggleTheme("system")}
      >
        System
      </button>
    </div>
  );
}
