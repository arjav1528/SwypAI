import { useAuth } from '@clerk/clerk-expo';

export class NavigationService {
  static async checkAuthStatus(): Promise<boolean> {
    // This method is used for static checks, but we'll need to use the hook in components
    // For now, we'll return false and let the hook handle the actual auth state
    return false;
  }
}

// Hook version for use in components
export const useNavigationService = () => {
  const { isSignedIn, isLoaded } = useAuth();
  
  return {
    isAuthenticated: isSignedIn,
    isLoaded,
    checkAuthStatus: () => isSignedIn,
  };
}; 