import { CARD_HEIGHT } from "@/app/(main)/constants";
import { CheckPlanCardIcon, PricePlanCardIcon, UsersPlanCardIcon } from "@/assets/svgs/planner";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Typography } from "../atoms";

type PlanCardProps = {
  imageUrl: string;
  title: string;
  people: number;
  price: number;
  id: string;
  locationIcon?: boolean;
  isMore?: boolean;
  width?: number;
  onDelete?: (id: string) => void;
};

export const PlanCard: React.FC<PlanCardProps> = ({
  imageUrl,
  title,
  people,
  price,
  id,
  locationIcon = true,
  isMore = false,
  width,
  onDelete,
}) => {
  const GradientOverlay = useMemo(
    () => (
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)", "#000000"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
    ),
    []
  );

  return (
    <CardContainer isMore={isMore} width={width}>
      {onDelete && (
        <DeleteButton onPress={() => onDelete(id)} accessibilityLabel="Delete Plan">
          <MaterialIcons name="cancel" size={18} color="white" />
        </DeleteButton>
      )}
      <ImageWrapper>
        <StyledImage
          source={{ uri: imageUrl }}
          contentFit="cover"
          transition={500}
          cachePolicy="memory-disk"
        />
        {GradientOverlay}
        <CardContent>
          <Typography style={{ marginBottom: 6 }} font="Inter" fw="500" fz="fz14" color="white" lh={17}>
            {title}
          </Typography>
          <DetailsRow>
              <DetailsRow>
              <DetailItem>
                <UsersPlanCardIcon />
                <Typography style={{marginLeft: 4}} font="RobotoRegular" fw="400" fz="fz13" color="white">
                  {people}
                </Typography>
              </DetailItem>
              <DetailItem>
                <PricePlanCardIcon />
                <Typography style={{marginLeft: 4}} font="RobotoRegular" fw="400" fz="fz13" color="white">
                  {price}
                </Typography>
                </DetailItem>
              </DetailsRow>
            {locationIcon && (
              <DetailItem>
                <CheckPlanCardIcon />
              </DetailItem>
            )}
          </DetailsRow>
        </CardContent>
      </ImageWrapper>
    </CardContainer>
  );
};

const CardContainer = styled.View<{ isMore: boolean; width?: number }>`
  width: ${(props) => (props.width)}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
  position: relative;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  padding: 6px;
`;

const ImageWrapper = styled.View`
  flex: 1;
  width: 100%;
  position: relative;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const CardContent = styled.View`
  flex: 1;
  padding: 10px;
  background-color: transparent;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const DetailsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 2px;
`;

const DetailItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  padding: 4px 8px;
`;
