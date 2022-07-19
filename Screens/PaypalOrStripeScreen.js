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
    ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const PaypalOrStripe = ({ route, navigation }) => {
    //console.log(route.params);
    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', paddingHorizontal: 15, }}>
                <View style={{ marginBottom: 30 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#00603b', fontWeight: '700', marginBottom: 10 }}>Product Name: {route.params.product_name}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#00603b', fontWeight: '700' }}>Amount: ${route.params.token_amount}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => navigation.navigate('PayWithPaypal',
                        {
                            product_name: route.params.product_name,
                            token_amount: route.params.token_amount,
                            product_id: route.params.product_id,
                            affiliate_id: route.params.affiliate_id,
                            product_owner_id: route.params.product_owner_id,
                            user_id: route.params.user_id,
                        })} style={styles.inlineBtn}><Text style={styles.buttonText}>Pay With Paypal</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PayWithStripe',
                        {
                            product_name: route.params.product_name,
                            product_id: route.params.product_id,
                            product_owner_id: route.params.product_owner_id,
                            affiliate_id: route.params.affiliate_id,
                            user_id: route.params.user_id,
                            token_amount: route.params.token_amount,
                        })} style={styles.inlineBtn}><Text style={styles.buttonText}>Pay With Stripe</Text></TouchableOpacity>
                </View>
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
    inlineBtn: {
    },
    buttonText: {
        fontSize: 15,
        lineHeight: 21,
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        textTransform: 'uppercase',
        backgroundColor: '#00603b',
        borderRadius: 50,
        marginHorizontal: 4
    }
})
export default PaypalOrStripe 