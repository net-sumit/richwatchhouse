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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';


const LanguageListingScreen = ({ route, navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const countryListDataApi = API_URL + 'all-country.php';
    const [countryData, setCountryData] = useState([]);
    const [selectedLangData, setSelectedLangData] = useState([]);

    const retrieveData = async () => {
        try {
            const langValue = await AsyncStorage.getItem('languageData');
            if (langValue !== null) {
                //console.log(langValue, 'storedLanguage-last');
                setSelectedLangData(JSON.parse(langValue));
                //setSelectedLangData(langValue);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    retrieveData();

    // var x = setInterval(function () {
    //     if (selectedLangData == '') {
    //         retrieveData();
    //     } else {
    //     }
    // }, 1000);

    console.log(selectedLangData,'balll');

    useEffect(() => {

        fetch(countryListDataApi, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(data => {
            setLoading(false);
            //console.log(data.data, "hghg");
            setCountryData(data.data);

        }
        );
    }, []);


    console.log(countryData, "countryData 111");

    // For language translate
    const { t, i18n } = useTranslation();

    const [currentLanguage, setLanguage] = useState();

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };


    console.log(currentLanguage, "currentLanguage");

    console.log(selectedLangData.langName, "selectedLangData");


    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>



            <View style={{ flex: 1, backgroundColor: "#FFF" }}>

                <Text style={styles.allAuctionTitle}>{t("Language")}</Text>

                {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 300 }} /> : (

                    <View style={styles.slide}>
                        <View style={styles.singleWatch}>
                            <TouchableOpacity
                                onPress={() => changeLanguage('en')}
                                style={{
                                    backgroundColor:
                                        currentLanguage || selectedLangData.langName === 'en' ? '#00603b' : '#d3d3d3',
                                    color:
                                        currentLanguage || selectedLangData.langName === 'en' ? '#ffffff' : '#000000',
                                    padding: 20,
                                }}>
                                <Text style={{ fontWeight: "600", fontSize: 18 }}>EN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => changeLanguage('it')}
                                style={{
                                    backgroundColor:
                                        currentLanguage || selectedLangData.langName === 'it' ? '#00603b' : '#d3d3d3',
                                    color:
                                        currentLanguage || selectedLangData.langName === 'it' ? '#ffffff' : '#000000',
                                    padding: 20,
                                    fontWeight: "600",
                                    fontSize: 18,
                                }}>
                                <Text style={{ fontWeight: "600", fontSize: 18 }}>IT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

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
export default LanguageListingScreen