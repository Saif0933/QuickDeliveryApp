import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const brandsList = [
  {
    id: 'nike',
    name: 'Nike',
    tagline: 'Just Do It.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/250px-Logo_NIKE.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
    itemCount: '840+ Products',
  },
  {
    id: 'adidas',
    name: 'Adidas',
    tagline: 'Impossible Is Nothing.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/250px-Adidas_Logo.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=80',
    itemCount: '650+ Products',
  },
  {
    id: 'zara',
    name: 'Zara',
    tagline: 'Love your look.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/250px-Zara_Logo.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop&q=80',
    itemCount: '920+ Products',
  },
  {
    id: 'levis',
    name: "Levi's",
    tagline: 'Live in Levis.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Levi%27s_logo.svg/250px-Levi%27s_logo.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&auto=format&fit=crop&q=80',
    itemCount: '480+ Products',
  },
  {
    id: 'hm',
    name: 'H&M',
    tagline: 'More fashion. Less impact.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/250px-H%26M-Logo.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500&auto=format&fit=crop&q=80',
    itemCount: '710+ Products',
  },
  {
    id: 'puma',
    name: 'Puma',
    tagline: 'Forever Faster.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_Logo.svg/250px-Puma_Logo.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=80',
    itemCount: '530+ Products',
  },
];

export default function BrandsTabScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Brands</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>Curated Official Stores</Text>
        
        {brandsList.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            style={styles.brandCard}
            activeOpacity={0.95}
            onPress={() => navigation.navigate('Brand', { brandName: brand.id })}
          >
            <Image source={{ uri: brand.bgImage }} style={styles.cardBg} />
            <View style={styles.overlay} />
            
            <View style={styles.cardContent}>
              <View style={styles.logoContainer}>
                <Image 
                  source={{ 
                    uri: brand.logo,
                    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36' }
                  }} 
                  style={styles.logoImage} 
                  resizeMode="contain" 
                />
              </View>
              <View style={styles.textDetails}>
                <View style={styles.titleRow}>
                  <Text style={styles.brandName}>{brand.name}</Text>
                  <MaterialIcons name="verified" size={14} color="#3b82f6" style={{ marginLeft: 4 }} />
                </View>
                <Text style={styles.tagline}>{brand.tagline}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.itemCountText}>{brand.itemCount}</Text>
              <View style={styles.visitButton}>
                <Text style={styles.visitText}>Visit Store</Text>
                <MaterialIcons name="arrow-forward" size={12} color="#ffffff" style={{ marginLeft: 2 }} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  filterButton: {
    padding: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 16,
  },
  brandCard: {
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoImage: {
    width: 36,
    height: 36,
  },
  textDetails: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
  },
  tagline: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  itemCountText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  visitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  visitText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '800',
  },
});
