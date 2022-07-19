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

const AddAuctionScreen = ({ route, navigation }) => {


    const [openState, setOpenState] = useState(false);
    const [value, setValue] = useState();
    const [items, setItems] = useState([]);

    const [countryValue, setCountryValue] = useState();

    const { t, i18n } = useTranslation();


    const brandListDataApi = API_URL + 'all-brands.php';
    const [brandListData, setBrandListData] = useState([]);

    const filterOptionsApi = API_URL + 'filter-options.php';
    const [modelData, setModelData] = useState([]);
    const [watchTypeData, setWatchTypeData] = useState([]);
    const [conditionData, setConditionData] = useState([]);

    const countryListDataApi = API_URL + 'user-country-currency.php';
    const [countryData, setCountryData] = useState([]);
    const [loginUserId, setLoginUserId] = useState('');

    const [caseMaterialData, setCaseMaterialData] = useState([]);
    const [bezelMaterialData, setBezelMaterialData] = useState([]);
    const [crystalTypeData, setCrystalTypeData] = useState([]);
    const [dialColorData, setDialColorData] = useState([]);
    const [dialStyleData, setDialStyleData] = useState([]);


    const [braceletMaterialData, setBraceletMaterialData] = useState([]);
    const [braceletColorData, setBraceletColorData] = useState([]);
    const [claspTypeData, setClaspTypeData] = useState([]);
    const [claspMaterialData, setClaspMaterialData] = useState([]);




    //console.log(countryValue, "set Country");



    //const [LoginUserData, setLoginUserData] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('userData').then((result) => {
            //console.log(result);
            if (result != '') {
                setLoginUserId(JSON.parse(result).current_userID);
            }
        });
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

            var objCountryData = [];
            for (var key in data.data.country) {
                //objCountryData.push(data.data.country[key].name);
                objCountryData.push({ 'label': data.data.country[key].name, 'value': data.data.country[key].id });
                // ...
            }
            //console.log(objCountryData, "aaaaaa");
            setCountryData(objCountryData);

        }
        );
    }, [loginUserId]);

    useEffect(() => {
        // AsyncStorage.getItem('userData').then((result) => {
        //     setLoginUserData(JSON.parse(result));
        // });

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

        //console.log(brandListData, "brandListData 12345");

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

    }, []);


    const prevDataApi = API_URL + 'prefetch-product-data.php';
    const [prevData, setPrevData] = useState([]);


    const [isLoading, setLoading] = useState(false);
    const addProductApi = API_URL + 'add-product.php';

    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    //For date picker
    var current = new Date();
    const [dateEnd2, setDateEnd2] = useState(new Date(current.getTime() + 86400000 * 7));
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    //console.log(date);

    //setDateEnd(dateEndFull);
    useEffect(() => {
        var dateEndFull = new Date(date.getTime() + 86400000 * 7);
        setDateEnd2(dateEndFull);
        //console.log(dateEnd2);
    }, [date]);



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

    const [formRequired, setFormRequired] = useState('');


    const [selectedVal, setSelectedVal] = useState();
    const [allValues, setAllValues] = useState({
        user_id: '',
        product_name: '',
        product_description: '',
        product_brand_name: '',
        modelData: '',
        watch_type: '',
        base_price: '',

        direct_purchase_price: '',
        reserve_price: '',
        raise_value: '',


        auction_start_date: '',
        auction_end_date: '',
        reference_number: '',

        sku: '',
        availability: '',
        condition_manual_text: '',
        countryData: '',
        caseMaterialData: '',
        case_thickness: '',
        bezelMaterialData: '',
        crystalTypeData: '',
        dialColorData: '',
        dialStyleData: '',
        braceletMaterialData: '',
        strap_length: '',
        braceletColorData: '',
        claspTypeData: '',
        claspMaterialData: '',

        kit: '',
        production_year: '',
        condition: '',
        type: '',
        place: '',
        estimated_delivery_date: '',
        load: '',
        caliber_mechanism: '',
        power_reserve: '',
        number_of_stones: '',
        case_material: '',
        diameter: '',
        height: '',
        waterproof: '',
        bezel_material: '',
        glass: '',
        clock_face: '',
        numbers_on_the_dial: '',
        strap_material: '',
        strap_material: '',
        closure: '',
        closure_material: '',
    });




    const submit = () => {


        if (allValues.product_name == '' || allValues.product_description == '' || allValues.product_brand_name == '' ||
            allValues.modelData == '' || allValues.watchTypeData == '' || allValues.base_price == '' ||
            allValues.direct_purchase_price == '' || allValues.reserve_price == '' || allValues.raise_value == '' ||
            allValues.reference_number == '' || allValues.sku == '' || allValues.availability == '' || allValues.condition_manual_text == '' ||
            allValues.countryData == '' || allValues.caseMaterialData == '' || allValues.case_thickness == '' ||
            allValues.bezelMaterialData == '' || allValues.crystalTypeData == '' || selectedScopeDeliveryVal == '' || allValues.dialColorData == '' ||
            allValues.dialStyleData == '' || allValues.braceletMaterialData == '' || allValues.strap_length == '' || allValues.braceletColorData == '' ||
            allValues.claspTypeData == '' || allValues.claspMaterialData == '' || allValues.production_year == '' || selectedGenderVal == '' ||
            allValues.estimated_delivery_date == '' || selectedMovementVal == '' || allValues.caliber_mechanism == '' || allValues.power_reserve == '' ||
            allValues.number_of_stones == '' || allValues.diameter == '' || allValues.height == '' || allValues.waterproof == '' ||
            selectImage == '' || selectMultipleImage == '') {
            setFormRequired('Above all fields are required');
            return false;
        }
        else {

            setFormRequired('');
            setLoading(true);
            const formdata = new FormData();

            formdata.append("product_title", allValues.product_name);
            formdata.append("product_description", allValues.product_description);
            formdata.append("product_brand_name", allValues.product_brand_name);

            // formdata.append("product_model", allValues.modelData);
            formdata.append("product_model", modelval);

            // formdata.append("product_category", allValues.watchTypeData);
            formdata.append("product_category", Categoryval);

            formdata.append("base_price", allValues.base_price);


            formdata.append("direct_purchase_price", allValues.direct_purchase_price);
            formdata.append("reserve_price", allValues.reserve_price);
            formdata.append("raise_value", allValues.raise_value);


            formdata.append("reference_number", allValues.reference_number);



            formdata.append("sku", allValues.sku);
            formdata.append("availability", allValues.availability);
            formdata.append("condition_manual_text", allValues.condition_manual_text);


            // formdata.append("countryData", allValues.countryData);
            formdata.append("countryData", countryValue);



            formdata.append("case_material", allValues.caseMaterialData);
            formdata.append("case_thickness", allValues.case_thickness);
            formdata.append("bezel_material", allValues.bezelMaterialData);
            formdata.append("crystal_type", allValues.crystalTypeData);

            formdata.append("dial_color", allValues.dialColorData);
            formdata.append("dial_style", allValues.dialStyleData);
            formdata.append("bracelet_material", allValues.braceletMaterialData);
            formdata.append("strap_length", allValues.strap_length);
            formdata.append("bracelet_color", allValues.braceletColorData);
            formdata.append("clasp_type", allValues.claspTypeData);
            formdata.append("clasp_material", allValues.claspMaterialData);


            formdata.append("production_year", allValues.production_year);

            formdata.append("auction_start_date", date.getDate() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getFullYear());
            formdata.append("auction_end_date", dateEnd2.getDate() + '-' + parseInt(dateEnd2.getMonth() + 1) + '-' + dateEnd2.getFullYear());

            formdata.append("product_condition", allValues.conditionData);

            formdata.append("type", selectedGenderVal);

            formdata.append("estimated_delivery_date", allValues.estimated_delivery_date);
            formdata.append("load", selectedMovementVal);

            formdata.append("kit", selectedScopeDeliveryVal);


            formdata.append("caliber_mechanism", allValues.caliber_mechanism);
            formdata.append("power_reserve", allValues.power_reserve);
            formdata.append("number_of_stones", allValues.number_of_stones);


            formdata.append("diameter", allValues.diameter);
            formdata.append("height", allValues.height);
            formdata.append("waterproof", allValues.waterproof);

            formdata.append("user_id", loginUserId.current_userID);
            formdata.append("featured_image", {
                uri: selectImage.path,
                name: selectImage.modificationDate + ".jpg",
                fileName: 'image',
                type: selectImage.mime
            });
            for (var key in selectMultipleImage) {
                formdata.append("gallery_images[]", {
                    uri: selectMultipleImage[key].path,
                    name: selectMultipleImage[key].modificationDate + ".jpg",
                    fileName: 'image',
                    type: selectMultipleImage[key].mime
                });
            }

            console.log('submit', formdata);
            //API call POST Method

            fetch(addProductApi, {
                method: 'POST',
                headers: {
                    "content-type": "multipart/form-data", "accept": "application/json"
                },
                body: formdata,
            }).then(response => response.json()).then(data => {
                console.log(data);
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



    const [prevProductName, setPrevProductName] = useState();
    const [prevProductDescription, setPrevProductDescription] = useState();
    const [prevAvailability, setPrevAvailability] = useState();
    const [prevAdCode, setPrevAdCode] = useState();
    const [prevProductionYear, setPrevProductionYear] = useState();
    const [prevReferenceNumber, setReferenceNumber] = useState();
    const [prevcondition, setCondition] = useState();
    const [prevConditionManualText, setPrevConditionManualText] = useState();

    const [prevEstimatedDeliveryDate, setPrevEstimatedDeliveryDate] = useState();

    const [prevScopeDelivery, setPrevScopeDelivery] = useState();
    const [prevGender, setPrevGender] = useState();
    const [prevCaliber, setPrevCaliber] = useState();

    const [prevPrice, setPrevPrice] = useState();


    const [prevDirectPurchasePrice, setPrevDirectPurchasePrice] = useState();
    const [prevReservePrice, setPrevReservePrice] = useState();
    const [prevRaiseValue, setPrevRaiseValue] = useState();



    const [prevPlace, setPrevPlace] = useState();
    const [prevBrand, setPrevBrand] = useState();
    const [prevModel, setPrevModel] = useState();
    const [prevCaliberMechanism, setPrevCaliberMechanism] = useState();
    const [prevNumberOfStones, setPrevNumberOfStones] = useState();
    const [prevPowerReserve, setPrevPowerReserve] = useState();
    const [prevBezelMaterial, setPrevBezelMaterial] = useState();
    const [prevCaseMaterial, setPrevCaseMaterial] = useState();
    const [prevDiameter, setprevDiameter] = useState();
    const [prevHeight, setPrevHeight] = useState();
    const [prevwaterproof, setPrevwaterproof] = useState();
    const [prevglass, setPrevglass] = useState();
    const [prevCaseThickness, setPrevCaseThickness] = useState();
    const [prevStrapMaterial, setpPrevStrapMaterial] = useState();
    const [prevStrapLength, setPrevStrapLength] = useState();
    const [prevStrapColor, setPrevStrapColor] = useState();
    const [prevClapsType, setPrevClapsType] = useState();
    const [prevNumbersOnTheDial, setPrevNumbersOnTheDial] = useState();
    const [prevClosureMaterial, setPrevClosureMaterial] = useState();
    const [prevClockFace, setPrevClockFace] = useState();
    const [prevProductCategory, setPrevProductCategory] = useState();

    const [modelval, setModelval] = useState();

    const [Categoryval, setCategoryval] = useState();


    //console.log(Categoryval);




    const SelectedValitem = (val) => {
        setCategoryval(val);
        //alert(val);
        fetch(prevDataApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                // user_id: loginUserId,
                // order_keys: val,
                selected_cat: val,
                //selected_model:"monaco"

            })
        }).then(response => response.json()).then(data => {
            //console.log(data.data.basic_data.place, "Brand Name");
            console.log(data.data, "Prev Dta result ccccccccccccccc");
            setLoading(false);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);
            setPrevProductName(data.data.product_name);
            setPrevProductDescription(data.data.product_description);
            setPrevAvailability(data.data.availability);
            setPrevAdCode(data.data.basic_data.ad_code);
            setPrevProductionYear(data.data.basic_data.production_year);
            setReferenceNumber(data.data.basic_data.reference_number);
            setCondition(data.data.basic_data.condition);
            setPrevConditionManualText(data.data.basic_data.condition_manual_text);
            setPrevEstimatedDeliveryDate(data.data.estimated_delivery_date);


            setPrevScopeDelivery(data.data.basic_data.kit);
            setPrevGender(data.data.basic_data.type);
            setPrevCaliber(data.data.caliber.load);


            setPrevPrice(data.data.price);

            setPrevDirectPurchasePrice(data.data.direct_purchase_price);
            setPrevReservePrice(data.data.reserve_price);
            setPrevRaiseValue(data.data.raise_value);


            setPrevPlace(data.data.basic_data.place);
            setPrevBrand(data.data.basic_data.brand.name);
            setPrevModel(data.data.basic_data.model.name);
            setPrevCaliberMechanism(data.data.caliber.caliber_mechanism);
            setPrevNumberOfStones(data.data.caliber.number_of_stones);
            setPrevPowerReserve(data.data.caliber.power_reserve);


            setPrevNumbersOnTheDial(data.data.cash_desk.numbers_on_the_dial);
            setPrevBezelMaterial(data.data.cash_desk.bezel_material);
            setPrevCaseMaterial(data.data.cash_desk.case_material);
            setprevDiameter(data.data.cash_desk.diameter);
            setPrevHeight(data.data.cash_desk.height);
            setPrevwaterproof(data.data.cash_desk.waterproof);
            setPrevglass(data.data.cash_desk.glass);
            setPrevCaseThickness(data.data.cash_desk.case_thickness);
            setpPrevStrapMaterial(data.data.strap.strap_material);
            setPrevStrapLength(data.data.strap.strap_length);
            setPrevStrapColor(data.data.strap.strap_color);
            setPrevClapsType(data.data.strap.closure);
            setPrevClosureMaterial(data.data.strap.closure_material);
            setPrevClockFace(data.data.cash_desk.clock_face);
            setPrevProductCategory(data.data.basic_data.product_category.name);


        }
        )
    }



    const SelectedValitem2 = (val) => {
        setModelval(val);
        //alert(val);
        fetch(prevDataApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                // user_id: loginUserId,
                // order_keys: val,
                //selected_cat: val,
                selected_model: val,

            })
        }).then(response => response.json()).then(data => {
            //console.log(data.data.basic_data.place, "Brand Name");
            console.log(data.data, "Prev Dta result bbbbbbbbbbbb");
            setLoading(false);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);
            setPrevProductName(data.data.product_name);
            setPrevProductDescription(data.data.product_description);
            setPrevAvailability(data.data.availability);
            setPrevAdCode(data.data.basic_data.ad_code);
            setPrevProductionYear(data.data.basic_data.production_year);
            setReferenceNumber(data.data.basic_data.reference_number);
            setCondition(data.data.basic_data.condition);
            setPrevConditionManualText(data.data.basic_data.condition_manual_text);
            setPrevEstimatedDeliveryDate(data.data.estimated_delivery_date);


            setPrevScopeDelivery(data.data.basic_data.kit);
            setPrevGender(data.data.basic_data.type);
            setPrevCaliber(data.data.caliber.load);


            setPrevPrice(data.data.price);

            setPrevDirectPurchasePrice(data.data.direct_purchase_price);
            setPrevReservePrice(data.data.reserve_price);
            setPrevRaiseValue(data.data.raise_value);


            setPrevPlace(data.data.basic_data.place);
            setPrevBrand(data.data.basic_data.brand.name);
            setPrevModel(data.data.basic_data.model.name);
            setPrevCaliberMechanism(data.data.caliber.caliber_mechanism);
            setPrevNumberOfStones(data.data.caliber.number_of_stones);
            setPrevPowerReserve(data.data.caliber.power_reserve);


            setPrevNumbersOnTheDial(data.data.cash_desk.numbers_on_the_dial);
            setPrevBezelMaterial(data.data.cash_desk.bezel_material);
            setPrevCaseMaterial(data.data.cash_desk.case_material);
            setprevDiameter(data.data.cash_desk.diameter);
            setPrevHeight(data.data.cash_desk.height);
            setPrevwaterproof(data.data.cash_desk.waterproof);
            setPrevglass(data.data.cash_desk.glass);
            setPrevCaseThickness(data.data.cash_desk.case_thickness);
            setpPrevStrapMaterial(data.data.strap.strap_material);
            setPrevStrapLength(data.data.strap.strap_length);
            setPrevStrapColor(data.data.strap.strap_color);
            setPrevClapsType(data.data.strap.closure);
            setPrevClosureMaterial(data.data.strap.closure_material);
            setPrevClockFace(data.data.cash_desk.clock_face);
            setPrevProductCategory(data.data.basic_data.product_category.name);


        }
        )
    }

    //console.log(prevPlace, "prevPlace 2121231321");









    //console.log(selectMultipleImage.path);

    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={{ color: "#FFF", fontSize: 15 }}>{t("Add_Auction")}</Text>
            </View>
            <ScrollView>
                <View style={styles.addAuctionWrap}>
                    <Text style={styles.addAuctionTitle}>{t("Create_New_Auction")}</Text>
                    {/* <TouchableOpacity style={styles.productScaneWrap}>
                        <MaterialCommunityIcons name="qrcode-scan" size={20} color="#555" />
                        <Text style={{ color: "#555", fontSize: 15, paddingLeft: 10, }}>{t("Product_Scan")}</Text>
                    </TouchableOpacity> */}
                </View>

                <View style={styles.addAuctionForm}>

                    <Text style={styles.textLabel}>{t("Product_Name")}</Text>
                    <TextInput style={styles.textField}
                        name='product_name'
                        //value={prevProductName ? prevProductName : allValues.product_name }
                        value={allValues.product_name ? allValues.product_name : prevProductName}
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            product_name: e
                        })} />

                    <Text style={styles.textLabel}>{t("Product_Description")}</Text>
                    <TextInput style={styles.textFieldarea}
                        name='product_description'
                        //value={ prevProductDescription ? prevProductDescription : allValues.product_description}
                        value={
                            allValues.product_description ? allValues.product_description
                                :
                                prevProductDescription && prevProductDescription.replace(/<(?:.|\n)*?>/gm, '')
                        }
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            product_description: e
                        })} />


                    <Text style={styles.textLabel}>{t("Featured_Image")}</Text>
                    <View style={styles.featuredImageWrap}>
                        <TouchableOpacity style={styles.deleteImage} onPress={deleteImage}>
                            <Feather name="x" size={22} color="#000" />
                        </TouchableOpacity>
                        <View style={styles.featuredImageBox}>
                            {selectImage ? <Image style={styles.featuredImagestyle} source={{ uri: `${selectImage.path}` }} resizeMode="cover" /> : <Feather name="watch" size={50} color="#ccc" />}
                        </View>
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
                        {selectMultipleImage ?
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
                            name='product_brand_name'
                            //value={prevBrand ? prevBrand : allValues.product_brand_name}
                            value={allValues.product_brand_name ? allValues.product_brand_name : prevBrand}
                            //defaultValue={prevBrand}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                product_brand_name: e
                            })} />


                        <SelectDropdown
                            buttonStyle={{ backgroundColor: '#00603b', width: '27%', height: 40, marginVertical: 0, borderRadius: 8, }}
                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 12, }}
                            data={brandListData}
                            name='product_brand_name'
                            //value={prevBrand ? prevBrand : allValues.product_brand_name}
                            value={allValues.product_brand_name}
                            defaultValue={prevBrand}
                            //value={allValues.product_brand_name}
                            onSelect={(e) => setAllValues({
                                ...allValues,
                                product_brand_name: e
                            })}
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
                            name='modelData'
                            value={allValues.modelData ? allValues.modelData : prevModel}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                modelData: e
                            })} />

                        <SelectDropdown
                            buttonStyle={{ backgroundColor: '#00603b', width: '27%', height: 40, marginVertical: 0, borderRadius: 8, }}
                            buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 12, }}
                            data={modelData}
                            name='modelData'
                            value={allValues.modelData}
                            defaultValue={prevModel}
                            onSelect={(val) => SelectedValitem2(val)}
                            // onSelect={(e) => setAllValues({
                            //     ...allValues,
                            //     modelData: e
                            // })}
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
                        value={allValues.watchTypeData}
                        defaultValue={prevProductCategory}
                        // onSelect={(e) => setAllValues({
                        //     ...allValues,
                        //     watchTypeData: e
                        // })}
                        onSelect={(val) => SelectedValitem(val)}
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
                            <TextInput style={styles.textField}
                                name='base_price'
                                //value={prevPrice ? prevPrice : allValues.base_price}
                                value={allValues.base_price ? allValues.base_price : prevPrice}
                                keyboardType='numeric'
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    base_price: e
                                })} />
                        </View>
                        <View style={styles.endDate}>
                            <Text style={styles.textLabel}>Direct Purchase price $</Text>
                            <TextInput style={styles.textField}
                                name='direct_purchase_price'
                                value={allValues.direct_purchase_price ? allValues.direct_purchase_price : prevDirectPurchasePrice}
                                keyboardType='numeric'
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    direct_purchase_price: e
                                })} />
                        </View>
                    </View>

                    <View style={styles.dateWrap}>
                        <View style={styles.startDate}>
                            <Text style={styles.textLabel}>Reserve price $</Text>
                            <TextInput style={styles.textField}
                                name='reserve_price'
                                value={allValues.reserve_price ? allValues.reserve_price : prevReservePrice}
                                keyboardType='numeric'
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    reserve_price: e
                                })} />
                        </View>
                        <View style={styles.endDate}>
                            <Text style={styles.textLabel}>Raise Value $</Text>
                            <TextInput style={styles.textField}
                                name='raise_value'
                                value={allValues.raise_value ? allValues.raise_value : prevRaiseValue}
                                keyboardType='numeric'
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    raise_value: e
                                })} />
                        </View>
                    </View>



                    <View style={styles.dateWrap}>
                        <View style={styles.startDate}>
                            <Text style={styles.textLabel}>{t("Auction_start_date")}</Text>
                            <View style={styles.calendarBox}>
                                <TouchableOpacity onPress={() => setOpen(true)}>
                                    <Text style={styles.textLabel}>{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}</Text>

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
                                    date={date}
                                    onDateChange={setDate}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
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
                                    <Text style={styles.textLabel}>{dateEnd2.getFullYear()}-{dateEnd2.getMonth() + 1}-{dateEnd2.getDate()}</Text>
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
                            <Text style={styles.textLabel}>{t("AD_Code")}</Text>
                            <TextInput style={styles.textField}
                                name='sku'
                                // value={prevAdCode ? prevAdCode : allValues.sku}
                                value={allValues.sku ? allValues.sku : prevAdCode}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    sku: e
                                })} />
                        </View>
                        <View style={styles.endDate}>
                            <Text style={styles.textLabel}>{t("Reference_number")}</Text>
                            <TextInput style={styles.textField}
                                name='reference_number'
                                // value={prevReferenceNumber ? prevReferenceNumber : allValues.reference_number}
                                value={allValues.reference_number ? allValues.reference_number : prevReferenceNumber}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    reference_number: e
                                })} />
                        </View>
                    </View>


                    <View style={styles.dateWrap}>
                        <View style={styles.startDate}>
                            <Text style={styles.textLabel}>{t("Availability")}</Text>
                            <TextInput style={styles.textField}
                                name='availability'
                                // value={ prevAvailability ? prevAvailability : allValues.availability}
                                value={allValues.availability ? allValues.availability : prevAvailability}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    availability: e
                                })} />
                        </View>
                        <View style={styles.endDate}>
                            <Text style={styles.textLabel}>{t("Production_Year")}</Text>
                            <TextInput style={styles.textField}
                                name='production_year'
                                keyboardType='numeric'
                                // value={prevProductionYear ? prevProductionYear : allValues.production_year}
                                value={allValues.production_year ? allValues.production_year : prevProductionYear}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    production_year: e
                                })} />
                        </View>
                    </View>

                    <Text style={styles.textLabel}>{t("Condition")}</Text>
                    <SelectDropdown
                        buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                        buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                        data={conditionData}
                        name='conditionData'
                        // defaultValue={prevcondition ? prevcondition : allValues.conditionData}
                        //value={allValues.conditionData ? allValues.conditionData : prevcondition}
                        value={allValues.conditionData}
                        defaultValue={prevcondition}
                        onSelect={(e) => setAllValues({
                            ...allValues,
                            conditionData: e
                        })}
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
                        // value={prevConditionManualText ? prevConditionManualText : allValues.condition_manual_text}
                        value={allValues.condition_manual_text ? allValues.condition_manual_text : prevConditionManualText}
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            condition_manual_text: e
                        })} />

                    <View style={styles.dateWrap}>
                        <View style={styles.startDate}>
                            <Text style={styles.textLabel}>{t("Location")}</Text>

                            {/* <SelectDropdown
                                buttonStyle={{ backgroundColor: '#00603b', height: 40, width: '100%', marginVertical: 0, borderRadius: 8, }}
                                buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                data={countryData}
                                name='countryData'
                                value={allValues.countryData}
                                defaultValue={prevPlace}
                                onSelect={(e) => console.log(e.value, "hjhjhj")}
                                renderCustomizedButtonChild={(selectedItem, index) => {
                                    return (
                                        <View style={styles.dropdown3BtnChildStyle}>
                                            <Text style={styles.dropdown3BtnTxt}>
                                                {selectedItem ? selectedItem.label : "Select country"}
                                            </Text>
                                        </View>
                                    );
                                }}
                                renderCustomizedRowChild={(item, index) => {
                                    return (
                                        <View style={styles.dropdown3RowChildStyle}>
                                            <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                                        </View>
                                    );
                                }}
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
                                value={value ? value : prevPlace}
                                items={countryData}
                                //defaultValue={prevPlace}
                                setOpen={setOpenState}
                                setValue={setValue}
                                setItems={setItems}
                                onChangeValue={(value) => setCountryValue(value)}
                            />



                        </View>

                        <View style={styles.endDate}>
                            <Text style={styles.textLabel}>{t("Delivery_Date")}</Text>
                            <TextInput style={styles.textField}
                                name='estimated_delivery_date'
                                // value={prevEstimatedDeliveryDate ? prevEstimatedDeliveryDate : allValues.estimated_delivery_date}
                                value={allValues.estimated_delivery_date ? allValues.estimated_delivery_date : prevEstimatedDeliveryDate}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    estimated_delivery_date: e
                                })} />
                        </View>
                    </View>

                    <Text style={styles.textLabel}>{t("Scope_Delivery")}</Text>
                    <RadioForm
                        formHorizontal={false}
                        animation={true}
                    >
                        {
                            scopeDeliveryVal.map((obj, i) => (
                                //console.log(obj, i),
                                <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={prevScopeDelivery === obj.value}
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
                        initial={'new'}
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
                                //console.log(obj, i),
                                <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={prevGender === obj.value}
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
                        initial={'men'}
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
                                //console.log(obj, i),
                                <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={prevCaliber === obj.value}
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
                        initial={'automatic'}
                        formHorizontal={true}
                        animation={true}
                        buttonSize={10}
                        buttonOuterSize={20}
                        labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 8, }}
                        onPress={(val) => setselectedMovementVal(val)}
                    /> */}

                    <Text style={styles.textLabel}>{t("Movement/Caliber")}</Text>
                    <TextInput style={styles.textField}
                        name='caliber_mechanism'
                        // value={prevCaliberMechanism ? prevCaliberMechanism : allValues.caliber_mechanism}
                        value={allValues.caliber_mechanism ? allValues.caliber_mechanism : prevCaliberMechanism}
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            caliber_mechanism: e
                        })} />

                    <Text style={styles.textLabel}>{t("Power_reserve")}</Text>
                    <TextInput style={styles.textField}
                        name='power_reserve'
                        // value={prevPowerReserve ? prevPowerReserve : allValues.power_reserve}
                        value={allValues.power_reserve ? allValues.power_reserve : prevPowerReserve}
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            power_reserve: e
                        })} />
                    <Text style={styles.textLabel}>{t("Number_of_jewels")}</Text>
                    <TextInput style={styles.textField}
                        name='number_of_stones'
                        keyboardType='numeric'
                        // value={prevNumberOfStones ? prevNumberOfStones : allValues.number_of_stones}
                        value={allValues.number_of_stones ? allValues.number_of_stones : prevNumberOfStones}
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            number_of_stones: e
                        })} />

                    <Text style={styles.addAuctionSubTitle}>{t("Case")}</Text>

                    <View style={styles.dateWrap}>
                        <View style={styles.startDate}>
                            <Text style={styles.textLabel}>{t("Case_material")}</Text>
                            <SelectDropdown
                                buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                data={caseMaterialData}
                                name='caseMaterialData'
                                // value={prevCaseMaterial ? prevCaseMaterial : allValues.caseMaterialData}
                                value={allValues.caseMaterialData}
                                defaultValue={prevCaseMaterial}
                                onSelect={(e) => setAllValues({
                                    ...allValues,
                                    caseMaterialData: e
                                })}
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
                                name='diameter'
                                keyboardType='numeric'
                                // value={prevDiameter ? prevDiameter : allValues.diameter}
                                value={allValues.diameter ? allValues.diameter : prevDiameter}
                                placeholder='In millimeter (mm)'
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    diameter: e
                                })} />
                        </View>
                    </View>
                    <View style={styles.dateWrap}>
                        <View style={styles.startDate}>
                            <Text style={styles.textLabel}>{t("Case_Width")}</Text>
                            <TextInput style={styles.textField}
                                name='height'
                                keyboardType='numeric'
                                // value={prevHeight ? prevHeight : allValues.height}
                                value={allValues.height ? allValues.height : prevHeight}
                                placeholder='In millimeter (mm)'
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    height: e
                                })} />
                        </View>
                        <View style={styles.endDate}>
                            <Text style={styles.textLabel}>{t("Water_resistance")}</Text>
                            <TextInput style={styles.textField}
                                name='waterproof'
                                keyboardType='numeric'
                                // value={prevwaterproof ? prevwaterproof : allValues.waterproof}
                                value={allValues.waterproof ? allValues.waterproof : prevwaterproof}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    waterproof: e
                                })} />
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
                                // value={ prevBezelMaterial ? prevBezelMaterial : allValues.bezelMaterialData}
                                value={allValues.bezelMaterialData}
                                defaultValue={prevBezelMaterial}
                                onSelect={(e) => setAllValues({
                                    ...allValues,
                                    bezelMaterialData: e
                                })}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />


                        </View>
                        <View style={styles.endDate}>
                            <Text style={styles.textLabel}>{("Crystal")}</Text>

                            <SelectDropdown
                                buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                data={crystalTypeData}
                                name='crystalTypeData'
                                // value={prevglass ? prevglass : allValues.crystalTypeData}
                                value={allValues.crystalTypeData}
                                defaultValue={prevglass}
                                onSelect={(e) => setAllValues({
                                    ...allValues,
                                    crystalTypeData: e
                                })}
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
                                // value={prevCaseThickness ? prevCaseThickness : allValues.case_thickness}
                                value={allValues.case_thickness ? allValues.case_thickness : prevCaseThickness}
                                keyboardType='numeric'
                                placeholder='In millimeter (mm)'
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    case_thickness: e
                                })} />
                        </View>
                        <View style={styles.startDate}>
                            <Text style={styles.textLabel}>{t("Dial_Color")}</Text>

                            <SelectDropdown
                                buttonStyle={{ backgroundColor: '#00603b', width: '100%', height: 40, marginVertical: 0, borderRadius: 8, }}
                                buttonTextStyle={{ color: '#fff', textTransform: 'uppercase', fontSize: 13, }}
                                data={dialColorData}
                                name='dialColorData'
                                // value={ prevStrapColor ? prevStrapColor : allValues.dialColorData}
                                value={allValues.dialColorData}
                                defaultValue={prevStrapColor}
                                onSelect={(e) => setAllValues({
                                    ...allValues,
                                    dialColorData: e
                                })}
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
                                value={allValues.dialStyleData}
                                defaultValue={prevNumbersOnTheDial}
                                onSelect={(e) => setAllValues({
                                    ...allValues,
                                    dialStyleData: e
                                })}
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
                                // value={prevStrapMaterial ? prevStrapMaterial : allValues.braceletMaterialData}
                                value={allValues.braceletMaterialData}
                                defaultValue={prevStrapMaterial}
                                onSelect={(e) => setAllValues({
                                    ...allValues,
                                    braceletMaterialData: e
                                })}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />


                        </View>
                        <View style={styles.endDate}>
                            <Text style={styles.textLabel}>{t("Bracelet_length")}</Text>
                            <TextInput style={styles.textField}
                                name='strap_length'
                                // value={prevStrapLength ? prevStrapLength : allValues.strap_length}
                                value={allValues.strap_length ? allValues.strap_length : prevStrapLength}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    strap_length: e
                                })} />
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
                                value={allValues.braceletColorData}
                                defaultValue={prevClockFace}
                                onSelect={(e) => setAllValues({
                                    ...allValues,
                                    braceletColorData: e
                                })}
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
                                // value={prevClapsType ? prevClapsType : allValues.claspTypeData}
                                value={allValues.claspTypeData}
                                defaultValue={prevClapsType}
                                onSelect={(e) => setAllValues({
                                    ...allValues,
                                    claspTypeData: e
                                })}
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
                                value={allValues.claspMaterialData}
                                defaultValue={prevClosureMaterial}
                                onSelect={(e) => setAllValues({
                                    ...allValues,
                                    claspMaterialData: e
                                })}
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
                        <View style={{ paddingBottom: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: 18 }}>{formRequired}</Text>
                        </View>
                        <TouchableOpacity style={styles.greenBtn} onPress={submit}>
                            <Text style={styles.buttonText}>{t("Create_Product")} +</Text>
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
export default AddAuctionScreen