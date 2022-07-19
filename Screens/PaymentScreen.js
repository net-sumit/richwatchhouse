import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { API_URL } from '../config';
// For language translate
import { useTranslation } from 'react-i18next';

//const STRIPE_PK = 'pk_test_nuPxQQoGY8aklz3AnwHmk98A'

const PaymentScreen = (props) => {
    // For language translate
    const { t, i18n } = useTranslation();
    const { amount, product_id, stripe_publishable_key } = props
    const onCheckStatus = (response) => {
        props.onCheckStatus(response)
        console.log(response);
    }

    const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

    const htmlContent = API_URL + `/stripepay-form.php?product_id=${product_id}&amount=${amount}`;
    const onMessage = (event) => {
        const { data } = event.nativeEvent;
        onCheckStatus(data)

    }




    return (
        <>
            <WebView
                javaScriptEnabled={true}
                style={{ flex: 1 }}
                originWhitelist={['*']}
                //source={{ html: htmlContent }}
                source={{ uri: htmlContent }}
                injectedJavaScript={injectedJavaScript}
                onMessage={onMessage}
                domStorageEnabled={true}
                startInLoadingState={true}
            />
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
    pageWrap: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: "#ffffff",
        height: "100%",
    },
    pageTitle: {
        fontWeight: "700",
        fontSize: 20,
        lineHeight: 30,
        color: "#00603b",
        textAlign: "center",
        paddingBottom: 20,
    },
})
export default PaymentScreen 