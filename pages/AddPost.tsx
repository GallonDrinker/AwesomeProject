import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    StyleSheet,
    ToastAndroid,
    Alert,
} from "react-native";
import { collection, getFirestore, getDocs, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./../FirebaseConfig";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

interface Category {
    name: string;
}

interface PostData {
    title: string;
    desc: string;
    category: string;
    address: string;
    price: string;
    image: string;
    userName: string;
    userEmail: string;
    userImage: string;
}

export default function AddPostScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const db = getFirestore(app);
    const storage = getStorage();

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        setCategoryList([]);
        const querySnapshot = await getDocs(collection(db, "Category"));

        const categories: Category[] = [];
        querySnapshot.forEach((doc) => {
            categories.push(doc.data() as Category);
        });
        setCategoryList(categories);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onSubmitMethod = async (values: PostData) => {
        setLoading(true);

        const resp = await fetch(image as string);
        const blob = await resp.blob();
        const storageRef = ref(storage, "communityPost/" + Date.now() + ".jpg");

        uploadBytes(storageRef, blob).then(() => {
            getDownloadURL(storageRef).then(async (downloadUrl) => {
                values.image = downloadUrl;
                const docRef = await addDoc(collection(db, "UserPost"), values);
                if (docRef.id) {
                    setLoading(false);
                    Alert.alert("Success!!!", "Post Added Successfully.");
                }
            });
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add New Post</Text>
            <Text style={styles.subHeading}>Create New Post and Start Selling</Text>
            <Formik
                initialValues={{
                    title: "",
                    desc: "",
                    category: "",
                    address: "",
                    price: "",
                    image: "",
                    userName: "",
                    userEmail: "",
                    userImage: "",
                }}
                onSubmit={(values) => onSubmitMethod(values)}
                validate={(values) => {
                    const errors: Partial<PostData> = {};
                    if (!values.title) {
                        ToastAndroid.show("Title must be filled", ToastAndroid.SHORT);
                        errors.title = "Title must be filled";
                    }
                    return errors;
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    setFieldValue,
                }) => (
                    <View>
                        <TouchableOpacity onPress={pickImage}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.image} />
                            ) : (
                                <Image
                                    source={require("./../assets/images/image_placeholder.png")}
                                    style={styles.image}
                                />
                            )}
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={values?.title}
                            onChangeText={handleChange("title")}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={values?.desc}
                            numberOfLines={5}
                            onChangeText={handleChange("desc")}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={values?.price}
                            keyboardType="number-pad"
                            onChangeText={handleChange("price")}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={values?.address}
                            // keyboardType='number-pad'
                            onChangeText={handleChange("address")}
                        />
                        {/* Category list dropdown */}
                        <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
                            <Picker
                                selectedValue={values?.category}
                                className="border-2"
                                onValueChange={(itemValue) =>
                                    setFieldValue("category", itemValue)
                                }
                            >
                                {categoryList.length > 0 &&
                                    categoryList?.map((item, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={item?.name}
                                            value={item?.name}
                                        />
                                    ))}
                                {/* <Picker.Item label='Dropdown1' value={'Dropdown'}/>  */}
                                {/* Remove this upper 1 line for db data load  */}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleSubmit()}
                            style={[
                                styles.button,
                                { backgroundColor: loading ? "#ccc" : "#007BFF" },
                            ]}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Submit</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    heading: {
        fontSize: 27,
        fontWeight: "bold",
    },
    subHeading: {
        fontSize: 18,
        color: "#888",
        marginBottom: 7,
    },
    image: {
        width: 180,
        height: 100,
        borderRadius: 15,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 17,
    },
    button: {
        padding: 5,
        borderRadius: 20,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
});
