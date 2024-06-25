import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../pages/ProfileScreen';
//import MyProducts from '../pages/MyProducts';
import ProductDetail from '../pages/ProductDetail';
import MyProduct from '../pages/MyProduct';
import MapScreen from '../pages/MapScreen';


const Stack = createStackNavigator();

export default function ProfileScreenStackNav() {
  return (

    <Stack.Navigator>
      <Stack.Screen name='profile-tab'
        options={{
          headerShown: false
        }}
        component={ProfileScreen} />


      <Stack.Screen name='my-product'
        options={{
          headerStyle: {
            backgroundColor: '#02d170'
          },
          headerTitle: 'My Product'
        }}
        component={MyProduct} />

      <Stack.Screen name='product-detail' 
      options={{
        headerStyle: {
          backgroundColor: '#02d170'
        },
        headerTitle: 'Detail'
      }} 
      component={ProductDetail}
      />
      <Stack.Screen name='Map' 
      options={{
        headerStyle: {
          backgroundColor: '#02d170'
        },
        headerTitle: 'Current Loaction'
      }} 
      component={MapScreen}
      />


    </Stack.Navigator>
  )
}