import React, { useRef, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
// For language translate
import AntDesign from 'react-native-vector-icons/AntDesign';
import RenderHtml from 'react-native-render-html';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../config';
const tagsStyles = {
    body: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        color: "#333333",
    },
};


const BuyingOrdersScreen = ({ route, navigation }) => {
    // For language translate
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const buyingOrdersApi = API_URL+'user-buying-orders.php';
    const [buyingOrdersData, setBuyingOrdersData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [loginUserId, setLoginUserId] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('userData').then((result) => {
            //console.log(result);
            if (result != '') {
                setLoginUserId(JSON.parse(result).current_userID);
            }
        });
        const abortCont = new AbortController();
        const asyncPostCall = async () => {
            try {
                const response = await fetch(buyingOrdersApi, {
                    signal: abortCont.signal,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // your expected POST request payload goes here
                        user_id: loginUserId
                    })
                });
                const data = await response.json();
                    // enter you logic when the fetch is successful
                    setLoading(false);
                    setBuyingOrdersData(data.data);
                    setErrorMessage(data.error_message);
                    setSuccessMessage(data.success_message);
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                //console.log(error)
            }
        }
        asyncPostCall()
        return () => abortCont.abort();
    }, [loginUserId]);

    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>

            <View style={{ flex: 1, backgroundColor: "#FFF", padding: 10, }}>

                <View style={styles.SellingOrderArea}>
                    <Text style={styles.allAuctionTitle}>{t("buying_orders")}</Text>

                    {buyingOrdersData ?

                        <View style={styles.SellingOrderContentArea}>
                            {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 300 }} /> : (

                                <ScrollView>

                                    {
                                        buyingOrdersData.map((item, index) => {
                                            return (
                                                <View style={styles.SellingOrderContentAreaSlide} key={index}>
                                                    <View style={styles.TopTitleAreaTitleCont} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <View style={{ paddingBottom: 5, }}>
                                                            <Text style={styles.TopTitle}>{t("Order_ID")}: <Text style={styles.TopTitleAreaTitleCont}>{item.order_id}</Text></Text>
                                                        </View>
                                                        <View style={{ paddingBottom: 5, }}>
                                                            <Text style={styles.TopTitle}>{t("Date")}: <Text style={styles.TopTitleAreaTitleCont}>{item.order_date}</Text></Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.TopTitleAreaTitleCont}>
                                                        <Text style={styles.TopTitle}>{t("Status")}: <Text style={styles.TopTitleAreaTitleCont}>{item.order_status}</Text></Text>
                                                    </View>
                                                    <View style={styles.TopTitleAreaTitleCont}>
                                                        <Text style={styles.TopTitle}>{("Total")}:
                                                            <RenderHtml
                                                                source={{ html: item.order_amount }}
                                                                enableExperimentalMarginCollapsing={true}
                                                                tagsStyles={tagsStyles}
                                                            />
                                                        </Text>
                                                    </View>

                                                    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { productId: item.product_id, user_id: loginUserId })} style={styles.btn}>
                                                        <Text style={{ color: '#FFF', fontSize: 18, textTransform: "uppercase" }}> {t("Chat")} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }

                                </ScrollView>

                            )}

                        </View>


                        :

                        <View>
                            <Text style={{textAlign:'center',fontSize:20,color:'red',marginTop:0}}>{errorMessage}</Text>
                        </View>

                    }


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
    SellingOrderContentAreaSlide: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: "#cfd3d5",
    },
    TopTitle: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '600',
        letterSpacing: 0.25,
        color: "#333333",
    },
    TopTitleAreaTitleCont: {
        fontWeight: '400',
        paddingBottom: 5,
    },
    btn: {
        backgroundColor: '#00603b',
        alignItems: 'center',
        padding: 12,
        marginTop: 10,
        borderRadius: 8,
    },
    allAuctionTitle: {
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        color: "#00603b",
        textAlign: "center",
        paddingBottom: 25,
    },


})
export default BuyingOrdersScreen