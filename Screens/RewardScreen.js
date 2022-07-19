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
    Animated,
    Dimensions,
    ImageBackground,
    Button,
    ActivityIndicator
} from 'react-native';
// For language translate
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import RenderHtml from 'react-native-render-html';
import { useTranslation } from 'react-i18next';

const tagsStyles = {
    body: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: "#333333",
    },
};

import AsyncStorage from '@react-native-async-storage/async-storage';

import ImagePicker from 'react-native-image-crop-picker';

const RewardScreen = ({ route, navigation }) => {

    // For language translate
    const { t, i18n } = useTranslation();

    const [isLoading, setLoading] = useState(true);
    const RewardApi = 'https://rixaltodemo.com/richwatchouse/app-api/v1/user-details.php';
    const [rewardData, setRewardData] = useState([]);
    const [userDetailsData, setUserDetailsData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();


    const [LoginUserData, setLoginUserData] = useState([]);


    useEffect(() => {

        AsyncStorage.getItem('userData').then((result) => {
            //console.log(result);
            setLoginUserData(JSON.parse(result));
        });

        fetch(RewardApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                //user_id: LoginUserData.current_userID
                user_id: 4

                //seller_id: 25,
            })
        }).then(response => response.json()).then(data => {
            setLoading(false);
            setUserDetailsData(data.data);
            setRewardData(data.data.signed_up_friends);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);

            //console.log(data.data, " Reward Data");
        }
        );

    }, []);



    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>

            <View style={{ flex: 1, backgroundColor: "#FFF", padding: 10, }}>


                <Text style={styles.allAuctionTitle}>{t("Reward")}</Text>



                {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 100 }} /> : (

                    <>
                        <Text style={styles.rewardTitle}>{t("token_balance")}: <Text style={styles.rewardTitleAmount}>{userDetailsData.rewards_earned}</Text></Text>
                        <Text style={styles.signupTitle}>{t("signed_up_friends")}</Text>
                        <Text style={styles.signupCont}>{t("total_number_of_firends")}</Text>

                        <ScrollView>


                            {
                                rewardData.map((item, index) => {
                                    return (
                                        <View style={styles.slide} key={index}>
                                            <View style={styles.singleWatch}>
                                                <Image source={{ uri: `${item.user_user_avtarimg}` }} style={styles.SellerBrandListImg} resizeMode="cover" />
                                                <Text style={styles.singleWatchText}>{item.name}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </ScrollView>
                    </>

                )}



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

    allAuctionTitle: {
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        color: "#00603b",
        textAlign: "center",
        paddingBottom: 25,
    },
    rewardTitle: {
        fontWeight: "400",
        fontSize: 18,
        lineHeight: 30,
        color: "#333333",
        textAlign: "center",
        paddingBottom: 10,
    },
    rewardTitleAmount: {
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 30,
        color: "#00603b",
    },
    signupTitle: {
        fontWeight: "500",
        fontSize: 15,
        lineHeight: 30,
        color: "#00603b",
    },
    signupCont: {
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 30,
        color: "#333333",
    },
    slide: {
        paddingVertical: 5,
    },
    SellerBrandListImg: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginRight: 20,
    },
    singleWatch: {
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        padding: 10,
    },
    singleWatchNext: {
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
    },
    singleWatchText: {
        fontWeight: "400",
        fontSize: 18,
        lineHeight: 30,
        color: "#333333",
        paddingVertical: 15,
    }




})
export default RewardScreen