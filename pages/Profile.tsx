import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import image from "./../assets/background.jpg";

const profile: React.FC = () => {
    const navigation = useNavigation();

    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      // Now you can use location.coords.latitude and location.coords.longitude to get the user's current location
      navigation.navigate('Map', { userLocation: location });
      
      console.log('User Location:', location.coords.latitude, location.coords.longitude);
    };
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={image} style={styles.profileImage} />
        <Text style={styles.profileName}>John Doe</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Products for Sale</Text>
        {/* Display list of products for sale */}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Purchases</Text>
        {/* Display list of purchased products */}
      </View>
      <TouchableOpacity style={styles.button} onPress={getUserLocation}>
        <Text style={styles.buttonText}>Get My Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editProfileButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 50,
  },
  editProfileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Additional styles as needed
});

export default profile;
