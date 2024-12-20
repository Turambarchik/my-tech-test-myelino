import { BreadCrumpsArrowIcon } from "@/assets/svgs/planner";
import { Screen,  Typography  } from "@/components/atoms";
import { FullScreenLoader, PlanCard } from "@/components/molecules";
import { useStoreActions, useStoreState } from "@/store";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import { CARD_HEIGHT } from "../constants";

const ITEMS_PER_LOAD = 8;

function EventsDetails() {
    const { title } = useLocalSearchParams();
  const allEvents = useStoreState((state) => state.plans.eventsDetails);
  const deleteEvent = useStoreActions((actions) => actions.plans.deleteEvent);

  const [visibleEvents, setVisibleEvents] = useState(allEvents.slice(0, ITEMS_PER_LOAD));
  const [isFetchingMore, setIsFetchingMore] = useState(false);


    if (!allEvents) {
    return <FullScreenLoader />
    }
  
  const handleLoadMore = () => {
    if (isFetchingMore || visibleEvents.length >= allEvents.length) return;

    setIsFetchingMore(true);
    setTimeout(() => {
      const nextEvents = allEvents.slice(visibleEvents.length, visibleEvents.length + ITEMS_PER_LOAD);
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
            isFetchingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null
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
`;

const FlashListContainer = styled.View`
  flex: 1;
`;

export default EventsDetails;
