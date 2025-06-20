import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  // Don't redirect here - let the main index.tsx handle routing
  // This prevents circular redirects between auth and app routes
  if (!isLoaded) {
    return null; // Let the main layout handle loading
  }

  return <Stack />
}