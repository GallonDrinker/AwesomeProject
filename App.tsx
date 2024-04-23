import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import login from './pages/login';
import landing from './pages/landing';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MapScreen from './pages/MapScreen';
import AddPostScreen from './pages/AddPostScreen';
import 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNavigation from './Navigations/TabNavigation';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';


const welcome_stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const home = () => {
//   return (
//     <bottomTab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "All Items") {
//             iconName = focused ? "home" : "home-outline";
//           } else if (route.name === "Add Item") {
//             iconName = focused ? "add-circle" : "add-circle-outline";
//           } else if (route.name === "Profile") {
//             iconName = focused ? "person" : "person-outline";
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarStyle: { backgroundColor: "#00FFE9" },
//         tabBarActiveTintColor: "#444AC4",
//         tabBarInactiveTintColor: "#444AC4",
//       })}
//     >
//       <bottomTab.Screen name="All Items" component={Home} />
//       <bottomTab.Screen name="Add Item" component={AddItem} />
//       <bottomTab.Screen name="Profile" component={Profile} />
//     </bottomTab.Navigator>
//   );
// };


export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_Z3JhbmQtcm9vc3Rlci01MS5jbGVyay5hY2NvdW50cy5kZXYk'>
    <view className="flex-1 bg-gray" >
      <SignedIn>
          <Home/>
        </SignedIn>
        </view>
    <NavigationContainer>
      <welcome_stack.Navigator initialRouteName='Welcome'>
        <welcome_stack.Screen name="Welcome" component={landing} options={{ headerShown: false }} />
        <welcome_stack.Screen name="Login" component={login} options={{ headerShown: false }} />
        <welcome_stack.Screen name="Home" component={Home} />
        <welcome_stack.Screen name="Profile" component={Profile} />
        <welcome_stack.Screen name="Map" component={MapScreen} />
        <welcome_stack.Screen name="AddPostScreen" component={AddPostScreen} />
      </welcome_stack.Navigator>
      
    </NavigationContainer>
    </ClerkProvider>
  
  );
}
// function home() {
//   return (
//     <SignedIn>
//       <home />
//     </SignedIn>
//     <SignedOut>
//       <SignInScreen />
//     </SignedOut>
//   );
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
