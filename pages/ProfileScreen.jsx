import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import {useAuth, useUser} from '@clerk/clerk-expo'
import diary from './../assets/images/diary.png'
import logout from './../assets/images/logout.png'
import map from './../assets/images/Map.png'
import search from './../assets/images/search.png'
import { useNavigation } from '@react-navigation/native'



export default function ProfileScreen() {
  const {user} = useUser();
  const navigation = useNavigation();
  const {isLoaded,signOut} = useAuth();

  const menuList=[
    {
      id:1,
      name:'My Product',
      icon:diary,
      path: 'my-product'
    },
    {
      id:2,
      name:'Explore',
      icon:search,
      path:'explore'
    },
    {
      id:3,
      name:'Map View',
      icon: map,
      path:'Map'
    },{
      id:4,
      name:'Logout',
      icon: logout
    },
  ]

  const onMenuPress=(item)=>{

    if(item.name == 'Logout')
    {
      signOut();
      return;
    }
      item?.path?navigation.navigate(item.path):null;

  }

  return (
    <View className='p-5 '>
      <View className='items-center justify-center text-center mt-7 '>
      <Image source={{uri:user?.imageUrl}}
        className='w-[80px] h-[100px] rounded-full '
      />
      <Text className='font-bold text-[25px] mt-3'> {user?.fullName}</Text>
      <Text className=' text-[18px] mt-1 text-gray-600'> {user?.primaryEmailAddress?.emailAddress}</Text>

      </View>

        <FlatList
          data={menuList}
          numColumns={3}
          style={{marginTop:20}}
          renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>onMenuPress(item)}
            className=' flex-1 p-3 border-[1px]  items-center m-4  rounded-lg border-sky-800 bg-teal-50 mx-2  '>
              {item.icon&& <Image source={item.icon}
              className = 'w-[70px] h-[70px]'/>}
              <Text className='mt-2'>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        
    </View>
  )
}