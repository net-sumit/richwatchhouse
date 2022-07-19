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
// For language translate
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const AuctionExpireListingScreen = ({ route, navigation }) => {


    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>

            <View style={{flex:1, backgroundColor:"#FFF", paddingVertical:10, paddingHorizontal:10,}}>

                <ScrollView>
                    
                    <View style={styles.eachExpiryproduct}>
                        <TouchableOpacity style={styles.eachproductBtn}>
                            <View style={{ width: 70, height: 100, backgroundColor: '#d8d8d8', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: 12 }}>
                                <Image source={require('../assets/watch.png')} style={{ width: 50, height: 80 }} resizeMode="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: "left", fontSize: 14, color: "#333333", marginBottom: 5 }}>ROLEX Submariner</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#333333" }}>Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#00603b" }}>Auction Expire <Text style={{ color: "#F00" }}>24.11.2021</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachExpiryproduct}>
                        <TouchableOpacity style={styles.eachproductBtn}>
                            <View style={{ width: 70, height: 100, backgroundColor: '#d8d8d8', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: 12 }}>
                                <Image source={require('../assets/watch.png')} style={{ width: 50, height: 80 }} resizeMode="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: "left", fontSize: 14, color: "#333333", marginBottom: 5 }}>ROLEX Submariner</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#333333" }}>Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#00603b" }}>Auction Expire <Text style={{ color: "#F00" }}>24.11.2021</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachExpiryproduct}>
                        <TouchableOpacity style={styles.eachproductBtn}>
                            <View style={{ width: 70, height: 100, backgroundColor: '#d8d8d8', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: 12 }}>
                                <Image source={require('../assets/watch.png')} style={{ width: 50, height: 80 }} resizeMode="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: "left", fontSize: 14, color: "#333333", marginBottom: 5 }}>ROLEX Submariner</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#333333" }}>Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#00603b" }}>Auction Expire <Text style={{ color: "#F00" }}>24.11.2021</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachExpiryproduct}>
                        <TouchableOpacity style={styles.eachproductBtn}>
                            <View style={{ width: 70, height: 100, backgroundColor: '#d8d8d8', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: 12 }}>
                                <Image source={require('../assets/watch.png')} style={{ width: 50, height: 80 }} resizeMode="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: "left", fontSize: 14, color: "#333333", marginBottom: 5 }}>ROLEX Submariner</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#333333" }}>Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#00603b" }}>Auction Expire <Text style={{ color: "#F00" }}>24.11.2021</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachExpiryproduct}>
                        <TouchableOpacity style={styles.eachproductBtn}>
                            <View style={{ width: 70, height: 100, backgroundColor: '#d8d8d8', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: 12 }}>
                                <Image source={require('../assets/watch.png')} style={{ width: 50, height: 80 }} resizeMode="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: "left", fontSize: 14, color: "#333333", marginBottom: 5 }}>ROLEX Submariner</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#333333" }}>Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#00603b" }}>Auction Expire <Text style={{ color: "#F00" }}>24.11.2021</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachExpiryproduct}>
                        <TouchableOpacity style={styles.eachproductBtn}>
                            <View style={{ width: 70, height: 100, backgroundColor: '#d8d8d8', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: 12 }}>
                                <Image source={require('../assets/watch.png')} style={{ width: 50, height: 80 }} resizeMode="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: "left", fontSize: 14, color: "#333333", marginBottom: 5 }}>ROLEX Submariner</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#333333" }}>Morbi vitae iaculis enim. Fusce feug aliquam nibh. ,Curabitur rutrum leo.</Text>
                                <Text style={{ textAlign: "left", fontSize: 13, color: "#00603b" }}>Auction Expire <Text style={{ color: "#F00" }}>24.11.2021</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

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
    eachExpiryproduct: {
        width: "100%",
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 10
    },
    eachproductBtn: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },


})
export default AuctionExpireListingScreen