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

// --- PROFESSIONAL MONOCHROME ASSETS ---
const ASSETS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    user: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&auto=format&fit=crop",
    chevronRight: "https://cdn-icons-png.flaticon.com/512/271/271228.png",
    
    // Line Icons (Clean & Professional)
    profile: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    
    // UPDATED: Professional Icons
    theme: "https://img.icons8.com/ios/50/000000/paint-palette.png", // Paint Palette for Appearance
    language: "https://img.icons8.com/ios/50/000000/translation.png", // Translation symbol for Language
    
    security: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png", // Lock
    help: "https://cdn-icons-png.flaticon.com/512/471/471664.png", // Question Circle
    notification: "https://cdn-icons-png.flaticon.com/512/3602/3602145.png", // Bell
    
    // UPDATED: Theme Toggle Icons (Clean Line Art)
    sun: "https://img.icons8.com/ios/50/000000/sun--v1.png",
    moon: "https://img.icons8.com/ios/50/000000/moon-symbol.png",
};

export default function SettingsScreen() {
  const navigation = useNavigation();
  
  // State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
                    <Text style={styles.userRole}>Premium Member</Text>
                </View>
                <View style={styles.editBadge}>
                    <Text style={styles.editText}>Edit</Text>
                </View>
            </TouchableOpacity>

            {/* 2. Account Section */}
            <Text style={styles.sectionHeader}>Account</Text>
            <View style={styles.settingsGroup}>
                
                <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Personal Info")}>
                    <View style={styles.iconBox}>
                        <Image source={{ uri: ASSETS.profile }} style={styles.settingIcon} />
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Personal Information</Text>
                    </View>
                    <Image source={{ uri: ASSETS.chevronRight }} style={styles.chevron} />
                </TouchableOpacity>
                
                <View style={styles.divider} />

                <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Security")}>
                    <View style={styles.iconBox}>
                        <Image source={{ uri: ASSETS.security }} style={styles.settingIcon} />
                    </View>
                    <Text style={styles.settingTitle}>Security & Login</Text>
                    <Image source={{ uri: ASSETS.chevronRight }} style={styles.chevron} />
                </TouchableOpacity>

            </View>

            {/* 3. Preferences Section */}
            <Text style={styles.sectionHeader}>Preferences</Text>
            <View style={styles.settingsGroup}>
                
                {/* Notifications Toggle */}
                <View style={styles.settingItem}>
                    <View style={styles.iconBox}>
                        <Image source={{ uri: ASSETS.notification }} style={styles.settingIcon} />
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Notifications</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                        style={[styles.toggleTrack, notificationsEnabled && styles.toggleTrackActive]}
                    >
                        <View style={[styles.toggleThumb, notificationsEnabled && styles.toggleThumbActive]} />
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Theme Switcher */}
                <View style={styles.settingItem}>
                    <View style={styles.iconBox}>
                        <Image source={{ uri: ASSETS.theme }} style={styles.settingIcon} />
                    </View>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Appearance</Text>
                    </View>
                    
                    {/* Segmented Control */}
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

                {/* Language */}
                <TouchableOpacity style={styles.settingItem} onPress={handleLanguage}>
                    <View style={styles.iconBox}>
                        <Image source={{ uri: ASSETS.language }} style={styles.settingIcon} />
                    </View>
                    <Text style={styles.settingTitle}>Language</Text>
                    <View style={styles.languageBadge}>
                        <Text style={styles.languageText}>{language}</Text>
                    </View>
                    <Image source={{ uri: ASSETS.chevronRight }} style={styles.chevron} />
                </TouchableOpacity>
            </View>

            {/* 4. Support Section */}
            <Text style={styles.sectionHeader}>Support</Text>
            <View style={styles.settingsGroup}>
                 <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Help")}>
                    <View style={styles.iconBox}>
                        <Image source={{ uri: ASSETS.help }} style={styles.settingIcon} />
                    </View>
                    <Text style={styles.settingTitle}>Help Centre</Text>
                    <Image source={{ uri: ASSETS.chevronRight }} style={styles.chevron} />
                </TouchableOpacity>
            </View>

            {/* App Version */}
            <Text style={styles.versionText}>App Version 2.4.0</Text>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#F5F7FA" },
  
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
  backButton: { padding: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 12 },
  backIcon: { width: 20, height: 20, tintColor: '#000' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Profile Card
  profileCard: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: '#FFF', borderRadius: 16, padding: 16,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
      marginBottom: 25, marginTop: 10,
      borderWidth: 1, borderColor: 'rgba(0,0,0,0.02)'
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 15 },
  profileInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  userRole: { fontSize: 13, color: '#666', marginTop: 2 },
  editBadge: { backgroundColor: '#F5F7FA', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  editText: { fontSize: 12, fontWeight: '600', color: '#333' },

  // Sections
  sectionHeader: { fontSize: 13, fontWeight: '700', color: '#888', marginBottom: 10, marginLeft: 5, textTransform: 'uppercase', letterSpacing: 0.5 },
  
  settingsGroup: {
      backgroundColor: '#FFF', borderRadius: 16, overflow: 'hidden', marginBottom: 25,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 2,
      borderWidth: 1, borderColor: 'rgba(0,0,0,0.02)'
  },
  settingItem: {
      flexDirection: 'row', alignItems: 'center', padding: 16, height: 64
  },
  
  // Professional Icon Styling
  iconBox: { 
      width: 36, height: 36, borderRadius: 10, 
      justifyContent: 'center', alignItems: 'center', marginRight: 15,
      backgroundColor: '#F5F7FA' // Clean gray background for all icons
  },
  settingIcon: { width: 20, height: 20, tintColor: '#333' }, // Dark grey tint for professional look
  
  settingTextContainer: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: '600', color: '#111', flex: 1 },
  settingSub: { fontSize: 12, color: '#999', marginTop: 2 },
  chevron: { width: 16, height: 16, tintColor: '#CCC' },
  divider: { height: 1, backgroundColor: '#F5F7FA', marginLeft: 66, marginRight: 20 },

  // Theme Toggle
  themeToggleContainer: {
      flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 20, padding: 2
  },
  themeBtn: { width: 34, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  themeBtnActive: { backgroundColor: '#FFF', shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }, // Active is white card
  themeIcon: { width: 16, height: 16, tintColor: '#999' }, 

  // Simple Switch
  toggleTrack: { width: 44, height: 24, borderRadius: 12, backgroundColor: '#E0E0E0', padding: 2 },
  toggleTrackActive: { backgroundColor: '#FFDD32' },
  toggleThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF' },
  toggleThumbActive: { alignSelf: 'flex-end' },

  // Language Badge
  languageBadge: { marginRight: 10 },
  languageText: { fontSize: 14, color: '#666', fontWeight: '500' },

  // Version
  versionText: { textAlign: 'center', color: '#CCC', fontSize: 12, marginTop: 10, marginBottom: 30 }
});