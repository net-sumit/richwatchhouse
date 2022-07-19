import React, { Component, useState } from "react";
import {
    Animated,
    View,
    Text,
    Pressable,
    Button,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
  } from 'react-native';

  import Ionicons from 'react-native-vector-icons/Ionicons';
  import AntDesign from 'react-native-vector-icons/AntDesign';

  import AsyncStorage from '@react-native-async-storage/async-storage';
    // Get local storage data
    const getData = async () => {
        let ball = '';
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value != null) {
                ball = JSON.parse(value);
            }
        } catch (e) {
            // error reading value
        }

        return ball;
    }

function ChangePasswordScreen({nav,route, navigation}) {

    const [LoginUserData, setLoginUserData] = useState([]);
    getData().then(e => setLoginUserData(e));
    //console.log(route.params.userId);

    const [isLoading, setLoading] = useState(false);
    const loginApi = 'https://rixaltodemo.com/richwatchouse/app-api/v1/update-password.php';
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [allData, setAlldata] = useState([]);
    //console.warn(route.params);
    const [allValues, setAllValues] = useState({
        old_password: '',
        new_password: ''
    });

    const submit = () => {
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
                user_id: LoginUserData.current_userID,
                old_password: allValues.old_password,
                new_password: allValues.new_password
            })
        }).then(response => response.json()).then(data => {
            setLoading(false);
            setAlldata(data.data);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);
            storeData(data.data);

            //console.log(data.data);
        }
        );
    }







  return (

    <>

            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>
            
            <View style={{backgroundColor:"#FFF", paddingTop:40, width:'100%', height:'100%', borderRadius:5, padding:15, position:'relative'}}>
                <Text style={styles.popupHeading}>Change Password</Text>
                <View>
                    <View style={styles.labelRow}>
                        <Text style={styles.formLabel}>Current password</Text>
                    </View>
                    <TextInput secureTextEntry={true} style={styles.input}
                        name='password'
                        value={allValues.old_password}
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            old_password: e
                    })} />
                </View>
                <View style={{marginVertical:6}}>
                    <Text style={styles.formLabel}>New Password</Text>
                    <TextInput secureTextEntry={true} style={styles.input}
                        name='password'
                        value={allValues.new_password}
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            new_password: e
                    })} />
                </View>
                <TouchableOpacity onPress={submit} style={styles.btn}>
                    <Text style={{ color: '#FFF', fontSize: 18 }}>Change Password</Text>
                </TouchableOpacity>
                {isLoading ? <ActivityIndicator /> : (
                    <>
                        <Text style={{marginTop:15, fontSize: 18, color:'red', textAlign:'center' }}>{errorMessage}</Text>
                        <Text style={{ fontSize: 18, color:'green', textAlign:'center' }}>
                            {successMessage}
                        </Text>
                    </>
                )}
            </View>

    </>
  );
}

const styles = StyleSheet.create({
    popupHeading:{
        color:'#333333',
        fontSize:22,
        textAlign:'center',
        marginBottom:15
    },
    formLabel:{
        color:'#333333',
        fontSize:17,
        fontWeight:'600',
        marginBottom:5
    },
    input:{
        height:40,
        borderWidth:1,
        borderColor:'#cccccc',
        color: "#333333",
        borderRadius: 8,
    },
    link:{
        color:"#00603b",
        fontSize:16,
        lineHeight: 16,
        fontWeight:"600",
        marginTop:5
    },
    btn:{
        backgroundColor:'#00603b',
        alignItems:'center',
        padding:12,
        marginTop:20,
        borderRadius: 8,
    },
    labelRow:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row",
    },
    HeaderBar: {
        width: '100%',
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: 'center',
        position: "relative",
        height: 80,
    },
})


export default ChangePasswordScreen;
