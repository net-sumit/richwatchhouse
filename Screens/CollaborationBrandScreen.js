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
    ActivityIndicator,
    FlatList,
    Alert
} from 'react-native';
// For language translate
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import RenderHtml from 'react-native-render-html';
import { useTranslation } from 'react-i18next';


const tagsStyles = {
    body: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: "#333333",
    },
};

import AsyncStorage from '@react-native-async-storage/async-storage';

import ImagePicker from 'react-native-image-crop-picker';

import { CheckBox, Icon } from 'react-native-elements';
import { Input } from 'react-native-elements/dist/input/Input';

const CollaborationBrandScreen = ({ route, navigation }) => {

    // For language translate
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const brandListDataApi = 'https://rixaltodemo.com/richwatchouse/app-api/v1/seller-cobrands.php';
    const CollaborationBrandApi = 'https://rixaltodemo.com/richwatchouse/app-api/v1/seller-add-collaborator-brands.php';
    const [brandData, setBrandData] = useState([]);
    const [collaborationBrandData, setCollaborationBrandData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [LoginUserData, setLoginUserData] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('userData').then((result) => {
            console.log(result);
            setLoginUserData(JSON.parse(result));
        });
        fetch(brandListDataApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                seller_id: route.params.user_id
            })
        }).then(response => response.json()).then(data => {
            setLoading(false);
            console.log(data.data, "hghg");
            setBrandData(data.data);
           
        }
        );

    }, []);




    const submit = () => {
        setLoading(true);

        var obj = [];
        for (var key in brandData) {
            if (brandData[key].checked_status === 1) {
                obj.push(brandData[key].id);
            }
            // ...
        }
        //console.log(obj.toString());


        //API call POST Method

        fetch(CollaborationBrandApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify({
                seller_id: LoginUserData.current_userID,
                collaborator_brand:obj.toString()
            })
        }).then(response => response.json()).then(data => {
            console.log(data, "data fgfgfg");
            setLoading(false);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);
        }
        );
    }



    const [isSelected, setSelected] = useState(false)

    const collBrand = [];
    const onValueChange = (item, index) => {
        const newData = [...brandData];
        if(newData[index].checked_status===1)
        {
            newData[index].checked_status = 0;
        }
        else{
            newData[index].checked_status = 1;
        }
        
        setSelected(newData);
        //collBrand.push(item);
        //console.log("test",isSelected);
    }



    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>

            <View style={{ flex: 1, backgroundColor: "#FFF", paddingHorizontal: 10, paddingVertical: 20, }}>

                <Text style={styles.allAuctionTitle}>{t("Collaboration_With_Brands")}</Text>

                <ScrollView>

                    {
                        brandData.map((item, index) => {
                            const uniqueKey = item.name + index;
                            return (
                                <>
                                    <View style={styles.slide}>
                                        <View style={styles.singleWatch}>

                                            <CheckBox
                                                title={item.name}
                                                checkedColor="#00603b"
                                                uncheckedColor="#00603b"
                                                checked={item.checked_status === 1 || false}
                                                onPress={(val) => onValueChange(item, index)}
                                                key={item.name}
                                            />

                                        </View>
                                    </View>
                                </>
                            )
                        })
                    }


                </ScrollView>

                <TouchableOpacity onPress={submit} style={styles.btn}>
                    <Text style={{ color: '#FFF', fontSize: 18 }}>{t("Add")}</Text>
                </TouchableOpacity>

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
    allAuctionTitle: {
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        color: "#00603b",
        textAlign: "center",
        paddingBottom: 25,
    },
    btn: {
        backgroundColor: '#00603b',
        alignItems: 'center',
        padding: 12,
        marginTop: 20
    },



})
export default CollaborationBrandScreen