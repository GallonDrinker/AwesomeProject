import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import Home from '../pages/Home';
import ExploreScreen from '../pages/ExploreScreen';
import AddPostScreen from '../pages/AddPostScreen';
import Profile from '../pages/Profile';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home}
            options={{
                tabBarLabel:({color}) => (
                    <Text style ={{color:color,fontSize:12,marginBottom:3}}>Home</Text>
                ),
                tabBarIcon:({color,size})=>(
                    <FontAwesome5 name="home" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name='explore' component={ExploreScreen}
           options={{
            tabBarLabel:({color}) => (
                <Text style ={{color:color,fontSize:12,marginBottom:3}}>Explore</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome5 name="search" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='addpost' component={AddPostScreen}
           options={{
            tabBarLabel:({color}) => (
                <Text style ={{color:color,fontSize:12,marginBottom:3}}>Add Post</Text>
            ),
            tabBarIcon:({color,size})=>(
                <FontAwesome5 name="camera-retro" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='profile' component={Profile}
           options={{
            tabBarLabel:({color}) => (
                <Text style ={{color:color,fontSize:12,marginBottom:3}}>Profile</Text>
            ),
            tabBarIcon:({color,size})=>(
                <Ionicons name="person-sharp" size={size} color={color} />
            )
        }}/>

    </Tab.Navigator>
  )
}