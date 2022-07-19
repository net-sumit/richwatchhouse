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
} from 'react-native';

import { useTranslation } from 'react-i18next';
import RenderHtml from 'react-native-render-html';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

const tagsStyles = {
    body: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: "#00603b",
    },
};




const SettingsScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const [isLoading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const countryListDataApi = API_URL + 'user-country-currency.php';
    const [currencyData, setCurrencyData] = useState([]);
    const [currencyCodeData, setCurrencyCodeData] = useState([]);
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
            console.log(data.data, "hghg");
            setErrorMessage(data.error_message);
            setCurrencyData(data.data.currency.currency_symbol);
            setCurrencyCodeData(data.data.currency.currency_code);
            setCountryData(data.data.country);

        }
        );
    }, [loginUserId]);


    for (const element of countryData) {
        if(element.status == 1){
           var activeCountry = element.name;
        }
    }

    //console.log(activeCountry, "activeCountry");
    

    //console.log(countryData.name, "countryData 111");

    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={{ color: "#FFF", fontSize: 18 }}>{t("Settings")}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                <ScrollView>
                    <TouchableOpacity onPress={() => navigation.navigate('CountryListingScreen')} style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingLeft: 20, paddingRight: 50, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                        <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("Country")}</Text>
                        <Text style={{ color: "#00603b", fontWeight: "400", fontSize: 15 }}>{activeCountry}</Text>
                        <SimpleLineIcons name="arrow-right" color="#333333" size={16} style={{ position: "absolute", top: 26, right: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('LanguageListingScreen')} style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingLeft: 20, paddingRight: 50, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                        <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("Language")}</Text>
                        <Text style={{ color: "#00603b", fontWeight: "400", fontSize: 15 }}>{t("Lang")}</Text>
                        <SimpleLineIcons name="arrow-right" color="#333333" size={16} style={{ position: "absolute", top: 26, right: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CurrencyListingScreen')} style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingLeft: 20, paddingRight: 50, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                        <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>{t("Currency")}</Text>
                        <View style={{ color: "#999999", fontWeight: "400", fontSize: 15 }}>
                            <View style={{ flexDirection: "row", }}>

                                <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 16, paddingRight: 5, }}>{currencyCodeData} -</Text>
                                <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>
                                    <RenderHtml
                                        source={{ html: currencyData }}
                                        enableExperimentalMarginCollapsing={true}
                                        tagsStyles={tagsStyles}
                                    />
                                </Text>

                            </View>
                        </View>
                        <SimpleLineIcons name="arrow-right" color="#333333" size={16} style={{ position: "absolute", top: 26, right: 15 }} />
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingLeft: 20, paddingRight: 50, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                        <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>Push Notifications</Text>
                        <SimpleLineIcons name="arrow-right" color="#333333" size={16} style={{ position: "absolute", top: 26, right: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingLeft: 20, paddingRight: 50, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                        <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>Email</Text>
                        <SimpleLineIcons name="arrow-right" color="#333333" size={16} style={{ position: "absolute", top: 26, right: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingLeft: 20, paddingRight: 50, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                        <Text style={{ color: "#333333", fontWeight: "600", fontSize: 20 }}>Rich Watch house Research</Text>
                        <SimpleLineIcons name="arrow-right" color="#333333" size={16} style={{ position: "absolute", top: 26, right: 15 }} />
                    </TouchableOpacity> */}

                </ScrollView>
            </View>

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
    }
})

export default SettingsScreen
