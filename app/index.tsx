import { useStoreState } from '@/store';
import { Redirect } from 'expo-router';

export default function Index() {
    // If login respnose will have token (JWT authorization method) we can use it;
  const token = useStoreState((state) => state.auth.token);
  // return token ? <Redirect href="/(main)/planner" /> : <Redirect href="/(auth)/login" />;
  return <Redirect href="/(main)/planner" />
}
