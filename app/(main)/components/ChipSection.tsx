import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { Chip } from "@/components/molecules";
import { View } from "react-native";
import { Typography } from "@/components/atoms";

type ChipSectionProps = {
  chips: {
    label: string;
    onPress?: () => void;
  }[];
};

const ChipSection: React.FC<ChipSectionProps> = ({ chips }) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleChipPress = (index: number, onPress?: () => void) => {
    setActiveIndex(index);
    if (onPress) {
      onPress();
    }
  };

  return (
    <View>
               <Typography style={{ marginBottom: 5 }} font="Inter" fz="fz20" fw="600" color="black">
                        Plans
             </Typography>
    <Container>
      {chips.map((chip, index) => (
        <ChipWrapper key={index}>
          <Chip
            label={chip.label}
            onPress={() => handleChipPress(index, chip.onPress)}
            containerStyle={{ backgroundColor: "white" }}
            typographyProps={{
              fz: "fz16",
              fw: "700",
              font: "Inter",
              color: activeIndex === index ? "primaryColor" : "black",
              lh: 19.36,
            }}
          />
          {activeIndex === index && (
            <Underline
              color={theme.colors.primary}
              length={(chip.label.length + 1) * 8}
            />
          )}
        </ChipWrapper>
      ))}
      </Container>
          </View>
  );
};

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 9px;
`;



const ChipWrapper = styled.View`
  position: relative;
  align-items: center;
`;

const Underline = styled.View<{ color: string; length: number }>`
  position: absolute;
  bottom: 9px;
  width: ${({ length }) => `${length}px`};
  height: 2px;
  background-color: ${({ color }) => color};
`;

export default ChipSection