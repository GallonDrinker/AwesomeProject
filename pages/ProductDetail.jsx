import { View, Text, Image, TouchableOpacity, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../FirebaseConfig';

export default function ProductDetail() {
    const {params} = useRoute();
    const [product,setProduct]= useState([]);
    const {user} = useUser();
    const db = getFirestore(app);
    const nav = useNavigation();
    const [location, setLocation] = useState(null);//Gets loaction

    useEffect(()=>{
        console.log(params);
        params&&setProduct(params.product);
    },[params])

    const sendEmailMessage=()=>{
        const subject = 'Regarding ' + product.title;
        const body = "Hello " +product.userName+"\n"+"I am looking forward to this product"
        Linking.openURL('mailto: ' +product.userEmail+"?subject="+subject+"&body="+body)
    }

    const sendWhatsAppMessage = () => {
        const phoneNumber = product.userPhoneNumber; // Replace with the user's phone number
        const message = "Hello, I am interested in your product: " + product.title;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        //const url = `'whatsapp://send?text=${encodeURIComponent(message)}&phone=${phoneNumber}'`
        Linking.openURL(url);
    };

    const openInMaps = () => {
        const lat = product?.location?.latitude;
        const long = product?.location?.longitude;
        if (lat && long) {
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
            Linking.openURL(url);
        } else {
            Alert.alert('Location Not Available', 'Location coordinates are not available.');
        }
    }




    const deleteUserPost=()=>{
        console.log("User Post deleted")
        Alert.alert('Do yoou want to delete?', 'Are you sure you want to delete this post?', [
            {
                text:'Yes',
             onPress:()=>deleteFromFireStore()   
            },
            {
                text: 'Cancel',
                onPress:() => console.log('Cancel Pressed'),
                style : 'cancel',
            },
        ])
    }
    const deleteFromFireStore=async()=>{

        console.log('Deleted');
        const q=query(collection(db,'UserPost'),where('title', '==', product.title))
        const snapshot = await getDocs(q);
        snapshot.forEach(doc=>{
            deleteDoc(doc.ref).then(resp =>{
                console.log(resp);
                nav.goBack();
            })
        })

    }

  return (
    <ScrollView>
      <Image source={{uri:product.image}}
            className='h-[340px] w-full'
      />
      <View className='p-3'>
        
        <Text className='text-[24px] font-bold'>{product?.title}</Text>
        <View className=' items-baseline'>
            <Text className=' text-purple-900 bg-fuchsia-100  mt-1 p-1 rounded-full px-3 '>{product.category}</Text>
        </View>
        <Text className='mt-3   text-center font-semibold text-[20px]'>Description</Text>
        <Text className='mt-1 text-[15px] '>{product?.desc}</Text>
        <Text className='mt-3   text-center font-semibold text-[20px]'>Location in Map</Text>
        <Text className='mt-1 text-[15px] '>
            Latitude: {product?.location?.latitude}, Longitude: {product?.location?.longitude}
        </Text>
        <TouchableOpacity 
            onPress={() => openInMaps()}
        className='z-10 p-3 m-2 bg-emerald-300 rounded-full'>
            <Text className='text-center'>Open Map</Text>
        </TouchableOpacity>
      </View>


                              {/* USER Info */}
        <View className='p-3 flex flex-row items-center gap-3' >
            <Image source ={{uri:product.userImage}}
                className=' w-10 h-10 rounded-full'
            />
            <View>
               <Text className='font-bold text-[18px]'>{product.userName} </Text> 
               <Text>{product.userEmail} </Text> 
            </View>
        </View>

        {user?.primaryEmailAddress.emailAddress==product.userEmail?
            <TouchableOpacity 
            onPress={() => deleteUserPost()}
        className='z-10 p-3 m-2 bg-red-600 rounded-full'>
            <Text className='text-center text-l font-semibold'>Delete Post</Text>
        </TouchableOpacity>
        :
        <>
            <TouchableOpacity onPress={() => sendEmailMessage()} className='z-10 p-3 m-2 bg-emerald-300 rounded-full'>
                <Text className='text-center'>Send Email</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => sendWhatsAppMessage()} className='z-10 p-3 m-2 bg-emerald-300 rounded-full'>
                <Text className='text-center'>Send WhatsApp Message</Text>
            </TouchableOpacity>
        </>

        

        }
        

    </ScrollView>
  )
}