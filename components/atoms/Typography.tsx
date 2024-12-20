import { ACTIVE_OPACITY } from "@/constants/constants";
import React from "react";
import type { TextProps } from "react-native";
import { Linking } from "react-native";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import type theme from "@/theme/theme";

type TypographyProps = {
  url?: string;
  fz?: keyof typeof theme.fontSizes;
  font?: keyof typeof theme.fontFamilies;
  color?: keyof typeof theme.components.typography;
  fw?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  isAnimated?: boolean;
  lh?: number; 
};

export const Typography = ({
  children,
  fz = "fz14",
  font = "RobotoRegular",
  color = "primaryColor",
  fw = "400",
  url,
  onPress,
  isAnimated,
  lh,
  ...props
}: TypographyProps & TextProps) => {
  const hitStop = { bottom: 5, top: 5, left: 5, right: 5 };
  const TextComponent = createTextComponent(isAnimated);
  const openLink = () => Linking.openURL(url as string);

  const shouldWrapWithLink = url || onPress;

  return shouldWrapWithLink ? (
    <LinkContainer
      activeOpacity={ACTIVE_OPACITY}
      onPress={onPress || openLink}
      hitSlop={hitStop}
    >
      <TextComponent
        fz={fz}
        font={font}
        color={color}
        fw={fw}
        style={{ lineHeight: lh }}
        maxFontSizeMultiplier={1}
        allowFontScaling={false}
        {...props}
      >
        {children}
      </TextComponent>
    </LinkContainer>
  ) : (
    <TextComponent
      fz={fz}
      font={font}
      color={color}
      fw={fw}
      style={{ lineHeight: lh }}
      maxFontSizeMultiplier={1}
      allowFontScaling={false}
      {...props}
    >
      {children}
    </TextComponent>
  );
};

const createTextComponent = (isAnimated?: boolean) => styled(
  isAnimated ? Animated.Text : Text
)<Pick<TypographyProps, "fz" | "font" | "color" | "lh" | "fw">>`
  color: ${({ color = "primaryColor", theme }) =>
    theme.components.typography[color]};
  font-size: ${({ fz = "fz14", theme }) => theme.fontSizes[fz]}px;
  font-family: ${({ font = "RobotoRegular", theme }) => theme.fontFamilies[font]};
  font-weight: ${({ fw = "400" }) => fw};
`;

const LinkContainer = styled.TouchableOpacity.attrs(({ theme }) => ({
  activeOpacity: theme.opacity.active,
}))``;
