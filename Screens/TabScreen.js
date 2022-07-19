import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from './HomeScreen';
import WatchCollectionScreen from './WatchCollectionScreen'
import AccountScreen from './AccountScreen';
import SettingsScreen from './SettingsScreen';
import WishList from './WishList';
import ProductDetails from './ProductDetails';
import SuggestPriceScreen from './SuggestPriceScreen';
import AuctionDetailsEndScreen from './AuctionDetailsEndScreen';
import BrandProductListScreen from './BrandProductListScreen';
import BrandListingScreen from './BrandListingScreen';
import AuctionExpireListingScreen from './AuctionExpireListingScreen';
import SupportScreen from './SupportScreen';
import ProfileEditScreen from './ProfileEditScreen';
import AddAuctionScreen from './AddAuctionScreen';
import EditAuctionScreen from './EditAuctionScreen';
import AllAuctionUserScreen from './AllAuctionUserScreen';
import AllAuctionSellerScreen from './AllAuctionSellerScreen';
import ProductSearchScreen from './ProductSearchScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import PayWithStripe from './PayWithStripeScreen';
import PayWithPaypal from './PayWithPaypalScreen';
import PaypalOrStripe from './PaypalOrStripeScreen';
import Checkout from './CheckoutScreen';
import DirectOrderCheckout from './DirectOrderCheckoutScreen';
import SellingOrdersScreen from './SellingOrdersScreen';
import ChatScreen from './ChatScreen';
import AffiliateOrdersScreen from './AffiliateOrdersScreen';
import BuyingOrdersScreen from './BuyingOrdersScreen';
import SellerMyBrandScreen from './SellerMyBrandScreen';
import CollaborationBrandScreen from './CollaborationBrandScreen';
import RewardScreen from './RewardScreen';
import RefineSearchScreen from './RefineSearchScreen';

import CountryListingScreen from './CountryListingScreen';
import LanguageListingScreen from './LanguageListingScreen';
import CurrencyListingScreen from './CurrencyListingScreen';

import ParticipatedAuctionScreen from './ParticipatedAuctionScreen';

import TestFontScreen from './TestFontScreen';

import { useTranslation } from 'react-i18next';

