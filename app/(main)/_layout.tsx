import { Stack } from 'expo-router';
import { Typography } from '@/components/atoms';
import { BackButton } from '@/components/molecules';

export default function MainLayout() {
  return (
    <Stack initialRouteName="planner" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="planner/index"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerShadowVisible: false,
          headerLeft: () => null, 
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Typography fz="fz22" font="Inter" lh={26.63} color="black">
              Planner
            </Typography>
          ),
        }}
      />
      <Stack.Screen
        name="events-details/index"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Typography fz="fz22" font="Inter" lh={26.63} color="black">
              Planner
            </Typography>
          ),
        }}
      />
    </Stack>
  );
}
