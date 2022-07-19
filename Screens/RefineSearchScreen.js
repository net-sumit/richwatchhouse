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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CountDown from 'react-native-countdown-component';

import Slider from '@react-native-community/slider';

import { useTranslation } from 'react-i18next';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

import { CheckBox, Icon } from 'react-native-elements';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const RefineSearchScreen = ({ route, navigation }) => {


    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [loginUserId, setLoginUserId] = useState('');

    const filterOptionsApi = API_URL + 'filter-options.php';
    const allProductFilteringApi = API_URL + 'filter-products.php';

    const [allValues, setAllValues] = useState([]);


    const [availabilityData, setAvailabilityDataData] = useState([]);
    
    const [productCategoryData, setProductCategoryData] = useState([]);
    
    const [kitData, setKitData] = useState([]);



    const [brandData, setBrandData] = useState([]);
    const [modelList, setModelListData] = useState([]);

    const [caseSizeData, setCaseSizeData] = useState([]);
    const [heightData, setHeightData] = useState([]);
    const [thicknessData, setThicknessData] = useState([]);

    
    
    const [yearData, setYearData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [conditionData, setConditionData] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [allWatchtypesData, setAllWatchtypesData] = useState([]);
    const [referenceNumberData, setReferenceNumberData] = useState([]);
    const [movementData, setMovementData] = useState([]);
    const [dialstyleData, setDialstyleData] = useState([]);
    const [dialColorData, setDialColorData] = useState([]);
    const [caseMaterialData, setCaseMaterialData] = useState([]);
    const [bezelMaterialData, setBezelMaterialData] = useState([]);
    const [crystalTypeData, setCrystalTypeData] = useState([]);
    const [waterResistanceData, setWaterResistanceData] = useState([]);
    const [bandMaterialData, setBandMaterialData] = useState([]);
    const [bandColorData, setBandColorData] = useState([]);

    const [claspMaterialData, setClaspMaterialData] = useState([]);
    const [claspTypeData, setClaspTypeData] = useState([]);

    const [selectedVal, setSelectedVal] = useState();

    const [searchResultData, setSearchResultData] = useState([]);

    const [searchDataItem, setSearchDataItem] = useState([]);

    const radioVal = [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past', value: 'past' },
    ]

    const [minPrice, setMinPrice] = useState('398');
    const [maxPrice, setMaxPrice] = useState('43000');



    useEffect(() => {
        AsyncStorage.getItem('userData').then((result) => {
            if (result != '') {
                setLoginUserId(JSON.parse(result).current_userID);
            }
        });

        const filterOptionsCall = async () => {
            try {
                const response = await fetch(filterOptionsApi, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setLoading(false);
                setAllValues(data.data);


                setAvailabilityDataData(data.data.p_availability);
                setHeightData(data.data.p_height);
                setProductCategoryData(data.data.p_product_category);
                setThicknessData(data.data.p_thickness);
                setKitData(data.data.p_kit);


                setBrandData(data.data.p_brand);
                setModelListData(data.data.p_model);
                setCaseSizeData(data.data.p_diameter);
                setYearData(data.data.p_year);
                setLocationData(data.data.p_location);
                setConditionData(data.data.p_condition);
                setGenderData(data.data.p_gender);
                setAllWatchtypesData(data.data.p_type);
                setReferenceNumberData(data.data.p_refnumber);
                setMovementData(data.data.p_movement);
                setDialstyleData(data.data.p_dial_style);
                setDialColorData(data.data.p_dial_color);

                setCaseMaterialData(data.data.p_case_material);
                setBezelMaterialData(data.data.p_bezel_material);
                setCrystalTypeData(data.data.p_crystal_type);
                setWaterResistanceData(data.data.p_water_resistance);

                setBandMaterialData(data.data.p_bracelet_material);
                setBandColorData(data.data.p_bracelet_color);

                setClaspMaterialData(data.data.p_clasp_material);
                setClaspTypeData(data.data.p_clasp_type);

                setSelectedVal(data.data.p_status);

            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
            }
        }
        filterOptionsCall();
    }, [loginUserId]);




    const [isSelected, setSelected] = useState(false)
    const onValueChange = (item, index) => {
        const newData = [...brandData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setSelected(newData);
        //collBrand.push(item);
    }

    const [isSelectedModel, setSelectedModel] = useState(false)
    const onValueChangeModel = (item, index) => {
        const newData = [...modelList];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setSelectedModel(newData);
    }

    const [isCaseSize, setCaseSize] = useState(false)
    const onValueChangeCaseSize = (item, index) => {
        const newData = [...caseSizeData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setCaseSize(newData);
    }



    const [isYear, setYear] = useState(false)
    const onValueChangeYear = (item, index) => {
        const newData = [...yearData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setYear(newData);
    }



    const [isLocation, setLocation] = useState(false)
    const onValueChangeLocation = (item, index) => {
        const newData = [...locationData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setLocation(newData);
    }


    const [isCondition, setCondition] = useState(false)
    const onValueChangeCondition = (item, index) => {
        const newData = [...conditionData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setCondition(newData);
    }



    const [isGender, setGender] = useState(false)
    const onValueChangeGender = (item, index) => {
        const newData = [...genderData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setGender(newData);
    }


    const [isWatchtypes, setWatchtypes] = useState(false)
    const onValueChangeWatchtypes = (item, index) => {
        const newData = [...allWatchtypesData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setWatchtypes(newData);
    }


    const [isReferenceNumber, setReferenceNumber] = useState(false)
    const onValueChangeReferenceNumber = (item, index) => {
        const newData = [...referenceNumberData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setReferenceNumber(newData);
    }


    const [isMovement, setMovement] = useState(false)
    const onValueChangeMovement = (item, index) => {
        const newData = [...movementData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setMovement(newData);
    }


    const [isDialstyle, setDialstyle] = useState(false)
    const onValueChangeDialstyle = (item, index) => {
        const newData = [...dialstyleData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setDialstyle(newData);
    }


    const [isDialColor, setDialColor] = useState(false)
    const onValueChangeDialColor = (item, index) => {
        const newData = [...dialColorData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setDialColor(newData);
    }


    const [isCaseMaterial, setCaseMaterial] = useState(false)
    const onValueChangeCaseMaterial = (item, index) => {
        const newData = [...caseMaterialData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setCaseMaterial(newData);
    }

    const [isBezelMaterial, setBezelMaterial] = useState(false)
    const onValueChangeBezelMaterial = (item, index) => {
        const newData = [...bezelMaterialData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setBezelMaterial(newData);
    }

    const [isCrystalType, setCrystalType] = useState(false)
    const onValueChangeCrystalType = (item, index) => {
        const newData = [...crystalTypeData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setCrystalType(newData);
    }

    const [isWaterResistance, setWaterResistance] = useState(false)
    const onValueChangeWaterResistance = (item, index) => {
        const newData = [...waterResistanceData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setWaterResistance(newData);
    }


    const [isBandMaterial, setBandMaterial] = useState(false)
    const onValueChangeBandMaterial = (item, index) => {
        const newData = [...bandMaterialData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setBandMaterial(newData);
    }

    const [isBandColor, setBandColor] = useState(false)
    const onValueChangeBandColor = (item, index) => {
        const newData = [...bandColorData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setBandColor(newData);
    }


    // new start

    const [isAvailability, setAvailability] = useState(false)
    const onValueChangeAvailability = (item, index) => {
        const newData = [...availabilityData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setAvailability(newData);
    }

    const [isHeight, setHeight] = useState(false)
    const onValueChangeHeight = (item, index) => {
        const newData = [...heightData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setHeightData(newData);
    }

    const [isProductCategory, setProductCategory] = useState(false)
    const onValueChangeProductCategory = (item, index) => {
        const newData = [...productCategoryData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setProductCategoryData(newData);
    }

    const [isThickness, setThickness] = useState(false)
    const onValueChangeThickness = (item, index) => {
        const newData = [...thicknessData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setThicknessData(newData);
    }

    const [isKit, setKit] = useState(false)
    const onValueChangeKit = (item, index) => {
        const newData = [...kitData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setKitData(newData);
    }

    // new ends


    const [isClaspMaterial, setClaspMaterial] = useState(false)
    const onValueChangeClaspMaterial = (item, index) => {
        const newData = [...claspMaterialData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setClaspMaterial(newData);
    }

    const [isclaspType, setclaspType] = useState(false)
    const onValueChangeclaspType = (item, index) => {
        const newData = [...claspTypeData];
        if (newData[index].checked_status === 1) {
            newData[index].checked_status = 0;
        }
        else {
            newData[index].checked_status = 1;
        }
        setclaspType(newData);
    }


    //console.log(allValues, "allValues");


    const submit = () => {
        setLoading(true);

        var objAvailabilityData = [];
        for (var key in availabilityData) {
            if (availabilityData[key].checked_status === 1) {
                objAvailabilityData.push(availabilityData[key].name);
            }
            // ...
        }

        var objHeight = [];
        for (var key in heightData) {
            if (heightData[key].checked_status === 1) {
                objHeight.push(heightData[key].name);
            }
            // ...
        }

        var objProductCategory = [];
        for (var key in productCategoryData) {
            if (productCategoryData[key].checked_status === 1) {
                objProductCategory.push(productCategoryData[key].category_name);
            }
            // ...
        }

        var objThickness = [];
        for (var key in thicknessData) {
            if (thicknessData[key].checked_status === 1) {
                objThickness.push(thicknessData[key].name);
            }
            // ...
        }

        var objKit = [];
        for (var key in kitData) {
            if (kitData[key].checked_status === 1) {
                objKit.push(kitData[key].name);
            }
            // ...
        }



        var objclaspMaterial = [];
        for (var key in claspMaterialData) {
            if (claspMaterialData[key].checked_status === 1) {
                objclaspMaterial.push(claspMaterialData[key].clasp_material_name);
            }
        }

        var objclaspType = [];
        for (var key in claspTypeData) {
            if (claspTypeData[key].checked_status === 1) {
                objclaspType.push(claspTypeData[key].clasp_type_name);
            }
        }

        var objbandMaterial = [];
        for (var key in bandMaterialData) {
            if (bandMaterialData[key].checked_status === 1) {
                objbandMaterial.push(bandMaterialData[key].bracelet_material_name);
            }
        }

        var objbandColor = [];
        for (var key in bandColorData) {
            if (bandColorData[key].checked_status === 1) {
                objbandColor.push(bandColorData[key].bracelet_color_name);
            }
        }

        var objwaterResistance = [];
        for (var key in waterResistanceData) {
            if (waterResistanceData[key].checked_status === 1) {
                objwaterResistance.push(waterResistanceData[key].name);
            }
        }

        var objcrystalType = [];
        for (var key in crystalTypeData) {
            if (crystalTypeData[key].checked_status === 1) {
                objcrystalType.push(crystalTypeData[key].crystal_type_name);
            }
        }

        var objbezelMaterial = [];
        for (var key in bezelMaterialData) {
            if (bezelMaterialData[key].checked_status === 1) {
                objbezelMaterial.push(bezelMaterialData[key].bezel_material_name);
            }
        }

        var objcaseMaterial = [];
        for (var key in caseMaterialData) {
            if (caseMaterialData[key].checked_status === 1) {
                objcaseMaterial.push(caseMaterialData[key].case_material_name);
            }
        }


        var objdialColor = [];
        for (var key in dialColorData) {
            if (dialColorData[key].checked_status === 1) {
                objdialColor.push(dialColorData[key].dial_color_name);
            }
            // ...
        }

        var objDialstyle = [];
        for (var key in dialstyleData) {
            if (dialstyleData[key].checked_status === 1) {
                objDialstyle.push(dialstyleData[key].dial_style_name);
            }
            // ...
        }

        var objMovement = [];
        for (var key in movementData) {
            if (movementData[key].checked_status === 1) {
                objMovement.push(movementData[key].name);
            }
            // ...
        }

        var objReferenceNumber = [];
        for (var key in referenceNumberData) {
            if (referenceNumberData[key].checked_status === 1) {
                objReferenceNumber.push(referenceNumberData[key].name);
            }
            // ...
        }

        var objWatchtypes = [];
        for (var key in allWatchtypesData) {
            if (allWatchtypesData[key].checked_status === 1) {
                objWatchtypes.push(allWatchtypesData[key].category_slug);
            }
            // ...
        }

        var objgender = [];
        for (var key in genderData) {
            if (genderData[key].checked_status === 1) {
                objgender.push(genderData[key].name);
            }
            // ...
        }



        var obj = [];
        for (var key in brandData) {
            if (brandData[key].checked_status === 1) {
                obj.push(brandData[key].brand_name);
            }
            // ...
        }

        var objmodel = [];
        for (var key in modelList) {
            if (modelList[key].checked_status === 1) {
                objmodel.push(modelList[key].model_name);
            }
            // ...
        }

        var objCaseSize = [];
        for (var key in caseSizeData) {
            if (caseSizeData[key].checked_status === 1) {
                objCaseSize.push(caseSizeData[key].name);
            }
            // ...
        }
        console.log(objCaseSize, "objCaseSize");


        var objyear = [];
        for (var key in yearData) {
            if (yearData[key].checked_status === 1) {
                objyear.push(yearData[key].name);
            }
            // ...
        }

        var objlocation = [];
        for (var key in locationData) {
            if (locationData[key].checked_status === 1) {
                objlocation.push(locationData[key].name);
            }
            // ...
        }


        var objcondition = [];
        for (var key in conditionData) {
            if (conditionData[key].checked_status === 1) {
                objcondition.push(conditionData[key].condition_name);
            }
            // ...
        }


        function getCleanObject(jsonObject) {
            var clone = JSON.parse(jsonObject)
            for(var prop in clone)
               if(clone[prop] == "")
                   delete clone[prop];
            return JSON.stringify(clone);
        }
        var search_data=JSON.stringify({
            user_id: loginUserId,
            
            p_brand: obj,
            p_model: objmodel,
            min_price: minPrice,
            max_price: maxPrice,
            p_height: objHeight,
            p_thickness: objThickness,
            p_diameter: objCaseSize,
            p_year: objyear,

            p_location: objlocation,
            p_kit: objKit,
            p_condition: objcondition,
            p_availability: objAvailabilityData,
            p_gender: objgender,
            p_product_category: objProductCategory,
            p_refnumber: objReferenceNumber,
            p_movement: objMovement,

            p_dial_style: objDialstyle,

            p_dial_color: objdialColor,
            p_case_material: objcaseMaterial,
            p_bezel_material: objbezelMaterial,
            p_crystal_type: objcrystalType,
            p_water_resistance: objwaterResistance,
            p_bracelet_color: objbandColor,
            p_clasp_material: objclaspMaterial,
            p_clasp_type: objclaspType,

            p_status: selectedVal,
            

        })
        var jsondata=getCleanObject(search_data);
        //console.log("aaaaa",jsondata);
        fetch(allProductFilteringApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: jsondata
        }).then(response => response.json()).then(data => {
            console.log(data.data, "search result");
            setLoading(false);
            setSearchResultData(data.data);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);
            setSearchDataItem(jsondata);
        }
        )

    }

    //console.log(searchDataItem, "searchDataItem");

    //console.log(allValues, "allValues");

    //console.log(conditionData, "conditionData");


    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="close" size={15} color="#ffffff" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ position: 'absolute', right: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="download" size={15} color="#ffffff" />
                </TouchableOpacity> */}
                <Text style={{ color: "#FFF", fontSize: 18 }}>{t("Refine_Search")}</Text>
            </View>

            {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 300 }} /> : (

                <>

                    {/* {successMessage &&

                        <View style={styles.searchItems}>

                            <View style={styles.row}>


                                <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                    {
                                        searchResultData.map((item, index) => {
                                            return (
                                                <View style={styles.slide} key={index}>
                                                    <View style={styles.searchItemBox}>
                                                        <TouchableOpacity style={styles.row}>
                                                            <Text style={styles.searchItemBoxProperty}>{searchDataItem}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }

                                </ScrollView>



                            </View>

                        </View>

                    } */}

                    <View style={{ flex: 1, backgroundColor: "#FFF" }}>



                        {successMessage ?

                            <View style={styles.allAuctionWrap}>

                                <ScrollView>
                                    <View style={styles.searchList}>

                                        {
                                            searchResultData.map((item, index) => {
                                                return (
                                                    <View style={styles.grid} key={index}>
                                                        <View style={styles.boxProuduct}>
                                                            <View style={styles.boxProuductImage}>
                                                                <TouchableOpacity style={styles.editProduct}>
                                                                    <Ionicons name="heart-sharp" size={20} color="#00603b" />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                                                                    <Image source={{ uri: `${item.product_image_url}` }} style={{ width: 110, height: 110, marginBottom: 5 }} resizeMode="contain" />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.boxProuductDesc}>
                                                                <View style={styles.boxProuductDescTop}>
                                                                    <Text style={styles.boxProuductDescTopText} numberOfLines={2}>{item.product_title}</Text>
                                                                </View>
                                                                <View style={styles.boxProuductDescBottom}>
                                                                    {item.countdown_time ?
                                                                        <Text style={styles.boxProuductDescBottomtext}> {t("Auction_end")}: <Text style={{ color: "#00603b" }}>{item.countdown_time}</Text>
                                                                        </Text>
                                                                        :
                                                                        <Text style={{ color: '#333333' }}>{t("Auction_Status")}: <Text style={{ color: "#00603b" }}>{item.auction_status}</Text></Text>
                                                                    }
                                                                    <View style={styles.bottomEndSec}>
                                                                        <View>
                                                                            <Text style={styles.bottomEndSecText}>{t("Seller")}: {item.product_owner.owner_name}</Text>

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

                                                            {item.countdown_time != '' ?
                                                                <CountDown style={{ marginTop: 10 }}
                                                                    until={item.countdown_time_second}
                                                                    size={13}
                                                                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 1, borderColor: '#00603b' }}
                                                                    digitTxtStyle={{ color: '#00603b' }}
                                                                    timeLabelStyle={{ color: '#00603b', fontWeight: 'bold', fontSize: 12 }}
                                                                    timeToShow={['D', 'H', 'M', 'S']}
                                                                    timeLabels={{ d: 'Days', h: 'Hrs', m: 'Mins', s: 'Secs' }}
                                                                    showSeparator={null}
                                                                />
                                                                :
                                                                <></>
                                                            }

                                                            <View style={styles.bidWrap}>
                                                                <TouchableOpacity style={styles.buyBtn} onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                                                                    <Text style={styles.buttonText}>{t("Bid_Now")}</Text>
                                                                </TouchableOpacity>
                                                            </View>


                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }

                                    </View>
                                </ScrollView>

                            </View>

                            :

                            <ScrollView>




                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Brand")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Brand")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                {brandData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    brandData.map((item, index) => {
                                                        //const uniqueKey = item.brand_name + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.brand_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChange(item, index)}
                                                                key={item.brand_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Model")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Model")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                {modelList ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    modelList.map((item, index) => {
                                                        //const uniqueKeymodel = item.model_name + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.model_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeModel(item, index)}
                                                                key={item.model_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Price")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Price")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Min_Price")}</Text>
                                <Slider
                                    style={{ width: "100%", height: 40 }}
                                    minimumValue={398}
                                    maximumValue={43000}
                                    minimumTrackTintColor="#00603b"
                                    maximumTrackTintColor="#000000"
                                    thumbTintColor="#00603b"
                                    value={398}
                                    onValueChange={value => setMinPrice(value)}
                                />
                                <View style={styles.priceValue}>
                                    <Text style={styles.priceValueText}>$ {minPrice}</Text>
                                </View>

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Max_Price")}</Text>
                                <Slider
                                    style={{ width: "100%", height: 40 }}
                                    minimumValue={398}
                                    maximumValue={43000}
                                    minimumTrackTintColor="#00603b"
                                    maximumTrackTintColor="#000000"
                                    thumbTintColor="#00603b"
                                    value={43000}
                                    onValueChange={value => setMaxPrice(value)}
                                />
                                <View style={styles.priceValue}>
                                    <Text style={styles.priceValueText}>$ {maxPrice}</Text>
                                </View>









                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Case_size")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Case_size")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("All_sizes")}</Text>
                                {caseSizeData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    caseSizeData.map((item, index) => {
                                                        //const uniqueKeyCase = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeCaseSize(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }
                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Case_Width")}</Text>
                                {heightData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    heightData.map((item, index) => {
                                                        //const uniqueKey = item.brand_name + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeHeight(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }
                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Case_Thickness")}</Text>
                                {thicknessData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    thicknessData.map((item, index) => {
                                                        //const uniqueKey = item.brand_name + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeThickness(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }



                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Year")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Year")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                {yearData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    yearData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeYear(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }


                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Location")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Location")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                {locationData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    locationData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeLocation(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }


                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Condition")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Condition")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>Delivery Contents</Text>
                                {kitData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    kitData.map((item, index) => {
                                                        //const uniqueKey = item.brand_name + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeKit(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Availability")}</Text>
                                {availabilityData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    availabilityData.map((item, index) => {
                                                        //const uniqueKey = item.brand_name + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeAvailability(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }
                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("All_conditions")}</Text>
                                {conditionData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    conditionData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.condition_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeCondition(item, index)}
                                                                key={item.condition_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Watch Type")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Watch Type")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Gender")}</Text>
                                {genderData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    genderData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeGender(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("All_watch_types")}</Text>
                                {productCategoryData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    productCategoryData.map((item, index) => {
                                                        //const uniqueKey = item.brand_name + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.category_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeProductCategory(item, index)}
                                                                key={item.category_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }


                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Reference_Number")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Reference_Number")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                {referenceNumberData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    referenceNumberData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeReferenceNumber(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }


                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Movement_Functions")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Movement_Functions")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                {movementData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    movementData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeMovement(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }



                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Dial")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Dial")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Dial_style")}</Text>
                                {dialstyleData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    dialstyleData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.dial_style_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeDialstyle(item, index)}
                                                                key={item.dial_style_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Dial_color")}</Text>
                                {dialColorData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    dialColorData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.dial_color_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeDialColor(item, index)}
                                                                key={item.dial_color_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }



                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Case")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Case")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Case_material")}</Text>
                                {caseMaterialData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    caseMaterialData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.case_material_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeCaseMaterial(item, index)}
                                                                key={item.case_material_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Bezel_material")}</Text>
                                {bezelMaterialData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    bezelMaterialData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.bezel_material_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeBezelMaterial(item, index)}
                                                                key={item.bezel_material_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Crystal_type")}</Text>
                                {crystalTypeData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    crystalTypeData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.crystal_type_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeCrystalType(item, index)}
                                                                key={item.crystal_type_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Water_resistance")}</Text>
                                {waterResistanceData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    waterResistanceData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeWaterResistance(item, index)}
                                                                key={item.name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }



                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Strap_Bracelet")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Strap_Bracelet")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Band_material")}</Text>
                                {bandMaterialData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    bandMaterialData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.bracelet_material_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeBandMaterial(item, index)}
                                                                key={item.bracelet_material_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Band_color")}</Text>
                                {bandColorData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    bandColorData.map((item, index) => {
                                                        //const uniqueKey = item + index;
                                                        return (

                                                            <CheckBox
                                                                title={item.bracelet_color_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeBandColor(item, index)}
                                                                key={item.bracelet_color_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }



                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Clasp")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Clasp")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Clasp_material")}</Text>
                                {claspMaterialData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    claspMaterialData.map((item, index) => {
                                                        return (

                                                            <CheckBox
                                                                title={item.clasp_material_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeClaspMaterial(item, index)}
                                                                key={item.clasp_material_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14, paddingLeft: 14, paddingTop: 10, }}>{t("Clasp_type")}</Text>
                                {claspTypeData ?
                                    <View style={{ marginTop: 20 }}>

                                        <View style={styles.row}>
                                            <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>

                                                {
                                                    claspTypeData.map((item, index) => {
                                                        return (

                                                            <CheckBox
                                                                title={item.clasp_type_name}
                                                                checkedColor="#00603b"
                                                                uncheckedColor="#00603b"
                                                                checked={item.checked_status === 1 || false}
                                                                onPress={(val) => onValueChangeclaspType(item, index)}
                                                                key={item.clasp_type_name}
                                                            />

                                                        )
                                                    })
                                                }

                                            </ScrollView>
                                        </View>

                                    </View>
                                    :
                                    <Text></Text>
                                }

                                <TouchableOpacity style={styles.tabButton}>
                                    <Text style={{ color: "#00603b", fontWeight: "600", fontSize: 18 }}>{t("Auction_Status")}</Text>
                                    <Text style={{ color: "#333333", fontWeight: "400", fontSize: 14 }}>{t("Auction_Status")}</Text>
                                    <SimpleLineIcons name="arrow-right" color="#333333" size={13} style={{ position: "absolute", top: 18, right: 15 }} />
                                </TouchableOpacity>
                                <View style={{ padding: 18 }}>
                                    <RadioForm
                                        radio_props={radioVal}
                                        initial={'Ongoing'}
                                        formHorizontal={true}
                                        animation={true}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 15, }}
                                        onPress={(val) => setSelectedVal(val)}
                                    />
                                </View>



                            </ScrollView>

                        }


                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20, marginBottom: 60 }}>
                            <TouchableOpacity onPress={submit} style={styles.greenBtn}>
                                <Text style={styles.buttonText}>{t("Apply_Filter")}</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </>

            )}

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
        paddingVertical: 10,
        paddingHorizontal: 10,
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
        fontSize: 15,
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
        paddingVertical: 10,
        width: "70%",
        borderRadius: 8,
        height: 50,
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
        marginBottom: 10,
        marginTop: 20,
    },
    tabButton: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingLeft: 20,
        paddingRight: 50,
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 1,
    },


    searchList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginHorizontal: -5
    },
    grid: {
        width: '46%',
        marginHorizontal: 5,
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
        minHeight: 435,
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
        right: 0,
        top: 4,
        backgroundColor: "#ffffff",
        zIndex: 1,
    },
    boxProuductDesc: {
        backgroundColor: "#ffffff",
    },
    boxProuductDescTop: {
        borderBottomColor: "#e6e6e6",
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 5
    },
    boxProuductDescTopText: {
        color: "#333333",
        fontSize: 16,
        lineHeight: 22,
        minHeight: 45
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
        paddingBottom: 5,
    },
    bottomEndSec: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomEndSecText: {
        fontSize: 13,
        lineHeight: 16,
        color: "#333333",
        marginBottom: 5
    },
    ratingMainWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        minHeight: 20
    },
    ratingView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    bidWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    buyBtn: {
        width: 90,
        borderRadius: 0,
        backgroundColor: '#00603b',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 3,
        paddingVertical: 6,
        textTransform: 'uppercase'
    },
    allAuctionWrap: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: "#ffffff",
        marginBottom: 50,
        height: "100%",
    },
    priceValue: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    priceValueText: {
        fontSize: 16,
        lineHeight: 16,
        color: "#000000",
        marginBottom: 5,
        fontWeight: "400",
    }



})
export default RefineSearchScreen