import React, { useState } from "react";
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
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";

// Dummy Data for functionality
const INITIAL_SAVED_PROPERTIES = [
    {
        id: '1',
        title: "Kdms Skywalk",
        price: "₹40-50K",
        location: "Nirman Nagar Jaipur 302006",
        imageUri: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop"
    },
    {
        id: '2',
        title: "Royal Residency",
        price: "₹25-35K",
        location: "Vaishali Nagar Jaipur",
        imageUri: "https://images.unsplash.com/photo-1600596542815-60002d23966d?q=80&w=400&auto=format&fit=crop"
    }
];

const SavedScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState("Saved");
  
  // State for functional features
  const [savedList, setSavedList] = useState(INITIAL_SAVED_PROPERTIES);
  const [activeSort, setActiveSort] = useState("Recently Added");

  // handlers
  const handleRemove = (id: string) => {
      Alert.alert(
          "Remove Property",
          "Are you sure you want to remove this from saved?",
          [
              { text: "Cancel", style: "cancel" },
              { 
                  text: "Remove", 
                  style: 'destructive', 
                  onPress: () => setSavedList(prev => prev.filter(item => item.id !== id)) 
              }
          ]
      );
  };

  const handleExplore = () => {
      navigation.navigate('Saved1');
  };

  const handleBack = () => {
      navigation.goBack();
  };

  const tabs = [
      { name: "Home", icon: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png" },
      { name: "Lists", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/np8e1cjb_expires_30_days.png" },
      { name: "Saved", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/y6l2pvxu_expires_30_days.png" },
      { name: "Payment", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/feksi6gx_expires_30_days.png" },
      { name: "Account", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/ht8icv1v_expires_30_days.png" },
  ];

  const sortOptions = ["Price", "Location", "Recently Added", "Type"];

  return (
    <>
    {/* Top Status Bar Background */}
    <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />
    
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
                
                {/* Yellow Header Block */}
                <View style={styles.yellowHeader} />

                {/* Header Row with Back Button */}
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} // Simple Back Arrow
                            resizeMode={"contain"}
                            style={styles.backArrow}
                        />
                        <Text style={styles.backText}>{"Back"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Saved Properties</Text>
                    <View style={{width: 60}} /> {/* Spacer for centering */}
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/54/54481.png" }}
                        style={{ width: 20, height: 20, marginLeft: 12, marginRight: 8, tintColor: '#979797' }}
                        resizeMode="contain"
                    />
                    <TextInput
                        placeholder="Search saved properties..."
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
                        <TouchableOpacity onPress={() => Alert.alert("Location", "Showing saved locations on map")}>
                            <Image 
                                source={{ uri: "https://cdn-icons-png.flaticon.com/512/684/684908.png" }}
                                style={{ width: 22, height: 22, tintColor: '#FFDD32' }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Property List (Dynamic) */}
                {savedList.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No saved properties found.</Text>
                    </View>
                ) : (
                    savedList
                        .filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))
                        .map((item) => (
                        <View key={item.id} style={styles.propertyCard}>
                            
                            {/* Image Container with Heart Overlay */}
                            <View>
                                <Image
                                    source={{ uri: item.imageUri }}
                                    resizeMode={"cover"}
                                    style={styles.propertyImage}
                                />
                                <View style={styles.heartContainer}>
                                    <Image 
                                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/833/833472.png" }} // Red Heart
                                        style={styles.heartIcon}
                                    />
                                </View>
                            </View>

                            <View style={styles.column}>
                                <Text style={styles.propertyTitle}>{item.title}</Text>
                                <Text style={styles.propertyPrice}>{item.price}</Text>
                                
                                <View style={styles.locationRow}>
                                    <Image
                                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/684/684908.png" }}
                                        resizeMode={"contain"}
                                        style={styles.pinIcon}
                                    />
                                    <Text style={styles.locationText}>{item.location}</Text>
                                </View>

                                <View style={styles.actionButtonsRow}>
                                    <TouchableOpacity style={styles.savedBtn} onPress={() => Alert.alert("Info", "Already Saved!")}>
                                        <Text style={styles.btnText}>{"Saved"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.id)}>
                                        <Text style={styles.btnTextWhite}>{"Remove"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                )}

                {/* Functional Sort Section */}
                <View style={styles.sortSection}>
                    <Text style={styles.sortLabel}>{"Sort By:"}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortScroll}>
                        {sortOptions.map((option) => (
                            <TouchableOpacity 
                                key={option} 
                                style={[
                                    styles.sortBtn, 
                                    activeSort === option && styles.sortBtnActive
                                ]}
                                onPress={() => setActiveSort(option)}
                            >
                                <Text style={[
                                    styles.sortBtnText, 
                                    activeSort === option && styles.sortBtnTextActive
                                ]}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Explore Button */}
                <TouchableOpacity style={styles.exploreBtn} onPress={handleExplore}>
                    <Text style={styles.exploreText}>{"Explore More properties"}</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>

        {/* Sticky Bottom Navigation */}
        <View style={styles.bottomNav}>
            {tabs.map((tab, index) => {
                const isActive = activeTab === tab.name;
                return (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.navItem} 
                        onPress={() => setActiveTab(tab.name)}
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

      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
}

export default SavedScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  
  // Header Styles
  yellowHeader: {
      width: '100%',
      height: 20,
      backgroundColor: '#FFDD32',
      marginBottom: 10
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 16,
    marginTop: 20, 
  },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backArrow: { width: 20, height: 20, marginRight: 8 },
  backText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },

  // Search Bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#979797",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    height: 50,
  },

  // Empty State
  emptyState: {
      alignItems: 'center',
      marginVertical: 20,
  },
  emptyText: {
      fontSize: 16,
      color: '#999',
      fontStyle: 'italic'
  },

  // Property Card
  propertyCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#eee",
  },
  propertyImage: { width: 100, height: 100, borderRadius: 10, marginRight: 15 },
  
  // Heart Icon Styles
  heartContainer: {
      position: 'absolute',
      top: 5,
      right: 20, // Positioned on the right side of the image
      backgroundColor: 'rgba(255,255,255,0.7)',
      borderRadius: 12,
      padding: 4,
  },
  heartIcon: {
      width: 14,
      height: 14,
      tintColor: 'red', // Ensures the heart is red
  },

  column: { flex: 1, justifyContent: "space-around" },
  propertyTitle: { fontSize: 16, fontWeight: "bold", color: "#000" },
  propertyPrice: { fontSize: 14, fontWeight: "bold", color: "#FFDD32", marginBottom: 5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pinIcon: { width: 12, height: 12, marginRight: 5, tintColor: '#777' },
  locationText: { fontSize: 12, color: "#777" },
  
  actionButtonsRow: { flexDirection: 'row' },
  savedBtn: {
      backgroundColor: '#FFDD32',
      paddingVertical: 6,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginRight: 10
  },
  removeBtn: {
      backgroundColor: '#000',
      paddingVertical: 6,
      paddingHorizontal: 15,
      borderRadius: 20
  },
  btnText: { fontSize: 12, fontWeight: 'bold', color: '#000' },
  btnTextWhite: { fontSize: 12, fontWeight: 'bold', color: '#fff' },

  // Sort Section
  sortSection: { marginHorizontal: 16, marginBottom: 20 },
  sortLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  sortScroll: { flexDirection: 'row' },
  sortBtn: {
      borderWidth: 1,
      borderColor: '#FFDD32',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: '#fff'
  },
  sortBtnActive: {
      backgroundColor: '#FFDD32',
  },
  sortBtnText: { fontSize: 12, fontWeight: '600', color: '#000' },
  sortBtnTextActive: { fontWeight: 'bold' },

  // Explore Button
  exploreBtn: {
      marginHorizontal: 16,
      backgroundColor: "#FFDD32",
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20
  },
  exploreText: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  // Navigation Styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    backgroundColor: "#FFDD32",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12 
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    height: 50
  },
});