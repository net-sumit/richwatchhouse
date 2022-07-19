
import React, { useState, useEffect } from 'react';

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
  FlatList
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const ProductSearchScreen = ({ route, navigation }) => {

  const [isLoading, setLoading] = useState(false);
  const brandListDataApi = 'https://rixaltodemo.com/richwatchouse/app-api/v1/all-products.php';
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);


  useEffect(() => {
    fetch(brandListDataApi, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }).then(response => response.json()).then(data => {
      setLoading(false);
      setFilteredDataSource(data.data);
      setMasterDataSource(data.data);
    }
    );
  }, []);


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
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
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item

      <View style={styles.row}>

        <View style={styles.grid} onPress={() => getItem(item)}>
          <View style={styles.boxProuduct}>
            <View style={styles.boxProuductImage}>

              {
                item.wishlist_result === 1 ?
                  <TouchableOpacity onPress={() => navigation.navigate('wishList')} style={styles.editProduct}>
                    <Ionicons name="heart-sharp" size={20} color="#00603b" />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.editProduct}>
                    <Ionicons name="heart-outline" size={20} color="#00603b" />
                  </TouchableOpacity>
              }
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
                <Image source={{ uri: `${item.product_image_url}` }} style={{ width: 110, height: 180 }} resizeMode="cover" />
              </TouchableOpacity>
            </View>
            <View style={styles.boxProuductDesc}>
              <View style={styles.boxProuductDescTop}>
                <Text style={styles.boxProuductDescTopText}>{item.product_title}</Text>
              </View>
              <View style={styles.boxProuductDescBottom}>
                <Text style={styles.boxProuductDescBottomtext}>Auction end  <Text style={{ color: "#00603b" }}>{item.countdown_time}</Text></Text>
                <View style={styles.bottomEndSec}>
                  <View>
                    <Text style={styles.bottomEndSecText}>Professional Trader</Text>
                    <Image source={require('../assets/ratting_icon.jpg')} />
                  </View>
                  <View>
                    <Image source={require('../assets/flag.jpg')} style={{ width: 24, height: 16, borderWidth: 1, borderColor: "#a6aeae" }} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

      </View>

    );
  };


  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.product_title);
  };

  return (

    <>
      <View style={styles.HeaderBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 8, top: '35%', zIndex: 99 }}>
          <AntDesign name="arrowleft" size={25} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchbar}>
          <Ionicons name="search" color="#fff" size={25} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#FFF"
            style={styles.input}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
          />
        </View>
      </View>


      <View style={styles.allAuctionWrap}>
        <Text style={styles.allAuctionTitle}>All Auctions</Text>

        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          numColumns={2}
        />


      </View>



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
    marginBottom:50,
    height: "100%",
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
  },
  grid: {
    width: '95%',
    marginHorizontal: 5,
  },
  boxProuduct: {
    backgroundColor: '#ffffff',
    marginBottom: 80,
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
    right: 5,
    top: 4,
    backgroundColor: "#ffffff",
  },
  boxProuductDesc: {
    backgroundColor: "#ffffff",
  },
  boxProuductDescTop: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 5,
    height: 50,
  },
  boxProuductDescTopText: {
    color: "#333333",
    fontSize: 16,
    lineHeight: 22,
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
    paddingBottom: 10,
  },
  bottomEndSec: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomEndSecText: {
    fontSize: 13,
    lineHeight: 16,
    color: "#333333"
  },

});

export default ProductSearchScreen;