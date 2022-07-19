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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

const BrandProductListScreen = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [loginUserId, setLoginUserId] = useState('');
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [brandProductListData, setBrandProductListData] = useState([]);
    const [brandTitle, setBrandTitle] = useState();
    const [addWishlistSuccessMsg, setAddWishlistSuccessMsg] = useState('');
    const addWishlistDataApi = API_URL + 'add-to-wishlist.php';
    const brandListDataApi = API_URL + 'all-products-by-brands.php';
    const deleteWishlistDataApi = API_URL + 'remove-from-wishlist.php';

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
                const response = await fetch(brandListDataApi, {
                    signal: abortCont.signal,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // your expected POST request payload goes here
                        user_id: loginUserId,
                        brand_id: route.params.brandId
                    })
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setLoading(false);
                setBrandProductListData(data.data);
                setErrorMessage(data.error_message);
                setBrandTitle(data.brand);
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                //console.log(error)
            }
        }
        asyncPostCall()
        return () => abortCont.abort();
    }, [loginUserId]);

    // to update State after Add to wishlist
    useEffect(() => {
        if (addWishlistSuccessMsg != '') {
            const allPeoductsApiCall = async () => {
                try {
                    const response = await fetch(brandListDataApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            // your expected POST request payload goes here
                            user_id: loginUserId,
                            brand_id: route.params.brandId
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    setBrandProductListData(data.data);
                    setErrorMessage(data.error_message);
                    setBrandTitle(data.brand);
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                    //console.log(error)
                }
            }
            allPeoductsApiCall()
        }
    }, [addWishlistSuccessMsg]);

    // For addWishlist
    const addWishlist = (productId) => {
        const addtoWishListCall = async () => {
            try {
                const response = await fetch(addWishlistDataApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // your expected POST request payload goes here
                        product_id: productId,
                        user_id: loginUserId
                    })
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setAddWishlistSuccessMsg(data.success_message);
                if (data.success_message != '') {
                    setTimeout(() => {
                        setAddWishlistSuccessMsg('');
                    }, 1000);
                }

            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                //console.log(error)
            }
        }
        addtoWishListCall()
    }


    // For RemoveWishlist
    const editWishlist = (productId) => {
        const removeWishListCall = async () => {
            try {
                const response = await fetch(deleteWishlistDataApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // your expected POST request payload goes here
                        product_id: productId,
                        user_id: loginUserId
                    })
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setAddWishlistSuccessMsg(data.success_message);
                if (data.success_message != '') {
                    setTimeout(() => {
                        setAddWishlistSuccessMsg('');
                    }, 1000);
                }
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                //console.log(error)
            }
        }
        removeWishListCall()
    }


    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>

            <View style={styles.allAuctionWrap}>
                <Text style={styles.allAuctionTitle}>{brandTitle}</Text>

                {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (

                    <ScrollView>

                        <View style={{ marginTop: 30, marginBottom: 80, }}>


                            {


                                brandProductListData ?

                                    <View style={styles.row}>

                                        {
                                            brandProductListData.map((item, index) => {
                                                return (

                                                    <View style={styles.grid} key={index}>
                                                        <View style={styles.boxProuduct}>
                                                            <View style={styles.boxProuductImage}>
                                                                {loginUserId != '' ?
                                                                    <>
                                                                        {
                                                                            item.wishlist_result === 1 ?
                                                                                <TouchableOpacity
                                                                                    style={styles.editProduct}
                                                                                    onPress={() => editWishlist(item.id)}
                                                                                >
                                                                                    <Ionicons name="heart-sharp" size={20} color="#00603b" />
                                                                                </TouchableOpacity>
                                                                                :
                                                                                <TouchableOpacity
                                                                                    style={styles.editProduct}
                                                                                    onPress={() => addWishlist(item.id)}
                                                                                >
                                                                                    <Ionicons name="heart-outline" size={20} color="#00603b" />
                                                                                </TouchableOpacity>
                                                                        }
                                                                    </>
                                                                    :
                                                                    <></>
                                                                }
                                                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                                                                    <Image source={{ uri: `${item.product_image_url}` }} style={{ width: 110, height: 180 }} resizeMode="cover" />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.boxProuductDesc}>
                                                                <View style={styles.boxProuductDescTop}>
                                                                    <Text style={styles.boxProuductDescTopText}>{item.product_title}</Text>
                                                                    {/* <Text style={styles.boxProuductDescTopText}>522.30.42.20.04.001</Text>
                                                                <Text style={styles.boxProuductDescTopPrice}>€ 4.124,00</Text> */}
                                                                </View>
                                                                <View style={styles.boxProuductDescBottom}>
                                                                    {item.countdown_time ?
                                                                        <Text style={styles.boxProuductDescBottomtext}>Auction end: <Text style={{ color: "#00603b" }}>{item.countdown_time}</Text>
                                                                        </Text>
                                                                        :
                                                                        <Text style={{ color: '#333333' }}>Auction status: <Text style={{ color: "#00603b" }}>{item.auction_status}</Text></Text>
                                                                    }

                                                                    <View style={styles.bottomEndSec}>
                                                                        <View>
                                                                            <Text style={styles.bottomEndSecText}>Seller: {item.product_owner.owner_name}</Text>

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
        height: "100%"
    },
    allAuctionTitle: {
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        color: "#00603b",
        textAlign: "center",
        paddingBottom: 10,
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
        marginBottom: 50,
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
    },
    boxProuductDesc: {
        backgroundColor: "#ffffff",
    },
    boxProuductDescTop: {
        borderBottomColor: "#e6e6e6",
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 5,
        height: 75,
    },
    boxProuductDescTopText: {
        color: "#333333",
        fontSize: 16,
        lineHeight: 22,
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
        paddingBottom: 4,
    },
    bottomEndSec: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomEndSecText: {
        fontSize: 13,
        lineHeight: 16,
        color: "#333333",
        marginBottom: 4
    },
    messageBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    messageText: {
        fontSize: 14,
        lineHeight: 24,
        color: "#333333",
    },
    ratingMainWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    ratingView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    }



})
export default BrandProductListScreen