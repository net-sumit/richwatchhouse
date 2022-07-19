import React, { Component, useState } from "react";
import RenderHtml from 'react-native-render-html';
import {
    Animated,
    View,
    Text,
    Pressable,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';

const tagsStyles = {
    body: {
        marginTop: 15,
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
};


function LoginScreen({ nav, navigation }) {
    const { t, i18n } = useTranslation();
    const [showResults, setShowResults] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const loginApi = API_URL + 'login-user.php';
    const registerApi = API_URL + 'register-user.php';
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [allData, setAlldata] = useState([]);
    //console.warn(route.params);
    const [privacy, setPrivacy] = useState(false);
    const [terms, setTerms] = useState(false);
    const radioVal = [
        { label: 'Seller', value: 'seller' },
        { label: 'Customer', value: 'customer' }
    ]
    const [selectedVal, setSelectedVal] = useState();
    const [formRequired, setFormRequired] = useState('');
    const [allValues, setAllValues] = useState({
        password: '',
        email: '',
        f_name: '',
        l_name: '',
        email: '',
        password: '',
        used_refer_id: '',
    });


    // Stote data local storate
    const storeData = async (val) => {
        const jasonVal = JSON.stringify(val);
        try {
            await AsyncStorage.setItem('userData', jasonVal)
        } catch (e) {
            // saving error
        }
    }


    // For Login
    const submit = () => {


        if (allValues.email == '' || allValues.password == '') {
            setFormRequired('Above all fields are required');
            return false;
        }
        else {
            setFormRequired('');
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            // API call POST Method
            fetch(loginApi, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    user_name: allValues.email,
                    password: allValues.password
                })
            }).then(response => response.json()).then(data => {
                setLoading(false);
                setAlldata(data.data);
                setErrorMessage(data.error_message);
                setSuccessMessage(data.success_message);
                storeData(data.data);
                if (data.success_message != '') {
                    setTimeout(() => {
                        nav.goBack();
                        //nav.navigate('Homee');
                    }, 2000);
                }
            }
            );

        }


    }

    // For Registration
    const registrationSubmit = () => {

        if (allValues.f_name == '' || allValues.l_name == '' || allValues.email == '' || allValues.password == '' ||
            allValues.used_refer_id == '' || selectedVal == '' || privacy == '' || terms == '') {
            setFormRequired('Above all fields are required');
            return false;
        }
        else {


            setFormRequired('');
            setLoading(true);

            //API call POST Method
            fetch(registerApi, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    user_type: selectedVal,
                    f_name: allValues.f_name,
                    l_name: allValues.l_name,
                    email: allValues.email,
                    password: allValues.password,
                    used_refer_id: allValues.used_refer_id,
                    privacy: privacy,
                    terms: terms,
                })
            }).then(response => response.json()).then(data => {
                setLoading(false);
                //console.log(data);
                //console.log(data.success_message);
                setErrorMessage(data.error_message);
                setSuccessMessage(data.success_message);
                if (data.success_message != '') {
                    setTimeout(() => {
                        nav.goBack();
                        nav.navigate('Homee');
                    }, 2000);
                }
            }
            );

        }

    }

    const newAccount = () => {
        setShowResults(true);
        //alert("Set Up New Account");
    }

    //console.log(errorMessage, "errorMessage Test");




    return (


        <>

            {showResults ?



                <View style={styles.signUpWrap}>

                    <View style={{ backgroundColor: "#FFF", width: '100%', borderRadius: 5, padding: 15, position: 'relative' }}>
                        <TouchableOpacity onPress={() => nav.goBack()} style={{ position: 'absolute', right: 8, top: 8, zIndex: 99 }}><Ionicons name="close" size={25} color="#000" /></TouchableOpacity>
                        <Text style={styles.popupHeading}>{t("Register")}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <View style={{ width: '48%' }}>
                                <Text style={styles.formLabel}>{t("First_Name")}</Text>
                                <TextInput style={styles.input}
                                    name='f_name'
                                    value={allValues.f_name}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        f_name: e
                                    })} />
                            </View>
                            <View style={{ width: '48%' }}>
                                <Text style={styles.formLabel}>{t("Last_Name")}</Text>
                                <TextInput style={styles.input}
                                    name='l_name'
                                    value={allValues.l_name}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        l_name: e
                                    })} />
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.formLabel}>{t("Email_Address")}</Text>
                            <TextInput style={styles.input}
                                name='email'
                                value={allValues.email}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    email: e
                                })} />
                        </View>
                        <View style={{ marginVertical: 6 }}>
                            <Text style={styles.formLabel}>{t("Password_characters")}</Text>
                            <TextInput secureTextEntry={true} style={styles.input}
                                name='password'
                                value={allValues.password}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    password: e
                                })} />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.formLabel}>{t("Refer_ID")}</Text>
                            <TextInput style={styles.input}
                                name='used_refer_id'
                                value={allValues.used_refer_id}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    used_refer_id: e
                                })} />
                        </View>
                        <View>
                            <RadioForm
                                radio_props={radioVal}
                                initial={'customer'}
                                formHorizontal={true}
                                animation={true}
                                buttonSize={10}
                                buttonOuterSize={20}
                                buttonColor={'#00603b'}
                                selectedButtonColor= {'#00603b'}
                                labelColor={'#000000'}
                                labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 15, }}
                                onPress={(val) => setSelectedVal(val)}
                            />
                        </View>

                        <View style={styles.privacyWrap}>
                            <View>
                                <CheckBox
                                    center
                                    title={t("accept_Rich_Watch_House_general_terms")}
                                    checked={privacy}
                                    onPress={() => setPrivacy(!privacy)}
                                    containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, padding: 0, }}
                                />
                            </View>
                            <View style={styles.checkWrap}>
                                <CheckBox
                                    center
                                    title={t("would_like_to_regularly")}
                                    checked={terms}
                                    onPress={() => setTerms(!terms)}
                                    containerStyle={{ backgroundColor: "#ffffff", borderWidth: 0, padding: 0, }}
                                />
                            </View>
                        </View>

                        <View><Text style={{ textAlign: 'center', color: 'red', fontSize: 18 }}>{formRequired}</Text></View>
                        <TouchableOpacity style={styles.btn} onPress={registrationSubmit}>
                            <Text style={{ color: '#FFF', fontSize: 17, textTransform: "uppercase" }}>{t("Register_now_for_free")}</Text>
                        </TouchableOpacity>
                        {isLoading ? <ActivityIndicator /> : (
                            <>
                                <Text style={{ fontSize: 20, color: 'red' }}>{errorMessage}</Text>
                                <Text style={{ fontSize: 20, color: 'green' }}>{successMessage}</Text>
                            </>
                        )}
                        {/* <TouchableOpacity style={{alignItems:'center', marginTop:15}}>
<Text style={styles.link}>Already a chrono24 user? Log in now.</Text>
</TouchableOpacity> */}
                    </View>

                </View>


                :



                <View style={{ backgroundColor: "#FFF", width: '100%', borderRadius: 5, padding: 15, position: 'relative' }}>
                    <TouchableOpacity onPress={() => nav.goBack()} style={{ position: 'absolute', right: 8, top: 8, zIndex: 99 }}><Ionicons name="close" size={25} color="#000" /></TouchableOpacity>
                    <Text style={styles.popupHeading}>{t("login")}</Text>

                    <View>
                        <Text style={styles.formLabel}>{t("Email_Address")}</Text>
                        <TextInput style={styles.input}
                            name='email'
                            value={allValues.email}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                email: e
                            })} />
                    </View>
                    <View style={{ marginVertical: 6 }}>
                        <View style={styles.labelRow}>
                            <Text style={styles.formLabel}>{("Password")}</Text>
                            <TouchableOpacity onPress={() => nav.navigate('ChangePasswordScreen')} style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.link}>{t("Forgot_your_password")}</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput secureTextEntry={true} style={styles.input}
                            name='password'
                            value={allValues.password}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                password: e
                            })} />
                    </View>
                    <View><Text style={{ textAlign: 'center', color: 'red', fontSize: 18 }}>{formRequired}</Text></View>
                    <TouchableOpacity onPress={submit} style={styles.btn}>
                        <Text style={{ color: '#FFF', fontSize: 17 }}>{t("login")}</Text>
                    </TouchableOpacity>


                    {isLoading ? <ActivityIndicator /> : (
                        <>
                            <Text style={{ marginTop: 15, fontSize: 18, color: 'red', textAlign: 'center' }}>
                                <RenderHtml
                                    source={{ html: errorMessage }}
                                    enableExperimentalMarginCollapsing={true}
                                    tagsStyles={tagsStyles}
                                />
                            </Text>
                            <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>
                                {successMessage}
                            </Text>
                        </>
                    )}
                    <TouchableOpacity
                        onPress={newAccount}
                        style={{ alignItems: 'center', marginTop: 15 }}
                    >
                        <Text style={styles.link}>{t("Setup_new_account")}</Text>
                    </TouchableOpacity>

                </View>



            }

        </>



    );
}

const styles = StyleSheet.create({
    popupHeading: {
        color: '#333333',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 15
    },

    privacyWrap: {
        paddingVertical: 0,
    },


    formLabel: {
        color: '#333333',
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 5
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc',
        color: "#333333",
        borderRadius: 8,
    },
    link: {
        color: "#00603b",
        fontSize: 16,
        lineHeight: 16,
        fontWeight: "600",
        marginTop: 5
    },
    btn: {
        backgroundColor: '#00603b',
        alignItems: 'center',
        padding: 12,
        marginTop: 20,
        borderRadius: 8,
    },
    labelRow: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    }
})


export default LoginScreen;
