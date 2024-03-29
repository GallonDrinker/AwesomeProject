import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import {Octicons} from '@expo//vector-icons'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const login: React.FC = (props: any) => {
  const [username, setUsername] = useState<string>(''); ///username er jaygay Email hobe
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async() =>{
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth,username,password);
      console.log(response);
    
    } catch (error:any){
      console.log(error);
      alert('Sign in  failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async() =>{
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth,username,password);
      console.log(response);
    } catch (error:any){
      console.log(error);
    } finally {
      setLoading(false);
    }
  }



  // const handleSignUp = () => {
  //   auth
  //     . createUserWithEmailAndPassword(username, password)
  //     . then(userCredentiats => {
  //         const user = userCredentiats.user;
  //         console.log(user.username);
  //     })
  // }

    const handleClick = () => {
      console.log("PRESSED!");
      props.navigation.navigate("Home");
    };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {loading ? (
      <ActivityIndicator size ="large" color="#0000ff"/>
    ):(

      <>
      <TouchableOpacity onPress={signIn} style={styles.button}>
        
        <Text style={styles.buttonText}>Login</Text>
        
      </TouchableOpacity>
      
      {/* <View style={styles.buttonGap}></View> Add a View to create a gap */}

      <TouchableOpacity onPress={signUp} style={[styles.button, styles.registerButton]}>
        
        <Text style={styles.buttonText}>Register</Text>
        
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClick} style={[styles.button, styles.registerButton]}>
        
        <Text style={styles.buttonText}> '=>'</Text>
        
      </TouchableOpacity>
      </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#288ff7',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerButton: {
    marginTop: 10, // Add margin to create space between buttons
  },
});

export default login;
