"use client";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider as PreferredThemeProvider } from "next-themes";

import createEmotionCache from "../ThemeRegistry/EmotionCache";
import MUIThemeProvider from "./MUIThemeProvider";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function ThemeRegistry(props) {
  const { children, emotionCache = clientSideEmotionCache } = props;

  return (
    <PreferredThemeProvider>
      <CacheProvider value={emotionCache}>
        <MUIThemeProvider>{children}</MUIThemeProvider>
      </CacheProvider>
    </PreferredThemeProvider>
  );
}

module.exports = ThemeRegistry;
