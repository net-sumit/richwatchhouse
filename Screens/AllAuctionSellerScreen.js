import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
// For language translate
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';


const AllAuctionSellerScreen = ({ route, navigation }) => {
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const sellerAllProductDataApi = API_URL + 'seller-all-products.php';
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [sellerAllProductListData, setSellerAllProductListData] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        const asyncPostCall = async () => {
            try {
                const response = await fetch(sellerAllProductDataApi, {
                    signal: abortCont.signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setLoading(false);
                setSellerAllProductListData(data.data);
                setBrandTitle(data.brand);
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                //console.log(error)
            }
        }
        asyncPostCall()
        return () => abortCont.abort();
    }, []);


    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <View style={styles.searchbar}>
                    <Ionicons name="search" color="#fff" size={25} />
                    <TextInput placeholder="Search" placeholderTextColor="#FFF" style={styles.input} />
                </View>
            </View>

            <View style={styles.allAuctionWrap}>
                <Text style={styles.allAuctionTitle}>{t("Edit_Auctions")}</Text>

                {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (

                    <ScrollView>

                        <View style={{ marginTop: 30, marginBottom: 80, }}>


                            {


                                sellerAllProductListData ?

                                    <View style={styles.row}>

                                        {
                                            sellerAllProductListData.map((item, index) => {
                                                return (

                                                    <View style={styles.grid} key={index}>
                                                        <View style={styles.boxProuduct}>
                                                            <View style={styles.boxProuductImage}>

                                                                {
                                                                    item.auction_status === "Upcoming" &&
                                                                    <TouchableOpacity
                                                                        style={styles.editProduct}
                                                                        onPress={() => navigation.navigate('EditAuctionScreen', { productId: item.id })}
                                                                    //onPress={() => editWishlist(item.id)}
                                                                    >
                                                                        <Feather name="edit-2" size={20} color="#00603b" />
                                                                    </TouchableOpacity>
                                                                }
                                                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
                                                                    <Image source={{ uri: `${item.product_image_url}` }} style={{ width: 110, height: 130 }} resizeMode="cover" />
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
                                                                        <Text style={{ color: '#333333', paddingBottom: 10 }}>{t("Auction_Status")}: <Text style={{ color: "#ff0000", fontSize: 10, }}>{item.auction_status}</Text></Text>
                                                                        :
                                                                        <Text style={{ color: '#333333', paddingBottom: 10 }}>{t("Auction_Status")}: <Text style={{ color: "#00603b", fontSize: 10, }}>{item.auction_status}</Text></Text>
                                                                    }
                                                                    {/* <Text style={styles.boxProuductDescBottomtext}>
                                                                        Auction end  <Text style={{ color: "#00603b" }}>{item.countdown_time}</Text>
                                                                    </Text> */}
                                                                    {/* <View style={styles.bottomEndSec}>
                                                                        <View>
                                                                            <Text style={styles.bottomEndSecText}>Professional Trader</Text>
                                                                            <Image source={require('../assets/ratting_icon.jpg')} />
                                                                        </View>
                                                                        <View>
                                                                            <Image source={require('../assets/flag.jpg')} style={{ width: 24, height: 16, borderWidth: 1, borderColor: "#a6aeae" }} />
                                                                        </View>
                                                                    </View> */}
                                                                </View>
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
        height: "100%",
    },
    allAuctionTitle: {
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        color: "#00603b",
        textAlign: "center",
        paddingBottom: 20,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-around",
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
        minHeight: 250,
    },
    boxProuductImage: {
        backgroundColor: "#FFF",
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative'
    },
    editProduct: {
        position: 'absolute',
        right: 5,
        top: 4,
        backgroundColor: "#ffffff",
        zIndex: 5,
    },
    boxProuductDesc: {
        backgroundColor: "#ffffff",
    },
    boxProuductDescTop: {
        borderBottomColor: "#e6e6e6",
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 5,
    },
    boxProuductDescTopText: {
        color: "#333333",
        fontSize: 15,
        lineHeight: 18,
        minHeight: 35
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
        fontSize: 13,
        lineHeight: 16,
        color: "#333333"
    }



})
export default AllAuctionSellerScreen