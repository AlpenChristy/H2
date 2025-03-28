import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SearchBar from '../components/SearchBar';
import CounselorCard from '../components/CounselorCard';
import RecentSearches from '../components/RecentSearches';
import { Ionicons } from '@expo/vector-icons';

const API_URL = "http://localhost:8000/api/counselors";  // Change this if needed

function SearchScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [counselors, setCounselors] = useState([]);
    const [filteredCounselors, setFilteredCounselors] = useState([]);

    useEffect(() => {
        fetchCounselors();
    }, []);

    const fetchCounselors = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setCounselors(data);
            setFilteredCounselors(data);
        } catch (error) {
            console.error("Error fetching counselors:", error);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            const newSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
            setRecentSearches(newSearches);

            const filtered = counselors.filter(counselor =>
                counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                counselor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCounselors(filtered);
        } else {
            setFilteredCounselors(counselors);
        }
    };

    const removeRecentSearch = (search) => {
        setRecentSearches(prev => prev.filter(s => s !== search));
    };

    const handleRecentSearchPress = (search) => {
        setSearchQuery(search);
        handleSearch();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Find Counselors</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmit={handleSearch}
            />

            <RecentSearches
                searches={recentSearches}
                onSearchPress={handleRecentSearchPress}
                onRemoveSearch={removeRecentSearch}
            />

            <FlatList
                data={filteredCounselors}
                renderItem={({ item }) => (
                    <CounselorCard
                        name={item.name}
                        specialization={item.specialization}
                        imageUrl={item.imageUrl}
                        onPress={() => {
                            navigation.navigate('CounselorProfile', {
                                counselor: item
                            });
                        }}
                    />
                )}
                keyExtractor={item => item._id}
                numColumns={2}
                contentContainerStyle={styles.counselorList}
            />
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
        alignItems: 'center',
        padding: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    filterButton: {
        padding: 8,
    },
    counselorList: {
        padding: 8,
    },
});

export default SearchScreen;
