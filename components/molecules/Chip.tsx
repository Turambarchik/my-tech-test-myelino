import React from "react";
import { TouchableOpacity, StyleProp, ViewStyle, Platform } from "react-native";
import styled from "styled-components/native";
import { Typography } from "../atoms/Typography";

type ChipProps = {
  label: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  typographyProps?: React.ComponentProps<typeof Typography>;
};

export const Chip: React.FC<ChipProps> = ({
  label,
  onPress,
  containerStyle,
  typographyProps,
}) => {
  return (
    <Container style={containerStyle} onPress={onPress} activeOpacity={0.7}>
      <Typography {...typographyProps}>{label}</Typography>
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  padding: 13px 8px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundChip};
  align-items: center;
  justify-content: center;
  flex-direction: row;

  ${Platform.select({
    ios: `
      shadow-color: rgba(30, 30, 30, 0.1);
      shadow-offset: 0px 0px;
      shadow-opacity: 1;
      shadow-radius: 3px;
    `,
    android: `
      elevation: 2;
    `,
  })}
`;
