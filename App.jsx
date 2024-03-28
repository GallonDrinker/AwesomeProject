import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import login from './pages/login';
import landing from './pages/landing';
import home from './pages/home';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

const welcome_stack = createStackNavigator()

export default function App() {
  return (
    // // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!ssss
    //     HEYYYYYYYYYss</Text>
    //   <StatusBar style="auto" /> */}
      <NavigationContainer>
      <welcome_stack.Navigator initialRouteName='Login'>
        <welcome_stack.Screen name="Welcome" component={landing} />
        <welcome_stack.Screen name="Login" component={login} options={{headerShown : false }} />
        <welcome_stack.Screen name="Home" component={home} />
      </welcome_stack.Navigator>
    </NavigationContainer>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
