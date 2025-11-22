import React, { useEffect } from "react";
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  Image, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar,
  Platform 
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

interface VisitScheduledProps {
  onBack?: () => void;
}

const VisitScheduled: React.FC<VisitScheduledProps> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('ThankYou');
    }, 3500); // 3.5 seconds delay

    return () => clearTimeout(timer); // Clean up on component unmount
  }, [navigation]);
  return (
    <>
      {/* 1. Top Safe Area (Yellow Background for Status Bar) */}
      <SafeAreaView style={{ flex: 0, backgroundColor: "#FFDD32" }} />

      {/* 2. Main Content Area (White Background) */}
      <SafeAreaView style={styles.container}>
        
        <StatusBar barStyle="dark-content" backgroundColor="#FFDD32" />
        
        <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
          
          {/* Header Row with Back Button */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={props.onBack} style={styles.backButtonContainer}>
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/9m1uobzp_expires_30_days.png" }}
                resizeMode="contain"
                style={styles.backIcon}
              />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>

          {/* Main Image */}
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/sE8iZvpPof/g41s7j8d_expires_30_days.png" }}
            resizeMode="contain"
            style={styles.mainImage}
          />
          
          {/* Main Text */}
          <Text style={styles.messageText}>Our Team will contact you soon</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    // INCREASED MARGIN: Pushes the button down significantly to avoid status bar
    marginTop: Platform.OS === 'android' ? 50 : 40, 
    marginBottom: 20, 
    marginLeft: 20,
  },
  backButtonContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 20, // Increases touch area
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  backText: {
    color: "#FFDD32",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: 'capitalize',
  },
  mainImage: {
    borderRadius: 40,
    height: 300,
    width: '85%',
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  messageText: {
    color: "#FFDD32",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    marginHorizontal: 30,
  },
});

export default VisitScheduled;