import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

export const FullScreenLoader = () => {
    const theme = useTheme()
  return (
    <Container>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBg};
`;