import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthGuard from '../../components/AuthGuard';

const ProfilePage = () => {
  const { user } = useUser();
  const router = useRouter();

  const profileData = user?.unsafeMetadata as any;

  const handleBack = () => {
    router.back();
  };

  const handleEditProfile = () => {
    router.push('/(app)/complete-profile');
  };

  return (
    <AuthGuard>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="#4c8df5" />
              </View>
            </View>
            
            <Text style={styles.name}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.email}>{user?.emailAddresses[0]?.emailAddress}</Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color="#4c8df5" />
              <Text style={styles.infoLabel}>Age:</Text>
              <Text style={styles.infoValue}>
                {profileData?.age ? `${profileData.age} years old` : 'Not set'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="person-outline" size={20} color="#4c8df5" />
              <Text style={styles.infoLabel}>Gender:</Text>
              <Text style={styles.infoValue}>
                {profileData?.gender === 'male' ? 'Male' :
                 profileData?.gender === 'female' ? 'Female' :
                 profileData?.gender === 'nonbinary' ? 'Non-Binary' :
                 profileData?.gender === 'prefer_not' ? 'Prefer not to say' : 'Not set'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="heart-outline" size={20} color="#4c8df5" />
              <Text style={styles.infoLabel}>Preferred Genres:</Text>
              <Text style={styles.infoValue}>
                {profileData?.preferGenres && profileData.preferGenres.length > 0 
                  ? profileData.preferGenres.join(', ')
                  : 'Not set'}
              </Text>
            </View>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Account Info</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {user?.createdAt ? new Date(user.createdAt).getFullYear() : 'N/A'}
                </Text>
                <Text style={styles.statLabel}>Member Since</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {user?.lastSignInAt ? 'Active' : 'N/A'}
                </Text>
                <Text style={styles.statLabel}>Status</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthGuard>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  editButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4c8df5',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoLabel: {
    fontSize: 16,
    color: '#e0e0e0',
    marginLeft: 10,
    marginRight: 10,
    minWidth: 120,
  },
  infoValue: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c8df5',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#e0e0e0',
  },
}); 