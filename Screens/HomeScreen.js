import React, { useRef, useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Animated,
    ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'
// For language translate
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import CountDown from 'react-native-countdown-component';
import DropDownPicker from 'react-native-dropdown-picker';
import { API_URL } from '../config';





const HomeScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const homeDataApi = API_URL + 'home_data_listing.php';

    const [homeData, setHomeData] = useState([]);
    const [lastTimeData, setLastTimeData] = useState([]);
    const [homeBrandData, setHomeBrandData] = useState([]);
    const [homeExpiryData, setHomeExpiryData] = useState([]);
    const [homeTopSellData, setHomeTopSellData] = useState([]);
    const [homeRecommendedData, setHomeRecommendedData] = useState([]);
    const [loginUserId, setLoginUserId] = useState('');





    useEffect(() => {
        const abortCont = new AbortController();

        AsyncStorage.getItem('userData').then((result) => {
            //console.log(result);
            if (result != '' || result != null) {
                setLoginUserId(JSON.parse(result).current_userID);
            }else{
                setLoginUserId('');
            }
        });



        const asyncGetCall = async () => {
            try {
                const response = await fetch(homeDataApi, {
                    signal: abortCont.signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setLoading(false);
                setHomeData(data.data);
                setLastTimeData(data.data.running_auction_poroducts);
                setHomeBrandData(data.data.brands);
                setHomeExpiryData(data.data.expiring_today_poroducts);
                setHomeTopSellData(data.data.top_sell_poroducts);
                setHomeRecommendedData(data.data.recommended_poroducts);
                storeData(data.data, "storeData");
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
            }
        }
        asyncGetCall();
        return () => abortCont.abort();
    }, []);



    const scrollY = useRef(new Animated.Value(0)).current;

    const element = [
        { name: "Morbi", text: 'Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.' },
        { name: "Morbi", text: 'Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.' },
        { name: "Morbi", text: 'Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.' },
    ];
    // For language translate
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('it');
    const [items, setItems] = useState([
        {
            label: '',
            value: 'it',
            icon: () => (<Image source={{ uri: `https://rixaltodemo.com/richwatchouse/wp-content/uploads/2022/01/it.jpg` }} style={{ width: 18, height: 18, }} resizeMode="contain" />),
        },
        {
            label: '',
            value: 'en',
            icon: () => (<Image source={{ uri: `https://rixaltodemo.com/richwatchouse/wp-content/uploads/2022/01/en.jpg` }} style={{ width: 18, height: 18, }} resizeMode="contain" />),
        }
    ]);




    // const getData = async () => {
    //     try {
    //         const value22 = await AsyncStorage.getItem('items')
    //         if (value22 !== null) {
    //             console.log(value22);
    //         }
    //     } catch (e) {
    //         // error reading value
    //     }
    // }

    useEffect(() => {

        const retrieveData = async () => {
            try {
                const langValue = await AsyncStorage.getItem('languageData');
                if (langValue !== null) {
                    console.log(langValue, 'storedLanguage');
                } else {
                    AsyncStorage.setItem('languageData', JSON.stringify(
                        {
                            langName: value,
                        }
                    ));
                    console.log('Set new lang');
                }
            } catch (error) {
                // Error retrieving data
            }
        };
        retrieveData();

    }, []);

    useEffect(() => {
        AsyncStorage.mergeItem('languageData', JSON.stringify(
            {
                langName: value,
            }
        ));
    }, [value]);

    return (
        <>
            <DropDownPicker
                style={{
                    position: 'absolute',
                    top: 18,
                    right: 5,
                    width: 40,
                    height: 45,
                    zIndex: 99,
                    backgroundColor: 'gba(52, 52, 52, 0)',
                    borderWidth: 0,
                }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(value) => {
                    //console.log(value);
                    i18n.changeLanguage(value)
                }}
            />
            <Animated.View style={[styles.HeaderBar]}>
                <Animated.Image source={require('../assets/logo.png')} resizeMode="cover"
                    style={{
                        transform: [
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [80, 110],
                                    outputRange: [1, 0],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                />


                <Animated.View style={{
                    position: 'absolute',
                    top: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [90, 120],
                                outputRange: [0, -90],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}>
                    <Animated.Image source={require('../assets/stickylogo.jpg')} resizeMode="cover"
                        style={{
                            marginHorizontal: 10,
                            transform: [
                                {
                                    translateX: scrollY.interpolate({
                                        inputRange: [110, 150],
                                        outputRange: [-90, 0],
                                        extrapolate: 'clamp'
                                    })
                                }
                            ]
                        }}
                    />

                    <Animated.View style={{
                        flexDirection: 'row'
                    }}>
                        <Ionicons name="search" color="#FFF" size={25} />
                        <TextInput placeholder="cerca tra 9243 aste" placeholderTextColor="#FFF" style={[styles.input, { width: "78%", fontSize: 14, color: "#333333" }]} />
                    </Animated.View>

                </Animated.View>

            </Animated.View>


            {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 300 }} /> : (

                <Animated.ScrollView style={{
                    flex: 1,
                    backgroundColor: "#FFF",
                    marginTop: 80,
                    zIndex: 3,
                    position: "relative"
                }}
                    showsVerticalScrollIndicator={false}
                    onScroll={
                        Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        y: scrollY
                                    }
                                }
                            }
                        ],
                            {
                                useNativeDriver: true
                            }
                        )
                    }
                >
                    <View style={styles.searchbar}>
                        <Ionicons name="search" color="#000" size={25} />
                        <TextInput placeholder="cerca tra 9243 aste" placeholderTextColor="#ccc" style={styles.input} />
                    </View>
                    <View style={styles.bodyWrapper}>


                        <Text style={styles.heading}>{t('last_minute')}</Text>

                        <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>


                            {
                                lastTimeData.map((item, index) => {
                                    return (
                                        <View style={styles.slide} key={index}>
                                            <View style={styles.singleWatch}>
                                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                                                    <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, zIndex: 9 }}>
                                                        <Ionicons name="heart-outline" size={24} color="#00603b" style={styles.wishList} />
                                                    </TouchableOpacity>
                                                    <Image source={{ uri: `${item.image}` }} style={{ width: 150, height: 150, marginBottom: 14 }} resizeMode="contain" />
                                                    <Text style={styles.singleWatchText} numberOfLines={2}>{item.name}</Text>
                                                    <Text style={styles.singleWatchText}>
                                                        $ {item.regular_price ? item.regular_price : item.base_price}
                                                    </Text>
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
                                                </TouchableOpacity>



                                                <View style={styles.bidWrap}>
                                                    <TouchableOpacity style={styles.buyBtn} onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                                                        <Text style={styles.buttonText}>{t('Bid_Now')}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </ScrollView>

                        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 0 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('AllAuctionUserScreen', { user_id: loginUserId })} style={styles.greenBtn}>
                                <Text style={{ color: '#FFF', fontSize: 16 }}>{t("load_more_product")}</Text>
                            </TouchableOpacity>
                        </View>



                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.heading}>{t('top_brand')}</Text>

                            <View style={styles.row}>
                                <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                    {
                                        homeBrandData.map((item, index) => {
                                            return (

                                                <View style={styles.eachBtnBox} key={index}>
                                                    <TouchableOpacity style={styles.eachBtn} onPress={() => navigation.navigate('BrandProductListScreen', { brandId: item.id, user_id: loginUserId })}>
                                                        <Text style={{ textAlign: "center", fontSize: 14, color: "#555555" }}>{item.name}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            )
                                        })
                                    }

                                </ScrollView>
                            </View>

                            <TouchableOpacity style={styles.eachBtn} onPress={() => navigation.navigate('BrandListingScreen')} style={{ marginTop: 10, alignItems: "flex-end" }}>
                                <Text style={styles.viewAll}>Visualizza tutti</Text>
                            </TouchableOpacity>
                        </View>


                        {homeExpiryData.length !== 0 &&


                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.heading}>{t('in_expiry')}</Text>

                                {
                                    homeExpiryData.map((item, index) => {
                                        return (

                                            <View key={index}>
                                                <View style={styles.eachExpiryproduct}>
                                                    <TouchableOpacity style={styles.eachproductBtn}>
                                                        <View style={{ width: 70, height: 100, backgroundColor: '#d8d8d8', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: 12 }}>
                                                            <Image source={{ uri: `${item.image}` }} style={{ width: 50, height: 80 }} resizeMode="cover" />
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ textAlign: "left", fontSize: 14, color: "#333333", marginBottom: 5 }}>{item.name}</Text>
                                                            <Text style={{ textAlign: "left", fontSize: 13, color: "#333333" }}>{item.content}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    })
                                }


                                <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 25 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('AuctionExpireListingScreen')} style={styles.greenBtn}>
                                        <Text style={{ color: '#FFF', fontSize: 16 }}>{t("load_more")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        }



                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.heading}>{t('top_sell')}</Text>
                            <View style={styles.row}>

                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                                    {
                                        homeTopSellData.map((item, index) => {
                                            return (
                                                <View key={index}>

                                                    <View style={styles.grid}>
                                                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                                                            <View style={styles.boxProuduct}>
                                                                <View style={styles.boxProuductImage}>
                                                                    <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, zIndex: 9 }}>
                                                                        <Ionicons name="heart-outline" size={24} color="#00603b" style={styles.wishList} />
                                                                    </TouchableOpacity>
                                                                    <Image source={{ uri: `${item.image}` }} style={{ width: 110, height: 120 }} resizeMode="cover" />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ color: '#333333', fontSize: 14, marginBottom: 5, minHeight: 35, }} numberOfLines={2}>{item.name}</Text>
                                                                    <Text style={{ color: '#333333', fontSize: 12, }}>Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.</Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>
                                            )
                                        })
                                    }

                                </ScrollView>

                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#ebf4ef', borderRadius: 8, }}>
                            <Text style={styles.buyerTitle}>{t("Buyer_Protection")}</Text>
                            <View style={styles.buyerInfo}>
                                <View style={styles.whiteBg}>
                                    <MaterialCommunityIcons style={styles.eachIcon} name="shield-check-outline" color="#00603b" size={22} />
                                </View>
                                <Text style={styles.infoTitle}>{t("Secure_payment_via_an_escrow_account")}</Text>
                            </View>
                            <View style={styles.buyerInfo}>
                                <View style={styles.whiteBg}>
                                    <MaterialCommunityIcons style={styles.eachIcon} name="account-plus-outline" color="#00603b" size={22} />
                                </View>
                                <Text style={styles.infoTitle}>{t("Verified_dealer")}</Text>
                            </View>
                            <View style={styles.buyerInfo}>
                                <View style={styles.whiteBg}>
                                    <MaterialCommunityIcons style={styles.eachIcon} name="badge-account-outline" color="#00603b" size={22} />
                                </View>
                                <Text style={styles.infoTitle}>{t("Authenticity_guarantee")}</Text>
                            </View>
                            {/* <View>
                                <TouchableOpacity>
                                    <Text style={styles.moreInformation}>More information</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.heading}>{t('recommended_you')}</Text>
                            <View style={styles.row}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>


                                    {
                                        homeRecommendedData.map((item, index) => {
                                            return (
                                                <View key={index}>

                                                    <View style={styles.grid}>
                                                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                                                            <View style={styles.boxProuduct}>
                                                                <View style={styles.boxProuductImage}>
                                                                    <Ionicons name="heart-outline" size={24} color="#00603b" style={styles.wishList} />
                                                                    <Image source={{ uri: `${item.image}` }} style={{ width: 110, height: 120 }} resizeMode="cover" />
                                                                </View>
                                                                <View>
                                                                    <Text style={{ color: '#333333', fontSize: 14, marginBottom: 5, minHeight: 35, }} numberOfLines={2}>{item.name}</Text>
                                                                    <Text style={{ color: '#333333', fontSize: 12, }}>Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.</Text>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>
                                            )
                                        })
                                    }

                                </ScrollView>

                            </View>
                        </View>

                        <View style={{ marginVertical: 20 }}>
                            <Text style={{ color: '#333333', fontSize: 17, textAlign: 'center' }}>Rich Watch House è la casa d’asta numero 1 dedicata agli orologi di lusso</Text>
                        </View>

                        <Swiper style={{ marginBottom: 40, height: 118 }} showsButtons={false} loop={false}
                            dot={
                                <View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, position: "relative", bottom: 0 }} />}
                            activeDot={<View style={{ backgroundColor: '#00603b', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, position: "relative", bottom: 0 }} />}
                        >
                            {
                                element.map((item, index) => {
                                    return (
                                        <View style={styles.slideTesti} key={index}>
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '28%' }}>
                                                <View style={styles.testimonialImage}>
                                                    <Feather name="watch" size={25} color="#000" />
                                                </View>
                                                <Text style={{ color: '#333333', fontSize: 15, fontWeight: '700' }}>{item.name}</Text>
                                            </View>
                                            <View style={{ width: "70%" }}>
                                                <Text style={styles.testimonialText}>{item.text}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </Swiper>

                        <View>
                            <Text style={styles.heading}>{t('What_do_you_want_to_do')}</Text>
                            <View style={styles.row}>
                                <View style={[styles.eachBtnBox, {
                                    width: "50%"
                                }]}>
                                    <TouchableOpacity onPress={() => navigation.navigate('AllAuctionUserScreen')} style={styles.eachBtn}>
                                        <Text style={{ textAlign: "center", fontSize: 14, color: "#555555" }}>{t("BUY_WATCH")}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.eachBtnBox, {
                                    width: "50%"
                                }]}>
                                    <TouchableOpacity onPress={() => navigation.navigate('AddAuctionScreen')} style={styles.eachBtn}>
                                        <Text style={{ textAlign: "center", fontSize: 14, color: "#555555" }}>{t("SELL_WATCH")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                </Animated.ScrollView>

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
        height: 80
    },
    searchbar: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        width: "90%",
        height: 35,
        borderBottomWidth: 1,
        padding: 10,
        borderColor: "#dbdbdb",
        color: "#333333",
        fontSize: 13,
        marginLeft: 10
    },
    bodyWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    heading: {
        fontSize: 18,
        color: "#00603b",
        marginBottom: 10
    },
    singleWatch: {
        width: 170,
        height: 365,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,

        shadowColor: '#999999',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        marginVertical: 10,
    },
    singleWatchText: {
        color: "#333333",
        fontSize: 14,
        textAlign: "center",
        minHeight: 35,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: -5
    },
    eachBtnBox: {
        width: 93,
        paddingHorizontal: 5
    },
    eachBtn: {
        borderRadius: 5,
        shadowColor: "#d7d7d7",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        backgroundColor: "#FFF"
    },
    viewAll: {
        color: "#00603b",
        fontSize: 13
    },
    eachExpiryproduct: {
        width: "100%",
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 10
    },
    eachproductBtn: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    greenBtn: {
        backgroundColor: '#00603b',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
    grid: {
        width: 190,
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
    },
    boxProuductImage: {
        backgroundColor: "#FFF",
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative',
    },
    wishList: {
        position: 'absolute',
        left: 5,
        top: 4,
        zIndex: 1,
    },
    slide: {
        padding: 5,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    slideTesti: {
        width: '100%',
        borderColor: '#797979',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 15,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    testimonialImage: {
        width: 47,
        height: 47,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#00603b',
        backgroundColor: '#f0f0f0',
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    swiperDot: {
        width: 12,
        height: 12,
        borderRadius: 20,
        backgroundColor: '#e3e3e3',
        marginHorizontal: 5
    },
    swiperActiveDot: {
        width: 12,
        height: 12,
        borderRadius: 20,
        backgroundColor: '#e3e3e3',
        marginHorizontal: 5,
        backgroundColor: '#00603b'
    },
    testimonialText: {
        color: "#333333",
        fontSize: 14
    },

    buyerTitle: {
        color: '#333333',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
    buyerInfo: {
        position: 'relative',
        paddingVertical: 14,
        paddingLeft: 45,
        marginBottom: 0,
    },
    whiteBg: {
        width: 35,
        height: 35,
        backgroundColor: '#fff',
        borderRadius: 50,
        position: 'absolute',
        top: 10,
        left: 0,
    },
    eachIcon: {
        position: 'absolute',
        top: 6,
        left: 6,
    },
    moreInformation: {
        fontSize: 16,
        color: '#00603b',
        fontWeight: '400',
        marginTop: 10,
        paddingVertical: 5,
        borderStyle: 'solid',
        borderColor: "#00603b",
        borderBottomWidth: 1,
    },
    selectLangWrap: {
        position: 'absolute',
        right: 8,
        top: 15,
        justifyContent: "center",
        alignItems: "center",
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
    infoTitle: {
        color: "#000000",
    }

})

export default HomeScreen
