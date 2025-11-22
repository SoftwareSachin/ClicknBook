import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
  StatusBar,
  Modal,
} from "react-native";

const { width } = Dimensions.get('window');

// --- STYLES ---
const homeStyles = StyleSheet.create({
  yellowHeader: { width: '100%', height: 20, backgroundColor: "#FFDD32", marginBottom: 10 },
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, width: width, backgroundColor: "#FFDD32", borderTopLeftRadius: 24, borderTopRightRadius: 24, flexDirection: "row", paddingHorizontal: 10, paddingVertical: 12, alignItems: "center", justifyContent: "space-between", shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5, paddingBottom: Platform.OS === 'ios' ? 20 : 12 
  },
  navItem: { flex: 1, alignItems: "center", justifyContent: 'center', height: 50 },
  greetingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 27, marginHorizontal: 16 },
  actionRow: { flexDirection: "row", marginBottom: 24, marginHorizontal: 16 },
  filterBtn: { flex: 1, alignItems: "center", borderColor: "#FFDD32", borderRadius: 10, borderWidth: 1, paddingVertical: 8, marginRight: 18, justifyContent: "center" },
  filterIcon: { width: 24, height: 24, marginBottom: 5, borderRadius: 10 },
  searchBar: { flexDirection: "row", alignItems: "center", borderColor: "#979797", borderRadius: 20, borderWidth: 1, marginBottom: 24, marginHorizontal: 16, backgroundColor: "#fff", height: 50 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8, marginRight: 23 },
  sectionTitle: { color: "#000000", fontSize: 14, fontWeight: "bold" },
  seeAll: { color: "#FFDD32", fontSize: 14, fontWeight: "bold" },
  propertyCard: { borderColor: "#ddd", borderRadius: 20, borderWidth: 1, paddingHorizontal: 0, marginRight: 17, width: 200, backgroundColor: "#fff", paddingBottom: 10, overflow: 'hidden', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  propertyImage: { width: '100%', height: 120, marginBottom: 8 },
  cardPrice: { color: "#000000", fontSize: 14, fontWeight: "bold", marginBottom: 2, marginHorizontal: 10 },
  cardTitle: { color: "#000000", fontSize: 12, fontWeight: "bold", marginBottom: 2, marginHorizontal: 10 },
  cardLocation: { color: "#666", fontSize: 12, marginBottom: 5, marginHorizontal: 10 },
  localityCard: { flexDirection: "row", alignItems: "center", borderColor: "#ddd", borderRadius: 20, borderWidth: 1, padding: 12, marginRight: 15, backgroundColor: "#fff", width: 280, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  localityImage: { borderRadius: 12, width: 75, height: 83, marginRight: 10 },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  readReviewBtn: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  typeCard: { alignItems: 'center', justifyContent: 'center', marginRight: 12, width: 90 },
  typeIconContainer: { width: 70, height: 70, backgroundColor: '#FFF', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, borderWidth: 1, borderColor: '#F0F0F0' },
  typeIcon: { width: 32, height: 32 },
  typeText: { fontSize: 11, fontWeight: '600', color: '#333', textAlign: 'center' }
});

const profileStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  closeButton: { 
    padding: 8, 
    borderRadius: 20, 
    backgroundColor: '#f0f0f0' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#eee', 
    marginBottom: 15 
  },
  profileHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginRight: 15 
  },
  userName: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  infoSection: { 
    marginTop: 5 
  },
  infoTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#555', 
    marginBottom: 15 
  },
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  infoIcon: { 
    width: 20, 
    height: 20, 
    marginRight: 12, 
    tintColor: '#FFDD32' 
  },
  infoText: { 
    fontSize: 14, 
    color: '#333' 
  }
});

// --- 1. Interfaces & Types ---

interface PropertyData {
  id: string;
  imageUri: string;
  price: string;
  title: string;
  location: string;
}

interface LocalityData {
  id: string;
  imageUri: string;
  locality: string;
  ratingText: string;
  pricePerSqFt: string;
}

interface PropertyType {
    id: string;
    name: string;
    iconUri: string;
}

interface HomeContentProps {
    onProfilePress: () => void;
    onNotificationPress: () => void;
    onSeeAllTypes: () => void;
}