//Home tab screen
const HomeStack = createStackNavigator();
const HomeStackScreens = () => {
  const { t, i18n } = useTranslation();
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='Homee' component={HomeScreen} />
      {/* <WishlistStack.Screen name='AllAuctionUserScreen' component={AllAuctionUserScreen} /> */}
      <HomeStack.Screen name='AllAuctionUserScreen' component={AllAuctionUserScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='ProductDetails' component={ProductDetails} options={{ headerShown: false }} />
      <HomeStack.Screen name='BrandProductListScreen' component={BrandProductListScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='BrandListingScreen' component={BrandListingScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='AuctionExpireListingScreen' component={AuctionExpireListingScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='ChangePasswordScreen' component={ChangePasswordScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='PaypalOrStripe' component={PaypalOrStripe} options={{ headerShown: false }} />
      <HomeStack.Screen name='PayWithStripe' component={PayWithStripe} options={{ headerShown: false }} />
      <HomeStack.Screen name='PayWithPaypal' component={PayWithPaypal} options={{ headerShown: false }} />
      <HomeStack.Screen name='Checkout' component={Checkout} options={{ headerShown: false }} />
      <HomeStack.Screen name='DirectOrderCheckout' component={DirectOrderCheckout} options={{ headerShown: false }} />
      <HomeStack.Screen name='AddAuctionScreen' component={AddAuctionScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}

//Wishlist tab screen
const WishlistStack = createStackNavigator();
const WishlisStackScreens = () => {
  return (
    <WishlistStack.Navigator screenOptions={{ headerShown: false }}>
      <WishlistStack.Screen name='WishList' component={WishList} />
      {/* <WishlistStack.Screen name='BrandListingScreen' component={BrandListingScreen} options={{ headerShown: false }}/> */}
      {/* <WishlistStack.Screen name='AllAuctionUserScreen' component={AllAuctionUserScreen} /> */}
      {/* <WishlistStack.Screen name='ProductSearchScreen' component={ProductSearchScreen} /> */}
      <WishlistStack.Screen name='ProductDetails' component={ProductDetails} options={{ headerShown: false }} />
      <WishlistStack.Screen name='ChangePasswordScreen' component={ChangePasswordScreen} options={{ headerShown: false }} />
      <WishlistStack.Screen name='PaypalOrStripe' component={PaypalOrStripe} options={{ headerShown: false }} />
      <WishlistStack.Screen name='PayWithStripe' component={PayWithStripe} options={{ headerShown: false }} />
      <WishlistStack.Screen name='PayWithPaypal' component={PayWithPaypal} options={{ headerShown: false }} />
      <WishlistStack.Screen name='Checkout' component={Checkout} options={{ headerShown: false }} />
      <WishlistStack.Screen name='DirectOrderCheckout' component={DirectOrderCheckout} options={{ headerShown: false }} />
    </WishlistStack.Navigator>
  )
}

//Add Auction tab screen
const AuctionsProgressStack = createStackNavigator();
const AuctionsProgressStackScreens = () => {
  return (
    <AuctionsProgressStack.Navigator screenOptions={{ headerShown: false }}>
      <AuctionsProgressStack.Screen name='WatchCollectionScreen' component={WatchCollectionScreen} options={{ headerShown: false }} />
      <AuctionsProgressStack.Screen name='AddAuctionScreen' component={AddAuctionScreen} options={{ headerShown: false }} />
    </AuctionsProgressStack.Navigator>
  )
}


//Sell tab screen
const AllAuctionUserStack = createStackNavigator();
const AllAuctionUserStackScreen = () => {
  return (
    <AllAuctionUserStack.Navigator screenOptions={{ headerShown: false }}>
      <AllAuctionUserStack.Screen name='AllAuctionUserScreen' component={AllAuctionUserScreen} options={{ headerShown: false }} />
      <AllAuctionUserStack.Screen name='ProductDetails' component={ProductDetails} options={{ headerShown: false }} />
      <AllAuctionUserStack.Screen name='PaypalOrStripe' component={PaypalOrStripe} options={{ headerShown: false }} />
      <AllAuctionUserStack.Screen name='PayWithStripe' component={PayWithStripe} options={{ headerShown: false }} />
      <AllAuctionUserStack.Screen name='PayWithPaypal' component={PayWithPaypal} options={{ headerShown: false }} />
      <AllAuctionUserStack.Screen name='Checkout' component={Checkout} options={{ headerShown: false }} />
      <AllAuctionUserStack.Screen name='DirectOrderCheckout' component={DirectOrderCheckout} options={{ headerShown: false }} />
      <AllAuctionUserStack.Screen name='RefineSearchScreen' component={RefineSearchScreen} options={{ headerShown: false }} />
    </AllAuctionUserStack.Navigator>
  )
}


//Account tab screen
const AccountStack = createStackNavigator();
const AccountStackScreens = () => {

  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name='Account' component={AccountScreen} />
      <AccountStack.Screen name='SellingOrdersScreen' component={SellingOrdersScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='ChatScreen' component={ChatScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='AffiliateOrdersScreen' component={AffiliateOrdersScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='BuyingOrdersScreen' component={BuyingOrdersScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='SellerMyBrandScreen' component={SellerMyBrandScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='CollaborationBrandScreen' component={CollaborationBrandScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='SettingsScreen' component={SettingsScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='RewardScreen' component={RewardScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='SupportScreen' component={SupportScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='ParticipatedAuctionScreen' component={ParticipatedAuctionScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='AddAuctionScreen' component={AddAuctionScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='EditAuctionScreen' component={EditAuctionScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='AllAuctionSellerScreen' component={AllAuctionSellerScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='ProfileEditScreen' component={ProfileEditScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='ChangePasswordScreen' component={ChangePasswordScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='ProductDetails' component={ProductDetails} options={{ headerShown: false }} />
      <AccountStack.Screen name='PaypalOrStripe' component={PaypalOrStripe} options={{ headerShown: false }} />
      <AccountStack.Screen name='PayWithStripe' component={PayWithStripe} options={{ headerShown: false }} />
      <AccountStack.Screen name='PayWithPaypal' component={PayWithPaypal} options={{ headerShown: false }} />
      <AccountStack.Screen name='Checkout' component={Checkout} options={{ headerShown: false }} />
      <AccountStack.Screen name='DirectOrderCheckout' component={DirectOrderCheckout} options={{ headerShown: false }} />
      <AccountStack.Screen name='CountryListingScreen' component={CountryListingScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='LanguageListingScreen' component={LanguageListingScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='CurrencyListingScreen' component={CurrencyListingScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name='TestFontScreen' component={TestFontScreen} options={{ headerShown: false }} />
    </AccountStack.Navigator>
  )
}



const Tab = createBottomTabNavigator();
const TabScreen = () => {
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60,
        paddingBottom: 5,
        paddingTop: 2
      },
      tabBarActiveTintColor: "#00603b"
    }}>
      <Tab.Screen name="Home" component={HomeStackScreens}
        options={{
          tabBarLabel: t("Home"),
          tabBarLabelStyle: {
            color: "#333333",
            fontSize: 16
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={25} />
          ),
        }} />
      <Tab.Screen name="wishList" component={WishlisStackScreens}
        options={{
          tabBarLabel: t("Favorites"),
          tabBarLabelStyle: {
            color: "#333333",
            fontSize: 16
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="watchcollection" component={AllAuctionUserStackScreen} 
        options={{
          tabBarLabel: t("Auctions_in_progress"),
          tabBarLabelStyle: {
            color: "#333333",
            fontSize: 16
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="watch" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="vendi" component={AuctionsProgressStackScreens}
        options={{
          tabBarLabel: t("Sell"),
          tabBarLabelStyle: {
            color: "#333333",
            fontSize: 16
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tag-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="account" component={AccountStackScreens}
        options={{
          tabBarLabel: t("Account"),
          tabBarLabelStyle: {
            color: "#333333",
            fontSize: 16
          },
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({

})

export default TabScreen;
