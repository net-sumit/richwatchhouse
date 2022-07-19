import React, { useRef, useEffect, useState } from 'react';
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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';



const AccountScreen = ({ navigation }) => {
    // For language translate
    const { t, i18n } = useTranslation();
    const [LoginUserData, setLoginUserData] = useState([]);
    const [isLoginChk, setLoginChk] = useState(true);


    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value !== null) {
                // We have data!!
                setLoginUserData(JSON.parse(value));
                setLoginChk(false);
            } else {
                setLoginChk(false);
                setLoginUserData('');
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    
    // useEffect(() => {
    //     const retrieveData = async () => {
    //         try {
    //             const value = await AsyncStorage.getItem('userData');
    //             if (value !== null) {
    //                 // We have data!!
    //                 setLoginUserData(JSON.parse(value));
    //                 setLoginChk(false);
    //             } else {
    //                 setLoginChk(false);
    //                 setLoginUserData('');
    //             }
    //         } catch (error) {
    //             // Error retrieving data
    //         }
    //     };

    // }, []);


    var x = setInterval(function () {
        if (LoginUserData == '') {
            retrieveData();
        } else {
        }
    }, 1000);

    const loginButton = () => {
        navigation.navigate('auth');
    }

    // Logout
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            alert('Sign out successfully');
            setLoginUserData('');
        } catch (e) {
            // remove error
        }
    }


    //console.log(LoginUserData, "LoginUserData");


    return (
        <>
            <View style={styles.HeaderBar}>
                {LoginUserData.current_userID &&
                    <TouchableOpacity style={{ position: 'absolute', top: 28, left: 10 }}
                        onPress={removeValue}
                    >
                        <Text style={{ color: "#FFF", fontSize: 15 }}>{t("logout")}</Text>
                    </TouchableOpacity>
                }
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
                {LoginUserData.current_userID &&
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileEditScreen')} style={{ position: 'absolute', top: 28, right: 10 }}>
                        <Text style={{ color: "#FFF", fontSize: 15 }}>{t("profile")}</Text>
                    </TouchableOpacity>
                }
            </View>
            {isLoginChk ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (
                <>
                    {LoginUserData != '' ?
                        <>
                            <View style={styles.banner}>
                                <View style={{ alignItems: "center" }}>
                                    <View style={{ width: 80, height: 80, backgroundColor: "#FFF", borderRadius: 60, flexDirection: "column", justifyContent: "center", alignItems: "center", borderColor: "#444344", borderWidth: 4, marginBottom: 12 }}>

                                        {LoginUserData ? <Image source={{ uri: `${LoginUserData.avtarimg}` }} style={{ width: 80, height: 80, borderRadius: 100, }} resizeMode="cover" />
                                            :
                                            <SimpleLineIcons name="user" color="#333333" size={30} />
                                        }

                                    </View>
                                    <Text style={{ color: "#FFF", fontSize: 22, marginBottom: 5, textTransform: "capitalize" }}>{t("hello")} {LoginUserData.current_first_name}</Text>
                                    <Text style={{ color: "#00603b", fontSize: 16 }}>{LoginUserData.current_user_email}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 2, backgroundColor: "#FFF" }}>
                                <ScrollView>
                                    <TouchableOpacity onPress={() => navigation.navigate('BuyingOrdersScreen', { user_id: LoginUserData.current_userID })} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                        <SimpleLineIcons name="envelope" color="#333333" size={30} />
                                        <View style={{ paddingLeft: 15 }}>
                                            <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("message")}</Text>
                                            <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("no_unread_message")}</Text>
                                        </View>
                                        <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => navigation.navigate('BuyingOrdersScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                        <SimpleLineIcons name="bag" color="#333333" size={30} />
                                        <View style={{ paddingLeft: 15 }}>
                                            <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("buy")}</Text>
                                            <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("no_transactions_available")}</Text>
                                        </View>
                                        <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                    </TouchableOpacity>
                                    {LoginUserData.current_userRole == 'seller' ?
                                        <TouchableOpacity onPress={() => navigation.navigate('SellingOrdersScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                            <SimpleLineIcons name="bag" color="#333333" size={30} />
                                            <View style={{ paddingLeft: 15 }}>
                                                <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("sell")}</Text>
                                                <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("no_transactions_available")}</Text>
                                            </View>
                                            <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                        </TouchableOpacity>
                                        :
                                        <></>
                                    }

                                    {LoginUserData.current_userRole == 'seller' ?
                                        <TouchableOpacity onPress={() => navigation.navigate('AffiliateOrdersScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                            <SimpleLineIcons name="bag" color="#333333" size={30} />
                                            <View style={{ paddingLeft: 15 }}>
                                                <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("affiliate")}</Text>
                                                <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("no_transactions_available")}</Text>
                                            </View>
                                            <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                        </TouchableOpacity>
                                        :
                                        <></>
                                    }
                                    {LoginUserData.current_userRole == 'seller' ?
                                        <TouchableOpacity onPress={() => navigation.navigate('SellerMyBrandScreen', { user_id: LoginUserData.current_userID })} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                            <SimpleLineIcons name="bag" color="#333333" size={30} />
                                            <View style={{ paddingLeft: 15 }}>
                                                <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("my_brand")}</Text>
                                                <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("no_transactions_available")}</Text>
                                            </View>
                                            <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                        </TouchableOpacity>
                                        :
                                        <></>
                                    }

                                    {LoginUserData.current_userRole == 'seller' ?
                                        <TouchableOpacity onPress={() => navigation.navigate('CollaborationBrandScreen', { user_id: LoginUserData.current_userID })} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                            <SimpleLineIcons name="bag" color="#333333" size={30} />
                                            <View style={{ paddingLeft: 15 }}>
                                                <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("collaboration_with_brands")}</Text>
                                                <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("no_transactions_available")}</Text>
                                            </View>
                                            <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                        </TouchableOpacity>
                                        :
                                        <></>
                                    }

                                    {LoginUserData.current_userRole == 'seller' ?
                                        <TouchableOpacity onPress={() => navigation.navigate('ParticipatedAuctionScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                            <SimpleLineIcons name="bag" color="#333333" size={30} />
                                            <View style={{ paddingLeft: 15 }}>
                                                <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("User_Participated_Auction")}</Text>
                                                <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("User_Participated_Auction")}</Text>
                                            </View>
                                            <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                        </TouchableOpacity>
                                        :
                                        <></>
                                    }

                                    {LoginUserData.current_userRole == 'seller' ?
                                        <TouchableOpacity onPress={() => navigation.navigate('AddAuctionScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                            <AntDesign name="pluscircleo" color="#333333" size={30} />
                                            <View style={{ paddingLeft: 15 }}>
                                                <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("add_auction_product")}</Text>
                                                <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("add_auction_product")}</Text>
                                            </View>
                                            <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                        </TouchableOpacity>
                                        :
                                        <></>
                                    }

                                    {LoginUserData.current_userRole == 'seller' ?
                                        <TouchableOpacity onPress={() => navigation.navigate('AllAuctionSellerScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                            <AntDesign name="edit" color="#333333" size={30} />
                                            <View style={{ paddingLeft: 15 }}>
                                                <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("edit_auction_product")}</Text>
                                                <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("edit_auction_product")}</Text>
                                            </View>
                                            <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                        </TouchableOpacity>
                                        :
                                        <></>
                                    }
                                    <TouchableOpacity onPress={() => navigation.navigate('RewardScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                        <Octicons name="gift" color="#333333" size={30} />
                                        <View style={{ paddingLeft: 15 }}>
                                            <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("reward")}</Text>
                                            <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("reward_earn")}</Text>
                                        </View>
                                        <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                        <SimpleLineIcons name="settings" color="#333333" size={30} />
                                        <View style={{ paddingLeft: 15 }}>
                                            <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("general_notification")}</Text>
                                            <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("language_country_currency")}</Text>
                                        </View>
                                        <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => navigation.navigate('SupportScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                        <SimpleLineIcons name="question" color="#333333" size={30} />
                                        <View style={{ paddingLeft: 15 }}>
                                            <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("support")}</Text>
                                            <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("contact_reach_watch_house")}</Text>
                                        </View>
                                        <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => navigation.navigate('TestFontScreen')} style={{ flexDirection: "row", alignItems: 'center', padding: 20, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                        <SimpleLineIcons name="info" color="#333333" size={30} />
                                        <View style={{ paddingLeft: 15 }}>
                                            <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("info")}</Text>
                                            <Text style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>{t("legal_details_feedback_data")}</Text>
                                        </View>
                                        <SimpleLineIcons name="arrow-right" color="#333333" size={20} style={{ position: "absolute", top: 35, right: 15 }} />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </>
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
    HeaderBar: {
        width: '100%',
        backgroundColor: "#000",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        paddingHorizontal: 10
    },
    banner: {
        backgroundColor: "#000",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default AccountScreen
