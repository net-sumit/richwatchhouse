import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CountDown from 'react-native-countdown-component';
import { useTranslation } from 'react-i18next';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { API_URL } from '../config';


const ProductSearchScreen = ({ route, navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const { t, i18n } = useTranslation();
  const allProductDataApi = API_URL + 'all-products.php';
  const filterOptionsApi = API_URL + 'filter-options.php';
  //const allProductDataApi = API_URL + 'filter-products.php';
  const addWishlistDataApi = API_URL + 'add-to-wishlist.php';
  const deleteWishlistDataApi = API_URL + 'remove-from-wishlist.php';
  const [loginUserId, setLoginUserId] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [addWishlistSuccessMsg, setAddWishlistSuccessMsg] = useState('');

  const [selectedVal, setSelectedVal] = useState();

  const radioVal = [
    { label: 'Price low to high', value: 'price_low_to_high' },
    { label: 'Price high to low', value: 'price_high_to_low' },
    { label: 'Name ascending order', value: 'name_ascending_order' },
    { label: 'Name descending order', value: 'name_descending_order' },
  ]

  AsyncStorage.getItem("userData").then((value) => {
    if (value != '') {
      setLoginUserId(JSON.parse(value).current_userID);
    }
  });

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
        setSelectedVal(data.data.order_keys);

      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
      }
    }
    filterOptionsCall();
  }, [loginUserId]);

  // To fetch all products
  useEffect(() => {
    const abortCont = new AbortController();
    const allPeoductsApiCall = async () => {
      try {
        const response = await fetch(allProductDataApi, {
          signal: abortCont.signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            user_id: loginUserId
          })
        });
        const data = await response.json();
        // enter you logic when the fetch is successful
        setLoading(false);
        setFilteredDataSource(data.data);
        setMasterDataSource(data.data);
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
      }
    }
    allPeoductsApiCall()
    return () => abortCont.abort();
  }, [loginUserId]);

  // to update State after Add to wishlist
  useEffect(() => {
    if (addWishlistSuccessMsg != '') {
      const allPeoductsApiCall = async () => {
        try {
          const response = await fetch(allProductDataApi, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              // your expected POST request payload goes here
              user_id: loginUserId
            })
          });
          const data = await response.json();
          // enter you logic when the fetch is successful
          setFilteredDataSource(data.data);
          setMasterDataSource(data.data);
        } catch (error) {
          // enter your logic for when there is an error (ex. error toast)
          //console.log(error)
        }
      }
      allPeoductsApiCall()
    }
  }, [addWishlistSuccessMsg]);

  // For addWishlist
  const addWishlist = (productId) => {
    const addtoWishListCall = async () => {
      try {
        const response = await fetch(addWishlistDataApi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            product_id: productId,
            user_id: loginUserId
          })
        });
        const data = await response.json();
        // enter you logic when the fetch is successful
        setAddWishlistSuccessMsg(data.success_message);
        if (data.success_message != '') {
          setTimeout(() => {
            setAddWishlistSuccessMsg('');
          }, 1000);
        }

      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
        //console.log(error)
      }
    }
    addtoWishListCall()
  }


  // For RemoveWishlist
  const editWishlist = (productId) => {
    const removeWishListCall = async () => {
      try {
        const response = await fetch(deleteWishlistDataApi, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            product_id: productId,
            user_id: loginUserId
          })
        });
        const data = await response.json();
        // enter you logic when the fetch is successful
        setAddWishlistSuccessMsg(data.success_message);
        if (data.success_message != '') {
          setTimeout(() => {
            setAddWishlistSuccessMsg('');
          }, 1000);
        }
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
        //console.log(error)
      }
    }
    removeWishListCall()
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.product_title
            ? item.product_title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.row}>

        <View style={styles.grid} onPress={() => getItem(item)}>
          <View style={styles.boxProuduct}>
            <View style={styles.boxProuductImage}>
              {loginUserId != '' ?
                <>
                  {
                    item.wishlist_result === 1 ?
                      <TouchableOpacity
                        style={styles.editProduct}
                        onPress={() => editWishlist(item.id)}
                      >
                        <Ionicons name="heart-sharp" size={20} color="#00603b" />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        style={styles.editProduct}
                        onPress={() => addWishlist(item.id)}
                      >
                        <Ionicons name="heart-outline" size={20} color="#00603b" />
                      </TouchableOpacity>
                  }
                </>
                :
                <></>
              }
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                <Image source={{ uri: `${item.product_image_url}` }} style={{ width: 110, height: 110 }} resizeMode="cover" />
              </TouchableOpacity>
            </View>
            <View style={styles.boxProuductDesc}>
              <View style={styles.boxProuductDescTop}>
                <Text style={styles.boxProuductDescTopText} numberOfLines={2}>{item.product_title}</Text>
              </View>
              <View style={styles.boxProuductDescBottom}>
                {item.auction_status == 'Past' ?
                  <Text style={{ color: '#333333', paddingBottom: 10 }}>{t("Auction_Status")}: <Text style={{ color: "#ff0000", fontSize: 10, }}>{item.auction_status}</Text></Text>
                  :
                  <Text style={{ color: '#333333', paddingBottom: 10 }}>{t("Auction_Status")}: <Text style={{ color: "#00603b", fontSize: 10, }}>{item.auction_status}</Text></Text>
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
                      <View>
                        <Image source={require('../assets/flag.jpg')} style={{ width: 24, height: 16, borderWidth: 1, borderColor: "#a6aeae" }} />
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
                  </View>

                </View>
                <View style={styles.bidWrap}>
                  <TouchableOpacity style={styles.buyBtn} onPress={() => navigation.navigate('ProductDetails', { productId: item.id, user_id: loginUserId })}>
                    <Text style={styles.buttonText}>{t("Bid_Now")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

      </View>

    );
  };

  // const ItemSeparatorView = () => {
  //   return (
  //     // Flat List Item Separator
  //     <View
  //       style={{
  //         height: 0.5,
  //         width: '100%',
  //         backgroundColor: '#C8C8C8',
  //       }}
  //     />
  //   );
  // };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.product_title);
  };

  const SelectedValitem = (val) => {
    //alert(val);
    fetch(allProductDataApi, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        user_id: loginUserId,

        order_keys: val,

      })
    }).then(response => response.json()).then(data => {
      console.log(data.data, "search result");
      setLoading(false);
      setModalVisible(false);
      setSearchResultData(data.data);
      setErrorMessage(data.error_message);
      setSuccessMessage(data.success_message);
    }
    )
  }





  //console.log(filteredDataSource, "filteredDataSource 222");

  console.log(selectedVal, "selectedVal");


  return (

    <>
      <View style={styles.HeaderBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
          <AntDesign name="arrowleft" size={25} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchbar}>
          <Ionicons name="search" color="#fff" size={25} />
          <TextInput
            placeholder={t("search")}
            placeholderTextColor="#FFF"
            style={styles.input}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
          />
        </View>
      </View>


      <SafeAreaView style={styles.allAuctionWrap}>
        <Text style={styles.allAuctionTitle}>{t("All_Auctions")}</Text>






        {isLoading ? <ActivityIndicator size="large" style={{ marginTop: 200 }} /> : (


          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            //ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            //horizontal={false}
            numColumns={2}
          />

        )}


      </SafeAreaView>

      <View style={styles.filterWrap}>
        <View style={styles.filterWrapBox}>
          <View style={styles.filterWrapArea}>
            <TouchableOpacity onPress={() => navigation.navigate('RefineSearchScreen')} style={{ flexDirection: "row" }}>
              <AntDesign name="filter" size={20} color="#00603b" />
              <Text style={styles.filterWrapAreaText}>{t("Filter")}</Text>
            </TouchableOpacity>
            <Text>|</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: "row" }}>
              <MaterialIcons name="sort" size={22} color="#00603b" />
              <Text style={styles.filterWrapAreaText}>{t("Sort_by")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RadioForm
              radio_props={radioVal}
              initial={'Relevance'}
              formHorizontal={false}
              animation={true}
              buttonSize={10}
              buttonOuterSize={20}
              labelStyle={{ fontSize: 15, paddingLeft: 5, paddingRight: 15, marginBottom: 10, }}
              onPress={(val) => SelectedValitem(val)}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity> */}



    </>
  );
};

