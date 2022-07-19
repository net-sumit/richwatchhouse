import React, { useRef, useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

const TestFontScreen = ({ route, navigation }) => {



    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>


            <View style={{ flex: 1, backgroundColor: "#FFF", padding: 10, }}>

                <Text style={styles.pageTitle}>Page Title</Text>

                <Text style={styles.pageCont}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum laoreet nulla ut ultrices. Nulla semper eget massa a posuere. Etiam tempus lorem id orci gravida placerat. Suspendisse potenti. Phasellus et blandit est. Integer eros urna, facilisis vitae nulla ac, rutrum egestas sem. Donec commodo posuere lorem, in eleifend velit imperdiet eget. Maecenas efficitur eget dolor sit amet laoreet. Proin sagittis eu arcu vitae ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec in justo ipsum. Fusce maximus facilisis hendrerit. Sed urna tortor, fringilla eget urna vel, condimentum dictum tortor. Curabitur viverra, nisl eget accumsan pulvinar, ligula justo consequat sapien, a interdum sapien risus quis erat. Mauris convallis tempus neque ut dapibus. Phasellus viverra, dolor ut varius aliquam, nisi urna gravida dolor, quis molestie velit justo sed nunc.</Text>


                <Text style={{ fontSize: 16, fontFamily: "Arial", color: "#000" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum laoreet nulla ut ultrices. Nulla semper eget massa a posuere. Etiam tempus lorem id orci gravida placerat. Suspendisse potenti. Phasellus et blandit est. Integer eros urna, facilisis vitae nulla ac, rutrum egestas sem. Donec commodo posuere lorem, in eleifend velit imperdiet eget. Maecenas efficitur eget dolor sit amet laoreet. Proin sagittis eu arcu vitae ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec in justo ipsum. Fusce maximus facilisis hendrerit. Sed urna tortor, fringilla eget urna vel, condimentum dictum tortor. Curabitur viverra, nisl eget accumsan pulvinar, ligula justo consequat sapien, a interdum sapien risus quis erat. Mauris convallis tempus neque ut dapibus. Phasellus viverra, dolor ut varius aliquam, nisi urna gravida dolor, quis molestie velit justo sed nunc.</Text>

            </View>



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
    pageTitle: {
        fontFamily: "gilroy_extrabold",
        color: "#000000",
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
    },
    pageCont: {
        fontFamily: "gilroy_light",
        color: "#000000",
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 'normal',
    },



})
export default TestFontScreen