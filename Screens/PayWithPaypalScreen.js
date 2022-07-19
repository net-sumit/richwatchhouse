import React, { useRef, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

const PayWithPaypal = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const paypalPaymentApi = API_URL + 'payment-details.php';
    const paypalPaymentApiCheckout = API_URL + 'create_order.php';
    const paypalPaymentApiCheckoutDirectOrder = API_URL + 'create_direct_order.php';
    const [formActionUrl, setFormActionUrl] = useState();
    const [paypalData, setpaypalData] = useState([])
    const productName = route.params.product_name;
    const product_id = route.params.product_id;
    const product_owner_id = route.params.product_owner_id;
    const affiliate_id = route.params.affiliate_id;
    const user_id = route.params.user_id;
    const TokenAmount = route.params.token_amount;
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const webviewRef = useRef(null);
    const [paypalCustomVal, setPaypalCustomVal] = useState();

    AsyncStorage.getItem('userData').then((result) => {
        //console.log(result);
        if (result != '') {
            setLoginUserEmail(JSON.parse(result).current_user_email);
        }
    });


    useEffect(() => {
        fetch(paypalPaymentApi, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        }).then(response => response.json()).then(data => {
            setpaypalData(data.data);
            setLoading(false);
            if (data.data.payment_mode == 'Test') {
                setFormActionUrl('https://www.sandbox.paypal.com/cgi-bin/webscr');
            } else {
                setFormActionUrl('https://www.paypal.com/cgi-bin/webscr');
            }
        }
        );
    }, [])

    if (route.params.page_from == 'checkout') {
        useEffect(() => {

            fetch(paypalPaymentApiCheckout, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    user_id: route.params.user_id,
                    product_id: route.params.product_id,
                    product_owner_id: route.params.product_owner_id,

                    billing_first_name: route.params.billing_first_name,
                    billing_last_name: route.params.billing_last_name,
                    billing_company: route.params.billing_company,
                    billing_email: route.params.billing_email,
                    billing_phone: route.params.billing_phone,
                    billing_address_1: route.params.billing_address_1,
                    billing_city: route.params.billing_city,
                    billing_state: route.params.billing_state,
                    billing_postcode: route.params.billing_postcode,
                    billing_country: route.params.billing_country,

                    shipping_first_name: route.params.shipping_first_name,
                    shipping_last_name: route.params.shipping_first_name,
                    shipping_company: route.params.shipping_first_name,
                    shipping_email: route.params.shipping_first_name,
                    shipping_phone: route.params.shipping_first_name,
                    shipping_address_1: route.params.shipping_first_name,
                    shipping_city: route.params.shipping_first_name,
                    shipping_state: route.params.shipping_first_name,
                    shipping_postcode: route.params.shipping_first_name,
                    shipping_country: route.params.shipping_first_name,

                    shipping_address_same_as_billing: route.params.shipping_address_same_as_billing,

                    payment_method: "paypal",
                })
            }).then(response => response.json()).then(data => {
                console.log(data.paypal_custom_val);
                setPaypalCustomVal(data.paypal_custom_val);
            }
            );
        }, [])
    }

    if (route.params.page_from == 'directOrderCheckout') {
        useEffect(() => {

            fetch(paypalPaymentApiCheckoutDirectOrder, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    user_id: route.params.user_id,
                    product_id: route.params.product_id,
                    product_owner_id: route.params.product_owner_id,

                    billing_first_name: route.params.billing_first_name,
                    billing_last_name: route.params.billing_last_name,
                    billing_company: route.params.billing_company,
                    billing_email: route.params.billing_email,
                    billing_phone: route.params.billing_phone,
                    billing_address_1: route.params.billing_address_1,
                    billing_city: route.params.billing_city,
                    billing_state: route.params.billing_state,
                    billing_postcode: route.params.billing_postcode,
                    billing_country: route.params.billing_country,

                    shipping_first_name: route.params.shipping_first_name,
                    shipping_last_name: route.params.shipping_first_name,
                    shipping_company: route.params.shipping_first_name,
                    shipping_email: route.params.shipping_first_name,
                    shipping_phone: route.params.shipping_first_name,
                    shipping_address_1: route.params.shipping_first_name,
                    shipping_city: route.params.shipping_first_name,
                    shipping_state: route.params.shipping_first_name,
                    shipping_postcode: route.params.shipping_first_name,
                    shipping_country: route.params.shipping_first_name,

                    shipping_address_same_as_billing: route.params.shipping_address_same_as_billing,

                    payment_method: "paypal",
                })
            }).then(response => response.json()).then(data => {
                console.log(data.paypal_custom_val);
                setPaypalCustomVal(data.paypal_custom_val);
            }
            );
        }, [])
    }

    const htmlContent = `

    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <!-- Add meta tags for mobile and IE -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title> PayPal Checkout Integration | Server Demo </title>
        <style>
            body{
                display:flex; 
                flex-direction:column; 
                justify-content:center;
                min-height:100vh;
                align-items: center;
            }
            .btn{
                background:#00603b;
                color:#fff;
                font-size:20px;
                border:0;
                padding:0 10px;
                height: 60px;
                width: 300px;
                border-radius: 50px;
            }
        </style>
    </head>
    <body>
        <form onsubmit="myFunction()" id="perticipantfees-frm-paypal" name="perticipantfees-frm-paypal" action="${formActionUrl}" method="POST">
            <input type="hidden" name="cmd" value="_xclick">
            <input type="hidden" name="business" value="${paypalData.paypal_business_id}">
            <input type="hidden" name="item_name" value="Auction registration fees for: ${productName}" />
            <input type="hidden" name="currency_code" value="${paypalData.payment_currency}">
            <input type="hidden" name="amount" value="${TokenAmount}" required>
            <input type="hidden" name="notify_url" value="https://rixaltodemo.com/richwatchouse/paypal-ipn.php" />
            <input type="hidden" name="return" value="https://rixaltodemo.com/richwatchouse/app-paypal-payment-success.php">
            <input type="hidden" name="rm" value="2" />
            <input type="hidden" name="lc" value="" />
            <input type="hidden" name="no_shipping" value="1" />
            <input type="hidden" name="no_note" value="1" />
            <input type="hidden" name="custom" value="${product_id}|${user_id}|${TokenAmount}|${loginUserEmail}|${product_owner_id}|${affiliate_id}" />
            <input type="hidden" name="cbt" value="Click to Complete">
            <input type="submit" value="Proceed To Pay" class="btn" />
        </form>    
 </body>
    
    </html>
        
    `;

    const htmlContentCheckout = `

    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <!-- Add meta tags for mobile and IE -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title> PayPal Checkout Integration | Server Demo </title>
        <style>
            body{
                display:flex; 
                flex-direction:column; 
                justify-content:center;
                min-height:100vh;
                align-items: center;
            }
            .btn{
                background:#00603b;
                color:#fff;
                font-size:20px;
                border:0;
                padding:0 10px;
                height: 60px;
                width: 300px;
                border-radius: 50px;
            }
        </style>
    </head>
    <body>
        <form onsubmit="myFunction()" id="perticipantfees-frm-paypal" name="perticipantfees-frm-paypal" action="${formActionUrl}" method="POST">
            <input type="hidden" name="cmd" value="_xclick">
            <input type="hidden" name="business" value="${paypalData.paypal_business_id}">
            <input type="hidden" name="item_name" value="Product purchase for: ${productName}" />
            <input type="hidden" name="currency_code" value="${paypalData.payment_currency}">
            <input type="hidden" name="amount" value="${TokenAmount}" required>
            <input type="hidden" name="notify_url" value="https://rixaltodemo.com/richwatchouse/paypal-checkuot-ipn.php" />
            <input type="hidden" name="return" value="https://rixaltodemo.com/richwatchouse/app-paypal-payment-success.php">
            <input type="hidden" name="rm" value="2" />
            <input type="hidden" name="lc" value="" />
            <input type="hidden" name="no_shipping" value="1" />
            <input type="hidden" name="no_note" value="1" />
            <input type="hidden" name="custom" value="${paypalCustomVal}" />
            <input type="hidden" name="cbt" value="Click to Complete">
            <input type="submit" value="Proceed To Pay" class="btn" />
        </form>    
 </body>
    
    </html>
        
    `;


    const result = currentUrl.split('?PayerID');
    if (result[0] == 'https://rixaltodemo.com/richwatchouse/app-paypal-payment-success.php') {
        console.log(result[0],'result');
        // setTimeout(function () {
        //     navigation.push('ProductDetails', { user_id: user_id, productId: product_id })
        // }, 2000);
        setTimeout(function () {
            navigation.navigate('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id, page_form:'payment' });
        }, 2000);
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
                <>
                    {route.params.page_from == 'checkout' || route.params.page_from == 'directOrderCheckout' ?
                        <WebView
                            source={{ html: htmlContentCheckout }}
                            style={{ flex: 1 }}
                            startInLoadingState={true}
                            ref={webviewRef}
                            onNavigationStateChange={navState => {
                                setCurrentUrl(navState.url)
                            }}
                        />
                        :
                        <WebView
                            source={{ html: htmlContent }}
                            style={{ flex: 1 }}
                            startInLoadingState={true}
                            ref={webviewRef}
                            onNavigationStateChange={navState => {
                                setCurrentUrl(navState.url)
                            }}
                        />
                    }
                </>
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
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
        textTransform: 'uppercase',
        backgroundColor: '#00603b',
        borderRadius: 50
    }
})
export default PayWithPaypal 
