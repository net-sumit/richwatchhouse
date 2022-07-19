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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

const CountryListingScreen = ({ route, navigation }) => {

    const { t, i18n } = useTranslation();

    const [isLoading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const countryListDataApi = API_URL + 'user-country-currency.php';
    const [countryData, setCountryData] = useState([]);
    const [loginUserId, setLoginUserId] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('userData').then((result) => {
            //console.log(result);
            if (result != '') {
                setLoginUserId(JSON.parse(result).current_userID);
            }
        });
        fetch(countryListDataApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                user_id: loginUserId
                //user_id: 25
            })
        }).then(response => response.json()).then(data => {
            setLoading(false);
            //console.log(data.data.country, "hghg");
            setErrorMessage(data.error_message);
            setCountryData(data.data.country);

        }
        );
    }, [loginUserId]);


    console.log(countryData, "countryData 111");


    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>

            <View style={{ flex: 1, backgroundColor: "#FFF" }}>

                <Text style={styles.allAuctionTitle}>{t("Country")}</Text>

                {countryData ?

                    <View>

                        {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 300 }} /> : (

                            <ScrollView>

                                {
                                    countryData.map((item, index) => {
                                        return (
                                            <View style={styles.slide} key={index}>
                                                <View style={styles.singleWatch}>

                                                    {item.status == '1' ?

                                                        <View style={{ backgroundColor: "#00603b", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingLeft: 20, paddingRight: 50, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                                            <Text style={{ color: "#ffffff", fontWeight: "600", fontSize: 18 }}>{item.name}</Text>
                                                            <Image source={{ uri: `${item.flag}` }} style={{ position: "absolute", top: 26, right: 15, width: 30, height: 18 }} resizeMode="cover" />
                                                        </View>

                                                        :
                                                        <TouchableOpacity onPress={() => navigation.navigate('ProfileEditScreen', { countryId: item.id })}>
                                                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingLeft: 20, paddingRight: 50, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>

                                                                <Text style={{ color: "#333333", fontWeight: "600", fontSize: 18 }}>{item.name}</Text>
                                                                <Image source={{ uri: `${item.flag}` }} style={{ position: "absolute", top: 26, right: 15, width: 30, height: 18 }} resizeMode="cover" />

                                                            </View>
                                                        </TouchableOpacity>

                                                    }

                                                </View>
                                            </View>
                                        )
                                    })
                                }

                            </ScrollView>

                        )}

                    </View>

                    :

                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'red', marginTop: 0 }}>&nbsp;</Text>
                    </View>

                }


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
    searchItems: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    searchItemBox: {
        paddingHorizontal: 1,
        backgroundColor: "#e4e9ec",
        marginRight: 10,
        borderRadius: 25,
        paddingHorizontal: 13,
        paddingVertical: 11,
        borderWidth: 1,
        borderColor: "#cfd3d5",
    },
    searchItemBoxProperty: {
        color: "#333333",
        fontSize: 18,
        lineHeight: 18,
        fontWeight: "500",
        paddingRight: 5,
    },
    searchTitle: {
        color: "#00603b",
        fontWeight: "700",
        fontSize: 21,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 5,
    },
    greenBtn: {
        backgroundColor: '#00603b',
        paddingHorizontal: 25,
        paddingVertical: 12,
        width: "70%",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    searchResultArea: {
        paddingVertical: 30,
    },
    searchResultAreaBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    allAuctionTitle: {
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        color: "#00603b",
        textAlign: "center",
        paddingVertical: 25,
    },


})
export default CountryListingScreen