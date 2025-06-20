import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DebugInfoProps {
  message: string;
  data?: any;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ message, data }) => {
  if (__DEV__) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
        {data && (
          <Text style={styles.data}>
            {JSON.stringify(data, null, 2)}
          </Text>
        )}
      </View>
    );
  }
  
  return null;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 5,
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  data: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

export default DebugInfo; 