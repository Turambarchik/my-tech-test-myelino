import { useStoreState } from '@/store';
import { Redirect } from 'expo-router';

export default function Index() {
  const token = useStoreState((state) => state.auth.token);
  // If login respnose will have token (JWT authorization method) -- uncomment. If we stay with cookies aproach leave comment
  // return token ? <Redirect href="/(main)/planner" /> : <Redirect href="/(auth)/login" />;
   return <Redirect href="/(main)/planner" /> 
}
