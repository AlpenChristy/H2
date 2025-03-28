import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function CounselorProfileScreen({ route, navigation }) {
  const counselor = route.params?.counselor || {
    name: 'Dr. Sarah Johnson, Ph.D',
    credentials: 'Licensed Clinical Psychologist',
    specializations: ['Relationships', 'Anxiety', 'Depression'],
    rating: 4.8,
    reviewCount: 127,
    bio: 'With over 15 years of experience, I specialize in helping individuals navigate life transitions, relationship challenges, and personal growth. My approach combines cognitive-behavioral therapy with mindfulness techniques.',
    imageUrl: 'https://api.a0.dev/assets/image?text=professional%20counselor%20woman%20smiling&seed=1',
    approach: [
      'Evidence-based therapeutic techniques',
      'Personalized treatment plans',
      'Holistic wellness approach',
      'Safe and confidential environment'
    ]
  };

  console.log("Counselor Data:", counselor); // Debugging log

  const SessionTypeButton = ({ icon, title, price, onPress }) => (
    <TouchableOpacity style={styles.sessionButton} onPress={onPress}>
      <View style={styles.sessionContent}>
        <Text style={styles.sessionIcon}>{icon}</Text>
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTitle}>{title}</Text>
          <Text style={styles.sessionPrice}>${price}/session</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: counselor.imageUrl }} style={styles.profileImage} />
          <Text style={styles.name}>{counselor.name}</Text>
          <Text style={styles.credentials}>{counselor.credentials}</Text>

          <View style={styles.specializations}>
            {counselor.specializations?.map((spec, index) => (
              <View key={index} style={styles.specTag}>
                <Text style={styles.specText}>{spec}</Text>
              </View>
            ))}
          </View>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{counselor.rating}</Text>
            <TouchableOpacity>
              <Text style={styles.reviewsLink}>
                ({counselor.reviewCount} reviews)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.bio}>{counselor.bio}</Text>
        </View>

        {/* Approach Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Approach</Text>
          {counselor.approach?.map((point, index) => (
            <View key={index} style={styles.approachPoint}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.approachText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* Session Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Sessions</Text>
          <SessionTypeButton
            icon="📞"
            title="Phone Counseling"
            price={45}
            onPress={() => console.log('Phone session selected')}
          />
          <SessionTypeButton
            icon="🎥"
            title="Video Counseling"
            price={60}
            onPress={() => console.log('Video session selected')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  credentials: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  specializations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
  },
  specTag: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  specText: {
    color: '#1E90FF',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewsLink: {
    color: '#666',
    textDecorationLine: 'underline',
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  approachPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  approachText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 8,
    flex: 1,
  },
  sessionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sessionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sessionPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default CounselorProfileScreen;
