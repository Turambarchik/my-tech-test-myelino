import { Typography } from "@/components/atoms/Typography";
import React from "react";
import styled from "styled-components/native";
import { ImageStack } from "./ImageStack";

type EventsFolderCardProps = {
  count: number;
  title: string;
  images: string[];
  plansEventsIds: string[];
  onPress?: () => void;
  onDelete?: (plansEventsIds: string[]) => void;
};

export const EventsFolderCard: React.FC<EventsFolderCardProps> = ({ count, title, plansEventsIds, images, onDelete, onPress }) => {
  return (
    <TouchableContainer onPress={onPress} activeOpacity={0.8}>
      <LeftSection>
        <Typography fz="fz15" font="RobotoRegular" fw="400" color="grey">
          Events
        </Typography>
        <CountContainer>
          <Typography fz="fz21" font="RobotoBold" fw="800" color="white">
            {count}
          </Typography>
        </CountContainer>
      </LeftSection>
      <Divider height={75} />
      <CentralSection>
        <Typography numberOfLines={3} fz="fz16" font="Inter" color="primaryColor">
          {title}
        </Typography>
        <DeleteButton onPress={() => onDelete?.(plansEventsIds)}>
          <Typography font="Inter" fw="600" fz="fz16" color="danger">Delete</Typography>
        </DeleteButton>
      </CentralSection>
      <Divider height={100} />
      <RightSection>
        {images && images.length > 0 ? (
          <ImageStack images={images} />
        ) : (
          <NoImageView>
            <Typography fz="fz12" font="RobotoRegular" fw="400" color="grey">
              No Images
            </Typography>
          </NoImageView>
        )}
      </RightSection>
    </TouchableContainer>
  );
};

const TouchableContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 14px;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  elevation: 3;
  margin: 8px 0;
  border-width: 1px;
  border-color: ${({ theme }) => theme.components.divider.primary};
  background-color: ${({ theme }) => theme.colors.white2};
`;

const LeftSection = styled.View`
  align-items: center;
  padding: 12px 16px 13px 15px;
`;

const CountContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  margin-top: 9px;
  padding: 8px 16px;
  margin-bottom: 8px;
`;

const Divider = styled.View<{ height: number }>`
  width: 1px;
  height: ${({ height }) => `${height}%`};
  background-color: ${({ theme }) => theme.components.divider.primary};
`;

const CentralSection = styled.View`
  flex: 1.5;
  justify-content: center;
  align-items: center;
  padding-horizontal: 4px;
`;

const RightSection = styled.View`
  flex: 0.8;
  justify-content: center;
  margin-right: -5px;
  margin-left: 10px;
  position: relative;
`;

const NoImageView = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;


const DeleteButton = styled.TouchableOpacity`
  border-radius: 12px;
  padding: 4px;
`;