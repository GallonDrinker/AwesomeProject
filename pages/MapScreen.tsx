import React, { useState, useEffect } from 'react';
import { View, Text, Vibration } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen: React.FC<{ route: any }> = ({ route }) => {
  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    // Function to get the user's current location
    const getUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        // Vibrate when the map screen is being loaded
        Vibration.vibrate();

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    // Call the function to get user's location when component mounts
    getUserLocation();

    // Clean up function to remove listeners or subscriptions
    return () => {
      // Add any cleanup code here if needed
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Render the map with user's location if available
  return (
    <View style={{ flex: 1 }}>
      {userLocation && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="Your Location"
            description="This is your current location"
          />
        </MapView>
      )}
    </View>
  );
};

export default MapScreen;
