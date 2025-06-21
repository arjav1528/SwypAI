import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';
import {
    BorderRadius,
    Colors,
    Shadows,
    Spacing,
    Typography
} from './DesignSystem';

// Button Component
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  gradient?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  gradient = false,
  style,
  disabled,
  ...props
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = {
      borderRadius: BorderRadius.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
    };

    const sizeStyles = {
      small: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        minHeight: 36,
      },
      medium: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        minHeight: 48,
      },
      large: {
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        minHeight: 56,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: Colors.primary,
        ...Shadows.small,
      },
      secondary: {
        backgroundColor: Colors.surfaceLight,
        borderWidth: 1,
        borderColor: Colors.border,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.6 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles = {
      small: Typography.buttonSmall,
      medium: Typography.buttonMedium,
      large: Typography.buttonLarge,
    };

    const variantTextStyles = {
      primary: { color: Colors.textPrimary },
      secondary: { color: Colors.textPrimary },
      outline: { color: Colors.primary },
      ghost: { color: Colors.primary },
    };

    return {
      ...sizeStyles[size],
      ...variantTextStyles[variant],
      marginHorizontal: icon ? Spacing.xs : 0,
    };
  };

  const ButtonContent = () => (
    <>
      {loading ? (
        <Ionicons name="reload" size={20} color={Colors.textPrimary} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.textPrimary}
              style={{ marginRight: Spacing.xs }}
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
              color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.textPrimary}
              style={{ marginLeft: Spacing.xs }}
            />
          )}
        </>
      )}
    </>
  );

  if (gradient && variant === 'primary') {
    return (
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={[getButtonStyle(), style]}
          disabled={disabled || loading}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          {...props}
        >
          <LinearGradient
            colors={Colors.gradientPrimary}
            style={[StyleSheet.absoluteFillObject, { borderRadius: BorderRadius.md }]}
          />
          <ButtonContent />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        disabled={disabled || loading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        {...props}
      >
        <ButtonContent />
      </TouchableOpacity>
    </Animated.View>
  );
};

// Input Component
interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  variant?: 'default' | 'filled';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  variant = 'default',
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyle = (): TextStyle => {
    const baseStyle = {
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderWidth: 1,
      color: Colors.textPrimary,
      fontSize: 16,
      minHeight: 48,
    };

    const variantStyles = {
      default: {
        backgroundColor: Colors.surfaceLight,
        borderColor: isFocused ? Colors.primary : Colors.border,
      },
      filled: {
        backgroundColor: Colors.surface,
        borderColor: isFocused ? Colors.primary : Colors.borderLight,
      },
    };

    const errorStyle = error ? {
      borderColor: Colors.error,
    } : {};

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...errorStyle,
    };
  };

  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={styles.inputLabel}>{label}</Text>
      )}
      <View style={styles.inputWrapper}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? Colors.primary : Colors.textTertiary}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[getInputStyle(), leftIcon && styles.inputWithLeftIcon, rightIcon && styles.inputWithRightIcon, style]}
          placeholderTextColor={Colors.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={isFocused ? Colors.primary : Colors.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={styles.inputError}>{error}</Text>
      )}
    </View>
  );
};

// Card Component
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  gradient = false,
  onPress,
  disabled = false,
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    if (onPress && !disabled) {
      Animated.spring(scaleValue, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (onPress && !disabled) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const cardStyle = {
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
    ...Shadows.medium,
    opacity: disabled ? 0.6 : 1,
  };

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={[cardStyle, style]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          activeOpacity={0.9}
        >
          {gradient ? (
            <LinearGradient
              colors={Colors.gradientCard}
              style={[StyleSheet.absoluteFillObject, { borderRadius: BorderRadius.lg }]}
            />
          ) : null}
          <View style={gradient ? { zIndex: 1 } : undefined}>
            {children}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <View style={[cardStyle, style]}>
      {gradient ? (
        <LinearGradient
          colors={Colors.gradientCard}
          style={[StyleSheet.absoluteFillObject, { borderRadius: BorderRadius.lg }]}
        />
      ) : null}
      <View style={gradient ? { zIndex: 1 } : undefined}>
        {children}
      </View>
    </View>
  );
};

// Badge Component
interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
}) => {
  const getBadgeStyle = (): ViewStyle => {
    const baseStyle = {
      borderRadius: BorderRadius.full,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    };

    const sizeStyles = {
      small: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        minHeight: 20,
      },
      medium: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        minHeight: 24,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: Colors.primary,
      },
      secondary: {
        backgroundColor: Colors.surfaceLight,
        borderWidth: 1,
        borderColor: Colors.border,
      },
      success: {
        backgroundColor: Colors.success,
      },
      warning: {
        backgroundColor: Colors.warning,
      },
      error: {
        backgroundColor: Colors.error,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles = {
      small: {
        fontSize: 10,
        fontWeight: '600' as const,
      },
      medium: {
        fontSize: 12,
        fontWeight: '600' as const,
      },
    };

    const variantTextStyles = {
      primary: { color: Colors.textPrimary },
      secondary: { color: Colors.textSecondary },
      success: { color: Colors.textPrimary },
      warning: { color: Colors.textPrimary },
      error: { color: Colors.textPrimary },
    };

    return {
      ...sizeStyles[size],
      ...variantTextStyles[variant],
    };
  };

  return (
    <View style={getBadgeStyle()}>
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
};

// Divider Component
interface DividerProps {
  style?: ViewStyle;
  color?: string;
  thickness?: number;
  margin?: number;
}

export const Divider: React.FC<DividerProps> = ({
  style,
  color = Colors.divider,
  thickness = 1,
  margin = Spacing.md,
}) => (
  <View
    style={[
      {
        height: thickness,
        backgroundColor: color,
        marginVertical: margin,
      },
      style,
    ]}
  />
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    position: 'relative',
  },
  leftIcon: {
    position: 'absolute',
    left: Spacing.md,
    top: 14,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: Spacing.md,
    top: 14,
    zIndex: 1,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.xl + Spacing.sm,
  },
  inputWithRightIcon: {
    paddingRight: Spacing.xl + Spacing.sm,
  },
  inputError: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
}); 