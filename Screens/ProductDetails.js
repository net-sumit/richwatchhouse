import React, { useEffect, useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CountDown from 'react-native-countdown-component';
import { API_URL } from '../config';
// For language translate
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tagsStyles = {
    body: {
        whiteSpace: 'normal',
        color: '#000'
    },
    a: {
        color: 'green'
    },
    p: {
        fontSize: 15,
        color: '#000',
        marginHorizontal: 0,
        marginVertical: 4,
        paddingHorizontal: 15,
    }
};

const ProductDetails = ({ route, navigation }) => {
    console.log(route.params.page_form, route.params.user_id, route.params.product_id, 'product_details_page');
    const { width } = useWindowDimensions();
    const [isLoading, setLoading] = useState(true);
    const [isLoadingAuctionBid, setLoadingAuctionBid] = useState(false);
    const productDetailsApi = API_URL + 'product-details.php';
    const auctionBidingApi = API_URL + 'acution-biding.php';
    const [productData, setProductdata] = useState([]);
    const [productGalleryData, setProductgallerydata] = useState([]);
    const [productFeaturedData, setProductFeaturedData] = useState([{}]);
    const [productPriceData, setProductPriceData] = useState([]);
    const [productSallerinfoData, setProductSallerinfoData] = useState([]);
    const [productBasicinfoData, setProductBasicinfoData] = useState([]);
    const [productBrandNameData, setProductBrandNameData] = useState([]);
    const [productModelNameData, setProductModelNameData] = useState([]);
    const [productCaliberinfoData, setProductCaliberinfoData] = useState([]);
    const [productCashDeskinfoData, setProductCashDeskinfoData] = useState([]);
    const [productStrapinfoData, setProductStrapinfoData] = useState([]);
    const [productBidsData, setproductBidsData] = useState([]);
    const [highestBidder, setHighestBidder] = useState({ 'bidder_id': '' });
    const [countDownTime, setCountDownTime] = useState();
    const [counter, setCounter] = useState();
    const [auctionBidingSuccess, setAuctionBidingSuccess] = useState('');
    const [auctionBidingError, setAuctionBidingError] = useState('');
    const [loginUserId, setLoginUserId] = useState('');

    useEffect(() => {
        if (route.params.page_form == 'payment') {
            // API call POST Method
            fetch(productDetailsApi, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    user_id: route.params.user_id,
                    product_id: route.params.productId 
                })
            }).then(response => response.json()).then(data => {
                console.log(data.data,'again api call after payment');
                setProductdata(data.data);
                setProductgallerydata(data.data.gallery_images);
                setProductFeaturedData(data.data.featured_image);
                setProductPriceData(data.data.price);
                setProductSallerinfoData(data.data.seller_info);
                setProductBasicinfoData(data.data.basic_data);
                setProductBrandNameData(data.data.basic_data.brand);
                setProductModelNameData(data.data.basic_data.model);
                setProductCaliberinfoData(data.data.caliber);
                setProductCashDeskinfoData(data.data.cash_desk);
                setProductStrapinfoData(data.data.strap);
                setproductBidsData(data.data.bidding_data.all_bids);
                if (data.data.bidding_data.all_bids[0]) {
                    setHighestBidder(data.data.bidding_data.all_bids[0]);
                }
                setCountDownTime(data.data.countdown_time);
                if (data.data.price.raise_value == null || data.data.price.raise_value == '') {
                    setCounter(parseInt(data.data.last_bid_amount) + 10);
                } else {
                    setCounter(parseInt(data.data.last_bid_amount) + parseInt(data.data.price.raise_value));
                }
            }
            );
        }
    }, [route.params.page_form]);

    // ===================== start_user_login_ckeck_function =====================
    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData');
            if (value != null || value != '') {
                setLoginUserId(JSON.parse(value).current_userID);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    var x = setInterval(function () {
        if (loginUserId == '' || loginUserId == undefined) {
            retrieveData();
        } else {
        }
    }, 1000);
    // ===================== start_user_login_ckeck_function =====================

    useEffect(() => {

        const abortCont = new AbortController();

        if ((loginUserId != '' || route.params.user_id != '') && route.params.user_id != undefined) {
            console.log(loginUserId, 'user login');
            const asyncPostCall = async () => {
                try {
                    const response = await fetch(productDetailsApi, {
                        signal: abortCont.signal,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            // your expected POST request payload goes here
                            product_id: route.params.productId,
                            user_id: loginUserId
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    setLoading(false);
                    setProductdata(data.data);
                    setProductgallerydata(data.data.gallery_images);
                    setProductFeaturedData(data.data.featured_image);
                    setProductPriceData(data.data.price);
                    setProductSallerinfoData(data.data.seller_info);
                    setProductBasicinfoData(data.data.basic_data);
                    setProductBrandNameData(data.data.basic_data.brand);
                    setProductModelNameData(data.data.basic_data.model);
                    setProductCaliberinfoData(data.data.caliber);
                    setProductCashDeskinfoData(data.data.cash_desk);
                    setProductStrapinfoData(data.data.strap);
                    setproductBidsData(data.data.bidding_data.all_bids);
                    if (data.data.bidding_data.all_bids[0]) {
                        setHighestBidder(data.data.bidding_data.all_bids[0]);
                    }
                    setCountDownTime(data.data.countdown_time);
                    if (data.data.price.raise_value == null || data.data.price.raise_value == '') {
                        setCounter(parseInt(data.data.last_bid_amount) + 10);
                    } else {
                        setCounter(parseInt(data.data.last_bid_amount) + parseInt(data.data.price.raise_value));
                    }
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                    //console.log(error)
                }
            }
            asyncPostCall()

        } else {
            console.log(loginUserId, 'no user login');
            const asyncPostCall = async () => {
                try {
                    const response = await fetch(productDetailsApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            // your expected POST request payload goes here
                            product_id: route.params.productId
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    setLoading(false);
                    setProductdata(data.data);
                    setProductgallerydata(data.data.gallery_images);
                    setProductFeaturedData(data.data.featured_image);
                    setProductPriceData(data.data.price);
                    setProductSallerinfoData(data.data.seller_info);
                    setProductBasicinfoData(data.data.basic_data);
                    setProductBrandNameData(data.data.basic_data.brand);
                    setProductModelNameData(data.data.basic_data.model);
                    setProductCaliberinfoData(data.data.caliber);
                    setProductCashDeskinfoData(data.data.cash_desk);
                    setProductStrapinfoData(data.data.strap);
                    setproductBidsData(data.data.bidding_data.all_bids);
                    if (data.data.bidding_data.all_bids[0]) {
                        setHighestBidder(data.data.bidding_data.all_bids[0]);
                    }
                    setCountDownTime(data.data.countdown_time);
                    if (data.data.price.raise_value == null || data.data.price.raise_value == '') {
                        setCounter(parseInt(data.data.last_bid_amount) + 10);
                    } else {
                        setCounter(parseInt(data.data.last_bid_amount) + parseInt(data.data.price.raise_value));
                    }
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                    //console.log(error)
                }
            }
            asyncPostCall()
        }
        return () => abortCont.abort();
    }, [loginUserId]);
    //======================After redricet====================
    useEffect(() => {
        console.log(loginUserId, 'now_user_login');
        if (loginUserId != '') {
            const asyncPostCall = async () => {
                try {
                    const response = await fetch(productDetailsApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            // your expected POST request payload goes here
                            product_id: route.params.productId,
                            user_id: loginUserId
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    setProductdata(data.data);
                    setProductgallerydata(data.data.gallery_images);
                    setProductFeaturedData(data.data.featured_image);
                    setProductPriceData(data.data.price);
                    setProductSallerinfoData(data.data.seller_info);
                    setProductBasicinfoData(data.data.basic_data);
                    setProductBrandNameData(data.data.basic_data.brand);
                    setProductModelNameData(data.data.basic_data.model);
                    setProductCaliberinfoData(data.data.caliber);
                    setProductCashDeskinfoData(data.data.cash_desk);
                    setProductStrapinfoData(data.data.strap);
                    setproductBidsData(data.data.bidding_data.all_bids);
                    if (data.data.bidding_data.all_bids[0]) {
                        setHighestBidder(data.data.bidding_data.all_bids[0]);
                    }
                    setCountDownTime(data.data.countdown_time);
                    if (data.data.price.raise_value == null || data.data.price.raise_value == '') {
                        setCounter(parseInt(data.data.last_bid_amount) + 10);
                    } else {
                        setCounter(parseInt(data.data.last_bid_amount) + parseInt(data.data.price.raise_value));
                    }
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                    //console.log(error)
                }
            }
            asyncPostCall()
        }
    }, [loginUserId])


    useEffect(() => {
        if (auctionBidingSuccess != 'undefied') {
            const asyncPostCall = async () => {
                try {
                    const response = await fetch(productDetailsApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            // your expected POST request payload goes here
                            product_id: route.params.productId,
                            user_id: loginUserId
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    setproductBidsData(data.data.bidding_data.all_bids);
                    if (data.data.bidding_data.all_bids[0]) {
                        setHighestBidder(data.data.bidding_data.all_bids[0]);
                    }
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                    //console.log(error)
                }
            }
            asyncPostCall()
        }
    }, [auctionBidingSuccess])

    // Accordion
    const [selected, isSelected] = useState(null);
    const toggle = (i) => {
        if (selected == i) {
            return isSelected(null);
        }
        isSelected(i);
    }

    // For language translate
    const { t, i18n } = useTranslation();

    const loginCkeck = () => {
        console.log(loginUserId, 'login_user_id');
        if ((loginUserId != '' && loginUserId != undefined) && productData.auction_participant_status == 'no') {
            navigation.navigate('PaypalOrStripe', {
                product_name: productData.product_name,
                product_id: productData.product_id,
                product_owner_id: productSallerinfoData.seller_id,
                affiliate_id: 0,
                user_id: loginUserId,
                token_amount: productData.auction_participation_amount,
            });
        } else if ((loginUserId != '' && loginUserId != undefined) && productData.auction_participant_status == 'yes') {
            setLoadingAuctionBid(true);
            const auctionBidPostCall = async () => {
                try {
                    const response = await fetch(auctionBidingApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            // your expected POST request payload goes here
                            product_id: route.params.productId,
                            user_id: loginUserId,
                            action_amount: counter
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    console.log(data);
                    setAuctionBidingSuccess(data.success_message);
                    setAuctionBidingError(data.error_message)
                    setLoadingAuctionBid(false);
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                    //console.log(error)
                }
            }
            auctionBidPostCall()
        } else {
            navigation.navigate('auth');
        }
    }

    //Counter bid amount
    const incrementCounter = () => {
        setCounter(parseInt(counter) + 1);
    };
    const decrementCounter = () => {
        setCounter(parseInt(counter) - 1);
        if (counter <= productData.last_bid_amount || counter <= productData.price.base_price) {
            setCounter(productData.last_bid_amount)
        }
    };

    // Goto checkout page
    const buyNow = () => {
        navigation.navigate('Checkout', {
            product_name: productData.product_name,
            product_id: productData.product_id,
            product_owner_id: productSallerinfoData.seller_id,
            user_id: loginUserId,
            final_price: productPriceData.final_price,
        });
    }
    const directPurchase = () => {
        if (loginUserId != '' && productPriceData.direct_purchase == 'Yes') {
            navigation.navigate('DirectOrderCheckout', {
                product_name: productData.product_name,
                product_id: productData.product_id,
                product_owner_id: productSallerinfoData.seller_id,
                user_id: loginUserId,
                final_price: productPriceData.direct_purchase_price,
            });
        } else {
            navigation.navigate('auth');
        }
    }

    // Scroll to bottom of the page
    const scrollViewRef = useRef();
    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }




    return (

        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.HeaderBackBtn}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={styles.logoImage} />
            </View>





            {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (

                <ScrollView ref={scrollViewRef} style={{ backgroundColor: "#fff" }}>


                    {

                        productGalleryData.length > 0 ?

                            <Swiper style={styles.swiperMain} showsButtons={false} loop={false}
                                dot={
                                    <View style={styles.swiperBtn} />}
                                activeDot={<View style={styles.eachBtn} />}
                            >

                                {
                                    productGalleryData.map((item, index) => {
                                        return (
                                            <View style={styles.slide} key={index}>
                                                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                                    {/* <Ionicons name="heart-outline" size={28} color="#000" style={styles.wishlist} /> */}
                                                    <Image source={{ uri: `${item.image}` }} style={styles.galleryImage} resizeMode="cover" />
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </Swiper>

                            :

                            <View style={styles.slide}>
                                <View style={styles.featuredImage}>
                                    <Ionicons name="heart-outline" size={28} color="#000" style={styles.wishlist} />
                                    {productFeaturedData.full &&
                                        <Image source={{ uri: `${productFeaturedData.full}` }} style={styles.galleryImage} resizeMode="contain" />
                                    }
                                </View>
                            </View>

                    }




                    <View style={styles.topPriceWrap}>
                        <Text style={styles.topPriceWrapText}>{t('Basic_Price')}$ {productPriceData.base_price}</Text>
                        {/* <Text style={styles.topPriceWrapText}>74 views in last 48 hours</Text> */}
                    </View>



                    <View style={styles.mainView}>
                        <Text style={styles.productTitle}>{productData.product_name}</Text>
                        <View style={styles.currentPricetitleWrap}>
                            <Text style={styles.currentPricetitle}>{t('Current_Price')}</Text>
                        </View>

                        {productPriceData.final_price != '' && loginUserId != '' ?
                            <Text style={styles.auctionPrice}>$ {productPriceData.final_price}</Text>
                            :
                            <View style={{ position: "relative" }}>
                                <Text style={styles.auctionPrice}>$ {productData.last_bid_amount}</Text>
                                {loginUserId != '' &&
                                    <TouchableOpacity onPress={scrollToBottom}>
                                        <Text style={styles.offertsText}>
                                            [ {productBidsData.length} {t('offerte')} ]
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        }

                        <Text style={styles.productStatus}>{productData.status}</Text>

                        {
                            productData.status === 'Past' ?
                                <View>
                                    {
                                        productData.logedin_user_winner_status == 'yes' && productData.logedin_user_product_purchase_status == 'no' ?
                                            <View style={styles.buynowView}>
                                                <TouchableOpacity onPress={buyNow} style={{ width: 250 }}>
                                                    <Text style={styles.buyNowBtn}>{t('BUY_NOW')}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            productData.logedin_user_winner_status == 'yes' && productData.logedin_user_product_purchase_status == 'yes' ?
                                                <View style={styles.buynowView}>
                                                    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { user_id: loginUserId })}
                                                        style={{ width: 250 }}>
                                                        <Text style={styles.buyNowBtn}>{t('Contact_the_seller')}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View></View>
                                    }
                                </View>
                                :
                                productData.status === 'Upcoming' ?
                                    <View></View>
                                    :
                                    productSallerinfoData.seller_id === loginUserId ?
                                        <View></View>
                                        :
                                        loginUserId != '' && loginUserId == highestBidder.bidder_id ?
                                            <>
                                                <View style={styles.lastPersonView}>
                                                    <Text style={styles.lastPerson}>{t('You_are_the_last_person_to_bid_on_this_product')}</Text>
                                                </View>
                                            </>
                                            :
                                            <View>
                                                <View style={{ alignItems: 'center', marginBottom: 15, flexDirection: "row", justifyContent: "center" }}>
                                                    <TouchableOpacity onPress={decrementCounter} >
                                                        <Text style={styles.incrementCounter}>-</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.incrementText}>${counter}</Text>
                                                    <TouchableOpacity onPress={incrementCounter} >
                                                        <Text style={styles.incrementCounter}>+</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.bidNowbtnView}>
                                                    {productData.auction_participant_status === 'yes' ?
                                                        <View style={{ flex: 1, alignItems: 'center', marginBottom: 15 }}>
                                                            <TouchableOpacity style={styles.buyBtn} onPress={() => loginCkeck()}>
                                                                <Text style={styles.buttonText}>{t('Bid_Now')}</Text>
                                                            </TouchableOpacity>
                                                            {isLoadingAuctionBid ? <ActivityIndicator /> : (
                                                                <>
                                                                    {auctionBidingError != '' ?
                                                                        <Text style={styles.auctionBidingError}>{auctionBidingError}</Text>
                                                                        :
                                                                        <></>
                                                                    }
                                                                    {auctionBidingSuccess != '' ?
                                                                        <Text style={styles.auctionBidingSuccess}>{auctionBidingSuccess}</Text>
                                                                        :
                                                                        <></>
                                                                    }
                                                                </>
                                                            )}
                                                        </View>
                                                        :
                                                        <>
                                                            <View>
                                                                <TouchableOpacity style={styles.buyBtn} onPress={() => loginCkeck()}>
                                                                    <Text style={styles.buttonText}>{t('Bid_Now')}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </>
                                                    }
                                                </View>
                                            </View>


                        }

                        {productData.status === 'Past' || productData.status === 'Upcoming' ?
                            <></>
                            :
                            <View>
                                {productPriceData.direct_purchase == 'Yes' ?
                                    <View style={{ flex: 1, alignItems: 'center', marginBottom: 15, marginTop: 0 }}>
                                        <TouchableOpacity style={styles.buyBtn} onPress={() => directPurchase()}>
                                            <Text style={styles.buttonText}>{t('direct_purchase')} (${productPriceData.direct_purchase_price})</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <></>
                                }
                            </View>
                        }
                        {
                            productData.status === 'Past' &&
                            <Text style={styles.totalView}>{t('Auction_Ended')}</Text>
                        }
                        {countDownTime !== '' ?
                            <View>
                                {productData.status === 'Upcoming' ?
                                    <Text style={styles.auctionEnd}>{t('auction_start_in')}</Text>
                                    :
                                    <Text style={styles.auctionEnd}>{t('Auction_end')}</Text>
                                }
                                <CountDown style={{ marginTop: 10 }}
                                    until={productData.countdown_time_second}
                                    size={13}
                                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 1, borderColor: '#00603b' }}
                                    digitTxtStyle={{ color: '#00603b' }}
                                    timeLabelStyle={{ color: '#00603b', fontWeight: 'bold', fontSize: 12 }}
                                    timeToShow={['D', 'H', 'M', 'S']}
                                    timeLabels={{ d: 'Days', h: 'Hrs', m: 'Mins', s: 'Secs' }}
                                    showSeparator={null}
                                />
                            </View>
                            :
                            <Text></Text>
                        }


                        <Text style={styles.freeShipping}>{t('Free_Shipping')}</Text>
                        <View style={styles.cardBox}>
                            <Image source={require('../assets/cards.jpg')} resizeMode="cover" />
                        </View>

                        <View>
                            <Text style={styles.prodectDetailsHeading}>{t('Product_Details')}</Text>
                        </View>
                    </View>


                    <View>
                        <View style={{ marginBottom: 10, }}>
                            <TouchableOpacity onPress={() => toggle('i')} style={{ backgroundColor: '#ececec', paddingHorizontal: 15, paddingVertical: 15, marginBottom: 0, position: 'relative' }}>
                                <Text style={styles.titleStyle}>{t('Description')}</Text>
                                {selected === 'i' ? (
                                    <Ionicons style={styles.downArrow} name="chevron-up-outline" color="#333333" size={25} />
                                ) : (
                                    <Ionicons style={styles.downArrow} name="chevron-down-outline" color="#333333" size={25} />
                                )}

                            </TouchableOpacity>
                            <RenderHtml
                                contentWidth={width}
                                source={{ html: productData.product_description || '<p></p>' }}
                                enableExperimentalMarginCollapsing={true}
                                tagsStyles={tagsStyles}
                            />
                        </View>
                        <View style={{ marginBottom: 10, }}>
                            <TouchableOpacity onPress={() => toggle('i')} style={styles.AccordHeading}>
                                <Text style={styles.titleStyle}>{t('Basic_data')}</Text>
                                {selected === 'i' ? (
                                    <Ionicons style={styles.downArrow} name="chevron-up-outline" color="#333333" size={25} />
                                ) : (
                                    <Ionicons style={styles.downArrow} name="chevron-down-outline" color="#333333" size={25} />
                                )}

                            </TouchableOpacity>
                            <View style={{ fontSize: 14, paddingHorizontal: 15, paddingVertical: 10, }}>

                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Ad_code')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.ad_code : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Brand')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productBrandNameData.name}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Model_Watch')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productModelNameData.name}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Reference_number')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.reference_number : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Load')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.load : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Case_material')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.case_material : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Strap_material')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.strap_material : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Production_year')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.production_year : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Condition')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.condition : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Kit')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.kit : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Type')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.type : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Place')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>
                                            {productBasicinfoData ? productBasicinfoData.place : ''}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                        <View style={{ marginBottom: 10, }}>
                            <TouchableOpacity onPress={() => toggle('i')} style={styles.AccordHeading}>
                                <Text style={styles.titleStyle}>{t('Caliber')}</Text>
                                {selected === 'i' ? (
                                    <Ionicons style={styles.downArrow} name="chevron-up-outline" color="#333333" size={25} />
                                ) : (
                                    <Ionicons style={styles.downArrow} name="chevron-down-outline" color="#333333" size={25} />
                                )}

                            </TouchableOpacity>
                            <View style={{ fontSize: 14, paddingHorizontal: 15, paddingVertical: 10, }}>

                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Movement')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCaliberinfoData.load}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Movement/Caliber')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCaliberinfoData.caliber_mechanism}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Power_reserve')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCaliberinfoData.power_reserve}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Number_of_jewels')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCaliberinfoData.number_of_stones}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                        <View style={{ marginBottom: 10, }}>
                            <TouchableOpacity onPress={() => toggle('i')} style={styles.AccordHeading}>
                                <Text style={styles.titleStyle}>{t('Cash_desk')}</Text>
                                {selected === 'i' ? (
                                    <Ionicons style={styles.downArrow} name="chevron-up-outline" color="#333333" size={25} />
                                ) : (
                                    <Ionicons style={styles.downArrow} name="chevron-down-outline" color="#333333" size={25} />
                                )}

                            </TouchableOpacity>
                            <View style={{ fontSize: 14, paddingHorizontal: 15, paddingVertical: 10, }}>

                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Case_material')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCashDeskinfoData.case_material}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Case_diameter')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCashDeskinfoData.diameter}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Water_resistance')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCashDeskinfoData.waterproof}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Bezel_material')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCashDeskinfoData.bezel_material}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Crystal')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCashDeskinfoData.glass}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Dial')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCashDeskinfoData.clock_face}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Dial_numerals')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productCashDeskinfoData.numbers_on_the_dial}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={{ marginBottom: 10, }}>
                            <TouchableOpacity onPress={() => toggle('i')} style={styles.AccordHeading}>
                                <Text style={styles.titleStyle}>{t('Strap')}</Text>
                                {selected === 'i' ? (
                                    <Ionicons style={styles.downArrow} name="chevron-up-outline" color="#333333" size={25} />
                                ) : (
                                    <Ionicons style={styles.downArrow} name="chevron-down-outline" color="#333333" size={25} />
                                )}

                            </TouchableOpacity>
                            <View style={{ fontSize: 14, paddingHorizontal: 15, paddingVertical: 10, }}>

                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Bracelet_material')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productStrapinfoData.strap_material}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Bracelet_color')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productStrapinfoData.strap_color}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Clasp')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productStrapinfoData.closure}</Text>
                                    </View>
                                </View>
                                <View style={styles.basicInfoWrap}>
                                    <View>
                                        <Text style={styles.basicInfoWrapTitle}>{t('Clasp_material')}:</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.basicInfoCont}>{productStrapinfoData.closure_material}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>


                        {/* {
                            accordInfo.map((item, index) => {
                                return (
                                    <View key={index} style={{ marginBottom: 10 }}>
                                        <TouchableOpacity onPress={() => toggle('i')} style={{ backgroundColor: '#ececec', paddingHorizontal: 15, paddingVertical: 15, marginBottom: 0, position: 'relative' }}>
                                            <Text style={styles.titleStyle}>{item.title}</Text>
                                            {selected === 'i' ? (
                                                <Ionicons style={styles.downArrow} name="chevron-up-outline" color="#333333" size={25} />
                                            ) : (
                                                <Ionicons style={styles.downArrow} name="chevron-down-outline" color="#333333" size={25} />
                                            )}

                                        </TouchableOpacity>
                                        <Text>{item.data}</Text>
                                    </View>
                                )
                            })
                        } */}
                    </View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 25 }}>
                        <Text style={styles.sellerTitle}>{t('Seller')}</Text>
                        <View style={{ position: 'relative', paddingLeft: 65, }}>
                            <View style={styles.sellerImage}>
                                {productSallerinfoData ?
                                    <Image source={{ uri: `${productSallerinfoData.seller_image}` }} style={{ width: 48, height: 48, }} resizeMode="contain" />
                                    :
                                    <SimpleLineIcons style={styles.sellerIcon} name="user" color="#333333" size={25} />
                                }
                            </View>
                            <Text style={styles.sellerInfo}>
                                {productSallerinfoData ? productSallerinfoData.seller_name : ''}
                            </Text>
                            <View style={styles.ratingMainWrap}>
                                <>
                                    {
                                        productSallerinfoData.seller_average_rating === '1' ?

                                            <View style={styles.ratingView}>
                                                <FontAwesome name="star" color="#fedd00" size={25} />
                                            </View>
                                            :
                                            productSallerinfoData.seller_average_rating === '2' ?
                                                <View style={styles.ratingView}>
                                                    <FontAwesome name="star" color="#fedd00" size={25} />
                                                    <FontAwesome name="star" color="#fedd00" size={25} />
                                                </View>
                                                :
                                                productSallerinfoData.seller_average_rating === '3' ?
                                                    <View style={styles.ratingView}>
                                                        <FontAwesome name="star" color="#fedd00" size={25} />
                                                        <FontAwesome name="star" color="#fedd00" size={25} />
                                                        <FontAwesome name="star" color="#fedd00" size={25} />
                                                    </View>
                                                    :
                                                    productSallerinfoData.seller_average_rating === '4' ?
                                                        <View style={styles.ratingView}>
                                                            <FontAwesome name="star" color="#fedd00" size={25} />
                                                            <FontAwesome name="star" color="#fedd00" size={25} />
                                                            <FontAwesome name="star" color="#fedd00" size={25} />
                                                            <FontAwesome name="star" color="#fedd00" size={25} />
                                                        </View>
                                                        :
                                                        productSallerinfoData.seller_average_rating === '5' ?
                                                            <View style={styles.ratingView}>
                                                                <FontAwesome name="star" color="#fedd00" size={25} />
                                                                <FontAwesome name="star" color="#fedd00" size={25} />
                                                                <FontAwesome name="star" color="#fedd00" size={25} />
                                                                <FontAwesome name="star" color="#fedd00" size={25} />
                                                                <FontAwesome name="star" color="#fedd00" size={25} />
                                                            </View>
                                                            :
                                                            <View><Text>0</Text></View>
                                    }
                                    <Text style={styles.ratingText}>{t('Ratings')}:
                                        {productSallerinfoData ? productSallerinfoData.seller_total_ratings : ''}
                                    </Text>
                                </>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.sellerAddress}>{t('This_dealer_is_from')} {productSallerinfoData ? productSallerinfoData.seller_city : ''} , {productSallerinfoData ? productSallerinfoData.seller_country : ''}.</Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 15, paddingVertical: 25, backgroundColor: '#ebf4ef' }}>
                        <Text style={styles.buyerTitle}>{t('Buyer_Protection')}</Text>
                        <View style={styles.buyerInfo}>
                            <View style={styles.whiteBg}>
                                <MaterialCommunityIcons style={styles.eachIcon} name="shield-check-outline" color="#00603b" size={22} />
                            </View>
                            <Text style={styles.infoTitle}>{t('Secure_payment_via_an_escrow_account')}</Text>
                        </View>
                        <View style={styles.buyerInfo}>
                            <View style={styles.whiteBg}>
                                <MaterialCommunityIcons style={styles.eachIcon} name="account-plus-outline" color="#00603b" size={22} />
                            </View>
                            <Text style={styles.infoTitle}>{t('Verified_dealer')}</Text>
                        </View>
                        <View style={styles.buyerInfo}>
                            <View style={styles.whiteBg}>
                                <MaterialCommunityIcons style={styles.eachIcon} name="badge-account-outline" color="#00603b" size={22} />
                            </View>
                            <Text style={styles.infoTitle}>{t('Authenticity_guarantee')}</Text>
                        </View>
                        {/* <View>
                            <TouchableOpacity>
                                <Text style={styles.moreInformation}>More information</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>


                    <View style={styles.conditionWrap}>

                        <View style={styles.conditionWrapBox}>
                            <Text style={styles.conditionWrapTitle}>Condition</Text>
                            <Text style={styles.conditionWrapCont}>{productData.condition}</Text>
                        </View>
                        <View style={styles.conditionWrapBox}>
                            <Text style={styles.conditionWrapTitle}>Kit</Text>
                            <Text style={styles.conditionWrapCont}>{productData.kit}</Text>
                        </View>
                        <View style={styles.conditionWrapBox}>
                            <Text style={styles.conditionWrapTitle}>{t('Availability')}</Text>
                            <Text style={styles.conditionWrapCont}> <FontAwesome name="circle" color="#00603b" size={18} /> {productData.availability}</Text>
                        </View>
                        <View style={styles.conditionWrapBox}>
                            <Text style={styles.conditionWrapTitle}>{t('Estimated_delivery_date')}</Text>
                            <Text style={styles.conditionWrapCont}>{productData.estimated_delivery_date}</Text>
                        </View>
                        <View style={styles.conditionWrapBox}>
                            <Text style={styles.conditionWrapTitle}>{t('Terms_of_payment')}</Text>
                            <Image source={require('../assets/payment-method.png')} style={{ width: 170, height: 18, }} />
                        </View>

                    </View>


                    <View style={styles.sellerWrap}>
                        {productBidsData ?
                            <View>
                                {
                                    productBidsData.slice(0, 1).map((item, index) => {
                                        return (
                                            <View key={index} style={styles.sellerActiveWrap}>
                                                <View style={styles.sellerActiveWrapLeft}>
                                                    <View style={styles.sellerActiveWrapUser}>

                                                        {productSallerinfoData ?
                                                            <Image source={{ uri: `${item.bidder_image}` }} style={{ width: 48, height: 48, }} resizeMode="contain" />
                                                            :
                                                            <Feather name="user" color="#333" size={25} />
                                                        }
                                                    </View>
                                                    <View>
                                                        <Text style={styles.sellerActiveWrapUserTitle}>{item.bidder_name}</Text>
                                                        <Text style={styles.sellerActiveWrapUserDesc}>{item.biding_date}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.sellerActiveWrapRight}>
                                                    <Text style={styles.sellerActiveWrapAmount}><FontAwesome name="circle" color="#00603b" size={15} /> Last Bid Amount</Text>
                                                    <Text style={styles.sellerActiveWrapValue}>$ {item.biding_amount_number}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            <View><Text style={styles.sellertitle}>{t('No_bid_yet')}</Text></View>
                        }
                        {/* <Text style={styles.sellertitle}>Seller</Text> */}
                        {productBidsData ?
                            <View>
                                {
                                    productBidsData.slice(1).map((item, index) => {
                                        return (
                                            <View key={index} style={styles.sellerListWrap}>
                                                <View style={styles.sellerActiveWrapLeft}>
                                                    <View style={styles.sellerActiveWrapUser}>

                                                        {productSallerinfoData ?
                                                            <Image source={{ uri: `${item.bidder_image}` }} style={{ width: 48, height: 48, }} resizeMode="cover" />
                                                            :
                                                            <Feather name="user" color="#333" size={25} />
                                                        }
                                                    </View>
                                                    <View>
                                                        <Text style={styles.sellerActiveWrapUserTitle}>{item.bidder_name}</Text>
                                                        <Text style={styles.sellerActiveWrapUserDesc}>{item.biding_date}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.sellerActiveWrapRight}>
                                                    <Text style={styles.sellerActiveWrapAmount}>{t('Bid_Amount')}</Text>
                                                    <Text style={styles.sellerValue}>$ {item.biding_amount_number}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            <View></View>
                        }


                        {/* <View style={styles.reportText}>
                            <Text style={styles.sellerActiveWrapUserTitle}><MaterialCommunityIcons name="tag-outline" color="#333" size={20} /> Want tosell a similer watch? <TouchableOpacity><Text style={{ color: "#00603b" }}>Creat an ad now</Text></TouchableOpacity></Text>
                            <Text style={styles.sellerActiveWrapUserTitle}><AntDesign name="exclamationcircleo" color="#333" size={18} /> <TouchableOpacity><Text style={{ color: "#00603b" }}>Report a suspicious listing</Text></TouchableOpacity></Text>
                        </View> */}

                    </View>


                    {/* <View style={styles.relatedProduct}>

                        <Text style={styles.relatedProductTitle}>You may also be interested in these watch</Text>
                        <ScrollView style={{ flexDirection: 'row', marginVertical: 30, }} horizontal={true} showsHorizontalScrollIndicator={false}>

                            <View style={styles.boxProuduct}>
                                <View style={styles.boxProuductImage}>
                                    <Image source={require('../assets/watch.png')} style={{ width: 110, height: 180 }} resizeMode="cover" />
                                </View>
                                <View style={styles.boxProuductDesc}>
                                    <View style={styles.boxProuductDescTop}>
                                        <Text style={styles.boxProuductDescTopTitle}>Omega</Text>
                                        <Text style={styles.boxProuductDescTopText}>Oyster Perpetual 41</Text>
                                    </View>
                                    <View style={styles.boxProuductDescBottom}>
                                        <View style={styles.bottomEndSec}>
                                            <View>
                                                <Text style={styles.bottomEndSecText}>Professional Dealer</Text>
                                                <Image source={require('../assets/ratting_icon.jpg')} />
                                            </View>
                                            <View>
                                                <Image source={require('../assets/flag.jpg')} style={{ width: 24, height: 16, borderWidth: 1, borderColor: "#a6aeae" }} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.boxProuduct}>
                                <View style={styles.boxProuductImage}>
                                    <Image source={require('../assets/watch.png')} style={{ width: 110, height: 180 }} resizeMode="cover" />
                                </View>
                                <View style={styles.boxProuductDesc}>
                                    <View style={styles.boxProuductDescTop}>
                                        <Text style={styles.boxProuductDescTopTitle}>Omega</Text>
                                        <Text style={styles.boxProuductDescTopText}>Oyster Perpetual 41</Text>
                                    </View>
                                    <View style={styles.boxProuductDescBottom}>
                                        <View style={styles.bottomEndSec}>
                                            <View>
                                                <Text style={styles.bottomEndSecText}>Professional Dealer</Text>
                                                <Image source={require('../assets/ratting_icon.jpg')} />
                                            </View>
                                            <View>
                                                <Image source={require('../assets/flag.jpg')} style={{ width: 24, height: 16, borderWidth: 1, borderColor: "#a6aeae" }} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.boxProuduct}>
                                <View style={styles.boxProuductImage}>
                                    <Image source={require('../assets/watch.png')} style={{ width: 110, height: 180 }} resizeMode="cover" />
                                </View>
                                <View style={styles.boxProuductDesc}>
                                    <View style={styles.boxProuductDescTop}>
                                        <Text style={styles.boxProuductDescTopTitle}>Omega</Text>
                                        <Text style={styles.boxProuductDescTopText}>Oyster Perpetual 41</Text>
                                    </View>
                                    <View style={styles.boxProuductDescBottom}>
                                        <View style={styles.bottomEndSec}>
                                            <View>
                                                <Text style={styles.bottomEndSecText}>Professional Dealer</Text>
                                                <Image source={require('../assets/ratting_icon.jpg')} />
                                            </View>
                                            <View>
                                                <Image source={require('../assets/flag.jpg')} style={{ width: 24, height: 16, borderWidth: 1, borderColor: "#a6aeae" }} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.boxProuduct}>
                                <View style={styles.boxProuductImage}>
                                    <Image source={require('../assets/watch.png')} style={{ width: 110, height: 180 }} resizeMode="cover" />
                                </View>
                                <View style={styles.boxProuductDesc}>
                                    <View style={styles.boxProuductDescTop}>
                                        <Text style={styles.boxProuductDescTopTitle}>Omega</Text>
                                        <Text style={styles.boxProuductDescTopText}>Oyster Perpetual 41</Text>
                                    </View>
                                    <View style={styles.boxProuductDescBottom}>
                                        <View style={styles.bottomEndSec}>
                                            <View>
                                                <Text style={styles.bottomEndSecText}>Professional Dealer</Text>
                                                <Image source={require('../assets/ratting_icon.jpg')} />
                                            </View>
                                            <View>
                                                <Image source={require('../assets/flag.jpg')} style={{ width: 24, height: 16, borderWidth: 1, borderColor: "#a6aeae" }} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </ScrollView>

                    </View> */}



                </ScrollView>

            )}






        </>
    )
}
const styles = StyleSheet.create({
    swiperMain: {
        marginBottom: 0,
        height: 300
    },
    basicInfoWrap: {
        flexDirection: "row",
        borderBottomColor: "#aaaaaa",
        borderBottomWidth: 1,
    },
    basicInfoWrapTitle: {
        fontSize: 15,
        lineHeight: 15,
        color: "#000000",
        fontWeight: "500",
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    basicInfoCont: {
        fontSize: 15,
        lineHeight: 15,
        color: "#000000",
        fontWeight: "400",
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    sellerWrap: {
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    sellerActiveWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f2f7f5",
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginBottom: 10,
    },
    sellerActiveWrapLeft: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    sellerActiveWrapUser: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#333333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        overflow: 'hidden'
    },
    sellerActiveWrapUserTitle: {
        color: "#333333",
        fontSize: 15,
        lineHeight: 25,
    },
    sellerActiveWrapUserDesc: {
        color: "#333333",
        fontSize: 14,
        lineHeight: 20,
    },
    sellerActiveWrapRight: {
        alignItems: "flex-end",
    },
    sellerActiveWrapAmount: {
        color: "#7f7f7f",
        fontSize: 14,
        lineHeight: 20,
    },
    sellerActiveWrapValue: {
        color: "#333333",
        fontSize: 24,
    },
    sellerValue: {
        color: "#333333",
        fontSize: 21,
    },
    sellertitle: {
        fontSize: 18,
        lineHeight: 38,
        color: "#252525",
        fontWeight: "500",
    },
    sellerListWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomColor: "#c8c8c8",
        borderBottomWidth: 1,
    },
    reportText: {
        paddingTop: 20,
    },
    relatedProduct: {
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    relatedProductTitle: {
        color: "#333333",
        fontSize: 18,
    },
    singleWatch: {
        width: 150,
        alignItems: "center",
    },
    boxProuduct: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        width: "22%",
    },
    boxProuductImage: {
        backgroundColor: "#FFF",
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative'
    },
    boxProuductDesc: {
        backgroundColor: "#ffffff",
    },
    boxProuductDescTop: {
        paddingBottom: 5,
        marginBottom: 5,
    },
    boxProuductDescTopTitle: {
        color: "#00603b",
        fontSize: 16,
        lineHeight: 22,
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
        paddingBottom: 10,
    },
    bottomEndSec: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomEndSecText: {
        fontSize: 13,
        lineHeight: 16,
        color: "#333333",
        paddingBottom: 5,
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
        fontSize: 14,
        marginLeft: 10,
    },
    wishlist: {
        position: 'absolute',
        right: 0,
        top: -10,
    },
    slide: {
        backgroundColor: "#ffffff",
        width: '100%',
        padding: 30,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    swiperDot: {
        width: 12,
        height: 12,
        borderRadius: 20,
        backgroundColor: '#e3e3e3',
        marginHorizontal: 5,
    },
    swiperActiveDot: {
        width: 12,
        height: 12,
        borderRadius: 20,
        backgroundColor: '#e3e3e3',
        marginHorizontal: 5,
        backgroundColor: '#00603b',
    },
    productTitle: {
        fontSize: 20,
        color: '#00603b',
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 28,
        marginBottom: 0,
    },
    totalView: {
        fontSize: 18,
        color: '#aa0303',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    auctionEnd: {
        fontSize: 18,
        color: '#333333',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 0,
    },
    redText: {
        fontSize: 18,
        color: '#00603b',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    auctionPrice: {
        textAlign: 'center',
        fontSize: 32,
        color: '#333333',
        fontWeight: '600',
        marginBottom: 0,
    },
    freeShipping: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        color: '#b41e2d',
    },
    buyBtn: {
        width: 250,
        borderRadius: 0,
        backgroundColor: '#00603b',
        borderRadius: 8,
    },
    suggestBtn: {
        width: '80%',
        borderRadius: 0,
        backgroundColor: '#333333',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        textTransform: 'uppercase'
    },
    //Accordion style
    titleStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333333',
    },
    accordContent: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '400',
        lineHeight: 28,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    downArrow: {
        position: 'absolute',
        right: 5,
        top: 15
    },
    sellerTitle: {
        fontSize: 18,
        color: '#252525',
        fontWeight: '600',
        marginBottom: 10,
    },
    sellerInfo: {
        fontSize: 18,
        color: '#333333',
        fontWeight: '500',
        marginBottom: 5,
    },
    sellerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#333333',
        backgroundColor: '#fff',
        marginBottom: 8,
        position: 'absolute',
        top: 10,
        left: 0,
        overflow: "hidden",
    },
    sellerAddress: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '600',
        marginTop: 10
    },
    sellerIcon: {
        position: 'absolute',
        top: 8,
        left: 10,
    },
    ratingText: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '600',
        marginLeft: 20,
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
        marginBottom: 0
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
    conditionWrap: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    conditionWrapBox: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomColor: "#aaaaaa",
        borderBottomWidth: 1,
    },
    conditionWrapTitle: {
        color: "#252525",
        fontSize: 18,
        lineHeight: 28,
        fontWeight: "500",
    },
    conditionWrapCont: {
        color: "#252525",
        fontSize: 17,
        lineHeight: 24,
        fontWeight: "300",
    },
    infoTitle: {
        color: "#000000",
    },
    HeaderBackBtn: {
        position: 'absolute',
        left: 8,
        top: '35%',
        zIndex: 99
    },
    logoImage: {
        width: 120,
        height: 45
    },
    swiperBtn: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        position: "relative",
        bottom: 0
    },
    eachBtn: {
        backgroundColor: '#00603b',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        position: "relative",
        bottom: 0
    },
    galleryImage: {
        width: 188,
        height: 200
    },
    featuredImage: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainView: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 10
    },
    productStatus: {
        textAlign: 'center',
        color: '#000',
        fontSize: 15,
        marginBottom: 5
    },
    buynowView: {
        flex: 1,
        alignItems: 'center'
    },
    buyNowBtn: {
        backgroundColor: '#00603b',
        paddingHorizontal: 20,
        paddingVertical: 20,
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    lastPersonView: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 0
    },
    lastPerson: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    incrementCounter: {
        backgroundColor: '#00603b',
        color: '#fff',
        fontSize: 25,
        width: 70,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius: 8,
    },
    incrementText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#282828',
        paddingVertical: 8,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    bidNowbtnView: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 15
    },
    auctionBidingError: {
        fontSize: 20,
        color: 'red'
    },
    auctionBidingSuccess: {
        fontSize: 20,
        color: 'green'
    },
    prodectDetailsHeading: {
        fontSize: 25,
        color: '#333333',
        fontWeight: '600',
        marginVertical: 30
    },
    AccordHeading: {
        backgroundColor: '#ececec',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 0,
        position: 'relative'
    },
    ratingMainWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    ratingView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    topPriceWrap: {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingBottom: 15,
        backgroundColor: "#ffffff",

    },
    topPriceWrapText: {
        fontSize: 14,
        lineHeight: 18,
        color: "#000000",
        fontStyle: "italic",
    },
    currentPricetitleWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    currentPricetitle: {
        fontSize: 15,
        lineHeight: 18,
        color: "#000000",
    },
    offertsText: {
        fontSize: 15,
        color: "#25674f",
        position: "absolute",
        right: 40,
        top: -32,
        zIndex: 1,
    },
    cardBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    infoTitle: {
        color: "#000000",
    }

})
export default ProductDetails