import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import image from "./../assets/background.jpg";

const landing = (props: any) => {
  const handleClick = () => {
    console.log("PRESSED!");
    props.navigation.navigate("Login");
  };
  return (
    <ImageBackground source={image} 
    //   source={background} // 
      style={styles.background}
      
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Good Old Deals</Text>
        <TouchableOpacity
          onPress={handleClick}
          style={styles.getStartedButton}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
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
  getStartedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default landing;
