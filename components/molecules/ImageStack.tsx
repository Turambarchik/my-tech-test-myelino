import React from "react";
import styled from "styled-components/native";
import { Image } from "expo-image";

type ImageStackProps = {
  images: string[];
};

export const ImageStack: React.FC<ImageStackProps> = ({ images }) => {
  return (
    <StackContainer>
      {images.slice(0, 3).map((image, index) => {
        const sizes = [39, 45, 55];
        const size = sizes[index] || 39;

        return (
          <ImageContainer
            key={index}
            style={{
              zIndex: index + 1,
              position: "absolute",
              left: index * 15,
              width: size,
              height: size,
            }}
          >
            <StyledImage
              source={image}
              contentFit="cover"
              transition={500}
              cachePolicy="memory-disk"
              style={{ width: size, height: size }}
            />
          </ImageContainer>
        );
      })}
    </StackContainer>
  );
};

const StackContainer = styled.View`
  flex-direction: row;
  height: 60px;
  position: relative;
`;

const ImageContainer = styled.View`
  border-radius: 8px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
`;
