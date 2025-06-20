# SwypAI - Routing & Layout Documentation

## Overview
This document describes the improved routing and layout structure for the SwypAI app.

## File Structure

```
app/
├── _layout.tsx              # Root layout with error boundary and theme support
├── page.tsx                 # Main entry point with auth checking
├── +not-found.tsx          # 404 error page
├── (auth)/                 # Authentication group
│   ├── _layout.tsx         # Auth layout with stack navigation
│   ├── login.tsx           # Login screen
│   ├── signup.tsx          # Sign up screen
│   └── forgot-password.tsx # Forgot password screen
└── (app)/                  # Main app group
    ├── _layout.tsx         # App layout with tab navigation
    ├── home.tsx            # Home screen
    ├── explore.tsx         # Explore screen
    └── profile.tsx         # Profile screen
```

## Key Improvements

### 1. Root Layout (`app/_layout.tsx`)
- **Error Boundary**: Added React error boundary for better error handling
- **Theme Support**: Dynamic theme switching based on system preferences
- **Gesture Handler**: Wrapped with GestureHandlerRootView for gesture support
- **Safe Area**: Added SafeAreaProvider for proper safe area handling
- **Navigation Structure**: Properly configured stack navigation with animations

### 2. Authentication Layout (`app/(auth)/_layout.tsx`)
- **Smooth Transitions**: Added slide animations for better UX
- **Gesture Support**: Enabled swipe gestures for navigation
- **Screen Configuration**: Individual screen options for better control

### 3. App Layout (`app/(app)/_layout.tsx`)
- **Dynamic Theming**: Tab bar adapts to light/dark mode
- **Enhanced Icons**: Uses filled/outline icons based on active state
- **Better Styling**: Improved tab bar height and spacing
- **Profile Screen**: Added missing profile tab

### 4. Navigation Service (`components/NavigationService.tsx`)
- **Centralized Navigation**: All navigation logic in one place
- **Authentication Handling**: Methods for auth state management
- **Type Safety**: Full TypeScript support
- **Error Handling**: Proper error handling for navigation operations

### 5. Loading Screen (`components/LoadingScreen.tsx`)
- **Reusable Component**: Can be used throughout the app
- **Theme Support**: Adapts to light/dark mode
- **Customizable**: Configurable message and size

### 6. Profile Screen (`app/(app)/profile.tsx`)
- **Modern UI**: Clean, modern design with proper spacing
- **Theme Support**: Full light/dark mode support
- **User Stats**: Display user statistics
- **Menu Items**: Common profile actions
- **Logout Functionality**: Integrated with NavigationService

## Navigation Flow

1. **App Launch**: `app/page.tsx` checks authentication status
2. **Loading State**: Shows loading screen while checking auth
3. **Authentication**: Redirects to `/(auth)/login` if not authenticated
4. **Main App**: Redirects to `/(app)/home` if authenticated
5. **Tab Navigation**: Users can navigate between Home, Explore, and Profile
6. **Logout**: Profile screen logout redirects back to auth

## Theme Support

The app now fully supports both light and dark modes:
- Dynamic status bar styling
- Adaptive tab bar colors
- Theme-aware component styling
- Consistent color scheme across all screens

## Error Handling

- **Error Boundary**: Catches and displays React errors gracefully
- **Navigation Errors**: Proper error handling in NavigationService
- **Loading States**: Appropriate loading indicators during async operations

## Best Practices Implemented

1. **Type Safety**: Full TypeScript support throughout
2. **Component Reusability**: Shared components like LoadingScreen
3. **Separation of Concerns**: Navigation logic separated from UI
4. **Performance**: Proper use of React hooks and memoization
5. **Accessibility**: Proper semantic structure and touch targets
6. **Consistent Styling**: Unified design system across screens

## Usage Examples

### Navigation
```typescript
import { NavigationService } from '../components/NavigationService';

// Navigate to different screens
NavigationService.navigateToProfile();
NavigationService.navigateToExplore();
NavigationService.logout();
```

### Loading Screen
```typescript
import LoadingScreen from '../components/LoadingScreen';

// Use in components
<LoadingScreen message="Loading data..." size="large" />
```

## Future Enhancements

1. **Deep Linking**: Add support for deep linking
2. **Analytics**: Integrate navigation analytics
3. **Offline Support**: Handle offline navigation states
4. **Biometric Auth**: Add biometric authentication support
5. **Push Notifications**: Handle notification-based navigation 