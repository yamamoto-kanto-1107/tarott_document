import type { ThemeDefinition } from "vuetify";

// テーマ名
export const MAIN_THEME = "mainTheme";
// Light mode theme
export const mainTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#ff6900",
    secondary: "#333333",
    error: "#ff2222",
    info: "#22c55e",
    success: "#3b82f6",
    warning: "#f59e0b",
  },
  variables: {
    
  }
};

// Dark モードのテーマ名
export const MAIN_DARK_THEME = "mainDarkTheme";
// Dark mode theme
export const mainDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#0C111B",
    surface: "#1f2937",
    primary: "#6366f1",
    secondary: "#9333ea",
    error: "#ef4444",
    info: "#3b82f6",
    success: "#22c55e",
    warning: "#f59e0b",
  },
};
