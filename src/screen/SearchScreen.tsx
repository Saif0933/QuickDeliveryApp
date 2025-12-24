
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../theme/color";
// Make sure this path is correct
import { useGetAllCategory } from "../api/hooks/getAllCategory";
import { SafeAreaView } from "react-native-safe-area-context";

const initialTags = ["Chicken Handi", "Pizza", "Albela Biryani", "Chicken Planet"];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchTags, setSearchTags] = useState(initialTags);

  // 1. UI State for Input
  const [searchText, setSearchText] = useState("");

  // 2. API State (Debounced) - Only updates 500ms after you stop typing
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500); // Wait 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  // 3. Fetch Data using the DEBOUNCED text
  // This will now re-fetch whenever debouncedSearch changes because we fixed the hook
  const { data: categoryData, isLoading } = useGetAllCategory({
    search: debouncedSearch
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Search category or Res.."
              placeholderTextColor={COLORS.LITE_GRAY}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              autoCapitalize="none"
            />
            <View style={styles.divider} />
            {searchText.length > 0 ? (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons name="close-circle" size={22} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Ionicons name="mic" size={22} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Recent Searches (Only visible when NOT searching) */}
        {searchText === "" && (
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>YOUR RECENT SEARCHES</Text>
              {searchTags.length > 0 && (
                <TouchableOpacity onPress={() => setSearchTags([])}>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.tagContainer}>
              {searchTags.length > 0 ? (
                searchTags.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.tag} onPress={() => setSearchText(item)}>
                    <Ionicons name="time-outline" size={18} color={COLORS.LITE_GRAY} />
                    <Text style={styles.tagText}>{item}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.emptyText}>
                  No recent searches
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Dynamic Search Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchText.length > 0 ? "SEARCH RESULTS" : "WHAT’S ON YOUR MIND?"}
          </Text>

          {isLoading ? (
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={{ color: COLORS.textSecondary, marginTop: 10 }}>Searching...</Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {categoryData && categoryData.length > 0 ? (
                categoryData.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.foodItem}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: item.image?.url || 'https://via.placeholder.com/100' }}
                        style={styles.foodImage}
                      />
                    </View>
                    <Text style={styles.foodName} numberOfLines={2}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                // Show "No Results" only if we actually searched for something
                debouncedSearch.length > 0 && (
                  <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                    <Ionicons name="search-outline" size={50} color={COLORS.LITE_GRAY} />
                    <Text style={{ color: COLORS.textSecondary, marginTop: 10 }}>
                      No results found for "{debouncedSearch}"
                    </Text>
                  </View>
                )
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    shadowColor: COLORS.SOFT_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  backButton: {
    paddingRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: "500",
    paddingVertical: 0,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.background,
    marginHorizontal: 10,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    color: COLORS.muted,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  clearText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "700",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.SOFT_BLUE,
  },
  tagText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  emptyText: {
    color: COLORS.muted,
    fontStyle: 'italic',
    marginTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  foodItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 24,
  },
  imageContainer: {
    padding: 2,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.SOFT_BLUE,
    marginBottom: 8,
  },
  foodImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  foodName: {
    fontSize: 12,
    textAlign: "center",
    color: COLORS.textPrimary,
    fontWeight: "600",
    lineHeight: 16,
    textTransform: 'capitalize'
  },
});