const styles = StyleSheet.create({


  HeaderBar: {
    width: '100%',
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: 'center',
    position: "relative",
    height: 80,
  },

  filterWrap: {
    position: "absolute",
    left: 0,
    bottom: 10,
    width: "100%",
  },
  filterWrapBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  filterWrapArea: {
    borderRadius: 25,
    backgroundColor: "#ffffff",
    width: 200,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,

    shadowColor: '#999999',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5
  },
  filterWrapAreaText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#00603b",
    paddingLeft: 5,
  },


  searchbar: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 60,
  },
  input: {
    width: "90%",
    height: 35,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#dbdbdb",
    color: "#fff",
    fontSize: 13,
    marginLeft: 10
  },
  allAuctionWrap: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#ffffff",
    marginBottom: 50,
    height: "100%",
    paddingBottom: 100,
  },
  allAuctionTitle: {
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 30,
    color: "#00603b",
    textAlign: "center",
    paddingBottom: 0,
    marginBottom: 30
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginHorizontal: 0,
    // minHeight:250,
  },
  grid: {
    width: '95%',
    marginHorizontal: 5,
    // backgroundColor: "red",
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
    minHeight: 440,
    width: 163,
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
    fontSize: 15,
    lineHeight: 18,
    minHeight: 35
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
    marginBottom: 5,
    minHeight: 35,
  },
  ratingMainWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    minHeight: 20,
    justifyContent: "space-between"
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
    width: 130,
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


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    position: "absolute",
    right: 10,
    top: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 14,
    paddingHorizontal: 3,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});

export default ProductSearchScreen;