interface ProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

// --- 2. DATA ---

const PROPERTY_TYPES: PropertyType[] = [
    { id: '1', name: 'Apartment', iconUri: 'https://cdn-icons-png.flaticon.com/512/1018/1018573.png' },
    { id: '2', name: 'Houses', iconUri: 'https://cdn-icons-png.flaticon.com/512/609/609803.png' },
    { id: '3', name: 'Villa', iconUri: 'https://cdn-icons-png.flaticon.com/512/2230/2230477.png' },
    { id: '4', name: 'Duplex', iconUri: 'https://cdn-icons-png.flaticon.com/512/263/263115.png' },
    { id: '5', name: 'Studios', iconUri: 'https://cdn-icons-png.flaticon.com/512/2413/2413056.png' },
    { id: '6', name: 'Single Room', iconUri: 'https://cdn-icons-png.flaticon.com/512/3030/3030336.png' },
    { id: '7', name: 'Plot', iconUri: 'https://cdn-icons-png.flaticon.com/512/9432/9432884.png' },
    { id: '8', name: 'Office', iconUri: 'https://cdn-icons-png.flaticon.com/512/709/709699.png' },
];

const INITIAL_PROJECTS: PropertyData[] = [
  {
    id: "1",
    imageUri: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop",
    price: "₹ 1 Cr-2.5 Cr",
    title: "Kdms Skywalk",
    location: "Nh-8 Jaipur, Jaipur",
  },
  {
    id: "2",
    imageUri: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop",
    price: "₹ 50L - 80L",
    title: "Royal Residency",
    location: "Mansarovar, Jaipur",
  },
  {
    id: "3",
    imageUri: "https://images.unsplash.com/photo-1600596542815-60002d23966d?q=80&w=400&auto=format&fit=crop",
    price: "₹ 2 Cr+",
    title: "Luxury Heights",
    location: "Vaishali Nagar, Jaipur",
  },
];

const INITIAL_LOCALITIES: LocalityData[] = [
  {
    id: "1",
    imageUri: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=400&auto=format&fit=crop",
    locality: "Mansarovar",
    ratingText: "4.8 (85 Ratings)",
    pricePerSqFt: "₹10.5K/sq.ft.",
  },
  {
    id: "2",
    imageUri: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=400&auto=format&fit=crop",
    locality: "Jagatpura",
    ratingText: "4.6 (120 Ratings)",
    pricePerSqFt: "₹8.2K/sq.ft.",
  },
  {
    id: "3",
    imageUri: "https://images.unsplash.com/photo-1512453979798-5ea904f47f45?q=80&w=400&auto=format&fit=crop",
    locality: "Vaishali Nagar",
    ratingText: "4.9 (200 Ratings)",
    pricePerSqFt: "₹12.5K/sq.ft.",
  },
];

// --- 3. Reusable UI Components ---

const PropertyTypeCard = ({ item, onPress }: { item: PropertyType, onPress: () => void }) => (
    <TouchableOpacity style={homeStyles.typeCard} onPress={onPress}>
        <View style={homeStyles.typeIconContainer}>
            <Image source={{ uri: item.iconUri }} style={homeStyles.typeIcon} resizeMode="contain" />
        </View>
        <Text style={homeStyles.typeText}>{item.name}</Text>
    </TouchableOpacity>
);

const Rating = ({ ratingText }: { ratingText: string }) => (
  <View style={homeStyles.ratingContainer}>
    <Image
      source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png" }}
      style={{ width: 16, height: 16, marginRight: 6, tintColor: '#FFDD32' }}
    />
    <Text style={{ color: "#FFDD32", fontSize: 14, fontWeight: '600' }}>{ratingText}</Text>
  </View>
);

const PropertyCard = ({ item }: { item: PropertyData }) => (
  <TouchableOpacity style={homeStyles.propertyCard} onPress={() => Alert.alert("Property", item.title)}>
    <Image
      source={{ uri: item.imageUri }}
      resizeMode="cover"
      style={homeStyles.propertyImage}
    />
    <Text style={homeStyles.cardPrice}>{item.price}</Text>
    <Text style={homeStyles.cardTitle}>{item.title}</Text>
    <Text style={homeStyles.cardLocation}>{item.location}</Text>
  </TouchableOpacity>
);

