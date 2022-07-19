import React, { useRef, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Animated,
    Dimensions,
    ImageBackground,
    Button,
    ActivityIndicator
} from 'react-native';
// For language translate
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AccountScreen from './AccountScreen';

import SelectDropdown from 'react-native-select-dropdown';

import DropDownPicker from 'react-native-dropdown-picker';

import { useTranslation } from 'react-i18next';

import ImagePicker from 'react-native-image-crop-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

const ProfileEditScreen = ({ route, navigation }) => {

    const [idFromCountry, setIdFromCountry] = useState();

    const [openCountry, setOpenCountry] = useState(false);
    const [valueCountry, setValueCountry] = useState();
    const [itemsCountry, setItemsCountry] = useState([]);

    const [openState, setOpenState] = useState(false);
    const [valueState, setValueState] = useState();
    const [itemsState, setItemsState] = useState([]);


    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [isLoadingSubmit, setLoadingSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [loginUserId, setLoginUserId] = useState('');
    const updateProfileApi = API_URL + 'profile-update.php';
    const editProfileApi = API_URL + 'user-details.php';
    const profileImageUpdateApi = API_URL + 'profile-image.php';
    const [allValues, setAllValues] = useState([]);
    const [billingInfo, setBillingInfo] = useState([]);
    const [selectImage, setselectImage] = useState();
    const [selectActiveCountry, setSelectActiveCountry] = useState();
    const [selectActiveState, setSelectActiveState] = useState();

    const countryListDataApi = API_URL + 'user-country-currency.php';
    // const countryListDataApi = API_URL + 'all-country.php';
    const [countryData, setCountryData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    const stateListDataApi = API_URL + 'all-state.php';
    const [stateData, setStateData] = useState([]);
    const [selectedState, setSelectedState] = useState('');

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setselectImage(image);
            imageUpload(image);
        });
    }
    const imageUpload = (imgpath) => {
        const imageData = new FormData();
        imageData.append("profilepicture", {
            uri: imgpath.path,
            name: imgpath.modificationDate + ".jpg",
            fileName: 'image',
            type: imgpath.mime
        });
        imageData.append("user_id", loginUserId);
        fetch(profileImageUpdateApi, {
            method: 'POST',
            headers: {
                "content-type": "multipart/form-data", "accept": "application/json"
            },
            body: imageData,
        }).then(response => response.json()).then(data => {
            setLoading(false);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);
        })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            });
    }



    useEffect(() => {
        AsyncStorage.getItem('userData').then((result) => {
            if (result != '') {
                setLoginUserId(JSON.parse(result).current_userID);
            }
        });

        if (loginUserId != '') {
            const userDetailsCall = async () => {
                try {
                    const response = await fetch(editProfileApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: loginUserId,
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    setLoading(false);
                    setAllValues(data.data);
                    setBillingInfo(data.data.billing);

                    setSelectActiveState(data.data.billing.billing_state);
                    setSelectActiveCountry(data.data.billing.billing_country);
                    if (route.params.countryId != "") {
                        setSelectActiveCountry(route.params.countryId);
                    }
                    
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                }
            }
            userDetailsCall();
        }
    }, [loginUserId]);


    // Country API call
    useEffect(() => {
        fetch(countryListDataApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                user_id: loginUserId
                //user_id: 25
            })
        }).then(response => response.json()).then(data => {
            setLoading(false);
            setErrorMessage(data.error_message);
            //setCountryData(data.data.country);

            var objCountryData = [];
            for (var key in data.data.country) {
                objCountryData.push({ 'value': data.data.country[key].id, 'label': data.data.country[key].name });
                // ...
            }
            setCountryData(objCountryData);

            setIdFromCountry(route.params.countryId);

        }
        );
    }, [countryData]);


    // State API call
    const setRod = (e) => {
        setSelectedCountry(e);
        //alert(e);
        fetch(stateListDataApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                country_key: e
                //country_key: route.params.countryId
            })
        }).then(response => response.json()).then(data => {
            setLoading(false);
            setErrorMessage(data.error_message);

            var objStateData = [];
            for (var key in data.data.state) {
                objStateData.push({ 'value': data.data.state[key].id, 'label': data.data.state[key].name });
                // ...
            }
            setStateData(objStateData);

        }
        );
    }


    // For Update Profile
    const updateProfile = () => {
        setLoadingSubmit(true);
        // API call POST Method
        fetch(updateProfileApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                user_id: loginUserId,
                f_name: allValues.first_name,
                l_name: allValues.last_name,
                billing_phone: billingInfo.billing_phone,
                billing_address_1: billingInfo.billing_address_1,
                billing_city: billingInfo.billing_city,
                billing_postcode: billingInfo.billing_postcode,
                billing_country: selectedCountry,
                billing_state: selectedState,
                user_paypal_business_id: allValues.user_paypal_business_id
            })
        }).then(response => response.json()).then(data => {
            setLoadingSubmit(false);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);
            //storeData(data.data);
            if (data.success_message != '') {

                AsyncStorage.mergeItem('userData', JSON.stringify(
                    {
                        current_first_name: allValues.first_name,
                        current_last_name: allValues.last_name,
                    }
                ))

                setTimeout(() => {
                    setSuccessMessage('');
                    navigation.push('Account');
                }, 1000);
            }

        }
        );
    }



    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <Text style={{ color: "#FFF", fontSize: 15 }}>{t("Cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={updateProfile} style={{ position: 'absolute', right: 8, top: '35%', zIndex: 99 }}>
                    <Text style={{ color: "#FFF", fontSize: 15 }}>{t("Save")}</Text>
                </TouchableOpacity>
                <Text style={{ color: "#FFF", fontSize: 18 }}>{t("profile")}</Text>
            </View>
            {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 300 }} /> : (
                <ScrollView>
                    <View style={styles.profileEditWrap}>
                        <View style={styles.profileImageEdit}>

                            <TouchableOpacity onPress={choosePhotoFromLibrary} style={{ position: 'absolute', right: 20, top: '15%', zIndex: 99 }}>
                                <Feather name="edit-2" size={15} color="#333333" />
                            </TouchableOpacity>

                            {selectImage ?

                                <>
                                    {selectImage ?
                                        <Image style={styles.featuredImagestyle} source={{ uri: `${selectImage.path}` }} resizeMode="cover" />
                                        :
                                        <Feather name="user" size={35} color="#333333" />
                                    }
                                </>

                                :

                                <>
                                    {allValues.avtar_img &&
                                        <Image style={styles.featuredImagestyle} source={{ uri: `${allValues.avtar_img}` }} resizeMode="cover" />
                                    }
                                </>

                            }

                        </View>
                    </View>

                    <View style={styles.profileEditForm}>
                        <Text style={styles.textLabel}>{t("First_Name")}</Text>
                        <TextInput style={styles.textField}
                            name='first_name'
                            value={allValues.first_name}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                first_name: e
                            })} />

                        <Text style={styles.textLabel}>{t("Last_Name")}</Text>
                        <TextInput style={styles.textField}
                            name='last_name'
                            value={allValues.last_name}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                last_name: e
                            })} />

                        <Text style={styles.textLabel}>{t("Email")}</Text>
                        <TextInput
                            style={{ backgroundColor: "#e9ecef", height: 40, color: "#000000", paddingHorizontal: 10, }}
                            name='user_email'
                            value={allValues.user_email}
                            editable={false}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                user_email: e
                            })} />

                        <Text style={styles.textLabel}>{t("business_id")}</Text>
                        <TextInput style={styles.textField}
                            name='user_paypal_business_id'
                            value={allValues.user_paypal_business_id}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                user_paypal_business_id: e
                            })} />

                        <Text style={styles.textLabel}>{t("Phone")}</Text>
                        <TextInput style={styles.textField}
                            name='billing_phone'
                            value={billingInfo.billing_phone}
                            onChangeText={(e) => setBillingInfo({
                                ...billingInfo,
                                billing_phone: e
                            })} />

                        <Text style={styles.textLabel}>{t("Street")}</Text>
                        <TextInput style={styles.textField}
                            name='billing_address_1'
                            value={billingInfo.billing_address_1}
                            onChangeText={(e) => setBillingInfo({
                                ...billingInfo,
                                billing_address_1: e
                            })} />

                        <Text style={styles.textLabel}>{t("Country")}</Text>
                        <DropDownPicker
                            style={styles.textField}
                            open={openCountry}
                            value={valueCountry ? valueCountry : selectActiveCountry}
                            items={countryData}
                            setOpen={setOpenCountry}
                            setValue={setValueCountry}
                            setItems={setItemsCountry}
                            onChangeValue={(e) => setRod(e)}
                        />

                        <Text style={styles.textLabel}>{t("State")}</Text>
                        <DropDownPicker
                            style={styles.textField}
                            open={openState}
                            value={valueState ? valueState : selectActiveState}
                            items={stateData}
                            setOpen={setOpenState}
                            setValue={setValueState}
                            setItems={setItemsState}
                            onChangeValue={(valueState) => setSelectedState(valueState)}
                        />


                        <Text style={styles.textLabel}>{t("City")}</Text>
                        <TextInput style={styles.textField}
                            name='billing_city'
                            value={billingInfo.billing_city}
                            onChangeText={(e) => setBillingInfo({
                                ...billingInfo,
                                billing_city: e
                            })} />


                        <Text style={styles.textLabel}>{t("Zip")}</Text>
                        <TextInput style={styles.textField}
                            name='billing_postcode'
                            value={billingInfo.billing_postcode}
                            onChangeText={(e) => setBillingInfo({
                                ...billingInfo,
                                billing_postcode: e
                            })} />
                    </View>
                    <View style={styles.profileEditBtn}>
                        <View style={styles.logOut}>
                            <TouchableOpacity onPress={updateProfile} style={styles.btn}>
                                <Text style={{ color: '#FFF', fontSize: 18, textTransform: "uppercase" }}>{t("Update_Profile")}</Text>
                            </TouchableOpacity>
                            {isLoadingSubmit ? <ActivityIndicator /> : (
                                <>
                                    <Text style={{ marginTop: 15, fontSize: 18, color: 'red', textAlign: 'center' }}>
                                        {errorMessage}
                                    </Text>
                                    <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>
                                        {successMessage}
                                    </Text>
                                </>
                            )}
                        </View>
                        <View style={styles.deleteAccount}>
                            <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
                                <Text style={{ color: "#00603b", fontSize: 15, textTransform: "uppercase" }}>{t("Update_Password")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
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
    profileEditWrap: {
        backgroundColor: "#ffffff",
        paddingTop: 35,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    profileImageEdit: {
        borderColor: "#f2f2f2",
        borderWidth: 4,
        width: 120,
        height: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        marginBottom: 10,
        position: "relative",
        overflow: "hidden",
    },
    profileEditTitle: {
        color: "#333333",
        fontSize: 24,
        lineHeight: 34,
        fontWeight: "400",
    },
    profileEditEmail: {
        color: "#00603b",
        fontSize: 16,
        lineHeight: 26,
        fontWeight: "400",
    },
    profileEditSecTitle: {
        color: "#333333",
        fontSize: 22,
        lineHeight: 32,
        fontWeight: "400",
    },
    profileEditForm: {
        backgroundColor: "#ffffff",
        paddingVertical: 0,
        paddingHorizontal: 20,
        marginTop: 0,
    },
    textLabel: {
        borderColor: "#333333",
        fontSize: 16,
        lineHeight: 40,
        fontWeight: "500",
        color: "#333333",
    },
    textField: {
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 40,
        position: "relative",
        zIndex: 1,
    },
    textField2: {
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 40,
        position: "relative",
        zIndex: 2,
    },
    textFieldarea: {
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 80,
        paddingVertical: 0
    },
    greenBtn: {
        backgroundColor: '#00603b',
        paddingHorizontal: 25,
        paddingVertical: 12,
        width: "100%"
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
    profileEditBtn: {
        backgroundColor: "#ffffff",
        paddingTop: 0,
        paddingBottom: 10,
        alignItems: "center"
    },
    logOut: {
        alignItems: "center",
        paddingTop: 0,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#dbdbdb",
        width: "100%",
        fontSize: 18,
    },
    deleteAccount: {
        alignItems: "center",
        paddingVertical: 15,
        width: "100%",
        fontSize: 18,
    },
    btn: {
        backgroundColor: '#00603b',
        alignItems: 'center',
        padding: 12,
        marginTop: 20
    },
    featuredImagestyle: {
        width: 120,
        height: 120,
    },
    dropdown3BtnTxt: {
        color: '#fff',
        textTransform: 'uppercase',
        fontSize: 13,
    },
    dropdown3RowTxt: {
        color: '#000000',
        textTransform: 'uppercase',
        fontSize: 14,
        paddingLeft: 10,
    },


})
export default ProfileEditScreen