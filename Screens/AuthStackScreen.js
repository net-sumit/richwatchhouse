import React, { useState } from 'react'
import {
    Animated,
    View,
    Text,
    Pressable,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import UpdateEmailAddressScreen from './UpdateEmailAddressScreen';
import ImportantScreen from './ImportantScreen';

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
function AuthStackScreen({ navigation }) {
    const [showResults, setShowResults] = useState(false)
    const [LoginUserData, setLoginUserData] = useState([]);
    getData().then(e => setLoginUserData(e));

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: 15
            }}
        >
            <LoginScreen nav={navigation} />
            {/* <SignupScreen nav={navigation} /> */}
            {/* { showResults ? <SignupScreen nav={navigation} /> : null } */}
            {/* <ChangePasswordScreen nav={navigation} /> */}
            {/* <UpdateEmailAddressScreen nav={navigation} /> */}
            {/* <ImportantScreen nav={navigation} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    popupHeading: {
        color: '#333333',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 15
    },
    formLabel: {
        color: '#333333',
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 5
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    link: {
        color: "#00603b",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 5
    },
    btn: {
        backgroundColor: '#00603b',
        alignItems: 'center',
        padding: 12,
        marginTop: 20
    }
})


export default AuthStackScreen;
