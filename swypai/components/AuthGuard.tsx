import { useAuth, useUser } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React from 'react';
import LoadingScreen from './LoadingScreen';

interface AuthGuardProps {
  children: React.ReactNode;
  requireProfile?: boolean;
}

export default function AuthGuard({ children, requireProfile = true }: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();

  // Show loading screen while Clerk is initializing
  if (!isLoaded || !isUserLoaded) {
    return <LoadingScreen message="Loading..." />;
  }

  // Redirect to auth if not signed in
  if (!isSignedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  // If profile completion is required, check if user has completed profile
  if (requireProfile) {
    const hasUnsafeMetadata = user?.unsafeMetadata && Object.keys(user.unsafeMetadata).length > 0;
    
    if (!hasUnsafeMetadata) {
      return <Redirect href="/(app)/complete-profile" />;
    }
  }

  // User is authenticated and has completed profile (if required)
  return <>{children}</>;
} 