import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'subtitle' | 'body' | 'caption';
  children: React.ReactNode;
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  type = 'body', 
  style, 
  children, 
  ...props 
}) => {
  const getTextStyle = (): TextStyle => {
    switch (type) {
      case 'title':
        return { fontSize: 24, fontWeight: 'bold' as const, color: '#fff' };
      case 'subtitle':
        return { fontSize: 18, color: '#ccc' };
      case 'caption':
        return { fontSize: 12, color: '#888' };
      default:
        return { fontSize: 16, color: '#fff' };
    }
  };

  return (
    <Text style={[getTextStyle(), style]} {...props}>
      {children}
    </Text>
  );
}; 