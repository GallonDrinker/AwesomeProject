import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import image from "./../assets/background.jpg";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
WebBrowser.maybeCompleteAuthSession();

const landing = (props: any) => {

  const handleClick = () => {
    console.log("PRESSED!");
    props.navigation.navigate("Login");
  };
  // const SignInWithOAuth = () => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    // useWarmUpBrowser();
   
    // const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    // const onPress = React.useCallback(async () => {
    //   try {
    //     const { createdSessionId, signIn, signUp, setActive } =
    //       await startOAuthFlow();
   
    //     if (createdSessionId) {
    //       setActive({ session: createdSessionId });
    //     } else {
    //       // Use signIn or signUp for next steps such as MFA
    //     }
    //   } catch (err) {
    //     console.error("OAuth error", err);
    //   }
    // }, []);
  return (
    <ImageBackground
      source={image}
      //   source={background} //
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Good Old Deals</Text>
        <TouchableOpacity onPress={handleClick} style={styles.getStartedButton}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onPress} style={styles.getStartedButton2}>
          <Text style={styles.getStartedText}>Log In</Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  getStartedButton: {
    backgroundColor: "#288ff7",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  getStartedButton2: {
    backgroundColor: "#288ff7",
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 40,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default landing;
