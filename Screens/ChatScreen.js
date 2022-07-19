import React, { useRef, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
// For language translate
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../config';

const ChatScreen = ({ route, navigation }) => {
    // For language translate
    const { t, i18n } = useTranslation();
    const scrollViewRef = useRef();
    const [isLoading, setLoading] = useState(true);
    const buyerSellerChatApi = API_URL + 'chat-messages.php';
    const chatSendApi = API_URL + 'buyer_seller_chat.php	';
    const [buyerSellerChatData, setBuyerSellerChatData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loginUserId, setLoginUserId] = useState('');
    const [chatSendLoding, setChatSendLoding] = useState(false);

    const [allValues, setAllValues] = useState({
        message: '',
    });

    useEffect(() => {
        AsyncStorage.getItem('userData').then((result) => {
            //console.log(result);
            if (result != '') {
                setLoginUserId(JSON.parse(result).current_userID);
            }
        });
        const abortCont = new AbortController();
        const asyncPostCall = async () => {
            try {
                const response = await fetch(buyerSellerChatApi, {
                    signal: abortCont.signal,
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({
                        // your expected POST request payload goes here
                        product_id: route.params.productId,
                        user_id: route.params.user_id,
                    })
                });
                const data = await response.json();
                // enter you logic when the fetch is successful
                setLoading(false);
                console.log(data.data);
                setBuyerSellerChatData(data.data);
                setErrorMessage(data.error_message);
            } catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                //console.log(error)
            }
        }
        asyncPostCall()
        return () => abortCont.abort();
    }, [loginUserId]);


    // For chat end
    const submit = () => {
        setChatSendLoding(true);
        setAllValues({ message: '' });
        if (allValues.message != '') {
            const chatSendApiCall = async () => {
                try {
                    const response = await fetch(chatSendApi, {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        body: JSON.stringify({
                            // your expected POST request payload goes here
                            product_id: route.params.productId,
                            user_id: route.params.user_id,
                            chat_message: allValues.message
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    setSuccessMessage(data.success_message);
                    setChatSendLoding(false);
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                    //console.log(error)
                }
            }
            chatSendApiCall()
        } else {
            alert('Please write someting before send!');
            setChatSendLoding(false);
        }
    }

    useEffect(() => {
        if (successMessage != '') {
            const asyncPostCall = async () => {
                try {
                    const response = await fetch(buyerSellerChatApi, {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        body: JSON.stringify({
                            // your expected POST request payload goes here
                            product_id: route.params.productId,
                            user_id: route.params.user_id,
                        })
                    });
                    const data = await response.json();
                    // enter you logic when the fetch is successful
                    setBuyerSellerChatData(data.data);
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 2000);
                } catch (error) {
                    // enter your logic for when there is an error (ex. error toast)
                    //console.log(error)
                }
            }
            asyncPostCall()
        }
    }, [successMessage]);

    return (
        <>
            <View style={styles.HeaderBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} resizeMode="cover" style={{ width: 120, height: 45 }} />
            </View>

            <View style={{ flex: 1, backgroundColor: "#FFF", padding: 10, }}>


                <View style={styles.ChatWrapArea}>

                    <Text style={styles.allAuctionTitle}>{t("auction_chat")}</Text>


                    <View>

                        <View style={styles.ChatWrapContentArea}>


                            {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (

                                <ScrollView
                                    ref={scrollViewRef}
                                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                                >
                                    <>
                                        {buyerSellerChatData != '' ?
                                            <>
                                                {
                                                    buyerSellerChatData.map((item, index) => {
                                                        return (

                                                            <>
                                                                {loginUserId == item.sender_id ?
                                                                    <View style={styles.ChatWrapContentAreaBox} key={index}>
                                                                        <Text style={styles.ChatTime}>{item.message_time}</Text>
                                                                        <Text style={{ textAlign: 'right', backgroundColor: "#00603b", fontSize: 17, lineHeight: 20, paddingHorizontal: 10, paddingVertical: 10, width: '70%', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, }}>{item.message_value}</Text>
                                                                    </View>
                                                                    :
                                                                    <View style={styles.ChatWrapContentAreaBoxOdd} key={index}>
                                                                        <Text style={styles.ChatTime}>{item.message_time}</Text>
                                                                        <Text style={{ backgroundColor: "#00603b", fontSize: 17, lineHeight: 20, paddingHorizontal: 10, paddingVertical: 10, width: '80%', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, }}>{item.message_value}</Text>
                                                                    </View>
                                                                }
                                                            </>

                                                        )
                                                    })
                                                }
                                            </>
                                            :
                                            <></>
                                        }
                                    </>
                                </ScrollView>

                            )}

                            <View style={styles.ChatSubmitWrap}>

                                <View>
                                    <Text style={styles.formLabel}>{t("Enter_Your_Message")}</Text>
                                    <TextInput style={styles.input}
                                        message='message'
                                        value={allValues.message}
                                        onChangeText={(e) => setAllValues({
                                            ...allValues,
                                            message: e
                                        })} />
                                </View>
                                <TouchableOpacity onPress={submit} style={styles.btn}>
                                    <Text style={{ color: '#FFF', fontSize: 18 }}>{t("Send")}</Text>
                                </TouchableOpacity>
                                {chatSendLoding ? <ActivityIndicator style={{ position: 'absolute', bottom: -25, right: 0, left: 0 }} /> : (<></>)}
                            </View>

                        </View>

                    </View>


                </View>


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
    ChatWrapArea: {
        padding: 10,
    },
    ChatWrapContentAreaBox: {
        marginBottom: 10,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    ChatWrapContentAreaBoxOdd: {
        marginBottom: 10,
    },
    ChatTime: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '600',
        letterSpacing: 0.25,
        color: "#333333",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    ChatMessage: {
        backgroundColor: "#ebf4ef",
        fontSize: 17,
        lineHeight: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: "100%",
    },
    allAuctionTitle: {
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        color: "#00603b",
        textAlign: "center",
        paddingBottom: 25,
    },
    ChatWrapContentArea: {
        marginBottom: 0,
        height: '93%'
    },
    ChatSubmitWrap: {
        marginTop: 10,
    },

    formLabel: {
        color: '#333333',
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc',
        color: "#333333",
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    btn: {
        backgroundColor: '#00603b',
        alignItems: 'center',
        padding: 12,
        marginTop: 10,
        borderRadius: 8,
    },


})
export default ChatScreen