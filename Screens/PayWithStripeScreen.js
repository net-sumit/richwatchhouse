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
import PaymentScreen from './PaymentScreen';
import { API_URL } from '../config';
// For language translate
import { useTranslation } from 'react-i18next';


const PayWithStripe = ({ route, navigation }) => {
    console.log(route.params.page_from, 'Coming from');

    // For language translate
    const { t, i18n } = useTranslation();
    const stripePaymentApi = API_URL + 'auction_participate.php';
    const stripePaymentApiCheckout = API_URL + 'create_order.php';
    const stripePaymentApiCheckoutDirectOrder = API_URL + 'create_direct_order.php';
    const [response, setResponse] = useState();
    const [makePayment, setMakePayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [paymentDetails, setPaymentDetails] = useState([]);

    useEffect(() => {
        const paymentDetailsAPIcall = async () => {
            try {
                const response = await fetch(API_URL + 'payment-details.php', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setPaymentDetails(data.data);
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                //console.log(error)
            }
        }
        paymentDetailsAPIcall()
    }, [])

    // const goProductDetailsPage = () => {
    //     navigation.navigate('ProductDetails', {
    //         page_form: 'paymentPage',
    //         user_id: route.params.user_id,
    //         product_id: route.params.product_id,
    //     });
    // }


    const onCheckStatus = (paymentResponse) => {
        let jsonResponse = JSON.parse(paymentResponse);
        console.log(jsonResponse, 'payment responce');
        if (jsonResponse.error) {
            setPaymentStatus('Incorrect card details');
        } else {
            setPaymentStatus('Please wait while confirming your payment!');
        }

        //perform operation to check payment status
        if (jsonResponse.token) {
            if (route.params.page_from == 'checkout') {
                if (route.params.shipping_address_same_as_billing == 'no') {
                    fetch(stripePaymentApiCheckout, {
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

                            payment_method: "stripe",
                            stripeToken: jsonResponse.token.id,
                        })
                    }).then(response => response.json()).then(data => {
                        setPaymentStatus(data.success_message);
                        //console.log(data.success_message);
                        setTimeout(function () {
                            //navigation.push('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id })
                            //navigation.push('Homee')
                            setPaymentStatus('');
                            navigation.navigate('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id, page_form: 'payment' });
                        }, 2000);
                    }
                    );
                } else {
                    fetch(stripePaymentApiCheckout, {
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
                            shipping_address_same_as_billing: 'yes',
                            payment_method: "stripe",
                            stripeToken: jsonResponse.token.id,
                        })
                    }).then(response => response.json()).then(data => {
                        setPaymentStatus(data.success_message);
                        //console.log(data);
                        setTimeout(function () {
                            //navigation.push('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id })
                            //navigation.push('Homee')
                            setPaymentStatus('');
                            navigation.navigate('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id, page_form: 'payment' });
                        }, 2000);
                    }
                    );
                }
            } else if (route.params.page_from == 'directOrderCheckout') {
                if (route.params.shipping_address_same_as_billing == 'no') {
                    fetch(stripePaymentApiCheckoutDirectOrder, {
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

                            payment_method: "stripe",
                            stripeToken: jsonResponse.token.id,
                        })
                    }).then(response => response.json()).then(data => {
                        setPaymentStatus(data.success_message);
                        //console.log(data.success_message);
                        setTimeout(function () {
                            //navigation.push('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id })
                            //navigation.push('Homee')
                            setPaymentStatus('');
                            navigation.navigate('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id, page_form: 'payment' });
                        }, 2000);
                    }
                    );
                } else {
                    fetch(stripePaymentApiCheckoutDirectOrder, {
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
                            shipping_address_same_as_billing: 'yes',
                            payment_method: "stripe",
                            stripeToken: jsonResponse.token.id,
                        })
                    }).then(response => response.json()).then(data => {
                        setPaymentStatus(data.success_message);
                        //console.log(data);
                        setTimeout(function () {
                            //navigation.push('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id })
                            //navigation.push('Homee')
                            setPaymentStatus('');
                            navigation.navigate('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id, page_form: 'payment' });
                        }, 2000);
                    }
                    );
                }
            } else {
                fetch(stripePaymentApi, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        payment_gateway: "stripe",
                        product_id: route.params.product_id,
                        product_owner_id: route.params.product_owner_id,
                        affiliate_id: route.params.affiliate_id,
                        user_id: route.params.user_id,
                        token_amount: route.params.token_amount,
                        stripeToken: jsonResponse.token.id
                    })
                }).then(response => response.json()).then(data => {
                    console.log(data, 'api data');
                    setPaymentStatus(data.success_message);
                    setTimeout(function () {
                        //navigation.push('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id })
                        //navigation.push('Homee')
                        setPaymentStatus('');
                        navigation.navigate('ProductDetails', { user_id: route.params.user_id, productId: route.params.product_id, page_form: 'payment' });
                    }, 2000);
                    //console.log(data.success_message);
                }
                );
            }
        }
    }
    // const goBBack = () => {
    //     navigation.navigate('ProductDetails', { user_id: route.params.user_id, product_id: route.params.product_id, page_form: 'payment' });
    // }
    const paymentUI = () => {
        return <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />

            </View>
            <PaymentScreen onCheckStatus={onCheckStatus} product_id={route.params.product_id} amount={route.params.token_amount} stripe_publishable_key={paymentDetails.stripe_publishable_key} />
            <View style={{ backgroundColor: '#fff', paddingTop: 0, paddingBottom: 20, paddingHorizontal: 15 }}><Text style={{ textAlign: 'center', fontSize: 20 }}>{paymentStatus}</Text></View>
            {/* <TouchableOpacity onPress={goBBack}><Text>Back</Text></TouchableOpacity> */}
        </>
        // show to make payment
    }


    return (<View style={styles.container}>
        {paymentUI()}
    </View>)
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
    container: { flex: 1, paddingTop: 0 },
    navigation: { flex: 2, backgroundColor: 'red' },
    body: { flex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
    footer: { flex: 1, backgroundColor: 'cyan' },
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
export default PayWithStripe    