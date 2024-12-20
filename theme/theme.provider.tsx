import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { useColorScheme } from "react-native";

import theme from "@/theme/theme";
import { isAOS } from "@/constants/constants";
import { useStoreActions, useStoreState } from "@/store";

export enum ThemeVariants {
  light = "light",
  dark = "dark",
  auto = "auto",
}

const darkTheme = {
  ...theme,
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {

  const themeVariant = useStoreState((state) => state.theme.theme);
  const setThemeVariant = useStoreActions((actions) => actions.theme.setTheme);

  const isDarkTheme = useColorScheme() === "dark";

  useEffect(() => {
    const updateStatusBar = () => {
      switch (themeVariant) {
        case ThemeVariants.auto:
          if (isDarkTheme) {
            StatusBar.setBarStyle("light-content");
            if (isAOS) StatusBar.setBackgroundColor("#000000");
          } else {
            StatusBar.setBarStyle("dark-content");
            if (isAOS) StatusBar.setBackgroundColor("#FFFFFF");
          }
          break;

        case ThemeVariants.dark:
          StatusBar.setBarStyle("light-content");
          if (isAOS) StatusBar.setBackgroundColor("#000000");
          break;

        case ThemeVariants.light:
          StatusBar.setBarStyle("dark-content");
          if (isAOS) StatusBar.setBackgroundColor("#FFFFFF");
          break;

        default:
          console.warn("Unknown theme variant. Resetting to light.");
          setThemeVariant(ThemeVariants.light);
          break;
      }
    };

    updateStatusBar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeVariant, isDarkTheme]);

  const selectedTheme =
    themeVariant === ThemeVariants.dark ||
    (themeVariant === ThemeVariants.auto && isDarkTheme)
      ? darkTheme
      : theme;
 return (
   <StyledThemeProvider theme={selectedTheme}>{children}</StyledThemeProvider>
  )
};
