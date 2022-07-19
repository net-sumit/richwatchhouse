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
import Swiper from 'react-native-swiper'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// For language translate
import { useTranslation } from 'react-i18next';

const AuctionDetailsEndScreen = ({ navigation }) => {

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

    const accordInfo = [
        {
            title: 'Description',
            data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {
            title: 'Basic data',
            data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {
            title: 'Caliber',
            data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {
            title: 'Cash desk',
            data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {
            title: 'Strap',
            data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        }
    ]
    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}><AntDesign name="arrowleft" size={25} color="#fff" /></TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
                {/* <View style={styles.searchbar}>
                    <Ionicons name="search" color="#fff" size={25} />
                    <TextInput placeholder="Search" style={styles.input} />
                </View> */}
            </View>
            <ScrollView>
                <Swiper style={{ marginBottom: 0, height: 300 }} showsButtons={false} loop={false}
                    dot={
                        <View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, position: "relative", bottom: 0 }} />}
                    activeDot={<View style={{ backgroundColor: '#00603b', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, position: "relative", bottom: 0 }} />}
                >
                    {
                        <>
                            <View style={styles.slide}>
                                <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="heart-outline" size={28} color="#000" style={styles.wishlist} />
                                    <Image source={require('../assets/watch-2.png')} style={{ width: 188, height: 200, }} resizeMode="contain" />
                                </View>
                            </View>
                        </>
                    }
                </Swiper>
                <View style={{ width: '100%', flex: 1, paddingHorizontal: 10 }}>
                    <Text style={styles.productTitle}>Rolex Submariner 14060 No-Date - Tritinova Dial 2 Liner U Serial 1998</Text>
                    <Text style={styles.totalView}>74 views in 48 hours</Text>
                    <Text style={styles.auctionEnd}>Auction end</Text>
                    <Text style={styles.auctionPrice}>€ 9,540</Text>
                    <Text style={styles.freeShipping}>Final Amount</Text>

                    <View style={{}}>
                        <Text style={{ fontSize: 25, color: '#333333', fontWeight: '600', marginVertical: 30 }}>Product Details</Text>
                    </View>
                </View>

                <View>
                    {
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
                    }
                </View>
                <View style={{ paddingHorizontal: 15, paddingVertical: 25 }}>
                    <Text style={styles.sellerTitle}>Seller</Text>
                    <View style={{ position: 'relative', paddingLeft: 65, }}>
                        <View style={styles.sellerImage}><SimpleLineIcons style={styles.sellerIcon} name="user" color="#333333" size={25} /></View>
                        <Text style={styles.sellerInfo}>Professional dealer on Rich Watch House  since 2011 </Text>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <>
                                <FontAwesome name="star" color="#fedd00" size={25} />
                                <FontAwesome name="star" color="#fedd00" size={25} />
                                <FontAwesome name="star" color="#fedd00" size={25} />
                                <FontAwesome name="star" color="#fedd00" size={25} />
                                <FontAwesome name="star-half" color="#fedd00" size={25} />
                                <Text style={styles.ratingText}>Ratings: 19</Text>
                            </>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.sellerAddress}>This dealer is from Lorem, USA.</Text>
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'center', marginBottom: 15 }}>
                    <TouchableOpacity style={styles.buyBtn}>
                        <Text style={styles.buttonText}>Contact seller </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 15, paddingVertical: 25, backgroundColor:'#ebf4ef' }}>
                    <Text style={styles.buyerTitle}>Buyer Protection</Text>
                    <View style={styles.buyerInfo}>
                        <View style={styles.whiteBg}>
                            <MaterialCommunityIcons style={styles.eachIcon} name="shield-check-outline" color="#00603b" size={22} />
                        </View>
                        <Text style={styles.infoTitle}>Secure payment via an escrow account</Text>
                    </View>
                    <View style={styles.buyerInfo}>
                        <View style={styles.whiteBg}>
                            <MaterialCommunityIcons style={styles.eachIcon} name="account-plus-outline" color="#00603b" size={22} />
                        </View>
                        <Text style={styles.infoTitle}>Verified dealer</Text>
                    </View>
                    <View style={styles.buyerInfo}>
                        <View style={styles.whiteBg}>
                            <MaterialCommunityIcons style={styles.eachIcon} name="badge-account-outline" color="#00603b" size={22} />
                        </View>
                        <Text style={styles.infoTitle}>Authenticity guarantee</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text style={styles.moreInformation}>More information</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.conditionWrap}>
                    
                    <View style={styles.conditionWrapBox}>
                        <Text style={styles.conditionWrapTitle}>Condition</Text>
                        <Text style={styles.conditionWrapCont}>Excellent (second hand, no or barely visible signs of wear)</Text>
                    </View>
                    <View style={styles.conditionWrapBox}>
                        <Text style={styles.conditionWrapTitle}>Kit</Text>
                        <Text style={styles.conditionWrapCont}>Without original box or original documents</Text>
                    </View>
                    <View style={styles.conditionWrapBox}>
                        <Text style={styles.conditionWrapTitle}>Availability</Text>
                        <Text style={styles.conditionWrapCont}> <FontAwesome name="circle" color="#00603b" size={18} /> Immediate availability</Text>
                    </View>
                    <View style={styles.conditionWrapBox}>
                        <Text style={styles.conditionWrapTitle}>Estimated delivery date</Text>
                        <Text style={styles.conditionWrapCont}>30 Sep 2021 - 8 Oct 202</Text>
                    </View>
                    <View style={styles.conditionWrapBox}>
                        <Text style={styles.conditionWrapTitle}>Terms of payment</Text>
                    </View>

                </View>


                <View style={styles.sellerWrap}>

                    <View style={styles.sellerActiveWrap}>
                        <View style={styles.sellerActiveWrapLeft}>
                            <View style={styles.sellerActiveWrapUser}>
                               <Feather name="user" color="#333" size={25} />
                            </View>
                            <View>
                                <Text style={styles.sellerActiveWrapUserTitle}>Lorem Ipsum</Text>
                                <Text style={styles.sellerActiveWrapUserDesc}>Seller Location: lorem</Text>
                            </View>
                        </View>
                        <View style={styles.sellerActiveWrapRight}>
                            <Text style={styles.sellerActiveWrapAmount}><FontAwesome name="circle" color="#da001d" size={15} /> Last Bid Amount</Text>
                            <Text style={styles.sellerActiveWrapValue}>€ 10,540</Text>
                        </View>
                    </View>

                    <Text style={styles.sellertitle}>Seller</Text>

                    <View style={styles.sellerListWrap}>
                        <View style={styles.sellerActiveWrapLeft}>
                            <View style={styles.sellerActiveWrapUser}>
                               <Feather name="user" color="#333" size={25} />
                            </View>
                            <View>
                                <Text style={styles.sellerActiveWrapUserTitle}>Lorem Ipsum</Text>
                                <Text style={styles.sellerActiveWrapUserDesc}>Seller Location: lorem</Text>
                            </View>
                        </View>
                        <View style={styles.sellerActiveWrapRight}>
                            <Text style={styles.sellerActiveWrapAmount}>Bid Amount</Text>
                            <Text style={styles.sellerValue}>€ 10,540</Text>
                        </View>
                    </View>
                    <View style={styles.sellerListWrap}>
                        <View style={styles.sellerActiveWrapLeft}>
                            <View style={styles.sellerActiveWrapUser}>
                               <Feather name="user" color="#333" size={25} />
                            </View>
                            <View>
                                <Text style={styles.sellerActiveWrapUserTitle}>Lorem Ipsum</Text>
                                <Text style={styles.sellerActiveWrapUserDesc}>Seller Location: lorem</Text>
                            </View>
                        </View>
                        <View style={styles.sellerActiveWrapRight}>
                            <Text style={styles.sellerActiveWrapAmount}>Bid Amount</Text>
                            <Text style={styles.sellerValue}>€ 10,540</Text>
                        </View>
                    </View>
                    <View style={styles.sellerListWrap}>
                        <View style={styles.sellerActiveWrapLeft}>
                            <View style={styles.sellerActiveWrapUser}>
                               <Feather name="user" color="#333" size={25} />
                            </View>
                            <View>
                                <Text style={styles.sellerActiveWrapUserTitle}>Lorem Ipsum</Text>
                                <Text style={styles.sellerActiveWrapUserDesc}>Seller Location: lorem</Text>
                            </View>
                        </View>
                        <View style={styles.sellerActiveWrapRight}>
                            <Text style={styles.sellerActiveWrapAmount}>Bid Amount</Text>
                            <Text style={styles.sellerValue}>€ 10,540</Text>
                        </View>
                    </View>
                    <View style={styles.sellerListWrap}>
                        <View style={styles.sellerActiveWrapLeft}>
                            <View style={styles.sellerActiveWrapUser}>
                               <Feather name="user" color="#333" size={25} />
                            </View>
                            <View>
                                <Text style={styles.sellerActiveWrapUserTitle}>Lorem Ipsum</Text>
                                <Text style={styles.sellerActiveWrapUserDesc}>Seller Location: lorem</Text>
                            </View>
                        </View>
                        <View style={styles.sellerActiveWrapRight}>
                            <Text style={styles.sellerActiveWrapAmount}>Bid Amount</Text>
                            <Text style={styles.sellerValue}>€ 10,540</Text>
                        </View>
                    </View>

                    <View style={styles.reportText}>
                        <Text style={styles.sellerActiveWrapUserTitle}><MaterialCommunityIcons name="tag-outline" color="#333" size={20} /> Want tosell a similer watch? <TouchableOpacity><Text style={{color: "#00603b"}}>Creat an ad now</Text></TouchableOpacity></Text>
                        <Text style={styles.sellerActiveWrapUserTitle}><AntDesign name="exclamationcircleo" color="#333" size={18} /> <TouchableOpacity><Text style={{color: "#00603b"}}>Report a suspicious listing</Text></TouchableOpacity></Text>
                    </View>

                </View>


                <View style={styles.relatedProduct}>

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
                                            <Image source={require('../assets/ratting_icon.jpg')}/>
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
                                            <Image source={require('../assets/ratting_icon.jpg')}/>
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
                                            <Image source={require('../assets/ratting_icon.jpg')}/>
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
                                            <Image source={require('../assets/ratting_icon.jpg')}/>
                                        </View>
                                        <View>
                                            <Image source={require('../assets/flag.jpg')} style={{ width: 24, height: 16, borderWidth: 1, borderColor: "#a6aeae" }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </ScrollView>

                </View>



            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({

    sellerWrap:{
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    sellerActiveWrap:{
        flexDirection: "row",
        justifyContent:"space-between",
        backgroundColor: "#f2f7f5",
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    sellerActiveWrapLeft:{
        flexDirection: "row",
        justifyContent:"space-between",
    },
    sellerActiveWrapUser:{
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#333333",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginRight: 8,
    },
    sellerActiveWrapUserTitle:{
        color: "#333333",
        fontSize: 15,
        lineHeight:25,
    },
    sellerActiveWrapUserDesc:{
        color: "#333333",
        fontSize: 14,
        lineHeight:20,
    },
    sellerActiveWrapRight:{
        alignItems:"flex-end",
    },
    sellerActiveWrapAmount:{
        color: "#7f7f7f",
        fontSize: 14,
        lineHeight: 20,
    },
    sellerActiveWrapValue:{
        color: "#333333",
        fontSize: 24,
    },
    sellerValue:{
        color: "#333333",
        fontSize: 21,
    },
    sellertitle:{
        fontSize: 18,
        lineHeight: 38,
        color: "#252525",
        fontWeight: "500",
    },
    sellerListWrap:{
        flexDirection: "row",
        justifyContent:"space-between",
        backgroundColor: "#ffffff",
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomColor: "#c8c8c8",
        borderBottomWidth: 1,
    },
    reportText:{
        paddingTop:20,
    },
    relatedProduct:{
        paddingTop:20,
        paddingBottom: 30,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    relatedProductTitle:{
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
    boxProuductDesc:{
        backgroundColor: "#ffffff",
    },
    boxProuductDescTop:{
        paddingBottom: 5,
        marginBottom: 5,
    },
    boxProuductDescTopTitle:{
        color: "#00603b",
        fontSize: 16,
        lineHeight: 22,
    },
    boxProuductDescTopText:{
        color: "#333333",
        fontSize: 16,
        lineHeight: 22,
    },
    boxProuductDescTopPrice:{
        color: "#333333",
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "500"
    },
    boxProuductDescBottom:{
        backgroundColor: "#ffffff"
    },
    boxProuductDescBottomtext:{
        fontSize: 14,
        lineHeight: 24,
        color: "#333333",
        paddingBottom: 10,
    },
    bottomEndSec:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    bottomEndSecText:{
        fontSize: 13,
        lineHeight: 16,
        color: "#333333",
        paddingBottom:5,
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
        backgroundColor: "#ececec",
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
        marginBottom: 10,
    },
    totalView: {
        fontSize: 18,
        color: '#aa0303',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    auctionEnd: {
        fontSize: 22,
        color: '#aa0303',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    redText: {
        fontSize: 18,
        color: '#00603b',
    },
    auctionPrice: {
        textAlign: 'center',
        fontSize: 32,
        color: '#333333',
        fontWeight: '600',
        marginBottom: 10,
    },
    freeShipping: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 30,
    },
    buyBtn: {
        width: '80%',
        borderRadius: 0,
        backgroundColor: '#00603b',
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
        marginTop:10,
        paddingVertical: 5,
        borderStyle:'solid',
        borderColor: "#00603b",
        borderBottomWidth: 1,
    },


    conditionWrap:{
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    conditionWrapBox:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomColor: "#aaaaaa",
        borderBottomWidth: 1,
    },
    conditionWrapTitle:{
        color: "#252525",
        fontSize: 18,
        lineHeight: 28,
        fontWeight: "500",
    },
    conditionWrapCont:{
        color: "#252525",
        fontSize: 17,
        lineHeight: 24,
        fontWeight: "300",
    }


})
export default AuctionDetailsEndScreen