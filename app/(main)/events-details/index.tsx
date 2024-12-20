import { BreadCrumpsArrowIcon } from "@/assets/svgs/planner";
import { Screen, Typography } from "@/components/atoms";
import { FullScreenLoader, PlanCard } from "@/components/molecules";
import { useStoreActions, useStoreState } from "@/store";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import { useTheme } from "styled-components";
import { CARD_HEIGHT, CARD_WIDTH_EVENTS_DETAILS_SCREEN } from "../constants";
import { ALL_PLANS_TITLE } from "@/constants/constants";

const ITEMS_PER_LOAD = 8;

function EventsDetails() {
  const { title } = useLocalSearchParams();
  const theme = useTheme()
  const allEvents = useStoreState((state) => state.plans.allplans);
  const specificDateEvents = useStoreState((state) => state.plans.specificDateEvents);
  const deleteEvent = useStoreActions((actions) => actions.plans.deleteEvent);
  const [isLoading, setIsLoading] = useState(false)

  const eventsToDisplay = title === ALL_PLANS_TITLE ? allEvents : specificDateEvents
  const [visibleEvents, setVisibleEvents] = useState(eventsToDisplay.slice(0, ITEMS_PER_LOAD));
  const [isFetchingMore, setIsFetchingMore] = useState(false);


     useEffect(() => {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
    }, 450);

    return () => clearTimeout(timeoutId);
     }, []);
  
    if (isLoading) {
    return <FullScreenLoader />
    }
  

  
  const handleLoadMore = () => {
    if (isFetchingMore || visibleEvents.length >= eventsToDisplay.length) return;

    setIsFetchingMore(true);
    setTimeout(() => {
      const nextEvents = eventsToDisplay.slice(visibleEvents.length, visibleEvents.length + ITEMS_PER_LOAD);
      setVisibleEvents((prev) => [...prev, ...nextEvents]);
      setIsFetchingMore(false);
    }, 500);
  };

  const handleEventItemDelete = (id: string) => {
    const updatedVisibleEvents = visibleEvents.filter((event) => event._id !== id);
    setVisibleEvents(updatedVisibleEvents);
    deleteEvent(id);
  };

  return (
    <Screen  verticalPadding={10} horizontalPadding={20} >
      <Header>
        <Typography style={{ marginRight: 11 }} font="Inter" fz="fz20" fw="600" color="black">
          Plan
        </Typography>
        <BreadCrumpsArrowIcon />
        <Typography style={{ marginLeft: 14 }} font="Inter" fz="fz20" fw="600" color="black">
          {title}
        </Typography>
      </Header>
      <FlashListContainer>
        <FlashList
          data={visibleEvents}
          numColumns={2}
          keyExtractor={(item) => item._id.toString()}
          estimatedItemSize={CARD_HEIGHT}
          renderItem={({ item }) => (
            <CardWrapper>
              <PlanCard
                width={CARD_WIDTH_EVENTS_DETAILS_SCREEN}
                id={item._id}
                onDelete={handleEventItemDelete}
                imageUrl={item.place?.photos?.[0]?.url || ""}
                title={item.place?.placeName?.title || "No Title"}
                people={item.place?.people || 0}
                price={item.place?.amountPaid || 0}
              />
            </CardWrapper>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingMore ? <ActivityIndicator size="large" color={theme.colors.primary} /> : null
          }
        />
      </FlashListContainer>
    </Screen>
  );
}

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const CardWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const FlashListContainer = styled.View`
  flex: 1;
`;

export default EventsDetails;
