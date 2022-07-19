import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// For language translate
import { useTranslation } from 'react-i18next';

const Checkout = ({ route, navigation }) => {
    const countryListDataApi = API_URL + 'user-country-currency.php';
    const stateListDataApi = API_URL + 'all-state.php';

    const [countryValue, setCountryValue] = useState();
    const [countryData, setCountryData] = useState([]);
    const [openCountry, setOpenCountry] = useState(false);
    const [value, setValue] = useState();
    const [stateValue, setStateValue] = useState();
    const [stateData, setStateData] = useState([]);
    const [openState, setOpenState] = useState(false);
    const [valueState, setValueState] = useState();

    // For language translate
    const { t, i18n } = useTranslation();

    const radioVal = [
        { label: 'Stripe', value: 'stripe' },
        { label: 'Paypal', value: 'paypal' }
    ]
    const addressRadioVal = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
    ]
    const [selectedVal, setSelectedVal] = useState('stripe');
    const [selectedVal2, setSelectedVal2] = useState('yes');
    const [formRequired, setFormRequired] = useState('');
    const [allValues, setAllValues] = useState({
        f_name: '',
        l_name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        post_code: '',
        country: '',

        shipping_f_name: '',
        shipping_l_name: '',
        shipping_company: '',
        shipping_email: '',
        shipping_phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_state: '',
        shipping_post_code: '',
        shipping_country: '',
    });

    const selectCountry = (value) => {
        if (value != '' || value != null) {

            setCountryValue(value);
            const stateApicall = async () => {
                try {
                    const response = await fetch(stateListDataApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            country_key: value,
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    console.log(data.data, 'state api call');
                    var objStateData = [];
                    for (var key in data.data.state) {
                        objStateData.push({ 'value': data.data.state[key].id, 'label': data.data.state[key].name });
                        // ...
                    }
                    setStateData(objStateData);

                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                }
            }
            stateApicall();
        }
        console.log(value, 'Selected country onChnage');
    }

    const submit = () => {
        if (allValues.f_name == '' || allValues.email == '' || allValues.phone == '' || allValues.address == '' || allValues.post_code == '' || countryValue == undefined || stateValue == undefined) {
            setFormRequired('Above all fields are required');
            return false;
        } else {
            setFormRequired('');
            if (selectedVal == 'stripe') {
                navigation.navigate('PayWithStripe', {
                    page_from: 'checkout',
                    user_id: route.params.user_id,
                    product_id: route.params.product_id,
                    product_name: route.params.product_name,
                    product_owner_id: route.params.product_owner_id,
                    product_owner_id: route.params.product_owner_id,
                    payment_method: selectedVal,
                    token_amount: route.params.final_price,

                    billing_first_name: allValues.f_name,
                    billing_last_name: allValues.l_name,
                    billing_company: allValues.company,
                    billing_email: allValues.email,
                    billing_phone: allValues.phone,
                    billing_address_1: allValues.address,
                    billing_city: allValues.city,
                    billing_state: stateValue,
                    billing_postcode: allValues.post_code,
                    billing_country: countryValue,

                    shipping_first_name: allValues.shipping_f_name,
                    shipping_last_name: allValues.shipping_l_name,
                    shipping_company: allValues.shipping_company,
                    shipping_email: allValues.shipping_email,
                    shipping_phone: allValues.shipping_phone,
                    shipping_address_1: allValues.shipping_address,
                    shipping_city: allValues.shipping_city,
                    shipping_state: allValues.shipping_state,
                    shipping_postcode: allValues.shipping_post_code,
                    shipping_country: allValues.shipping_country,

                    shipping_address_same_as_billing: selectedVal2
                });
            } else {
                navigation.navigate('PayWithPaypal', {
                    page_from: 'checkout',
                    user_id: route.params.user_id,
                    product_id: route.params.product_id,
                    product_name: route.params.product_name,
                    product_owner_id: route.params.product_owner_id,
                    product_owner_id: route.params.product_owner_id,
                    payment_method: selectedVal,
                    token_amount: route.params.final_price,

                    billing_first_name: allValues.f_name,
                    billing_last_name: allValues.l_name,
                    billing_company: allValues.company,
                    billing_email: allValues.email,
                    billing_phone: allValues.phone,
                    billing_address_1: allValues.address,
                    billing_city: allValues.city,
                    billing_state: stateValue,
                    billing_postcode: allValues.post_code,
                    billing_country: countryValue,

                    shipping_first_name: allValues.shipping_f_name,
                    shipping_last_name: allValues.shipping_l_name,
                    shipping_company: allValues.shipping_company,
                    shipping_email: allValues.shipping_email,
                    shipping_phone: allValues.shipping_phone,
                    shipping_address_1: allValues.shipping_address,
                    shipping_city: allValues.shipping_city,
                    shipping_state: allValues.shipping_state,
                    shipping_postcode: allValues.shipping_post_code,
                    shipping_country: allValues.shipping_country,

                    shipping_address_same_as_billing: selectedVal2
                });
            }
        }
    }
    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />

            </View>
            <ScrollView>
                <View style={{ padding: 15 }}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: '500', color: '#00603b' }}>{t('procide_to_checkout')}</Text>
                        {/* <Text>product_name:{route.params.product_name}</Text>
                        <Text>product_id:{route.params.product_id}</Text>
                        <Text>product_owner_id:{route.params.product_owner_id}</Text>
                        <Text>user_id:{route.params.user_id}</Text>
                        <Text>last_bid_amount:{route.params.last_bid_amount}</Text> */}
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <View style={{ width: '48%' }}>
                            <Text style={styles.formLabel}>{t('First_Name')}</Text>
                            <TextInput style={styles.input} placeholder={t('First_Name')}
                                name='f_name'
                                value={allValues.f_name}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    f_name: e
                                })} />
                        </View>
                        <View style={{ width: '48%' }}>
                            <Text style={styles.formLabel}>{t('Last_Name')}</Text>
                            <TextInput style={styles.input} placeholder={t('Last_Name')}
                                name='l_name'
                                value={allValues.l_name}
                                onChangeText={(e) => setAllValues({
                                    ...allValues,
                                    l_name: e
                                })} />
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.formLabel}>{t('company')}</Text>
                        <TextInput style={styles.input} placeholder={t('company')}
                            name='company'
                            value={allValues.company}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                company: e
                            })} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.formLabel}>{t('Email_Address')}</Text>
                        <TextInput style={styles.input} placeholder={t('Email_Address')}
                            name='email'
                            value={allValues.email}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                email: e
                            })} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.formLabel}>{t('contact_no')}</Text>
                        <TextInput style={styles.input} placeholder={t('contact_no')}
                            keyboardType='number-pad'
                            name='phone'
                            value={allValues.phone}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                phone: e
                            })} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.formLabel}>{t('address')}</Text>
                        <TextInput style={styles.input2} placeholder={t('address')}
                            multiline={true}
                            name='address'
                            value={allValues.address}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                address: e
                            })} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.formLabel}>{t('Country')}</Text>
                        {/* <TextInput style={styles.input} placeholder={t('Country')}
                            name='country'
                            value={allValues.country}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                country: e
                            })} /> */}
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            dropDownMaxHeight={1000}
                            style={{
                                backgroundColor: '#fff',
                                zIndex: 999,
                            }}
                            open={openCountry}
                            value={value}
                            items={countryData}
                            setOpen={setOpenCountry}
                            setValue={setValue}
                            onChangeValue={(value) => selectCountry(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.formLabel}>{t('State')}</Text>
                        {/* <TextInput style={styles.input} placeholder={t('State')}
                            name='state'
                            value={allValues.state}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                state: e
                            })} /> */}
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            dropDownMaxHeight={1000}
                            style={{
                                backgroundColor: '#fff',
                                zIndex: 99,
                            }}
                            open={openState}
                            value={valueState}
                            items={stateData}
                            setOpen={setOpenState}
                            setValue={setValueState}
                            onChangeValue={(value) => setStateValue(value)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.formLabel}>{t('City')}</Text>
                        <TextInput style={styles.input} placeholder={t('City')}
                            name='city'
                            value={allValues.city}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                city: e
                            })} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.formLabel}>{t('Zip')}</Text>
                        <TextInput style={styles.input} placeholder={t('Zip')}
                            keyboardType='number-pad'
                            name='post_code'
                            value={allValues.post_code}
                            onChangeText={(e) => setAllValues({
                                ...allValues,
                                post_code: e
                            })} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.formLabel}>{t('shipping_billing_same')}</Text>
                        <RadioForm
                            radio_props={addressRadioVal}
                            onPress={(val) => setSelectedVal2(val)}
                        />
                    </View>
                    {/* Shipping Address */}
                    {selectedVal2 == 'no' ?
                        <View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <View style={{ width: '48%' }}>
                                    <Text style={styles.formLabel}>{t('First_Name')}</Text>
                                    <TextInput style={styles.input} placeholder={t('First_Name')}
                                        name='shipping_f_name'
                                        value={allValues.shipping_f_name}
                                        onChangeText={(e) => setAllValues({
                                            ...allValues,
                                            shipping_f_name: e
                                        })} />
                                </View>
                                <View style={{ width: '48%' }}>
                                    <Text style={styles.formLabel}>{t('Last_Name')}</Text>
                                    <TextInput style={styles.input} placeholder={t('Last_Name')}
                                        name='shipping_l_name'
                                        value={allValues.shipping_l_name}
                                        onChangeText={(e) => setAllValues({
                                            ...allValues,
                                            shipping_l_name: e
                                        })} />
                                </View>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.formLabel}>{t('company')}</Text>
                                <TextInput style={styles.input} placeholder={t('company')}
                                    name='shipping_company'
                                    value={allValues.shipping_company}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        shipping_company: e
                                    })} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.formLabel}>{t('Email_Address')}</Text>
                                <TextInput style={styles.input} placeholder={t('Email_Address')}
                                    name='shipping_email'
                                    value={allValues.shipping_email}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        shipping_email: e
                                    })} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.formLabel}>{t('contact_no')}</Text>
                                <TextInput style={styles.input} placeholder={t('contact_no')}
                                    keyboardType='number-pad'
                                    name='shipping_phone'
                                    value={allValues.shipping_phone}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        shipping_phone: e
                                    })} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.formLabel}>{t('address')}</Text>
                                <TextInput style={styles.input2} placeholder={t('address')}
                                    multiline={true}
                                    name='shipping_address'
                                    value={allValues.shipping_address}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        shipping_address: e
                                    })} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.formLabel}>{t('Country')}</Text>
                                <TextInput style={styles.input} placeholder={t('Country')}
                                    name='shipping_country'
                                    value={allValues.shipping_country}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        shipping_country: e
                                    })} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.formLabel}>{t('State')}</Text>
                                <TextInput style={styles.input} placeholder={t('State')}
                                    name='shipping_state'
                                    value={allValues.shipping_state}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        shipping_state: e
                                    })} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.formLabel}>{t('City')}</Text>
                                <TextInput style={styles.input} placeholder={t('City')}
                                    name='shipping_city'
                                    value={allValues.shipping_city}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        shipping_city: e
                                    })} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.formLabel}>{t('Zip')}</Text>
                                <TextInput style={styles.input} placeholder={t('Zip')}
                                    keyboardType='shipping_number-pad'
                                    name='post_code'
                                    value={allValues.shipping_post_code}
                                    onChangeText={(e) => setAllValues({
                                        ...allValues,
                                        shipping_post_code: e
                                    })} />
                            </View>
                        </View>
                        :
                        <View></View>
                    }

                    <View>
                        <Text style={styles.formLabel}>{t('payment_method')}</Text>
                        <RadioForm
                            radio_props={radioVal}
                            onPress={(val) => setSelectedVal(val)}
                        />
                    </View>
                    <View><Text style={{ textAlign: 'left', color: 'red', fontSize: 20 }}>{formRequired}</Text></View>
                    <TouchableOpacity style={styles.btn} onPress={submit}>
                        <Text style={{ color: '#FFF', fontSize: 18, textTransform: "uppercase" }}>{t('continue')}</Text>
                    </TouchableOpacity>
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
    formLabel: {
        color: '#333333',
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 5
    },
    input2: {
        height: 100,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc'
    },
    link: {
        color: "#00603b",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 5
    },
    btn: {
        backgroundColor: '#00603b',
        alignItems: 'center',
        padding: 12,
        marginTop: 20,
        marginBottom: 20
    }
})
export default Checkout