const LocalityCard = ({ item }: { item: LocalityData }) => (
  <View style={homeStyles.localityCard}>
    <Image
      source={{ uri: item.imageUri }}
      resizeMode="cover"
      style={homeStyles.localityImage}
    />
    <View style={{ flex: 1 }}>
      <Text style={homeStyles.cardTitle}>{item.locality}</Text>
      <Rating ratingText={item.ratingText} />
      <Text style={homeStyles.cardLocation}>{item.pricePerSqFt}</Text>
      <TouchableOpacity style={homeStyles.readReviewBtn} onPress={() => Alert.alert("Reviews", item.locality)}>
        <Text style={{ color: "#FFDD32", fontSize: 14, marginRight: 3 }}>Read all reviews</Text>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271228.png" }}
          style={{ width: 14, height: 14, tintColor: '#FFDD32' }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const FilterSortMapButton = ({ label, iconUri, onPress }: { label: string, iconUri: string, onPress: () => void }) => (
  <TouchableOpacity style={homeStyles.filterBtn} onPress={onPress}>
    <Image source={{ uri: iconUri }} resizeMode="stretch" style={homeStyles.filterIcon} />
    <Text style={{ color: "#000000", fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);

// --- 4. POPUP COMPONENTS ---

// NEW: Profile Modal Component
const ProfileModal = ({ visible, onClose }: ProfileModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={profileStyles.overlay}>
                <View style={profileStyles.card}>
                    
                    {/* Header with Close Button */}
                    <View style={profileStyles.headerRow}>
                        <Text style={profileStyles.headerTitle}>Your Profile</Text>
                        <TouchableOpacity onPress={onClose} style={profileStyles.closeButton}>
                             <Image 
                                source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828774.png" }} 
                                style={{ width: 14, height: 14, tintColor: '#555' }} 
                             />
                        </TouchableOpacity>
                    </View>

                    <View style={profileStyles.divider} />

                    {/* Profile Image & Name */}
                    <View style={profileStyles.profileHeader}>
                         <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/cg8wzhtu_expires_30_days.png" }}
                            style={profileStyles.avatar}
                            resizeMode="stretch"
                        />
                        <Text style={profileStyles.userName}>Zenab Vxuh</Text>
                    </View>

                    {/* Info Section */}
                    <View style={profileStyles.infoSection}>
                         <Text style={profileStyles.infoTitle}>Personal Information</Text>
                         
                         {/* Rows */}
                         <View style={profileStyles.infoRow}>
                            <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/slok695z_expires_30_days.png" }} style={profileStyles.infoIcon} />
                            <Text style={profileStyles.infoText}>998765XXX</Text>
                         </View>

                         <View style={profileStyles.infoRow}>
                            <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/711kuhn8_expires_30_days.png" }} style={profileStyles.infoIcon} />
                            <Text style={profileStyles.infoText}>XYZ@gmail.com</Text>
                         </View>

                         <View style={profileStyles.infoRow}>
                            <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/fxq8h3wv_expires_30_days.png" }} style={profileStyles.infoIcon} />
                            <Text style={profileStyles.infoText}>15 Dec 1987</Text>
                         </View>

                         <View style={profileStyles.infoRow}>
                            <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/buug82qi_expires_30_days.png" }} style={profileStyles.infoIcon} />
                            <Text style={profileStyles.infoText}>Female</Text>
                         </View>

                         <View style={profileStyles.infoRow}>
                            <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/nbnqxw5h_expires_30_days.png" }} style={profileStyles.infoIcon} />
                            <Text style={profileStyles.infoText}>Malviya Nagar, Jaipur</Text>
                         </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// --- 5. SCREENS ---

const AllPropertyTypesScreen = ({ onBack }: { onBack: () => void }) => (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={homeStyles.yellowHeader} />
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
            <TouchableOpacity onPress={onBack} style={{ marginRight: 10 }}>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>All Property Types</Text>
        </View>
        <FlatList 
            data={PROPERTY_TYPES}
            numColumns={3}
            contentContainerStyle={{ padding: 10 }}
            renderItem={({ item }) => (
                <View style={{ flex: 1, margin: 5 }}>
                    <PropertyTypeCard item={item} onPress={() => Alert.alert("Selected", item.name)} />
                </View>
            )}
            keyExtractor={item => item.id}
        />
    </View>
);

type HomeContentNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'HomeRent'>;

const HomeContent = ({ onProfilePress, onNotificationPress, onSeeAllTypes }: HomeContentProps) => {
  const navigation = useNavigation<HomeContentNavigationProp>();
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(INITIAL_PROJECTS);
  const [filteredLocalities, setFilteredLocalities] = useState(INITIAL_LOCALITIES);

  useEffect(() => {
    const lowerText = searchText.toLowerCase();
    setFilteredProjects(
      INITIAL_PROJECTS.filter(p => p.title.toLowerCase().includes(lowerText) || p.location.toLowerCase().includes(lowerText))
    );
    setFilteredLocalities(
      INITIAL_LOCALITIES.filter(l => l.locality.toLowerCase().includes(lowerText))
    );

    // Check if search text is "jaipur" (case insensitive)
    if (lowerText === 'jaipur') {
      navigation.navigate('PropertyList', { searchQuery: searchText });
    }
  }, [searchText, navigation]);

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: "#FFFFFF" }} 
      contentContainerStyle={{ paddingBottom: 120 }} 
      showsVerticalScrollIndicator={false}
    >
      <View style={homeStyles.yellowHeader} />

      {/* Greeting & Notification */}
      <View style={homeStyles.greetingRow}>
        <TouchableOpacity 
            style={{ flexDirection: "row", alignItems: "center" }} 
            onPress={onProfilePress}
            activeOpacity={0.7}
        >
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/y72puj28_expires_30_days.png" }}
            resizeMode="stretch"
            style={{ width: 30, height: 30, marginRight: 4 }}
          />
          <Text style={{ color: "#000000", fontSize: 12, fontWeight: "bold" }}>Hi Zenab!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNotificationPress} activeOpacity={0.7}>
            <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/7yzq1h7o_expires_30_days.png" }}
            resizeMode="stretch"
            style={{ width: 85, height: 38 }}
            />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={homeStyles.actionRow}>
        <FilterSortMapButton label="Filter" iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/2vrimqtw_expires_30_days.png" onPress={() => Alert.alert("Filter")} />
        <FilterSortMapButton label="Sort" iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/91dq2k06_expires_30_days.png" onPress={() => Alert.alert("Sort")} />
        <FilterSortMapButton label="Map" iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/lecyldks_expires_30_days.png" onPress={() => Alert.alert("Map")} />
      </View>

      {/* Search Bar */}
      <View style={homeStyles.searchBar}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/54/54481.png" }}
          style={{ width: 20, height: 20, marginLeft: 12, marginRight: 8, tintColor: '#979797' }}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Search city, locality, landmark..."
          placeholderTextColor="#979797"
          value={searchText}
          onChangeText={setSearchText}
          style={{ flex: 1, color: "#000", fontSize: 14, paddingVertical: 12 }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
            {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                    <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/2976/2976286.png" }}
                    style={{ width: 16, height: 16, marginRight: 10, tintColor: '#999' }}
                    />
                </TouchableOpacity>
            )}
            <View style={{ width: 1, height: 20, backgroundColor: '#DDD', marginRight: 10 }} />
            <TouchableOpacity onPress={() => Alert.alert("Location", "Using current location")}>
                 <Image 
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/684/684908.png" }}
                    style={{ width: 22, height: 22, tintColor: '#FFDD32' }}
                    resizeMode="contain"
                 />
            </TouchableOpacity>
        </View>
      </View>

      {/* SELECT PROPERTY TYPE SECTION */}
      <View style={{ marginBottom: 24 }}>
        <View style={homeStyles.sectionHeader}>
          <Text style={[homeStyles.sectionTitle, { marginLeft: 16 }]}>Select Property Type</Text>
          <TouchableOpacity onPress={onSeeAllTypes}>
             <Text style={homeStyles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
            data={PROPERTY_TYPES}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
            renderItem={({ item }) => (
                <PropertyTypeCard 
                    item={item} 
                    onPress={() => Alert.alert("Selected Type", item.name)} 
                />
            )}
            keyExtractor={item => item.id}
        />
      </View>

      {/* High Demand Projects */}
      <View style={{ height: 270, marginBottom: 24, marginHorizontal: 9 }}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>High Demand Projects</Text>
          <TouchableOpacity onPress={() => Alert.alert("See All")}>
            <Text style={homeStyles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredProjects}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <PropertyCard item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingLeft: 9 }}
        />
      </View>

      {/* Best Rated Localities */}
      <View style={{ marginBottom: 24, marginHorizontal: 9 }}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>Best Rated Localities</Text>
          <TouchableOpacity onPress={() => Alert.alert("See All")}>
            <Text style={homeStyles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredLocalities}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <LocalityCard item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingLeft: 9 }}
        />
      </View>
    </ScrollView>
  );
};

