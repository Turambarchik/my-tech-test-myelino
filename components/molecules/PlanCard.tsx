import React, { useMemo } from "react";
import { Image } from "expo-image";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { CARD_HEIGHT, CARD_WIDTH, CARD_WIDTH_WITH_MORE } from "@/app/(main)/constants";
import { UsersPlanCardIcon, PricePlanCardIcon, CheckPlanCardIcon } from "@/assets/svgs/planner";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type PlanCardProps = {
  imageUrl: string;
  title: string;
  people: number;
  price: number;
  id: string;
  locationIcon?: boolean;
  isMore?: boolean;
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
  onDelete,
}) => {
  const GradientOverlay = useMemo(() => (
    <LinearGradient
      colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)", "#000000"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ ...StyleSheet.absoluteFillObject }}
    />
  ), []);

  return (
    <CardContainer isMore={isMore}>
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
          <Title>{title}</Title>
          <DetailsRow>
            <DetailItem>
              <UsersPlanCardIcon />
              <DetailText>{people}</DetailText>
            </DetailItem>
            <DetailItem>
              <PricePlanCardIcon />
              <DetailText>{price}</DetailText>
            </DetailItem>
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

const CardContainer = styled.View<{ isMore: boolean }>`
  width: ${(props) => (props.isMore ? CARD_WIDTH_WITH_MORE : CARD_WIDTH)}px;
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

const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
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
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  padding: 4px 8px;
`;

const DetailText = styled.Text`
  font-size: 12px;
  color: white;
  margin-left: 4px;
`;
