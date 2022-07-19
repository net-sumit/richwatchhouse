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
import { API_URL } from '../config';

const BrandListingScreen = ({ route, navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const brandListDataApi = API_URL + 'all-brands.php';
    const [brandData, setBrandData] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        const allBrandAPIcall = async () => {
            try {
                const response = await fetch(brandListDataApi, {
                    signal: abortCont.signal,
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setLoading(false);
                setBrandData(data.data);
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                //console.log(error)
            }
        }
        allBrandAPIcall()
        return () => abortCont.abort();
    }, []);


    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>

            <View style={{ flex: 1, backgroundColor: "#FFF" }}>

                {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 300 }} /> : (

                    <ScrollView>

                        {
                            brandData.map((item, index) => {
                                return (
                                    <View style={styles.slide} key={index}>
                                        <View style={styles.singleWatch}>
                                            <TouchableOpacity onPress={() => navigation.navigate('BrandProductListScreen', { brandId: item.id })} style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingLeft: 20, paddingRight: 50, borderBottomColor: "#f0f0f0", borderBottomWidth: 1 }}>
                                                <Text style={{ color: "#333333", fontWeight: "600", fontSize: 18 }}>{item.name}</Text>
                                                <SimpleLineIcons name="arrow-right" color="#333333" size={15} style={{ position: "absolute", top: 26, right: 15 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </ScrollView>

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
    }


})
export default BrandListingScreen