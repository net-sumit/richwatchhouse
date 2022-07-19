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
  import Octicons from 'react-native-vector-icons/Octicons';
  import AntDesign from 'react-native-vector-icons/AntDesign';

  import { useTranslation } from 'react-i18next';



const SupportScreen = ({navigation}) => {    

    const { t, i18n } = useTranslation();

    return (
        <>
        <View style={styles.HeaderBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                <AntDesign name="arrowleft" size={25} color="#fff" />
            </TouchableOpacity>
            <Text style={{color:"#FFF", fontSize:15}}>{t("Rich_Watch_House_Info_Service")}</Text>        
        </View>
        <View style={styles.banner}>
            <View style={{alignItems:"center"}}>
                <Image source={require('../assets/support_watch.jpg')}  resizeMode="cover" style={{width:300, height:210}} /> 
            </View>
        </View>

        <View style={styles.supportTitleWrap}>
            <Text style={styles.supportTitle}>{t("Do_you_have_any_questions")}</Text>
        </View>

        <View style={{flex:2, backgroundColor:"#FFF"}}>
            <ScrollView>

                 <View style={styles.topicWrap}>
                     <Text style={styles.textLabel}>{t("Your_topic")}</Text>
                     <TextInput
                        style={styles.textField}
                     />
                 </View>

                 <View style={styles.aboutusWrap}>
                     <Image source={require('../assets/about_icon.jpg')}  resizeMode="cover" style={{width:100, height:72}} /> 
                     <Text style={styles.aboutusWrapTitle}>{t("Learn_more_about_us")}</Text>
                     <Text style={styles.aboutusWrapCont}>{t("Take_look_behind_the_scenes")}</Text>
                     <View style={{ flex: 1, alignItems: 'center', marginTop: 30, marginBottom: 25 }}>
                        <TouchableOpacity style={styles.greenBtn}>
                            <Text style={styles.buttonText}>{t("Learn_More")}</Text>
                        </TouchableOpacity>
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
        justifyContent:"center",
        paddingBottom: 0,
        marginBottom: 0,
    },
    supportTitleWrap:{
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 20,
        position: "relative",
        zIndex: 100,
    },
    supportTitle:{
        color: "#333333",
        fontSize: 22,
        lineHeight: 32,
        paddingVertical: 10,
        paddingHorizontal: 35,
        fontWeight: "300",
        textAlign: "center",
        position: "absolute",
        backgroundColor: "#ffffff",
        top: -40,
        left: 24,
        
    },
    topicWrap:{
        backgroundColor: "#ffffff",
        paddingVertical: 0,
        paddingHorizontal: 20,
        marginTop: 10,
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
    aboutusWrap:{
        backgroundColor: "#ffffff",
        paddingVertical: 30,
        paddingHorizontal: 20,
        textAlign: "center",
        alignItems:"center"
    },
    aboutusWrapTitle:{
        color: "#333333",
        fontSize: 20,
        lineHeight: 25,
        paddingVertical: 15,
    },
    aboutusWrapCont:{
        color: "#333333",
        fontSize: 15,
        lineHeight: 24,
        fontWeight: "400",
        textAlign: "center"
    },
    greenBtn: {
        backgroundColor: '#00603b',
        paddingHorizontal: 25,
        paddingVertical: 12,
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

export default SupportScreen
