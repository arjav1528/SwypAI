import LoadingScreen from '@/components/LoadingScreen';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React from 'react';

export default function Page() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  // Show loading screen while Clerk is initializing
  if (!isLoaded || !isUserLoaded) {
    return <LoadingScreen message="Initializing authentication..." />;
  }

  // Redirect to auth if not signed in
  if (!isSignedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  // Check if user has completed profile (has unsafe metadata)
  const hasUnsafeMetadata = user?.unsafeMetadata && Object.keys(user.unsafeMetadata).length > 0;
  
  if (!hasUnsafeMetadata) {
    // User is logged in but hasn't completed profile
    return <Redirect href="/(app)/complete-profile" />;
  }

  // User is logged in and has completed profile
  return <Redirect href="/(app)/home" />;
} 