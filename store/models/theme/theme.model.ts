import { ThemeVariants } from "@/constants/enums";
import { Action, action } from "easy-peasy";


export interface ThemeModel {
  theme: ThemeVariants;
  setTheme: Action<this, this["theme"]>;
}

export const themeModel: ThemeModel = {
  theme: ThemeVariants.light,
  setTheme: action((state, payload) => {
    state.theme = payload;
  }),
};
