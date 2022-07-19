import React, {useRef, useEffect, useState} from 'react';
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
  import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { RadioButton } from 'react-native-paper';



const SuggestPriceScreen = ({navigation}) => { 
    

    return (
        <>
        <View style={styles.HeaderBar}>
            <Text style={{color:"#FFF", fontSize:14}}>Rich Watch House Trusted Checkout</Text>           
            <TouchableOpacity style={{position:'absolute', top:28, left:10}}>
                <Text style={{color:"#FFF", fontSize:14}}>CLose</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:1, backgroundColor:"#FFF"}}>
            <ScrollView style={{flex:1, padding:10}}>
                <View style={{flexDirection:'row', flexWrap:"wrap", backgroundColor:"#f0f0f0", borderRadius:8, paddingHorizontal:12, paddingVertical:12}}>
                    <View style={{backgroundColor:"#dcdcdc", padding:15, borderRadius:8, width:"30%"}}>
                        <Image source={require('../assets/img.png')} />
                    </View>
                    <View style={{paddingLeft:8, width:"70%", position:"relative"}}>
                        <Text style={{color:"#333333", fontSize:16, fontWeight:"700", marginBottom:10}}>Rolex Submariner 14060 No-Date - Tritinova Dial 2 Liner U Serial 1998</Text>
                        <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", position:"absolute", left:0, bottom:0, paddingLeft:10}}>
                            <View style={{flexDirection:"row"}}>
                                <Icon name="star" fontSize={20} color="#ffae00" />
                                <Icon name="star" fontSize={20} color="#ffae00" />
                                <Icon name="star" fontSize={20} color="#ffae00" />
                                <Icon name="star" fontSize={20} color="#ffae00" />
                                <Icon name="star" fontSize={20} color="#ffae00" />
                            </View>
                            <Image source={require('../assets/flag.jpg')} />
                        </View>
                    </View>
                </View>

                <View style={styles.screenContArea}>
                    <Text style={styles.screenTitle}>Suggest a price</Text>
                    <Text style={styles.screenContAreaDesc}>PLease enter your personal information and price suggestion for the item</Text>
                </View>

                <View style={styles.priceBox}>
                    <View>
                        <Text style={styles.priceBoxTitle}>Your price suggestion</Text>
                    </View>
                    <View style={styles.priceBoxCont}>
                         <Text style={styles.textLabel}>Your price suggestion(incl. all cost)</Text>
                         <TextInput
                            style={styles.textField}
                         />
                         <Text style={styles.textLabel}>List price (incl. all costs): € 4.124,00</Text>
                    </View>
                </View>

                <View style={styles.priceBox}>
                    <View>
                        <Text style={styles.priceBoxTitle}>Address</Text>
                    </View>
                    <View style={styles.priceBoxCont}>
                         <Text style={styles.offerSummaryText}>Billing Address</Text>
                         <Text style={styles.textLabel}>First Name</Text>
                         <TextInput
                            style={styles.textField}
                         />
                         <Text style={styles.textLabel}>Last Name</Text>
                         <TextInput
                            style={styles.textField}
                         />

                         <Text style={styles.textLabel}>Phone</Text>
                         <TextInput
                            style={styles.textField}
                         />
                         <Text style={styles.textLabel}>Street</Text>
                         <TextInput
                            style={styles.textField}
                         />
                         <Text style={styles.textLabel}>Street line 2</Text>
                         <TextInput
                            style={styles.textField}
                         />
                         <Text style={styles.textLabel}>State</Text>
                         <TextInput
                            style={styles.textField}
                         />
                         <Text style={styles.textLabel}>Zip</Text>
                         <TextInput
                            style={styles.textField}
                         />
                         <Text style={styles.textLabel}>City</Text>
                         <TextInput
                            style={styles.textField}
                         />
                         <Text style={styles.textLabel}>Country</Text>
                         <TextInput
                            style={styles.textField}
                         />

                        <Text style={styles.offerSummaryText}>Shipping Address</Text>
                         
                    </View>
                </View>

                <View style={styles.priceBox}>
                    <View>
                        <Text style={styles.priceBoxTitle}>Offer Summary</Text>
                    </View>
                    <View style={styles.priceBoxCont}>
                         <Text style={styles.textLabel}>You will pay the seler directly.</Text>
                         <Text style={styles.offerSummaryText}>They will provide you with information about the available payment methods</Text>

                         <View style={styles.offerSummaryWra}>
                            <Text style={styles.offerSummaryText}>Your price suggestion</Text>
                            <View style={styles.offerSummaryPriceWrap}>
                                <Text style={styles.offerSummaryPriceText}>Item price</Text>
                                <Text style={styles.offerSummaryPriceBox}>-</Text>
                            </View>
                            <View style={styles.offerSummaryPriceWrap}>
                                <Text style={styles.offerSummaryPriceText}>Shipping Cost</Text>
                                <Text style={styles.offerSummaryPriceBox}>-</Text>
                            </View>
                         </View>
                         <View style={styles.offerSummaryWra}>
                            <View style={styles.offerSummaryPriceWrap}>
                                <Text style={styles.offerSummaryPriceText}>Your Price Suggestion (incl. all cost)</Text>
                                <Text style={styles.offerSummaryPriceBox}>-</Text>
                            </View>
                            <Text style={styles.offerSummaryText}><Text style={{ color:"#00603b"}}>Customs duties and import text</Text> may be incurred in addition to the price listed above.</Text>
                         </View>
                         <View style={styles.offerSummaryWra}>
                            <Text style={styles.listPriceText}>List price (plus shipping cost): <Text style={{ fontWeight: "500"}}>€ 4.124,00</Text></Text>
                         </View>
                         <View style={{ flex: 1, alignItems: 'center', marginTop: 30, marginBottom: 25 }}>
                            <TouchableOpacity style={styles.greenBtn}>
                                <Text style={styles.buttonText}>SUBMIT PRICE SUGGESTION</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    

                </View>

            </ScrollView>
        </View>

        
        
        </>
    )
}

