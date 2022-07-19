import React, { useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchCollectionScreen = ({ navigation }) => {
    // For language translate
    const { t, i18n } = useTranslation();
    const [isLoginChk, setLoginChk] = useState(true);
    const [loginUserId, setLoginUserId] = useState('');
    
    // ===================== start_user_login_ckeck_function =====================
    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value != null) {
                setLoginUserId(JSON.parse(value).current_userID);
                setLoginChk(false);
            } else {
                setLoginChk(false);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    var x = setInterval(function () {
        if (loginUserId == '') {
            retrieveData();
        } else {
        }
    }, 1000);
    // ===================== start_user_login_ckeck_function =====================

    const loginButton = () => {
        navigation.navigate('auth');
    }

    return (
        <>
            <View style={styles.HeaderBar}>
                <Text style={{ color: "#FFF", fontSize: 15 }}>{t("rich_watch_house")}</Text>
            </View>
            {isLoginChk ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (
                <ImageBackground source={require('../assets/bg.jpg')} resizeMode="cover" style={styles.image}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 28, textTransform: 'uppercase', lineHeight: 40, marginBottom: 13 }}>{t("discover_what_your_watches")}</Text>
                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, lineHeight: 24, marginBottom: 30 }}>{t("simply_enter_your_first_watch")}</Text>


                        {
                            loginUserId != '' ?

                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('AddAuctionScreen')} style={styles.button} >
                                        <Text style={{ color: "#FFF", fontSize: 16, textTransform: 'uppercase' }}>{t("add_watch")}</Text>
                                    </TouchableOpacity>
                                </View>

                                :

                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.button} onPress={() => loginButton()}>
                                        <Text style={{ color: "#FFF", fontSize: 16, textTransform: 'uppercase', textAlign: "center" }}>{t("Please_Login_to_Add_Watch")}</Text>
                                    </TouchableOpacity>
                                </View>
                        }


                    </View>
                </ImageBackground>
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
        position: "absolute",
        top: 0,
        left: 0,
        height: 65,
        zIndex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#00603b",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 8,
    }
})

export default WatchCollectionScreen
