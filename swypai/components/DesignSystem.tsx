// Design System Constants
export const Colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA3FF',
  
  // Secondary colors
  secondary: '#5856D6',
  secondaryDark: '#3634A3',
  secondaryLight: '#7A79E0',
  
  // Background colors
  background: '#000000',
  surface: '#1C1C1E',
  surfaceLight: '#2C2C2E',
  surfaceDark: '#0C0C0E',
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#48484A',
  textMuted: '#8E8E93',
  
  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
  
  // Border and divider colors
  border: '#38383A',
  borderLight: '#48484A',
  divider: '#38383A',
  
  // Gradient colors - using readonly tuples for LinearGradient compatibility
  gradientPrimary: ['#007AFF', '#5856D6'] as const,
  gradientSecondary: ['#FF2D92', '#FF9500'] as const,
  gradientSuccess: ['#34C759', '#30D158'] as const,
  gradientError: ['#FF3B30', '#FF453A'] as const,
  gradientCard: ['#2C2C2E', '#1C1C1E'] as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 50,
  full: 9999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

export const Typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  
  // Body text
  bodyLarge: {
    fontSize: 18,
    fontWeight: 'normal' as const,
    lineHeight: 26,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  bodyXSmall: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  
  // Button text
  buttonLarge: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  buttonMedium: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 18,
  },
  
  // Caption text
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
  },
  
  // Label text
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  labelBold: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
}; 