const styles = StyleSheet.create({
    HeaderBar:{
        width:'100%',
        backgroundColor:"#000",
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center",
        height:80,
        paddingHorizontal:10
    },
    banner:{
        backgroundColor:"#000",
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    screenContArea:{
       paddingTop: 15,
       paddingBottom: 15,
    },
    screenTitle:{
        color:"#00603b",
        fontSize: 20,
        paddingBottom: 10,
    },
    screenContAreaDesc:{
        fontSize: 15,
        color: "#333333"
    },
    priceBox:{
        marginBottom: 20,
    },
    priceBoxTitle:{
        color: "#333333",
        fontSize: 18,
        lineHeight: 60,
        backgroundColor: "#eaeaea",
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 12,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    priceBoxCont:{
        borderColor: "#797979",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 12,
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    textLabel:{
        borderColor: "#333333",
        fontSize: 16,
        lineHeight: 40,
        fontWeight: "500",
    },
    textField:{
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
    },
    offerSummaryWra:{
        borderTopColor: "#cccccc",
        borderTopWidth: 1,
        paddingBottom: 0,
        paddingTop: 20,
        marginTop: 20,
    },
    offerSummaryText:{
        color: "#333333",
        fontSize: 15,
        fontWeight: "400",
        paddingTop: 10,
    },
    offerSummaryPriceWrap:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    offerSummaryPriceText:{
        color: "#333333",
        fontSize: 15,
        fontWeight: "500",
        width: "50%",
    },
    listPriceText:{
        color: "#333333",
        fontSize: 15,
        fontWeight: "400",
        textAlign: "center"
    },
    offerSummaryPriceBox:{
        color: "#333333",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "right"
    },
    greenBtn: {
        backgroundColor: '#00603b',
        paddingHorizontal: 12,
        paddingVertical: 12,
        width: "100%",
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
})

export default SuggestPriceScreen
