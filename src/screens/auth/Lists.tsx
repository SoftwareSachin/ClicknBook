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
  Alert,
  Modal,
  FlatList
} from "react-native";

// --- Data ---
const COUNTRIES = [
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
];

export default (props: any) => {
  // Form State
  const [ownerName, setOwnerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  
  // Functional Logic State
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); 
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState("Lists");
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleContinue = () => {
      if (!ownerName || !mobileNumber || !propertyType || !locality) {
          Alert.alert("Missing Information", "Please fill in all required fields.");
          return;
      }
      if (!isTermsAccepted) {
          Alert.alert("Terms Not Accepted", "Please accept the terms and conditions to continue.");
          return;
      }
      // Navigate to VisitScheduled screen
      navigation.navigate('VisitScheduled');
  };

  const tabs = [
      { name: "Home", icon: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png" },
      { name: "Lists", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/np8e1cjb_expires_30_days.png" },
      { name: "Saved", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/y6l2pvxu_expires_30_days.png" },
      { name: "Payment", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/feksi6gx_expires_30_days.png" },
      { name: "Account", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/kwi0sLffHL/ht8icv1v_expires_30_days.png" },
  ];

  return (
    <>
    <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
                
                {/* Header: Yellow Top Bar */}
                <View style={styles.yellowHeader} />

                {/* Back Button & Title */}
                <View style={styles.titleRow}>
                    <TouchableOpacity onPress={() => Alert.alert("Back")}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/xcx4nj9u_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>{"Property Lists"}</Text>
                </View>

                {/* --- FORM FIELDS --- */}

                {/* 1. Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{"Name of Property Owner"}</Text>
                    <TextInput 
                        style={styles.inputBox} 
                        placeholder="Enter Owner Name"
                        placeholderTextColor="#999"
                        value={ownerName}
                        onChangeText={setOwnerName}
                    />
                </View>

                {/* 2. Mobile */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{"Mobile Number"}</Text>
                    <View style={styles.mobileRow}>
                        <TouchableOpacity style={styles.countryCodeBtn} onPress={() => setCountryModalVisible(true)}>
                            <Text style={styles.countryCodeText}>{selectedCountry.flag} {selectedCountry.code}</Text>
                            <Image
                                source={{ uri: "https://cdn-icons-png.flaticon.com/512/2985/2985150.png" }} 
                                style={styles.dropdownIcon}
                            />
                        </TouchableOpacity>
                        <TextInput
                            placeholder={"Mobile Number"}
                            placeholderTextColor="#999"
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            keyboardType="phone-pad"
                            style={styles.mobileInput}
                        />
                    </View>
                </View>

                {/* 3. Email */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{"Email ID"}</Text>
                    <TextInput 
                        style={styles.inputBox} 
                        placeholder="example@email.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                {/* 4. Property Type */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{"Select Property Type"}</Text>
                    <TextInput
                        placeholder={"Apartment/Individual"}
                        placeholderTextColor="#999"
                        value={propertyType}
                        onChangeText={setPropertyType}
                        style={styles.inputBox}
                    />
                </View>

                {/* 5. City */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{"Select Located City (Optional)"}</Text>
                    <TextInput 
                        style={styles.inputBox} 
                        placeholder="Enter City"
                        placeholderTextColor="#999"
                        value={city}
                        onChangeText={setCity}
                    />
                </View>

                {/* 6. Locality */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{"Search locality where property located"}</Text>
                    <TextInput 
                        style={styles.inputBox} 
                        placeholder="Enter Locality"
                        placeholderTextColor="#999"
                        value={locality}
                        onChangeText={setLocality}
                    />
                </View>

                {/* --- CUSTOM CHECKBOX & TERMS --- */}
                <View style={styles.termsRow}>
                    <TouchableOpacity 
                        onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                        style={styles.checkboxContainer}
                    >
                        {/* The Checkbox Visual */}
                        <View style={[
                            styles.checkboxBase, 
                            isTermsAccepted && styles.checkboxChecked
                        ]}>
                            {isTermsAccepted && <Text style={styles.checkboxTick}>✓</Text>}
                        </View>
                    </TouchableOpacity>
                    
                    <Text style={styles.termsText}>
                        {"By Signing Up, you agree to accept our Terms & Conditions and privacy policy."}
                    </Text>
                </View>

                {/* Continue Button */}
                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.continueText}>{"Continue"}</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>

        {/* Bottom Navigation */}
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

        {/* Country Picker Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={isCountryModalVisible}
            onRequestClose={() => setCountryModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Country</Text>
                        <TouchableOpacity onPress={() => setCountryModalVisible(false)}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5}}>✕</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        data={COUNTRIES}
                        keyExtractor={(item) => item.code + item.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.countryItem} 
                                onPress={() => {
                                    setSelectedCountry(item);
                                    setCountryModalVisible(false);
                                }}
                            >
                                <Text style={{fontSize: 24, marginRight: 15}}>{item.flag}</Text>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#333', width: 60}}>{item.code}</Text>
                                <Text style={{fontSize: 16, color: '#555'}}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>

      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  yellowHeader: {
      width: '100%',
      height: 20,
      backgroundColor: '#FFDD32',
      marginBottom: 10
  },
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 25,
    marginTop: 10,
  },
  backIcon: { width: 24, height: 24, marginRight: 15 },
  pageTitle: { fontSize: 20, fontWeight: "bold", color: "#000" },
  
  inputGroup: { marginBottom: 15, paddingHorizontal: 16 },
  label: { fontSize: 14, fontWeight: "bold", color: "#000", marginBottom: 8 },
  inputBox: {
      height: 50,
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 10,
      paddingHorizontal: 15,
      backgroundColor: "#F9F9F9",
      fontSize: 14,
      color: '#000'
  },
  mobileRow: { flexDirection: 'row', alignItems: 'center' },
  countryCodeBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 10,
      paddingHorizontal: 10,
      height: 50,
      backgroundColor: "#F9F9F9",
      marginRight: 10,
      minWidth: 85,
      justifyContent: 'space-between'
  },
  countryCodeText: { fontSize: 14, color: "#000", marginRight: 5 },
  dropdownIcon: { width: 12, height: 12, tintColor: '#666' },
  mobileInput: {
      flex: 1,
      height: 50,
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 10,
      paddingHorizontal: 15,
      backgroundColor: "#F9F9F9",
      fontSize: 14,
      color: '#000'
  },

  // --- Checkbox Styles ---
  termsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: 16,
      marginBottom: 25,
      marginTop: 10
  },
  checkboxContainer: {
      marginRight: 12,
      marginTop: 2
  },
  checkboxBase: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#999',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
  },
  checkboxChecked: {
      backgroundColor: '#FFDD32',
      borderColor: '#FFDD32',
  },
  checkboxTick: {
      color: '#000',
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: -2 // Center adjustment
  },
  termsText: { flex: 1, fontSize: 12, color: "#666", lineHeight: 18 },

  continueButton: {
      marginHorizontal: 16,
      backgroundColor: "#FFDD32",
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      elevation: 3,
  },
  continueText: { fontSize: 16, fontWeight: "bold", color: "#000" },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 20, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  countryItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }
});