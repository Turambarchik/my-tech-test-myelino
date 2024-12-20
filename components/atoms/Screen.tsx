import React from "react";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import styled from "styled-components/native";

type ScreenProps = {
  horizontalPadding?: number;
  verticalPadding?: number;
};

type SafeAreaViewScreenProps = SafeAreaViewProps & ScreenProps;

export const Screen = ({
  children,
  horizontalPadding = 20,
  verticalPadding = 20,
  ...props
}: SafeAreaViewScreenProps) => (
  <View
    horizontalPadding={horizontalPadding}
    verticalPadding={verticalPadding}
    {...props}
  >
    {children}
  </View>
);

const View = styled.View<{
  horizontalPadding?: number;
  verticalPadding?: number;
}>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryBg};
  padding-horizontal: ${({ horizontalPadding }) => horizontalPadding}px;
  padding-vertical: ${({ verticalPadding }) => verticalPadding}px;
`;
