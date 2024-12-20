import { Typography } from "@/components/atoms";
import { BulletPoint, EventsFolderCard  } from "@/components/molecules";
import { useStoreActions } from "@/store";
import { PlansResponse, PlanDTO } from "@/store/models/plans/plans.types";
import { useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

type TimelineProps = {
  monthData: PlansResponse["monthData"];
};

const Timeline: React.FC<TimelineProps> = ({ monthData }) => {
  const deletePlan = useStoreActions((actions) => actions.plans.deletePlan);
  const setSpecificDateEvents = useStoreActions((actions) => actions.plans.setSpecificDateEvents);
  const router = useRouter();
  const theme = useTheme()

  const data = Object.entries(monthData)
    .map(([month, monthDetails]) => {
      const plansArray = Object.entries(monthDetails).flatMap(([date, planGroup]) => {
        return Object.entries(planGroup).map(([planTitle, events]) => {
          const firstEvent = events[0];
          return {
            title: planTitle,
            plansEventsIds: events.map((el) => el._id),
            events,
            description: firstEvent?.place?.description || firstEvent?.originalPost,
            eventCount: events.length,
            images: events
              .flatMap((event) => event.place?.photos?.map((photo) => photo.url))
              .filter((url): url is string => Boolean(url)),
          };
        });
      });

      return {
        month,
        plans: plansArray,
      };
    })
    .filter((monthData) => monthData.plans.length > 0);

  const handleDelete = (ids: string[]) => {
    deletePlan(ids);
  };

  const navigateToDateEvents = (events: PlanDTO[], eventTitle: string) => {
    setSpecificDateEvents(events)
    router.push({
      pathname: "/(main)/events-details",
      params: { title: eventTitle },
    });
  };

  return (
    <Container>
      <Line />
      {data.map((monthData, index) => (
        <MonthContainer key={index}>
          <Row>
            <TimelineWrapper>
              <BulletPoint color={theme.colors.black} />
            </TimelineWrapper>
            <Typography style={{ marginLeft: 6 }} fz="fz16" fw="700" font="Inter" color="black">
              {monthData.month}
            </Typography>
          </Row>
          {monthData.plans.map((plan, planIndex) => (
            <PlanRow key={planIndex}>
              <TimelineWrapper>
                <BulletPoint color={theme.colors.primary} />
              </TimelineWrapper>
              <PlanDetailsWrapper>
                <PlanTitleWrapper>
                  <ShortLine />
                  <Typography fz="fz16" fw="700" font="Inter" color="primaryColor">
                    {plan.title}
                  </Typography>
                </PlanTitleWrapper>
                <EventsFolderCard
                  onPress={() => navigateToDateEvents(plan.events, plan.title)}
                  onDelete={handleDelete}
                  plansEventsIds={plan.plansEventsIds}
                  count={plan.eventCount}
                  title={plan.title}
                  images={plan.images}
                />
              </PlanDetailsWrapper>
            </PlanRow>
          ))}
        </MonthContainer>
      ))}
    </Container>
  );
};

const Container = styled.View`
  margin-top: 20px;
  position: relative;
`;

const MonthContainer = styled.View``;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const PlanRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 10px;
`;

const TimelineWrapper = styled.View`
  align-items: center;
  width: 20px;
  position: relative;
`;

const Line = styled.View`
  position: absolute;
  left: 9px;
  top: 5px;
  bottom: 0;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

const ShortLine = styled.View`
  width: 14px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-right: 4px;
  align-self: center;
`;

const PlanTitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: -3px;
`;

const PlanDetailsWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

export default Timeline;
