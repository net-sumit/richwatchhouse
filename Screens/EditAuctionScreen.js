import React, { useRef, useEffect, useState } from 'react';
import RenderHtml from 'react-native-render-html';
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
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SelectDropdown from 'react-native-select-dropdown';

import DropDownPicker from 'react-native-dropdown-picker';

import { useTranslation } from 'react-i18next';



import DatePicker from 'react-native-date-picker';

//import DatePicker from 'react-native-neat-date-picker';

import ImagePicker from 'react-native-image-crop-picker';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

const EditAuctionScreen = ({ route, navigation }) => {


    const [openState, setOpenState] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState([]);



    const { t, i18n } = useTranslation();

    const brandListDataApi = API_URL + 'all-brands.php';
    const [brandListData, setBrandListData] = useState([]);

    const filterOptionsApi = API_URL + 'filter-options.php';
    const [modelData, setModelData] = useState([]);
    const [watchTypeData, setWatchTypeData] = useState([]);

    const [conditionData, setConditionData] = useState([]);

    const countryListDataApi = API_URL + 'user-country-currency.php';
    const [countryData, setCountryData] = useState([]);



    const [basePriceData, setBasePriceData] = useState('');

    const [baseDirectPurchasePriceData, setBaseDirectPurchasePriceData] = useState('');
    const [baseReservePriceData, setBaseReservePriceData] = useState('');
    const [baseRaiseValueData, setBaseRaiseValueData] = useState('');



    const [referenceNumber, setReferenceNumber] = useState('');
    const [productionYear, setProductionYear] = useState('');
    const [availability, setAvailability] = useState('');
    const [aboutCondition, setAboutCondition] = useState('');
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
    const [selectWatchTypeData, setSelectWatchTypeData] = useState('');
    const [selectConditionData, setSelectConditionData] = useState('');
    const [place, setPlace] = useState('');
    const [selectCaseMaterialData, setSelectCaseMaterialData] = useState('');
    const [selectBezelMaterialData, setSelectBezelMaterialData] = useState('');
    const [selectCrystalData, setSelectCrystalData] = useState('');
    const [selectDialColorData, setSelectDialColorData] = useState('');
    const [selectDialStyleData, setSelectDialStyleData] = useState('');
    const [selectBraceletMaterialData, setSelectBraceletMaterialData] = useState('');
    const [selectBraceletColorData, setSelectBraceletColorData] = useState('');
    const [selectClaspTypeData, setSelectClaspTypeData] = useState('');
    const [selectClaspMaterialData, setSelectClaspMaterialData] = useState('');
    const [setAuctionStartDate, setSetAuctionStartDate] = useState('');




    const [caseMaterialData, setCaseMaterialData] = useState([]);
    const [bezelMaterialData, setBezelMaterialData] = useState([]);
    const [crystalTypeData, setCrystalTypeData] = useState([]);
    const [dialColorData, setDialColorData] = useState([]);
    const [dialStyleData, setDialStyleData] = useState([]);
    const [braceletMaterialData, setBraceletMaterialData] = useState([]);
    const [braceletColorData, setBraceletColorData] = useState([]);
    const [claspTypeData, setClaspTypeData] = useState([]);
    const [claspMaterialData, setClaspMaterialData] = useState([]);
    const [selectedModelData, setSelectedModelData] = useState([]);




    const [isLoading, setLoading] = useState(true);
    const editProductApi = API_URL + 'edit-product.php';
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const productDetailsApi = API_URL + 'product-details.php';
    const [allValues, setAllValues] = useState([]);
    const [loginUserId, setLoginUserId] = useState('');
    const [isFullImage, setFullImage] = useState('');


    const [brand, setBrand] = useState([]);

    const [adCode, setAdCode] = useState('');




    const [caliberMechanism, setCaliberMechanism] = useState('');
    const [powerReserve, setPowerReserve] = useState('');
    const [numberOfStones, setNumberOfStones] = useState('');
    const [caseMaterial, setCaseMaterial] = useState('');
    const [diameter, setDiameter] = useState('');
    const [height, setHeight] = useState('');
    const [waterproof, setWaterproof] = useState('');
    const [caseThickness, setCaseThickness] = useState('');
    const [bezelMaterial, setBezelMaterial] = useState('');
    const [glass, setGlass] = useState('');
    const [clockFace, setClockFace] = useState('');
    const [numbersOnTheDial, setNumbersOnTheDial] = useState('');
    const [strapMaterial, setStrapMaterial] = useState('');
    const [closure, setClosure] = useState('');
    const [closureMaterial, setClosureMaterial] = useState('');
    const [strapLength, setStrapLength] = useState('');
    const [strapColor, setStrapColor] = useState('');


    console.log(brandListData, "brandListData");

    //console.log(selectCrystalData, "selectCrystalData");





    useEffect(() => {
        AsyncStorage.getItem('userData').then((result) => {
            //console.log(result);
            if (result != '') {
                setLoginUserId(JSON.parse(result).current_userID);
            }
        });

        // Brand List Call
        fetch(brandListDataApi, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        }).then(response => response.json()).then(data => {
            setLoading(false);
            //console.log(data.data, "brand");
            var obj = [];
            for (var key in data.data) {
                obj.push(data.data[key].name);
                // ...
            }
            setBrandListData(obj);
        }
        );

        fetch(countryListDataApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                user_id: loginUserId
                //user_id: 25
            })
        }).then(response => response.json()).then(data => {
            setLoading(false);
            //console.log(data.data.country, "hghg");
            setErrorMessage(data.error_message);
            //setCountryData(data.data.country);

            // var objCountryData = [];
            // for (var key in data.data.country) {
            //     objCountryData.push(data.data.country[key].name);
            // }
            // setCountryData(objCountryData);

            var objCountryData = [];
            for (var key in data.data.country) {
                objCountryData.push({ 'label': data.data.country[key].name, 'value': data.data.country[key].id });
                // ...
            }
            console.log(objCountryData, "aaaaaa");
            setCountryData(objCountryData);

        }
        );


        fetch(filterOptionsApi, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        }).then(response => response.json()).then(data => {
            setLoading(false);
            //console.log(data.data, "condition");
            //console.log(data.data.p_crystal_type, "product_category");

            //objModel
            var objModel = [];
            for (var key in data.data.p_model) {
                objModel.push(data.data.p_model[key].model_name);
                // ...
            }
            setModelData(objModel);

            //objWatchType
            var objWatchType = [];
            for (var key in data.data.p_product_category) {
                objWatchType.push(data.data.p_product_category[key].category_name);
                // ...
            }
            setWatchTypeData(objWatchType);

            //objCondition
            var objCondition = [];
            for (var key in data.data.p_condition) {
                objCondition.push(data.data.p_condition[key].condition_name);
                // ...
            }
            setConditionData(objCondition);

            //objCaseMaterial
            var objCaseMaterial = [];
            for (var key in data.data.p_case_material) {
                objCaseMaterial.push(data.data.p_case_material[key].case_material_name);
                // ...
            }
            setCaseMaterialData(objCaseMaterial);

            //objBezelMaterial
            var objBezelMaterial = [];
            for (var key in data.data.p_bezel_material) {
                objBezelMaterial.push(data.data.p_bezel_material[key].bezel_material_name);
                // ...
            }
            setBezelMaterialData(objBezelMaterial);

            //objCrystalType
            var objCrystalType = [];
            for (var key in data.data.p_crystal_type) {
                objCrystalType.push(data.data.p_crystal_type[key].crystal_type_name);
                // ...
            }
            setCrystalTypeData(objCrystalType);

            //objBraceletMaterial
            var objBraceletMaterial = [];
            for (var key in data.data.p_bracelet_material) {
                objBraceletMaterial.push(data.data.p_bracelet_material[key].bracelet_material_name);
                // ...
            }
            setBraceletMaterialData(objBraceletMaterial);

            //objBraceletColor
            var objBraceletColor = [];
            for (var key in data.data.p_dial_color) {
                objBraceletColor.push(data.data.p_dial_color[key].dial_color_name);
                // ...
            }
            setBraceletColorData(objBraceletColor);

            //objClaspType
            var objClaspType = [];
            for (var key in data.data.p_clasp_type) {
                objClaspType.push(data.data.p_clasp_type[key].clasp_type_name);
                // ...
            }
            setClaspTypeData(objClaspType);


            //objClaspMaterial
            var objClaspMaterial = [];
            for (var key in data.data.p_clasp_material) {
                objClaspMaterial.push(data.data.p_clasp_material[key].clasp_material_name);
                // ...
            }
            setClaspMaterialData(objClaspMaterial);


            //objDialColor
            var objDialColor = [];
            for (var key in data.data.p_bracelet_color) {
                objDialColor.push(data.data.p_bracelet_color[key].bracelet_color_name);
                // ...
            }
            setDialColorData(objDialColor);

            //objDialStyle
            var objDialStyle = [];
            for (var key in data.data.p_dial_style) {
                objDialStyle.push(data.data.p_dial_style[key].dial_style_name);
                // ...
            }
            setDialStyleData(objDialStyle);
        }
        );

        if (loginUserId != '') {
            const productDetailsCall = async () => {
                try {
                    const response = await fetch(productDetailsApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            // your expected POST request payload goes here
                            product_id: route.params.productId,
                            user_id: loginUserId,
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    console.log(data.data, "tytytyty");
                    //console.log(data.data.basic_data.model, "auction_end_date");

                    //console.log(data.data.condition, "conditionData");

                    //console.log(data.data.price.base_price, "setBasePriceData");


                    setBasePriceData(data.data.price.base_price);



                    setBaseDirectPurchasePriceData(data.data.price.direct_purchase_price);
                    setBaseReservePriceData(data.data.price.reserve_price);
                    setBaseRaiseValueData(data.data.price.raise_value);



                    setSelectedModelData(data.data.basic_data.model.name);
                    setLoading(false);
                    setAllValues(data.data);

                    setFullImage(data.data.featured_image.full);

                    setBrand(data.data.basic_data.brand.name);


                    setAdCode(data.data.basic_data.ad_code);
                    setReferenceNumber(data.data.basic_data.reference_number);
                    setProductionYear(data.data.basic_data.production_year);
                    setAvailability(data.data.availability);
                    setAboutCondition(data.data.condition_manual_text);

                    setEstimatedDeliveryDate(data.data.estimated_delivery_date)
                    setCaliberMechanism(data.data.caliber.caliber_mechanism);
                    setNumberOfStones(data.data.caliber.number_of_stones);
                    setDiameter(data.data.cash_desk.diameter);
                    setHeight(data.data.cash_desk.height);
                    setWaterproof(data.data.cash_desk.waterproof);
                    setCaseThickness(data.data.cash_desk.case_thickness);


                    setSelectWatchTypeData(data.data.basic_data.product_category);
                    setSelectConditionData(data.data.condition);

                    setSetAuctionStartDate(data.data.auction_start_date);
                    setDate(new Date(data.data.auction_start_date));
                    setEndDate(new Date(data.data.auction_end_date));


                    setPlace(data.data.basic_data.place);
                    setSelectCaseMaterialData(data.data.cash_desk.case_material);
                    setSelectBezelMaterialData(data.data.cash_desk.bezel_material);
                    setSelectCrystalData(data.data.cash_desk.glass);
                    setSelectDialColorData(data.data.cash_desk.clock_face);
                    setSelectDialStyleData(data.data.cash_desk.numbers_on_the_dial);

                    setSelectBraceletMaterialData(data.data.strap.strap_material);
                    setSelectBraceletColorData(data.data.strap.strap_color);
                    setSelectClaspTypeData(data.data.strap.closure);
                    setSelectClaspMaterialData(data.data.strap.closure_material);

                    setSelectedScopeDeliveryVal(data.data.kit);
                    setselectedGenderVal(data.data.basic_data.type);
                    setselectedMovementVal(data.data.basic_data.load);




                    setPowerReserve(data.data.caliber.power_reserve);

                    //setCaseMaterial(data.data.cash_desk.case_material);






                    //setBezelMaterial(data.data.cash_desk.bezel_material);
                    setGlass(data.data.cash_desk.glass);
                    setClockFace(data.data.cash_desk.clock_face);
                    setNumbersOnTheDial(data.data.cash_desk.numbers_on_the_dial);
                    setStrapMaterial(data.data.strap.strap_material);
                    setClosure(data.data.strap.closure);

                    setClosureMaterial(data.data.strap.closure_material);

                    setStrapLength(data.data.strap.strap_length)
                    setStrapColor(data.data.strap.strap_color)



                    // var obj = [];
                    // for (var key in data.data) {
                    //     obj.push(data.data[key].name);
                    //     // ...
                    // }
                    // setBrandListData(obj);


                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                    //console.log(error)
                }
            }
            productDetailsCall()
        }
    }, [loginUserId]);


    //console.log(selectDialColorData, "selectDialColorData");







    // //For date picker
    const [startdate, setDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        var dateEndFull = new Date(startdate.getTime() + 86400000 * 7);
        setEndDate(dateEndFull);
    }, [startdate]);





    const scopeDeliveryVal = [
        { label: 'Watch with original box and original papers', value: 'Watch with original box and original papers' },
        { label: 'Watch with original papers', value: 'Watch with original papers' },
        { label: 'Watch with original box', value: 'Watch with original box' }
    ]
    const [selectedScopeDeliveryVal, setSelectedScopeDeliveryVal] = useState();

    const genderVal = [
        { label: 'Men', value: 'Men' },
        { label: 'Women', value: 'Women' },
        { label: 'Unisex', value: 'Unisex' }
    ]
    const [selectedGenderVal, setselectedGenderVal] = useState();

    const movementVal = [
        { label: 'Automatic', value: 'Automatic' },
        { label: 'Manual', value: 'Manual' },
        { label: 'Quartz', value: 'Quartz' },
        { label: 'No Details', value: 'No Details' }
    ]
    const [selectedMovementVal, setselectedMovementVal] = useState();


    const updateProduct = () => {
        setLoading(true);
        const formdata = new FormData();

        formdata.append("product_title", allValues.product_name);
        formdata.append("product_description", allValues.product_description);


        formdata.append("product_brand_name", brand);
        formdata.append("product_model", selectedModelData);
        formdata.append("place", place);
        formdata.append("case_material", selectCaseMaterialData);
        formdata.append("bezel_material", selectBezelMaterialData);
        formdata.append("crystal_type", selectCrystalData);
        formdata.append("dial_color", selectDialColorData);
        formdata.append("dial_style", selectDialStyleData);

        formdata.append("bracelet_material", selectBraceletMaterialData);
        formdata.append("bracelet_color", selectBraceletColorData);
        formdata.append("clasp_type", selectClaspTypeData);
        formdata.append("clasp_material", selectClaspMaterialData);

        formdata.append("kit", selectedScopeDeliveryVal);
        formdata.append("type", selectedGenderVal);
        formdata.append("load", selectedMovementVal);









        formdata.append("base_price", basePriceData);

        formdata.append("reference_number", referenceNumber);

        formdata.append("sku", adCode);
        //formdata.append("kit", allValues.kit);
        formdata.append("production_year", productionYear);



        formdata.append("availability", availability);
        formdata.append("condition_manual_text", aboutCondition);



        formdata.append("auction_start_date", startdate.getFullYear() + '-' + parseInt(startdate.getMonth() + 1) + '-' + startdate.getDate());
        formdata.append("auction_end_date", enddate.getFullYear() + '-' + parseInt(enddate.getMonth() + 1) + '-' + enddate.getDate());

        //formdata.append("condition", selectedConditionVal);


        formdata.append("estimated_delivery_date", estimatedDeliveryDate);





        formdata.append("caliber_mechanism", caliberMechanism);
        formdata.append("power_reserve", powerReserve);
        formdata.append("number_of_stones", numberOfStones);
        //formdata.append("case_material", allValues.case_material);
        formdata.append("diameter", diameter);
        formdata.append("product_category", selectWatchTypeData);
        formdata.append("product_condition", selectConditionData);






        formdata.append("height", height);

        formdata.append("waterproof", waterproof);

        formdata.append("case_thickness", caseThickness);



        formdata.append("glass", allValues.cash_desk.glass);
        formdata.append("clock_face", allValues.cash_desk.clock_face);
        formdata.append("numbers_on_the_dial", allValues.cash_desk.numbers_on_the_dial);

        formdata.append("strap_material", allValues.strap.strap_material);
        formdata.append("closure", allValues.strap.closure);
        formdata.append("clock_face", allValues.strap.clock_face);
        formdata.append("closure_material", allValues.strap.closure_material);
        formdata.append("strap_color", allValues.strap.strap_color);
        formdata.append("strap_length", strapLength);

        formdata.append("user_id", loginUserId);
        formdata.append("post_id", allValues.product_id);

        if (selectImage != null) {
            formdata.append("featured_image", {
                uri: selectImage.path,
                name: selectImage.modificationDate + ".jpg",
                fileName: 'image',
                type: selectImage.mime
            });
        }


        for (var key in selectMultipleImage) {
            formdata.append("gallery_images[]", {
                uri: selectMultipleImage[key].path,
                name: selectMultipleImage[key].modificationDate + ".jpg",
                fileName: 'image',
                type: selectMultipleImage[key].mime
            });
        }

        console.log('updateProduct', formdata);

        //API call POST Method

        fetch(editProductApi, {
            method: 'POST',
            headers: {
                "content-type": "multipart/form-data", "accept": "application/json"
            },
            body: formdata,
        }).then(response => response.json()).then(data => {
            console.log(data, "update Data");
            setLoading(false);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);
        })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });

    }

    const [selectImage, setselectImage] = useState();

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setselectImage(image);
        });
    }


    const deleteImage = () => {
        setselectImage('');
    }

    const choosePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setselectImage(image);
        });
    }


    const [selectMultipleImage, setSelectMultipleImage] = useState([]);

    const chooseMultiplePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            multiple: true,
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setSelectMultipleImage(image);
        });
    }
    const deleteMultiImage = () => {
        setSelectMultipleImage('');
    }
    const chooseMultiplePhotoFromCamera = () => {
        ImagePicker.openCamera({
            multiple: true,
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setSelectMultipleImage(image);
        });
    }


    //console.log(setAuctionStartDate, "setAuctionStartDate display");


    //console.log(allValues, "allValues");



    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={{ color: "#FFF", fontSize: 15 }}>{t("Edit_Auction")}</Text>
            </View>

            {allValues &&

                <View style={{ flex: 1, backgroundColor: "#FFF" }}>

                    {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 300 }} /> : (

                        <ScrollView>
                            <View style={styles.addAuctionWrap}>
                                <Text style={styles.addAuctionTitle}>{t("Edit_Auction")}</Text>
                                {/* <TouchableOpacity style={styles.productScaneWrap}>
                                    <MaterialCommunityIcons name="qrcode-scan" size={20} color="#555" />
                                    <Text style={{ color: "#555", fontSize: 15, paddingLeft: 10, }}>{t("Product_Scan")}</Text>
                                </TouchableOpacity> */}
                            </View>

                            <View style={styles.addAuctionForm}>
                                <Text style={styles.textLabel}>{t("Product_Name")}</Text>
                                <TextInput style={styles.textField}
                                    name='product_name'
                                    value={allValues.product_name}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        product_name: e
                                    })} />
                                <Text style={styles.textLabel}>{t("Product_Description")}</Text>
                                <TextInput style={styles.textFieldarea}
                                    name='product_description'
                                    value={allValues.product_description ? allValues.product_description.replace(/<(?:.|\n)*?>/gm, '') : ''}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        product_description: e
                                    })} />


                                <Text style={styles.textLabel}>{t("Featured_Image")}</Text>
                                <View style={styles.featuredImageWrap}>
                                    <TouchableOpacity style={styles.deleteImage} onPress={deleteImage}>
                                        <Feather name="x" size={22} color="#000" />
                                    </TouchableOpacity>


                                    {isFullImage != '' && selectImage == undefined &&
                                        <View style={styles.featuredImageBox}>
                                            {
                                                isFullImage != '' ?
                                                    <Image style={styles.featuredImagestyle} source={{ uri: `${isFullImage}` }} resizeMode="cover" />
                                                    :
                                                    <Feather name="watch" size={50} color="#ccc" />
                                            }
                                        </View>
                                    }


                                    {selectImage != undefined ?
                                        <View style={styles.featuredImageBox}>
                                            {selectImage != '' ?
                                                <Image style={styles.featuredImagestyle} source={{ uri: `${selectImage.path}` }} resizeMode="cover" />
                                                :
                                                <Feather name="watch" size={50} color="#ccc" />}
                                        </View>
                                        :
                                        <View></View>
                                    }


                                    <TouchableOpacity onPress={choosePhotoFromLibrary}>
                                        <Text style={styles.featuredImageLabel}>{t("Gallery")} <Feather name="upload" size={22} color="#fff" /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={choosePhotoFromCamera}>
                                        <Text style={styles.featuredImageLabel}>{t("Camera")} <AntDesign name="camerao" size={22} color="#fff" /></Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.textLabel}>{t("Gallery_Images")}</Text>
                                <View style={styles.featuredGalleryImageWrap}>

                                    <TouchableOpacity style={styles.deleteImage} onPress={deleteMultiImage}>
                                        <Feather name="x" size={22} color="#000" />
                                    </TouchableOpacity>

                                    {allValues.gallery_images != '' && selectMultipleImage == '' &&
                                        <>
                                            {allValues.gallery_images ?
                                                <ScrollView style={{ width: '100%' }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                                    {
                                                        allValues.gallery_images.map((item, index) => {
                                                            return (
                                                                <View style={styles.featuredImageBox} key={index}>
                                                                    <Image style={styles.featuredImagestyle} source={{ uri: `${item.image}` }} resizeMode="cover" />
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </ScrollView>
                                                :
                                                <View style={styles.featuredImageBox}>
                                                    <Feather name="watch" size={50} color="#ccc" />
                                                </View>
                                            }
                                        </>
                                    }




                                    {selectMultipleImage != '' ?
                                        <>

                                            {selectMultipleImage != '' ?
                                                <ScrollView style={{ width: '100%' }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                                    {
                                                        selectMultipleImage.map((item, index) => {
                                                            return (
                                                                <View style={styles.featuredImageBox} key={index}>
                                                                    <Image style={styles.featuredImagestyle} source={{ uri: `${item.path}` }} resizeMode="cover" />
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </ScrollView>
                                                :
                                                <View style={styles.featuredImageBox}>
                                                    <Feather name="watch" size={50} color="#ccc" />
                                                </View>
                                            }

                                        </>

                                        :
                                        <View></View>
                                    }



                                </View>

                                <View style={styles.galleryWrap}>
                                    <View style={styles.featuredImageBtnWrap}>
                                        <TouchableOpacity onPress={chooseMultiplePhotoFromLibrary}>
                                            <Text style={styles.featuredImageLabel}>{t("Gallery")} <Feather name="upload" size={22} color="#fff" /></Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={chooseMultiplePhotoFromCamera}>
                                            <Text style={styles.featuredImageLabel}>{t("Camera")} <AntDesign name="camerao" size={22} color="#fff" /></Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>


                                <Text style={styles.textLabel}>{t("Brand")}</Text>

                                <View style={styles.brandWrap}>

                                    <TextInput style={styles.textFieldBrand}
                                        name='basic_data.brand.name'
                                        defaultValue={brand}
                                    />


                                    <SelectDropdown
                                        buttonStyle={{ backgroundColor: '#00603b', width: '27%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                        buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 12, }}
                                        data={brandListData}
                                        name='basic_data.brand.name'
                                        Value={brand}
                                        onSelect={(e) => setBrand(e)}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                    />

                                </View>



                                <Text style={styles.textLabel}>{t("Template")}</Text>

                                <View style={styles.brandWrap}>

                                    <TextInput style={styles.textFieldBrand}
                                        name='product_model'
                                        //Value='rod'
                                        defaultValue={selectedModelData}
                                    //defaultValue={basePriceData}
                                    // onChangeText={(e) => setAllValues({
                                    //     ...allValues,
                                    //     product_model: e
                                    // })} 
                                    />

                                    <SelectDropdown
                                        buttonStyle={{ backgroundColor: '#00603b', width: '27%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                        buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 12, }}
                                        data={modelData}
                                        name='product_model'
                                        Value={selectedModelData}
                                        onSelect={(e) => setSelectedModelData(e)}
                                        // onSelect={(e) => {
                                        //     setSelectedModelData({
                                        //         name: e
                                        //     });
                                        // }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                    />

                                </View>



                                <Text style={styles.textLabel}>{t("Category")}</Text>
                                <SelectDropdown
                                    buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                    buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                    data={watchTypeData}
                                    name='watchTypeData'
                                    defaultValue={selectWatchTypeData}
                                    onSelect={(e) => setSelectWatchTypeData(e)}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />




                                <Text style={styles.addAuctionSubTitle}>{t("Basic_data")}</Text>

                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Base_Price")} $</Text>
                                        <TextInput
                                            name='base_price'
                                            keyboardType='numeric'
                                            style={styles.textField}
                                            onChangeText={(e) => setBasePriceData(e)}
                                            defaultValue={basePriceData}
                                        />
                                    </View>
                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>Direct Purchase price $</Text>
                                        <TextInput
                                            name='direct_purchase_price'
                                            keyboardType='numeric'
                                            style={styles.textField}
                                            onChangeText={(e) => setBaseDirectPurchasePriceData(e)}
                                            defaultValue={baseDirectPurchasePriceData}
                                        />
                                    </View>
                                </View>

                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>Reserve price $</Text>
                                        <TextInput
                                            name='base_price'
                                            keyboardType='numeric'
                                            style={styles.textField}
                                            onChangeText={(e) => setBaseReservePriceData(e)}
                                            defaultValue={baseReservePriceData}
                                        />
                                    </View>
                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>Raise Value $</Text>
                                        <TextInput
                                            name='base_price'
                                            keyboardType='numeric'
                                            style={styles.textField}
                                            onChangeText={(e) => setBaseRaiseValueData(e)}
                                            defaultValue={baseRaiseValueData}
                                        />
                                    </View>
                                </View>


                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Auction_start_date")}</Text>
                                        <View style={styles.calendarBox}>
                                            <TouchableOpacity onPress={() => setOpen(true)}>

                                                {/* {date == "" ?
                                                    <Text style={styles.textLabel}>
                                                        {setAuctionStartDate}
                                                    </Text>
                                                    :
                                                    <Text style={styles.textLabel}>
                                                        {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
                                                    </Text>
                                                } */}

                                                <Text style={styles.textLabel}>
                                                    {startdate.getFullYear()}-{startdate.getMonth() + 1}-{startdate.getDate()}
                                                </Text>

                                                <Text style={styles.calendarBoxIcon}>
                                                    <AntDesign
                                                        title="Open"
                                                        name="calendar"
                                                        size={22}
                                                        color="#000"
                                                    />
                                                </Text>
                                            </TouchableOpacity>
                                            <DatePicker
                                                modal
                                                open={open}
                                                date={startdate}
                                                onDateChange={setDate}
                                                onConfirm={(startdate) => {
                                                    setOpen(false)
                                                    setDate(startdate)
                                                }}
                                                onCancel={() => {
                                                    setOpen(false)
                                                }}
                                                mode="date"
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Auction_end_date")}</Text>
                                        <View style={styles.calendarBox}>
                                            <TouchableOpacity>
                                                <Text style={styles.textLabel}>
                                                    {enddate.getFullYear()}-{enddate.getMonth() + 1}-{enddate.getDate()}
                                                </Text>

                                                <Text style={styles.calendarBoxIcon}>
                                                    <AntDesign
                                                        title="Open"
                                                        name="calendar"
                                                        size={22}
                                                        color="#000"
                                                    />
                                                </Text>
                                            </TouchableOpacity>

                                            {/* <DatePicker
                                                modal
                                                open={openEnd}
                                                date={dateEnd}
                                                onDateChange={setDateEnd}
                                                onConfirm={(dateEnd) => {
                                                    setOpenEnd(false)
                                                    setDateEnd(dateEnd)
                                                }}
                                                onCancel={() => {
                                                    setOpenEnd(false)
                                                }}
                                                mode="date"
                                            /> */}
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.dateWrap}>

                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Ad_code")}</Text>
                                        <TextInput style={styles.textField}
                                            name='ad_code'
                                            //value={allValues.basic_data.ad_code}
                                            //value={adCode}
                                            defaultValue={adCode}
                                            onChangeText={(e) => setAdCode(e)}
                                        // onChangeText={(e) => setAllValues({
                                        //     ...allValues,
                                        //     ad_code: e
                                        // })} 
                                        />
                                    </View>


                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Reference_number")}</Text>
                                        <TextInput style={styles.textField}
                                            name='reference_number'
                                            defaultValue={referenceNumber}
                                            onChangeText={(e) => setReferenceNumber(e)}
                                        />
                                    </View>
                                </View>


                                <View style={styles.dateWrap}>

                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Availability")}</Text>
                                        <TextInput style={styles.textField}
                                            name='availability'
                                            defaultValue={availability}
                                            onChangeText={(e) => setAvailability(e)}
                                        />
                                    </View>

                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Production_Year")}</Text>
                                        <TextInput style={styles.textField}
                                            name='production_year'
                                            defaultValue={productionYear}
                                            onChangeText={(e) => setProductionYear(e)}
                                        />
                                    </View>
                                </View>

                                <Text style={styles.textLabel}>{t("Condition")}</Text>
                                <SelectDropdown
                                    buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                    buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                    data={conditionData}
                                    name='conditionData'
                                    defaultValue={selectConditionData}
                                    onSelect={(e) => setSelectConditionData(e)}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />

                                <Text style={styles.textLabel}>{t("About_Condition")}</Text>
                                <TextInput style={styles.textField}
                                    name='condition_manual_text'
                                    defaultValue={aboutCondition}
                                    onChangeText={(e) => setAboutCondition(e)}
                                />

                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Location")}</Text>

                                        {/* <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', height: 40, width: '100%', marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={countryData}
                                            name='countryData'
                                            defaultValue={place}
                                            onSelect={(e) => setPlace(e)}

                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        /> */}

                                        <DropDownPicker
                                            style={styles.textField}
                                            open={openState}
                                            //value={value ? value : prevPlace}
                                            value={value ? value : place}
                                            items={countryData}
                                            setOpen={setOpenState}
                                            setValue={setValue}
                                            setItems={setItems}
                                            //onChangeValue={(value) => setCountryValue(value)}
                                            onChangeValue={(value) => setPlace(value)}
                                        />


                                    </View>
                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Delivery_date")}</Text>
                                        <TextInput style={styles.textField}
                                            name='estimated_delivery_date'
                                            defaultValue={estimatedDeliveryDate}
                                            onChangeText={(e) => setEstimatedDeliveryDate(e)}
                                        />
                                    </View>
                                </View>

                                <Text style={styles.textLabel}>{t("Scope_Delivery")}</Text>

                                <RadioForm
                                    formHorizontal={false}
                                    animation={true}
                                >
                                    {
                                        scopeDeliveryVal.map((obj, i) => (
                                            console.log(obj, i),
                                            <RadioButton labelHorizontal={true} key={i} >
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={selectedScopeDeliveryVal === obj.value}
                                                    onPress={(val) => setSelectedScopeDeliveryVal(val)}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 8, }}
                                                    buttonInnerColor={'#00603b'}
                                                    buttonOuterColor={'#00603b'}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={(val) => setSelectedScopeDeliveryVal(val)}
                                                    labelColor={'#000'}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                </RadioForm>

                                {/* <RadioForm
                                    radio_props={scopeDeliveryVal}
                                    isSelected={selectedScopeDeliveryVal}
                                    formHorizontal={false}
                                    animation={true}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 10, }}
                                    onPress={(val) => setSelectedScopeDeliveryVal(val)}
                                /> */}

                                <Text style={styles.textLabel}>{t("Gender")}</Text>

                                <RadioForm
                                    formHorizontal={true}
                                    animation={true}
                                >
                                    {
                                        genderVal.map((obj, i) => (
                                            console.log(obj, i),
                                            <RadioButton labelHorizontal={true} key={i} >
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={selectedGenderVal === obj.value}
                                                    onPress={(val) => setselectedGenderVal(val)}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonInnerColor={'#00603b'}
                                                    buttonOuterColor={'#00603b'}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={(val) => setselectedGenderVal(val)}
                                                    labelColor={'#000'}
                                                    labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 8, }}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                </RadioForm>

                                {/* <RadioForm
                                    radio_props={genderVal}
                                    initial={selectedGenderVal}
                                    formHorizontal={true}
                                    animation={true}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 8, }}
                                    onPress={(val) => setselectedGenderVal(val)}
                                /> */}



                                <Text style={styles.addAuctionSubTitle}>{t("Caliber")}</Text>

                                <Text style={styles.textLabel}>{t("Movement")}</Text>
                                <RadioForm
                                    formHorizontal={true}
                                    animation={true}
                                >
                                    {
                                        movementVal.map((obj, i) => (
                                            console.log(obj, i),
                                            <RadioButton labelHorizontal={true} key={i} >
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={selectedMovementVal === obj.value}
                                                    onPress={(val) => setselectedMovementVal(val)}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    buttonInnerColor={'#00603b'}
                                                    buttonOuterColor={'#00603b'}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={(val) => setselectedMovementVal(val)}
                                                    labelColor={'#000'}
                                                    labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 8, }}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                </RadioForm>
                                {/* <RadioForm
                                    radio_props={movementVal}
                                    initial={selectedMovementVal}
                                    formHorizontal={true}
                                    animation={true}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 8, }}
                                    onPress={(val) => setselectedMovementVal(val)}
                                /> */}

                                <Text style={styles.textLabel}>{t("Caliber_Mechanism")}</Text>
                                <TextInput style={styles.textField}
                                    name='caliber.caliber_mechanism'
                                    defaultValue={caliberMechanism}
                                    onChangeText={(e) => setCaliberMechanism(e)}
                                />

                                <Text style={styles.textLabel}>{t("Power_reserve")}</Text>
                                <TextInput style={styles.textField}
                                    name='caliber.power_reserve'
                                    defaultValue={powerReserve}
                                    onChangeText={(e) => setPowerReserve(e)}
                                />

                                <Text style={styles.textLabel}>{t("Number_of_jewels")}</Text>
                                <TextInput style={styles.textField}
                                    name='caliber.number_of_stones'
                                    defaultValue={numberOfStones}
                                    onChangeText={(e) => setNumberOfStones(e)}
                                />

                                <Text style={styles.addAuctionSubTitle}>{t("Case")}</Text>

                                <View style={styles.dateWrap}>

                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Case_material")}</Text>

                                        <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={caseMaterialData}
                                            name='caseMaterialData'
                                            defaultValue={selectCaseMaterialData}
                                            onSelect={(e) => setSelectCaseMaterialData(e)}

                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />

                                    </View>

                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Case_diameter")}</Text>
                                        <TextInput style={styles.textField}
                                            name='cash_desk.diameter'
                                            defaultValue={diameter}
                                            onChangeText={(e) => setDiameter(e)}
                                        />
                                    </View>
                                </View>
                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Case_Width")}</Text>
                                        <TextInput style={styles.textField}
                                            name='cash_desk.height'
                                            defaultValue={height}
                                            onChangeText={(e) => setHeight(e)}
                                        />
                                    </View>
                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{("Water_resistance")}</Text>
                                        <TextInput style={styles.textField}
                                            name='cash_desk.waterproof'
                                            defaultValue={waterproof}
                                            onChangeText={(e) => setWaterproof(e)}
                                        />
                                    </View>
                                </View>

                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Bezel_material")}</Text>

                                        <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={bezelMaterialData}
                                            name='bezelMaterialData'
                                            defaultValue={selectBezelMaterialData}
                                            onSelect={(e) => setSelectBezelMaterialData(e)}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />


                                    </View>
                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Crystal")}</Text>

                                        <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={crystalTypeData}
                                            name='crystalTypeData'
                                            defaultValue={selectCrystalData}
                                            onSelect={(e) => setSelectCrystalData(e)}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />

                                    </View>
                                </View>
                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Case_Thickness")}</Text>

                                        <TextInput style={styles.textField}
                                            name='case_thickness'
                                            placeholder='In millimeter (mm)'
                                            keyboardType='numeric'
                                            defaultValue={caseThickness}
                                            onChangeText={(e) => setCaseThickness(e)}

                                        />

                                    </View>
                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Dial_Color")}</Text>

                                        <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={dialColorData}
                                            name='dialColorData'
                                            defaultValue={selectDialColorData}
                                            onSelect={(e) => setSelectDialColorData(e)}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />

                                    </View>
                                </View>

                                <View style={styles.dateWrap}>

                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Dial_Style")}</Text>

                                        <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={dialStyleData}
                                            name='dialStyleData'
                                            defaultValue={selectDialStyleData}
                                            onSelect={(e) => setSelectDialStyleData(e)}
                                            // value={allValues.dialStyleData}
                                            // onSelect={(e) => setAllValues({
                                            //     ...allValues,
                                            //     dialStyleData: e
                                            // })}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />


                                    </View>

                                </View>

                                <Text style={styles.addAuctionSubTitle}>{t("Bracelet_strap")}</Text>

                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Bracelet_material")}</Text>

                                        <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={braceletMaterialData}
                                            name='braceletMaterialData'
                                            // value={allValues.braceletMaterialData}
                                            // onSelect={(e) => setAllValues({
                                            //     ...allValues,
                                            //     braceletMaterialData: e
                                            // })}
                                            defaultValue={selectBraceletMaterialData}
                                            onSelect={(e) => setSelectBraceletMaterialData(e)}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />

                                        {/* <TextInput style={styles.textField}
                                            name='strap.strap_material'
                                            // value={allValues.strap.strap_material}
                                            value={strapMaterial}
                                            onChangeText={(e) => setAllValues({
                                                ...allValues,
                                                strap_material: e
                                            })} /> */}

                                    </View>
                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Bracelet_length")}</Text>
                                        <TextInput style={styles.textField}
                                            name='strap.strap_length'
                                            defaultValue={strapLength}
                                            onChangeText={(e) => setStrapLength(e)}
                                        />
                                    </View>
                                </View>
                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Bracelet_Color")}</Text>

                                        <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={braceletColorData}
                                            name='braceletColorData'
                                            defaultValue={selectBraceletColorData}
                                            onSelect={(e) => setSelectBraceletColorData(e)}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />

                                    </View>
                                    <View style={styles.endDate}>
                                        <Text style={styles.textLabel}>{t("Clasp_Type")}</Text>

                                        <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={claspTypeData}
                                            name='claspTypeData'
                                            defaultValue={selectClaspTypeData}
                                            onSelect={(e) => setSelectClaspTypeData(e)}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />

                                    </View>
                                </View>
                                <View style={styles.dateWrap}>
                                    <View style={styles.startDate}>
                                        <Text style={styles.textLabel}>{t("Clasp_Material")}</Text>

                                        <SelectDropdown
                                            buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                            data={claspMaterialData}
                                            name='claspMaterialData'
                                            defaultValue={selectClaspMaterialData}
                                            onSelect={(e) => setSelectClaspMaterialData(e)}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item
                                            }}
                                        />

                                    </View>
                                </View>

                                <View style={{ flex: 1, alignItems: 'center', marginTop: 30, marginBottom: 25 }}>
                                    <TouchableOpacity style={styles.greenBtn} onPress={updateProduct}>
                                        <Text style={styles.buttonText}>{t("Update_Product")} +</Text>
                                    </TouchableOpacity>
                                    {isLoading ? <ActivityIndicator /> : (
                                        <>
                                            <Text style={{ fontSize: 20, color: 'red' }}>{errorMessage}</Text>
                                            <Text style={{ fontSize: 20, color: 'green' }}>{successMessage}</Text>
                                        </>
                                    )}
                                </View>


                            </View>

                        </ScrollView>

                    )}


                </View>

            }

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
    addAuctionWrap: {
        backgroundColor: "#ffffff",
        paddingVertical: 0,
        paddingHorizontal: 0,
        alignItems: "center",
    },
    addAuctionTitle: {
        color: "#00603b",
        fontSize: 22,
        lineHeight: 30,
        fontWeight: "500",
        paddingVertical: 15,
    },
    productScaneWrap: {
        borderColor: "#555555",
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    addAuctionForm: {
        backgroundColor: "#ffffff",
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 0,
    },
    textLabel: {
        borderColor: "#333333",
        color: "#333333",
        fontSize: 16,
        lineHeight: 40,
        fontWeight: "400",
    },
    textField: {
        color: "#333333",
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 8,
    },
    brandWrap: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
    },
    textFieldBrand: {
        color: "#333333",
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 8,
        width: '70%',
    },
    textFieldarea: {
        color: "#333333",
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 80,
        paddingVertical: 0,
        borderRadius: 8,
    },
    dateWrap: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    startDate: {
        width: "48%",
    },
    endDate: {
        width: "48%",
    },
    greenBtn: {
        backgroundColor: '#00603b',
        paddingHorizontal: 25,
        paddingVertical: 12,
        width: "100%",
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
    addAuctionSubTitle: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '700',
        color: "#333333",
        paddingTop: 20,
    },
    calendarBox: {
        position: 'relative',
        color: "#333333",
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 0,
        paddingHorizontal: 10,
        height: 40,
    },
    calendarBoxIcon: {
        position: 'absolute',
        right: 7,
        top: 7,
    },
    imageUploadBox: {
        position: 'relative',
    },
    imageUploadBoxIcon: {
        position: 'absolute',
        right: 10,
        top: 7,
    },
    featuredImageWrap: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    featuredImageBtnWrap: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        marginTop: 8,
        justifyContent: "space-evenly",
    },
    featuredGalleryImageWrap: {
        alignItems: "center",
        position: "relative",
    },
    deleteImage: {
        position: "absolute",
        top: -5,
        left: -5,
        zIndex: 1,
    },
    deleteImageCall: {
        position: "absolute",
        top: -5,
        right: -5,
        zIndex: 1,
    },
    deleteMultiImage: {
        position: "absolute",
        top: -5,
        left: -5,
        zIndex: 1,
    },
    featuredImageBox: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderColor: "#cccccc",
        borderWidth: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    featuredImagestyle: {
        width: 120,
        height: 120,
    },
    featuredImageLabel: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "400",
        backgroundColor: '#00603b',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },


})
export default EditAuctionScreen