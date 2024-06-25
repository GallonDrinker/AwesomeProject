import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { app } from '../FirebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList'
import { useNavigation } from '@react-navigation/native'

export default function MyProducts() {

    const db = getFirestore(app)
    const {user} = useUser();
    const [productList,setProductList]=useState([]);
    const navigation = useNavigation();

    useEffect(()=>{
        user&&getUserPost();
    },[user])

    useEffect(()=>{
        navigation.addListener('focus',(e)=>{
          console.log(e);
          getUserPost();
        })
    },[])

    /**
     * used get the loggedin user post only
     */


    const getUserPost= async()=>{
        setProductList([]);
        const q = query(collection(db,'UserPost'),where('userEmail', '==', user?.primaryEmailAddress?.emailAddress))
        const snapshot = await getDocs (q);
        snapshot.forEach(doc=>{
            console.log(doc.data());
            setProductList(productList => [...productList,doc.data()]);
        })
    }
  return (
    <View>
      <LatestItemList latestItemList={productList}
        // heading={'My Products'}

        
      />
    </View>
  )
}