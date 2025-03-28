import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function RecentSearches({ searches, onSearchPress, onRemoveSearch }) {
  if (searches.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Searches</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {searches.map((search, index) => (
          <View key={index} style={styles.searchItem}>
            <TouchableOpacity
              style={styles.searchText}
              onPress={() => onSearchPress(search)}
            >
              <Ionicons name="time-outline" size={16} color="#666" style={styles.icon} />
              <Text numberOfLines={1}>{search}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onRemoveSearch(search)}
              style={styles.removeButton}
            >
              <Ionicons name="close" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 8,
    paddingLeft: 12,
    paddingRight: 4,
  },
  searchText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    marginRight: 4,
  },
  removeButton: {
    padding: 4,
  },
});

export default RecentSearches;