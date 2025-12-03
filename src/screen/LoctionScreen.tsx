import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../theme/color";

const LocationScreen: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Fixed Header Area for Search */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Select location</Text>
            {/* Cross Icon Removed Here */}
        </View>
        
        <View style={styles.searchBar}>
          <Icon name="search" size={22} color={COLORS.primary} />
          <TextInput
            placeholder="Search for area, street name..."
            style={styles.searchInput}
            placeholderTextColor={COLORS.muted}
          />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Location */}
        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
          <View style={[styles.iconCircle, { backgroundColor: '#FFEBEE' }]}>
             <MaterialCommunityIcons name="crosshairs-gps" size={22} color="#D32F2F" />
          </View>
          <View style={styles.rowText}>
            <Text style={[styles.rowTitle, {color: '#D32F2F'}]}>Use current location</Text>
            <Text style={styles.rowSub}>Harmu Housing Colony, Delatoli, Ranchi</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Add Address */}
        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
          <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
            <Icon name="add" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Add Address</Text>
          </View>
          <Icon name="chevron-right" size={20} color={COLORS.muted} />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Import Address */}
        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
           <View style={[styles.iconCircle, { backgroundColor: '#F3E5F5' }]}>
             <MaterialCommunityIcons name="file-import" size={22} color="#7B1FA2" />
           </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Import from Minta</Text>
          </View>
          <Icon name="chevron-right" size={20} color={COLORS.muted} />
        </TouchableOpacity>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Icon name="cloud-queue" size={20} color="#155724" />
          <Text style={styles.infoText}>
            During rains, delivery partners may take longer to reach you.
          </Text>
        </View>

        {/* Saved Addresses */}
        <Text style={styles.sectionHeader}>SAVED ADDRESSES</Text>
        
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardIconBg}>
                <MaterialCommunityIcons name="home-outline" size={22} color={COLORS.textPrimary} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Home</Text>
              <Text style={styles.cardSub} numberOfLines={2}>
                1 floor, Tarulia, Krishnapur, Kestopur, Kolkata
              </Text>
            </View>
            <View style={styles.distanceBadge}>
                <Text style={styles.distanceText}>332 km</Text>
            </View>
          </View>
          
          {/* Card Actions Line */}
          <View style={styles.cardActions}>
             <TouchableOpacity style={styles.actionButton}>
                <Icon name="share" size={16} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Share</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.actionButtonIcon}>
                <MaterialCommunityIcons name="dots-horizontal" size={20} color={COLORS.muted} />
             </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardIconBg}>
                <MaterialCommunityIcons name="map-marker-outline" size={22} color={COLORS.textPrimary} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>My Place</Text>
              <Text style={styles.cardSub} numberOfLines={2}>
                balpan hospital 4 floor, 4 Floor, Balpan Children Hospital...
              </Text>
            </View>
            <View style={styles.distanceBadge}>
                <Text style={styles.distanceText}>8 km</Text>
            </View>
          </View>
           <View style={styles.cardActions}>
             <TouchableOpacity style={styles.actionButton}>
                <Icon name="share" size={16} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Share</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.actionButtonIcon}>
                <MaterialCommunityIcons name="dots-horizontal" size={20} color={COLORS.muted} />
             </TouchableOpacity>
          </View>
        </View>

        {/* Nearby Locations */}
        <Text style={styles.sectionHeader}>NEARBY LOCATIONS</Text>
        <TouchableOpacity style={styles.simpleCard} activeOpacity={0.7}>
            <View style={styles.simpleCardRow}>
                <View style={[styles.miniIcon, {backgroundColor: '#E0F2F1'}]}>
                    <MaterialCommunityIcons name="map-marker" size={18} color="#00695C" />
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>Itsy Hotels Cradle Regency</Text>
                    <Text style={styles.cardSub} numberOfLines={1}>Beside New AG Colony Road...</Text>
                </View>
                <Text style={styles.simpleDistance}>40 m</Text>
            </View>
        </TouchableOpacity>

        {/* Recent Locations */}
        <Text style={styles.sectionHeader}>RECENT LOCATIONS</Text>
        <TouchableOpacity style={styles.simpleCard} activeOpacity={0.7}>
            <View style={styles.simpleCardRow}>
                <View style={[styles.miniIcon, {backgroundColor: '#ECEFF1'}]}>
                    <MaterialCommunityIcons name="clock-time-four-outline" size={18} color="#455A64" />
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>Kadru</Text>
                    <Text style={styles.cardSub}>AG Colony, Ranchi</Text>
                </View>
            </View>
        </TouchableOpacity>

        <Text style={styles.footer}>powered by Saif</Text>
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background, // #fafafa
  },
  
  /* Header */
  headerContainer: {
      backgroundColor: COLORS.white,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      zIndex: 10,
  },
  headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#F5F7FA', // Light grey input
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  /* Scroll Content */
  scrollContainer: { flex: 1 },
  scrollContent: { padding: 16 },

  /* Action Rows */
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 0,
  },
  divider: {
      height: 1,
      backgroundColor: '#F0F0F0',
      marginHorizontal: 12,
  },
  iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
  },
  rowText: { flex: 1 },
  rowTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  rowSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  /* Info Banner */
  infoBanner: {
    backgroundColor: '#D1E7DD', // Soft green bg
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#BADBCC',
  },
  infoText: {
    fontSize: 13,
    color: "#0f5132",
    marginLeft: 10,
    flex: 1,
    fontWeight: '500',
    lineHeight: 18,
  },

  /* Headers */
  sectionHeader: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: "800",
    marginBottom: 10,
    marginLeft: 4,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  /* Saved Address Card */
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Modern shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardIconBg: {
      backgroundColor: '#F5F5F5',
      padding: 8,
      borderRadius: 10,
      marginRight: 12,
  },
  cardText: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  distanceBadge: {
      backgroundColor: '#F0F0F0',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
  },
  distanceText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#FAFAFA',
  },
  actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 4,
  },
  actionButtonText: {
      fontSize: 13,
      color: COLORS.primary,
      fontWeight: '700',
      marginLeft: 6,
  },
  actionButtonIcon: {
      padding: 4,
  },

  /* Simple Cards (Nearby/Recent) */
  simpleCard: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#F5F5F5',
  },
  simpleCardRow: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  miniIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
  },
  simpleDistance: {
      fontSize: 12,
      color: COLORS.muted,
      fontWeight: '600',
  },

  /* Footer */
  footer: {
    fontSize: 12,
    color: '#CCC',
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default LocationScreen;