const PlaceholderScreen = ({ title }: { title: string }) => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFDD32'}}>{title}</Text>
        <Text style={{color: '#999', marginTop: 10}}>Screen under construction</Text>
    </View>
);

const HomeRentScreen = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [showAllTypes, setShowAllTypes] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  
  // State for Profile Modal
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const handleProfileClick = () => {
      // Show the Modal instead of navigating
      setProfileModalVisible(true);
  };

  const handleNotificationClick = () => Alert.alert("Notifications", "You have 3 new property recommendations!");

  const renderScreen = () => {
      if (activeTab === "Home" && showAllTypes) {
          return <AllPropertyTypesScreen onBack={() => setShowAllTypes(false)} />;
      }

      switch(activeTab) {
          case "Home": 
            return (
                <HomeContent 
                    onProfilePress={handleProfileClick} 
                    onNotificationPress={handleNotificationClick}
                    onSeeAllTypes={() => setShowAllTypes(true)}
                />
            );
          case "Lists": return <PlaceholderScreen title="My Lists" />;
          case "Saved": return <PlaceholderScreen title="Saved Properties" />;
          case "Payment": return <PlaceholderScreen title="Payments" />;
          case "Account": return <PlaceholderScreen title="My Account" />;
          default: return <HomeContent onProfilePress={handleProfileClick} onNotificationPress={handleNotificationClick} onSeeAllTypes={() => setShowAllTypes(true)} />;
      }
  };

  const tabs = [
      { 
        name: "Home", 
        icon: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
        onPress: () => {
          setActiveTab("Home");
          setShowAllTypes(false);
        }
      },
      { 
        name: "Lists", 
        icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/np8e1cjb_expires_30_days.png",
        onPress: () => navigation.navigate('Lists')
      },
      { 
        name: "Saved", 
        icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/y6l2pvxu_expires_30_days.png",
        onPress: () => setActiveTab("Saved")
      },
      { 
        name: "Payment", 
        icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/feksi6gx_expires_30_days.png",
        onPress: () => setActiveTab("Payment")
      },
      { 
        name: "Account", 
        icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/ht8icv1v_expires_30_days.png",
        onPress: () => setActiveTab("Account")
      },
  ];

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={{ flex: 1 }}>
                {renderScreen()}
            </View>

            {/* Bottom Navigation */}
            <View style={homeStyles.bottomNav}>
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab.name && !showAllTypes; 
                    return (
                        <TouchableOpacity 
                            key={index} 
                            style={homeStyles.navItem} 
                            onPress={tab.onPress}
                            activeOpacity={0.8}
                        >
                            <Image 
                                source={{ uri: tab.icon }} 
                                style={{ 
                                    width: 24, 
                                    height: 24, 
                                    marginBottom: 4, 
                                    opacity: isActive ? 1 : 0.6,
                                    tintColor: '#FFF'
                                }} 
                                resizeMode="contain" 
                            />
                            <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: isActive ? "bold" : "normal" }}>
                                {tab.name}
                            </Text>
                            {isActive && <View style={{width: 4, height: 4, backgroundColor: '#fff', borderRadius: 2, marginTop: 2}} />}
                        </TouchableOpacity>
                    )
                })}
            </View>

            {/* Profile Popup Modal */}
            <ProfileModal 
                visible={profileModalVisible} 
                onClose={() => setProfileModalVisible(false)} 
            />

        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
export default HomeRentScreen;