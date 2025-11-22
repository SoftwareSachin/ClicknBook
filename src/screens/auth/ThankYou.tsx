import React from "react";
import { 
  SafeAreaView, 
  View, 
  ImageBackground, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet,
  GestureResponderEvent,
  StatusBar 
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

interface ThankYouProps {
  // Props can be added here if needed in the future
}

const ThankYou: React.FC<ThankYouProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  
  const handleBackToHome = () => {
    // Navigate to HomeRent and reset the navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeRent' }],
    });
  };
  return (
    <>
      {/* 1. Top Safe Area: Yellow Background for Status Bar */}
      <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />

      {/* 2. Main Safe Area: White Background */}
      <SafeAreaView style={styles.container}>
        
        {/* 3. Status Bar Config */}
        <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />

        <ImageBackground 
          source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/rqafi1iv_expires_30_days.png" }} 
          resizeMode="stretch"
          style={styles.view}
        >
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            
            {/* Main Title */}
            <Text style={styles.titleText}>
              Thank You for Contacting ClicknBook Home!
            </Text>

            {/* Fixed Description Text */}
            <View style={styles.view2}>
              <Text style={styles.bodyText}>
                We've received your details successfully.{"\n\n"}
                Our team will get in touch with you soon to assist you further.{"\n\n"}
                We appreciate your interest in listing your property with us!
              </Text>
            </View>

            {/* Back to Home Button */}
            <TouchableOpacity 
              style={styles.buttonRow} 
              onPress={handleBackToHome}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/5j2gzz5b_expires_30_days.png" }} 
                resizeMode="stretch"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>

            {/* Bottom Illustration */}
            <View style={styles.illustrationContainer}>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/afejr9ij_expires_30_days.png" }} 
                resizeMode="stretch"
                style={styles.illustration}
              />
            </View>

          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  view: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 80, 
    paddingBottom: 40,
  },
  titleText: {
    color: "#000000",
    fontSize: 32, // Slightly adjusted for better fit
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginHorizontal: 20,
    lineHeight: 40,
  },
  view2: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  bodyText: {
    color: "#666", // Softer grey for body text
    fontSize: 16,
    textAlign: "center",
    width: '90%',
    lineHeight: 24, // Better line spacing for readability
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8D800", 
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 40,
    marginHorizontal: 24,
    elevation: 3, // Android Shadow
    shadowColor: "#000", // iOS Shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
  },
  arrowIcon: {
    borderRadius: 10,
    width: 20,
    height: 20,
  },
  illustrationContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  illustration: {
    borderRadius: 40,
    width: 323,
    height: 207,
  },
});

export default ThankYou;