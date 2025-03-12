import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCard from '../components/ProductCard';
import {getIsNewUserInfo} from '../utils/storageService';
import {getWishlistedProducts} from '../utils/apiService';
// import LoaderKit from 'react-native-loader-kit';
import API_BASE_URL from '../config/api';
import {useFocusEffect} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
const WishlistScreen = ({navigation}) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchWishlist = async () => {
        try {
          const userInfo = await getIsNewUserInfo();
          // console.log("getuserinfo from storage", userInfo);
          const userId = userInfo.id;
          // console.log("get user id", userId);
          if (userInfo && userInfo.id) {
            console.log('userInfo id', userInfo.id);
            const response = await getWishlistedProducts(userId);
            console.log('getwishlisted products response', response.data);
            // const fullImgUrl = `${API_BASE_URL}${response.data.wishlist.items[0].images}`;
            // console.log(fullImgUrl);
            setWishlist(response.data.wishlist);
          }
        } catch (error) {
          console.error('error while get wishlisted products', error);
        } finally {
          setLoading(false);
        }
      };
      // console.log(wishlist);
      fetchWishlist();
    }, []),
  );

  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       const userInfo = await getIsNewUserInfo();
  //       // console.log("getuserinfo from storage", userInfo);
  //       const userId = userInfo.id;
  //       // console.log("get user id", userId);
  //       if (userInfo && userInfo.id) {
  //         console.log("userInfo id", userInfo.id);
  //         const response = await getWishlistedProducts(userId);
  //         console.log("getwishlisted products response", response.data);
  //         // const fullImgUrl = `${API_BASE_URL}${response.data.wishlist.items[0].images}`;
  //         // console.log(fullImgUrl);
  //         setWishlist(response.data.wishlist);
  //       }
  //     } catch (error) {
  //       console.error("error while get wishlisted products", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   // console.log(wishlist);
  //   fetchWishlist();
  // }, []);

  const renderProduct = ({item}) => {
    const fullImgUrl = `${API_BASE_URL}${item.images}`;
    console.log(fullImgUrl);
    return (
      <View style={styles.productShow}>
        <ProductCard
          product={item}
          name={item.name}
          price={item.price}
          fullImgUrl={fullImgUrl}
          productId={item._id}
          onPress={() => onProductPress(item._id)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.headContainer}>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="chevron-back" size={25} />
        </TouchableOpacity> */}
          {/* <Text style={styles.txt}>MY WISHLISTED PRODUCTS</Text> */}
          {loading ? (
            // <LoaderKit
            //   style={{width: 70, height: 70}}
            //   name={'Pacman'}
            //   color={'#0A3981'}
            // />
            <SkypeIndicator color="#0A3981" />
          ) : // <Text>load</Text>
          wishlist && wishlist.items?.length === 0 ? (
            <View style={styles.wishlistContainer}>
              <Text style={styles.txt}>Your wishlist is Empty...☹️</Text>
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={100}
                color={'#0A3981'}
              />
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTxt}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={wishlist.items}
              keyExtractor={item => item._id.toString()}
              renderItem={renderProduct}
              contentContainerStyle={styles.listContainer}
              numColumns={2}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 10,
    // backgroundColor: "green",
    // justifyContent: "center",
    // alignItems: "center",
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#0A3981',
    textAlign: 'center',
  },
  wishlistContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 10,
    // backgroundColor: "lightblue",
    margin: 10,
    padding: 10,
  },
  btn: {
    backgroundColor: '#0A3981',
    padding: 10,
    borderRadius: 5,
  },
  btnTxt: {
    color: 'white',
  },
  productShow: {
    marginTop: 10,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
