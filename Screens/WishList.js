import React, { useRef, useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CountDown from 'react-native-countdown-component';


const WishList = ({ navigation }) => {
    // For language translate
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [isLoginChk, setLoginChk] = useState(true);
    const allWishlistDataApi = API_URL + 'all-wishlist-products.php';
    const [errorMessage, setErrorMessage] = useState();
    const [isProductSellerInfo, setProductSellerInfo] = useState([]);
    const [allWishlistData, setAllWishlistData] = useState();
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

    useEffect(() => {
        const abortCont = new AbortController();
        const allWishlistApiCall = async () => {
            try {
                const response = await fetch(allWishlistDataApi, {
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
                setAllWishlistData(data.data);
                setErrorMessage(data.error_message);
                setSuccessMessage(data.success_message);
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
            }
        }
        allWishlistApiCall()
        return () => abortCont.abort();
    }, [loginUserId]);

    const loginButton = () => {
        navigation.navigate('auth');
    }




    return (

        <>
            <View style={styles.HeaderBar}>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>
            {isLoginChk ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (
                <>
                    {
                        loginUserId != '' ?

                            <View style={styles.allAuctionWrap}>
                                <Text style={styles.allAuctionTitle}>{t("your_wishlist")}</Text>
                                {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (
                                    <ScrollView>

                                        <View style={{ marginTop: 30, marginBottom: 80, }}>

                                            {


                                                allWishlistData ?

                                                    <View style={styles.row}>

                                                        {
                                                            allWishlistData.map((item, index) => {
                                                                return (
                                                                    <View style={styles.grid} key={index}>
                                                                        <View style={styles.boxProuduct}>
                                                                            <View style={styles.boxProuductImage}>
                                                                                <TouchableOpacity style={styles.editProduct}>
                                                                                    <Ionicons name="heart-sharp" size={20} color="#00603b" />
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                                                                                    <Image source={{ uri: `${item.product_image_url}` }} style={{ width: 110, height: 150, marginBottom: 14 }} resizeMode="contain" />
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            <View style={styles.boxProuductDesc}>
                                                                                <View style={styles.boxProuductDescTop}>
                                                                                    <Text style={styles.boxProuductDescTopText} numberOfLines={2}>{item.product_title}</Text>
                                                                                    {/* <Text style={styles.boxProuductDescTopText}>522.30.42.20.04.001</Text>
                                                                        <Text style={styles.boxProuductDescTopPrice}>€ 4.124,00</Text> */}
                                                                                </View>
                                                                                <View style={styles.boxProuductDescBottom}>
                                                                                    {item.auction_status == 'Past' ?
                                                                                        <Text style={{ color: '#333333', paddingBottom: 10 }}>{t("Auction_Status")}: <Text style={{ color: "#ff0000" }}>{item.auction_status}</Text></Text>
                                                                                        :
                                                                                        <Text style={{ color: '#333333', paddingBottom: 10 }}>{t("Auction_Status")}: <Text style={{ color: "#00603b" }}>{item.auction_status}</Text></Text>
                                                                                    }
                                                                                    <View style={styles.bottomEndSec}>
                                                                                        <View>
                                                                                            <Text style={styles.bottomEndSecText}>{t("Seller")}: {item.product_owner.owner_name}</Text>

                                                                                            <View style={styles.ratingMainWrap}>
                                                                                                <>
                                                                                                    {
                                                                                                        item.product_owner.owner_average_rating === '1' ?

                                                                                                            <View style={styles.ratingView}>
                                                                                                                <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                            </View>
                                                                                                            :
                                                                                                            item.product_owner.owner_average_rating === '2' ?
                                                                                                                <View style={styles.ratingView}>
                                                                                                                    <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                    <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                </View>
                                                                                                                :
                                                                                                                item.product_owner.owner_average_rating === '3' ?
                                                                                                                    <View style={styles.ratingView}>
                                                                                                                        <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                        <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                        <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                    </View>
                                                                                                                    :
                                                                                                                    item.product_owner.owner_average_rating === '4' ?
                                                                                                                        <View style={styles.ratingView}>
                                                                                                                            <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                            <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                            <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                            <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                        </View>
                                                                                                                        :
                                                                                                                        item.product_owner.owner_average_rating === '5' ?
                                                                                                                            <View style={styles.ratingView}>
                                                                                                                                <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                                <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                                <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                                <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                                <FontAwesome name="star" color="#fedd00" size={18} />
                                                                                                                            </View>
                                                                                                                            :
                                                                                                                            <View></View>
                                                                                                    }
                                                                                                </>
                                                                                            </View>
                                                                                        </View>

                                                                                    </View>
                                                                                </View>
                                                                            </View>

                                                                            {item.countdown_time != '' ?
                                                                                <CountDown style={{ marginTop: 10 }}
                                                                                    until={item.countdown_time_second}
                                                                                    size={13}
                                                                                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 1, borderColor: '#00603b' }}
                                                                                    digitTxtStyle={{ color: '#00603b' }}
                                                                                    timeLabelStyle={{ color: '#00603b', fontWeight: 'bold', fontSize: 12 }}
                                                                                    timeToShow={['D', 'H', 'M', 'S']}
                                                                                    timeLabels={{ d: 'Days', h: 'Hrs', m: 'Mins', s: 'Secs' }}
                                                                                    showSeparator={null}
                                                                                />
                                                                                :
                                                                                <></>
                                                                            }

                                                                            <View style={styles.bidWrap}>
                                                                                <TouchableOpacity style={styles.buyBtn} onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                                                                                    <Text style={styles.buttonText}>{t("Bid_Now")}</Text>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                        </View>
                                                                    </View>
                                                                )
                                                            })
                                                        }

                                                    </View>

                                                    :

                                                    <View style={styles.messageBox}>
                                                        <Text style={styles.messageText}>{errorMessage}</Text>
                                                    </View>


                                            }


                                        </View>

                                    </ScrollView>
                                )}

                            </View>

                            :

                            <ImageBackground source={require('../assets/bg.jpg')} resizeMode="cover" style={styles.image}>
                                <View style={styles.loginButtonWrap}>
                                    <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 28, textTransform: 'uppercase', lineHeight: 40, marginBottom: 13 }}>{t("discover_what_your_watches")}</Text>
                                    <TouchableOpacity style={styles.loginBtn} onPress={() => loginButton()}>
                                        <Text style={styles.loginText}>{t("login")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>


                    }
                </>
            )}







        </>
    )
}
const styles = StyleSheet.create({
    dengerText: {
        color: 'red',
        marginVertical: 5,
        fontWeight: '600'
    },
    HeaderBar: {
        width: '100%',
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: 'center',
        position: "relative",
        height: 80,
    },
    searchbar: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 60,
    },
    input: {
        width: "90%",
        height: 35,
        borderBottomWidth: 1,
        padding: 10,
        borderColor: "#dbdbdb",
        color: "#fff",
        fontSize: 13,
        marginLeft: 10
    },
    allAuctionWrap: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: "#ffffff",
        height: "100%"
    },
    allAuctionTitle: {
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        color: "#00603b",
        textAlign: "center",
        paddingBottom: 25,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginHorizontal: -5
    },
    grid: {
        width: '50%',
        paddingHorizontal: 5
    },
    boxProuduct: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,

        shadowColor: '#999999',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        marginVertical: 10,
        minHeight: 440,
    },
    boxProuductImage: {
        backgroundColor: "#FFF",
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 0,
        position: 'relative'
    },
    editProduct: {
        position: 'absolute',
        right: 5,
        top: 4,
        backgroundColor: "#ffffff",
    },
    boxProuductDesc: {
        backgroundColor: "#ffffff",
    },
    boxProuductDescTop: {
        borderBottomColor: "#e6e6e6",
        borderBottomWidth: 1,
        paddingBottom: 0,
        marginBottom: 5,
    },
    boxProuductDescTopText: {
        color: "#333333",
        fontSize: 15,
        lineHeight: 18,
        minHeight: 45
    },
    boxProuductDescTopPrice: {
        color: "#333333",
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "500"
    },
    boxProuductDescBottom: {
        backgroundColor: "#ffffff"
    },
    boxProuductDescBottomtext: {
        fontSize: 14,
        lineHeight: 24,
        color: "#333333",
        paddingBottom: 10,
    },
    bottomEndSec: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomEndSecText: {
        fontSize: 15,
        lineHeight: 16,
        color: "#333333",
        marginBottom: 5
    },
    loginButtonWrap: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    loginBtn: {
        borderRadius: 0,
        backgroundColor: '#00603b',
        borderRadius: 8,
    },
    loginText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 40,
        paddingVertical: 12,
        textTransform: 'uppercase'
    },
    messageBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    messageText: {
        fontSize: 14,
        lineHeight: 24,
        color: "red",
    },
    ratingMainWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    ratingView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ratingMainWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        minHeight: 20
    },
    ratingView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    bidWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    buyBtn: {
        width: 130,
        borderRadius: 0,
        backgroundColor: '#00603b',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 3,
        paddingVertical: 6,
        textTransform: 'uppercase'
    },

})
export default WishList