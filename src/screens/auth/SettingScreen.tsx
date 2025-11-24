import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Switch,
  Alert,
  LayoutAnimation,
  UIManager
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Enable Layout Animation
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');

// --- ASSETS ---
const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    user: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop",
    arrowRight: "https://cdn-icons-png.flaticon.com/512/271/271228.png",
    
    // Icons
    profile: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    theme: "https://cdn-icons-png.flaticon.com/512/1608/1608912.png", // Moon/Sun
    security: "https://cdn-icons-png.flaticon.com/512/2092/2092663.png", // Shield
    help: "https://cdn-icons-png.flaticon.com/512/471/471664.png", // Question
    language: "https://cdn-icons-png.flaticon.com/512/3898/3898150.png", // Globe
    
    // Theme Icons
    sun: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    moon: "https://cdn-icons-png.flaticon.com/512/547/547433.png",
};

export default function SettingsScreen() {
  const navigation = useNavigation();
  
  // State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  // Handlers
  const toggleTheme = (mode: boolean) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsDarkMode(mode);
  };

  const handleLanguage = () => {
      Alert.alert(
          "Select Language",
          "Choose your preferred language",
          [
              { text: "English", onPress: () => setLanguage("English") },
              { text: "Spanish", onPress: () => setLanguage("Spanish") },
              { text: "Hindi", onPress: () => setLanguage("Hindi") },
              { text: "Cancel", style: "cancel" }
          ]
      );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" translucent />
      
      {/* Header Background */}
      <View style={styles.yellowBackground} />

      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={{ uri: ASSETS.back }} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
            <View style={{width: 24}} /> 
        </View>

        <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
        >

            {/* 1. Profile Snippet */}
            <TouchableOpacity style={styles.profileCard} activeOpacity={0.9} onPress={() => Alert.alert("Profile", "Go to Edit Profile")}>
                <Image source={{ uri: ASSETS.user }} style={styles.avatar} />
                <View style={styles.profileInfo}>
                    <Text style={styles.userName}>Zenab Vxuh</Text>
                    <Text style={styles.viewProfile}>View Profile</Text>
                </View>
                <Image source={{ uri: ASSETS.arrowRight }} style={styles.chevron} />
            </TouchableOpacity>

            {/* 2. Account Section */}
            <Text style={styles.sectionHeader}>Account</Text>
            <View style={styles.settingsGroup}>
                <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Personal Info")}>
                    <View style={[styles.iconBox, {backgroundColor: '#E3F2FD'}]}>
                        <Image source={{ uri: ASSETS.profile }} style={[styles.settingIcon, {tintColor: '#1976D2'}]} />
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Personal Information</Text>
                        <Text style={styles.settingSub}>Manage your account details</Text>
                    </View>
                    <Image source={{ uri: ASSETS.arrowRight }} style={styles.chevron} />
                </TouchableOpacity>
            </View>

            {/* 3. General Section */}
            <Text style={styles.sectionHeader}>General</Text>
            <View style={styles.settingsGroup}>
                
                {/* Theme Switcher */}
                <View style={styles.settingItem}>
                    <View style={[styles.iconBox, {backgroundColor: '#FFF3E0'}]}>
                        <Image source={{ uri: ASSETS.theme }} style={[styles.settingIcon, {tintColor: '#F57C00'}]} />
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Theme</Text>
                    </View>
                    
                    {/* Custom Segmented Control */}
                    <View style={styles.themeToggleContainer}>
                        <TouchableOpacity 
                            style={[styles.themeBtn, !isDarkMode && styles.themeBtnActive]} 
                            onPress={() => toggleTheme(false)}
                        >
                            <Image source={{ uri: ASSETS.sun }} style={[styles.themeIcon, !isDarkMode && {tintColor: '#000'}]} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.themeBtn, isDarkMode && styles.themeBtnActive]} 
                            onPress={() => toggleTheme(true)}
                        >
                            <Image source={{ uri: ASSETS.moon }} style={[styles.themeIcon, isDarkMode && {tintColor: '#FFF'}]} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Security */}
                <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Security")}>
                    <View style={[styles.iconBox, {backgroundColor: '#E8F5E9'}]}>
                        <Image source={{ uri: ASSETS.security }} style={[styles.settingIcon, {tintColor: '#388E3C'}]} />
                    </View>
                    <Text style={styles.settingTitle}>Security</Text>
                    <Image source={{ uri: ASSETS.arrowRight }} style={styles.chevron} />
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Help Centre */}
                <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Help")}>
                    <View style={[styles.iconBox, {backgroundColor: '#F3E5F5'}]}>
                        <Image source={{ uri: ASSETS.help }} style={[styles.settingIcon, {tintColor: '#7B1FA2'}]} />
                    </View>
                    <Text style={styles.settingTitle}>Help Centre</Text>
                    <Image source={{ uri: ASSETS.arrowRight }} style={styles.chevron} />
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Language */}
                <TouchableOpacity style={styles.settingItem} onPress={handleLanguage}>
                    <View style={[styles.iconBox, {backgroundColor: '#E0F7FA'}]}>
                        <Image source={{ uri: ASSETS.language }} style={[styles.settingIcon, {tintColor: '#0097A7'}]} />
                    </View>
                    <Text style={styles.settingTitle}>Language</Text>
                    <View style={styles.languageBadge}>
                        <Text style={styles.languageText}>{language}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* App Version */}
            <Text style={styles.versionText}>Version 2.4.0</Text>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F9F9F9" },
  
  yellowBackground: { 
      position: 'absolute', top: 0, left: 0, right: 0, height: 250, 
      backgroundColor: '#FFDD32', 
      borderBottomLeftRadius: 30, borderBottomRightRadius: 30 
  },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  
  // Header
  header: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
      paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15
  },
  backButton: { padding: 5, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 12 },
  backIcon: { width: 24, height: 24, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Profile Card
  profileCard: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: '#FFF', borderRadius: 20, padding: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
      marginBottom: 25, marginTop: 10
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  profileInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  viewProfile: { fontSize: 14, color: '#FFDD32', fontWeight: 'bold', marginTop: 2 },

  // Sections
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#666', marginBottom: 10, marginLeft: 5, textTransform: 'uppercase' },
  
  settingsGroup: {
      backgroundColor: '#FFF', borderRadius: 20, padding: 5, marginBottom: 25,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  settingItem: {
      flexDirection: 'row', alignItems: 'center', padding: 15,
  },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  settingIcon: { width: 20, height: 20 },
  settingTextContainer: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1 },
  settingSub: { fontSize: 12, color: '#999', marginTop: 2 },
  chevron: { width: 16, height: 16, tintColor: '#CCC' },
  divider: { height: 1, backgroundColor: '#F5F5F5', marginLeft: 70, marginRight: 20 },

  // Theme Toggle
  themeToggleContainer: {
      flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 20, padding: 3
  },
  themeBtn: { width: 36, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  themeBtnActive: { backgroundColor: '#000' }, // Active is black
  themeIcon: { width: 16, height: 16, tintColor: '#999' }, // Inactive is grey

  // Language Badge
  languageBadge: { backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  languageText: { fontSize: 13, fontWeight: 'bold', color: '#333' },

  // Version
  versionText: { textAlign: 'center', color: '#CCC', fontSize: 12, marginTop: 10, marginBottom: 20 }
});