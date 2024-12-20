import { Dimensions, Platform } from "react-native";

export const ACTIVE_OPACITY = 0.7;
export const isIOS = Platform.OS === "ios";
export const isAOS = Platform.OS === "android";

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const ALL_PLANS_TITLE = "All plans"