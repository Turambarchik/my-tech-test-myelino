import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import { Screen } from "@/components/atoms";
import { CustomInput } from "@/components/molecules";
import { useStoreActions, useStoreState } from "@/store";
import { EventsFolderCard } from "@/components/molecules";
import { InputSearchIcon } from "@/assets/svgs/common";

import { useSearchPlans } from "@/hooks/useSearchPlans";
import { useRouter } from "expo-router";
import { FullScreenLoader } from "@/components/molecules";

import { ChipSection, PlannerHeader, PlansList, TimeLine  } from '../components';

function Planner() {
  const plans = useStoreState((state) => state.plans.plans);
  const fetchPlans = useStoreActions((actions) => actions.plans.fetchPlans);
  const loadPlannerMockData = useStoreActions((actions) => actions.plans.loadPlannerMockData);
  const clearPlanner = useStoreActions((actions) => actions.plans.clearPlanner);
  const router = useRouter();

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // loadPlannerMockData()
    setIsLoading(true)
    fetchPlans().finally(() => {
      setIsLoading(false)
    })
  }, [fetchPlans]);

  const { searchText, setSearchText, filteredQuickPlans, filteredMonthData } = useSearchPlans(
    plans?.quickPlans || [],
    plans?.monthData || {}
  );

  const chips = useMemo(() => {
    if (!plans) return [];
    return [
      ...(filteredQuickPlans.length > 0
        ? [
            {
              label: `Quick Plans (${filteredQuickPlans.length})`,
              onPress: () => setSelectedMonth(null),
            },
          ]
        : []),
      ...Object.keys(filteredMonthData)
        .filter((month) => Object.keys(filteredMonthData[month]).length > 0)
        .map((month) => ({
          label: `${month} (${Object.keys(filteredMonthData[month]).length})`,
          onPress: () => setSelectedMonth(month),
        })),
    ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredQuickPlans.length, filteredMonthData]);

  const filteredTimelineData = useMemo(() => {
    if (!selectedMonth) return filteredMonthData;
    return { [selectedMonth]: filteredMonthData[selectedMonth] };
  }, [selectedMonth, filteredMonthData]);

  if (isLoading) {
    return <FullScreenLoader />
  }

  const navigateToAllEvents = () => {
    router.push({
      pathname: "/(main)/events-details",
      params: { title: "All plans" },
    });
  };

  const allEventsCount = plans?.allplans.length || 0;

  const imageUrls: string[] = filteredQuickPlans
    .flatMap((plan) => plan.place?.photos?.map((photo) => photo.url))
    .filter((url): url is string => url !== undefined);

  const handleDelete = () => {
    clearPlanner();
  };

  return (
    <Screen style={{paddingLeft: 9, paddingRight: 11}} horizontalPadding={0}>
      <ScrollContainer>
        <PlannerHeader />
        <CustomInput
          value={searchText}
          placeholder="Search for the plans"
          onChangeText={setSearchText}
          containerStyle={{
            margin: 1,
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 11,
            height: 50
          }}
          renderLeftIcon={() => <InputSearchIcon />}
        />
        <ChipSection chips={chips} />
        <EventsFolderCard
          containerStyle={{marginTop: 15, marginLeft: 10, marginBottom: 42}}
          plansEventsIds={plans?.allplans.map((el) => el._id) || []}
          onDelete={handleDelete}
          onPress={navigateToAllEvents}
          count={allEventsCount}
          title="All events saved"
          images={imageUrls}
        />
        <PlansList isSearchActive={!!searchText} plans={filteredQuickPlans} />
        <TimeLine monthData={filteredTimelineData} />
      </ScrollContainer>
    </Screen>
  );
}

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export default Planner;
