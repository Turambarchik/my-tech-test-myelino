import React, { useState } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { FlashList } from "@shopify/flash-list";
import { PlanCard,  BulletPoint  } from "@/components/molecules";
import { Typography } from "@/components/atoms";
import { SeeMoreTempate } from "@/assets/svgs/planner";
import { DEVICE_WIDTH } from "@/constants/constants";
import { getDaysUntil } from "@/helpers/functions";
import { PlanDTO } from "@/store/models/plans/plans.types";
import { useStoreActions } from "@/store";

import { BUTTON_WIDTH, CARD_HEIGHT } from "../constants";
import { groupPlansByDate } from "../helpers";

type PlansListProps = {
  plans: PlanDTO[];
  isSearchActive: boolean;
};

const PlansList: React.FC<PlansListProps> = ({ plans, isSearchActive }) => {
  const deleteEvent = useStoreActions((actions) => actions.plans.deleteEvent);
  const theme = useTheme();
  const groupedPlans = groupPlansByDate(plans);
  const groupedPlanEntries = Object.entries(groupedPlans).map(([date, plansForDate]) => ({
    date,
    daysUntil: getDaysUntil(date),
    plans: plansForDate,
  }));

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (date: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const handleEventItemDelete = (id: string) => {
    deleteEvent(id);
  };

  return (
    <FlashListContainer>
      <FlashList
        data={groupedPlanEntries}
        keyExtractor={(item) => item.date}
        estimatedItemSize={160}
        renderItem={({ item }) => {
          const { date, daysUntil, plans: plansForDate } = item;

          const hasShowMore = plansForDate.length > 2;
          const showAll = isSearchActive || expandedGroups[date] || false;
          const displayedPlans = showAll
            ? plansForDate
            : hasShowMore
            ? [...plansForDate.slice(0, 2), { isShowMoreButton: true }]
            : plansForDate;

          const isCompact = plansForDate.length <= 2 || showAll;

          return (
            <DateSection isCompact={isCompact}>
              <TitleRow>
                <BulletPoint color={theme.colors.danger} />
                <Typography style={{ marginLeft: 10 }} fw="700" fz="fz16" font="RobotoBold" color="danger">
                  {daysUntil ? `Expires in ${daysUntil} days!` : "Expires today"}
                </Typography>
              </TitleRow>
              <FlashList
                data={displayedPlans}
                keyExtractor={(subItem, index) =>
                  "isShowMoreButton" in subItem ? `button-${index}` : subItem._id
                }
                numColumns={isCompact ? 2 : 3}
                estimatedItemSize={CARD_HEIGHT}
                renderItem={({ item: subItem }) => {
                  if ("isShowMoreButton" in subItem) {
                    return (
                      <ShowMoreButtonWrapper onPress={() => toggleGroup(date)}>
                        <SeeMoreTempate width={BUTTON_WIDTH} height={CARD_HEIGHT} />
                      </ShowMoreButtonWrapper>
                    );
                  }

                  return (
                    <PlanCard
                      onDelete={handleEventItemDelete}
                      id={subItem._id}
                      isMore={!isCompact}
                      imageUrl={subItem.place?.photos?.[0]?.url || ""}
                      title={subItem.place?.placeName?.title || "No Title"}
                      people={subItem.place?.people || 0}
                      price={subItem.place?.amountPaid || 0}
                    />
                  );
                }}
              />
            </DateSection>
          );
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />
    </FlashListContainer>
  );
};


const FlashListContainer = styled.View`
  flex: 1;
  width: ${DEVICE_WIDTH}px;
`;

const DateSection = styled.View<{ isCompact: boolean }>`
  margin-bottom: 20px;
  width: ${(props) => (props.isCompact ? `${DEVICE_WIDTH - 40}px` : `${DEVICE_WIDTH}px`)};
`;

const ShowMoreButtonWrapper = styled.TouchableOpacity`
  width: ${BUTTON_WIDTH}px;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  margin-top: 10px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export default PlansList;
