import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
// For language translate
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { API_URL } from '../config';

const SellerMyBrandScreen = ({ route, navigation }) => {

    // For language translate
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [isLoadingSubmit, setLoadingSubmit] = useState(false);
    const SellerCreateBrandApi = API_URL + 'seller-create-brand.php';
    const SellerBrandApi = API_URL + 'seller-brands.php';
    const [sellerBrandData, setSellerBrandData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [loginUserId, setLoginUserId] = useState('');
    const [submitErrorMessage, setSubmitErrorMessage] = useState();
    const [submitSuccessMessage, setSubmitSuccessMessage] = useState();
    const [allValues, setAllValues] = useState({
        user_id: '',
        product_name: '',
    });

    useEffect(() => {
        AsyncStorage.getItem("userData").then((value) => {
            if (value != null) {
                setLoginUserId(JSON.parse(value).current_userID);
            }
        });
        const abortCont = new AbortController();
        const asyncApicall = async () => {
            try {
                const response = await fetch(SellerBrandApi, {
                    signal: abortCont.signal,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // your expected POST request payload goes here
                        seller_id: loginUserId,
                    })
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setLoading(false);
                setSellerBrandData(data.data.own_brand);
                setErrorMessage(data.error_message);
                setSuccessMessage(data.success_message);
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
            }
        }
        asyncApicall()
        return () => abortCont.abort();
    }, [loginUserId]);


    const formdata = new FormData();
    formdata.append("brand_name", allValues.brand_name)
    formdata.append("seller_id", loginUserId)
    const [selectImage, setselectImage] = useState();
    const choosePhotoFromLibrary = () => {
        console.log("Choose Photo");
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setselectImage(image);
        });
    }

    const deleteImage = () => {
        //console.log("deleteImage");
        setselectImage('');
    }

    const choosePhotoFromCamera = () => {
        console.log("Choose Photo From Camera");
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log("Image Console ==>", image);
            setselectImage(image);
        });
    }


    const submit = () => {
        setLoadingSubmit(true);
        formdata.append("brandpicture", {
            uri: selectImage.path,
            name: 'testname',
            fileName: 'image',
            type: selectImage.mime
        });

        //API call POST Method
        const asyncPostCall = async () => {
            try {
                const response = await fetch(SellerCreateBrandApi, {
                    signal: abortCont.signal,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formdata,
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setLoadingSubmit(false);
                setSubmitErrorMessage(data.error_message);
                setSubmitSuccessMessage(data.success_message);
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                //console.log(error)
            }
        }
        asyncPostCall()
    }


    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>
            {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (
                <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                    {sellerBrandData != '' ?
                        <View style={styles.SellerBrandListWrap}>
                            <View style={styles.addAuctionWrap}>
                                <Text style={styles.addAuctionTitle}>{t("my_brand")}</Text>
                            </View>
                            <View style={styles.SellerBrandListWrapBox}>
                                {sellerBrandData.brand_image ?
                                    <View style={styles.featuredImageBox}>
                                        <Image style={styles.SellerBrandListImg} source={{ uri: `${sellerBrandData.brand_image}` }} resizeMode="cover" />
                                    </View>
                                    :
                                    <View style={styles.featuredImageBox}>
                                        <Feather name="watch" size={50} color="#333" />
                                    </View>
                                }
                                <Text style={styles.SellerBrandListImgTitle}>
                                    {sellerBrandData.brand_name}
                                </Text>
                            </View>
                        </View>
                        :
                        <View style={{ height: "100%", backgroundColor: "#ffffff" }}>
                            <ScrollView>
                                <View style={styles.addAuctionWrap}>
                                    <Text style={styles.addAuctionTitle}>{t("Create_New_Brand")}</Text>
                                </View>
                                <View style={styles.addAuctionForm}>
                                    <Text style={styles.textLabel}>{t("Brand_Name")}</Text>
                                    <TextInput style={styles.textField}
                                        name='brand_name'
                                        value={allValues.brand_name}
                                        onChangeText={(e) => setAllValues({
                                            ...allValues,
                                            brand_name: e
                                        })} />
                                    <Text style={styles.textLabel}>{t("Brand_Image")}</Text>
                                    <View style={styles.featuredImageWrap}>
                                        <TouchableOpacity style={styles.deleteImage} onPress={deleteImage}>
                                            <Feather name="x" size={22} color="#000" />
                                        </TouchableOpacity>
                                        <View style={styles.featuredImageBox}>
                                            {selectImage ? <Image style={styles.featuredImagestyle} source={{ uri: `${selectImage.path}` }} resizeMode="cover" /> : <Feather name="watch" size={50} color="#ccc" />}
                                        </View>
                                        <TouchableOpacity onPress={choosePhotoFromLibrary}>
                                            <Text style={styles.featuredImageLabel}>{t("Gallery")} <Feather name="upload" size={22} color="#fff" /></Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={choosePhotoFromCamera}>
                                            <Text style={styles.featuredImageLabel}>{t("Camera")} <AntDesign name="camerao" size={22} color="#fff" /></Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', marginTop: 30, marginBottom: 25 }}>
                                        <TouchableOpacity style={styles.greenBtn} onPress={submit}>
                                            <Text style={styles.buttonText}>{t("Create_Brand")} +</Text>
                                        </TouchableOpacity>
                                        {isLoading ? <ActivityIndicator /> : (
                                            <>
                                                <Text style={{ fontSize: 20, color: 'red' }}>{submitErrorMessage}</Text>
                                                <Text style={{ fontSize: 20, color: 'green' }}>{submitSuccessMessage}</Text>
                                            </>
                                        )}
                                    </View>
                                </View>
                            </ScrollView>

                        </View>
                    }

                </View>
            )}
        </>
    )
}
const styles = StyleSheet.create({
    HeaderBar: {
        width: '100%',
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: 'center',
        position: "relative",
        height: 80,
    },

    SellerBrandListWrap: {
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        position: "relative",
        paddingVertical: 0,
        backgroundColor: "#ffffff",
    },
    SellerBrandListImg: {
        width: 120,
        height: 120,
        borderRadius: 100,
    },
    SellerBrandListImgTitle: {
        color: "#333333",
        fontWeight: "600",
        fontSize: 18,
        textAlign: "center"
    },


    addAuctionWrap: {
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    addAuctionTitle: {
        color: "#00603b",
        fontSize: 20,
        lineHeight: 30,
        fontWeight: "500",
        paddingVertical: 15,
    },
    productScaneWrap: {
        borderColor: "#555555",
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    addAuctionForm: {
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 0,
    },
    textLabel: {
        borderColor: "#333333",
        color: "#333333",
        fontSize: 16,
        lineHeight: 40,
        fontWeight: "400",
    },
    textField: {
        color: "#333333",
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 8,
    },
    imageUploadBox: {
        position: 'relative',
    },
    imageUploadBoxIcon: {
        position: 'absolute',
        right: 10,
        top: 7,
    },
    featuredImageWrap: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    featuredImageBtnWrap: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        marginTop: 8,
        justifyContent: "space-evenly",
    },
    featuredGalleryImageWrap: {
        alignItems: "center",
        position: "relative",
    },
    deleteImage: {
        position: "absolute",
        top: -5,
        left: -5,
        zIndex: 1,
    },
    deleteMultiImage: {
        position: "absolute",
        top: -5,
        left: -5,
        zIndex: 1,
    },
    featuredImageBox: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderColor: "#cccccc",
        borderWidth: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    featuredImagestyle: {
        width: 120,
        height: 120,
    },
    featuredImageLabel: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "400",
        backgroundColor: '#00603b',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    greenBtn: {
        backgroundColor: '#00603b',
        paddingHorizontal: 25,
        paddingVertical: 12,
        width: "100%",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase'
    },



})
export default SellerMyBrandScreen