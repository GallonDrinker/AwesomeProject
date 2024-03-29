import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import image from "./../assets/background.jpg";

// const home = (props: any) => {
//   const handleClick = () => {
//     console.log("PRESSED!");
//     props.navigation.navigate("Profile");
//   };

const home: React.FC = (props: any) => {
  const handleClick = () => {
    console.log("PRESSED!");
    props.navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity 
       onPress={handleClick}
       style={styles.buttonContainer}>

        <Text style={styles.buttonText}>Button</Text>
        
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome </Text>
      </View>
      <View style={styles.productContainer}>
        <TouchableOpacity style={styles.productItem}>
          <Image
            source={image}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Product 1</Text>
          <Text style={styles.productPrice}>$19.99</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.productItem}>
          <Image
            source={image}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Product 2</Text>
          <Text style={styles.productPrice}>$29.99</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.productItem}>
          <Image
            source={image}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Product 3</Text>
          <Text style={styles.productPrice}>$39.99</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.productItem}>
          <Image
            source={image}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Product 3</Text>
          <Text style={styles.productPrice}>$39.99</Text>
        </TouchableOpacity>
        {/* Add more product items as needed */}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default home;
