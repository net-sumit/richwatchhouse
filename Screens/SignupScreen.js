import React, { useState } from 'react';
import {
    Animated,
    View,
    Text,
    Pressable,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SignupScreen({ nav }) {
    //const [checked, setChecked] = React.useState(false);

    const [isLoading, setLoading] = useState(false);
    const registerApi = 'https://rixaltodemo.com/richwatchouse/app-api/v1/register-user.php';
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const radioVal = [
        { label: 'Seller', value: 'seller' },
        { label: 'Customer', value: 'customer' }
    ]
    const [selectedVal, setSelectedVal] = useState();
    const [allValues, setAllValues] = useState({
        f_name: '',
        l_name: '',
        email: '',
        password: '',
        used_refer_id: '',
    });

    const submit = () => {
        setLoading(true);

        //API call POST Method
        fetch(registerApi, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                user_type: selectedVal,
                f_name: allValues.f_name,
                l_name: allValues.l_name,
                email: allValues.email,
                password: allValues.password,
                used_refer_id: allValues.used_refer_id,
            })
        }).then(response => response.json()).then(data => {
            setLoading(false);
            //console.log(data);
            //console.log(data.success_message);
            setErrorMessage(data.error_message);
            setSuccessMessage(data.success_message);
        }
        );

    }

    return (
        <View style={{ backgroundColor: "#FFF", width: '100%', borderRadius: 5, padding: 15, position: 'relative' }}>
            <TouchableOpacity onPress={() => nav.goBack()} style={{ position: 'absolute', right: 8, top: 8, zIndex: 99 }}><Ionicons name="close" size={25} color="#000" /></TouchableOpacity>
            <Text style={styles.popupHeading}>Register</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <View style={{ width: '48%' }}>
                    <Text style={styles.formLabel}>First Name</Text>
                    <TextInput style={styles.input} placeholder={"First Name"}
                        name='f_name'
                        value={allValues.f_name}
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            f_name: e
                        })} />
                </View>
                <View style={{ width: '48%' }}>
                    <Text style={styles.formLabel}>Last Name</Text>
                    <TextInput style={styles.input} placeholder={"last Name"}
                        name='l_name'
                        value={allValues.l_name}
                        onChangeText={(e) => setAllValues({
                            ...allValues,
                            l_name: e
                        })} />
                </View>
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={styles.formLabel}>Email Address</Text>
                <TextInput style={styles.input} placeholder={"Email"}
                    name='email'
                    value={allValues.email}
                    onChangeText={(e) => setAllValues({
                        ...allValues,
                        email: e
                    })} />
            </View>
            <View style={{ marginVertical: 6 }}>
                <Text style={styles.formLabel}>Password(min. 6 characters)</Text>
                <TextInput secureTextEntry={true} style={styles.input} placeholder={"Set Password"}
                    name='password'
                    value={allValues.password}
                    onChangeText={(e) => setAllValues({
                        ...allValues,
                        password: e
                    })} />
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={styles.formLabel}>Refer ID</Text>
                <TextInput style={styles.input} placeholder={"Refer ID"}
                    name='used_refer_id'
                    value={allValues.used_refer_id}
                    onChangeText={(e) => setAllValues({
                        ...allValues,
                        used_refer_id: e
                    })} />
            </View>
            <View>
                <RadioForm
                    radio_props={radioVal}
                    initial={'customer'}
                    onPress={(val) => setSelectedVal(val)}
                />
            </View>
            <View>
                <Text style={styles.PopupDesc}>I accept Rich Watch House general terms and conditions and privacy policy. </Text>
                <Text style={styles.PopupDesc}>I would like to regularly receive personalized newsletters with offers,
                    products, and other news from Rich Watch House and their partners via email. I am aware that I can unsubscribe from these emails at
                    any time. </Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={submit}>
                <Text style={{ color: '#FFF', fontSize: 18, textTransform: "uppercase" }}>Register now for free </Text>
            </TouchableOpacity>
            {isLoading ? <ActivityIndicator /> : (
                <>
                    <Text style={{ fontSize: 20, color: 'red' }}>{errorMessage}</Text>
                    <Text style={{ fontSize: 20, color: 'green' }}>{successMessage}</Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    popupHeading: {
        color: '#333333',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 15
    },
    formLabel: {
        color: '#333333',
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 5
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
        marginTop: 20
    },
    PopupDesc: {
        fontSize: 15,
        color: "#333333",
        fontWeight: "300",
        paddingTop: 20,
    }
})


export default SignupScreen;
