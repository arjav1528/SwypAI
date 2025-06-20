import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.mainTitle}>
            Reset Password
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Enter your email address and we&apos;ll send you a link to reset your password
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedText style={styles.label}>Email Address</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.resetButton}>
            <ThemedText style={styles.resetButtonText}>Send Reset Link</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.loginContainer}>
          <ThemedText>Remember your password? </ThemedText>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <ThemedText style={styles.loginLink}>Sign in</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
    lineHeight: 24,
  },
  form: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  resetButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 'auto',
    marginBottom: 40,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
}); 