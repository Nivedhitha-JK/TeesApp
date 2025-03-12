import {StyleSheet, View, Dimensions, Alert} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import ProductCard from '../components/ProductCard';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CartScreen from './CartScreen';
import axios from 'axios';
import SubCategoryScreen from './SubCategoryScreen';
import TopSearchScreen from './TopSearchScreen';
import LoginModal from './LoginModal';
import API_BASE_URL from '../config/api';
import CarouselScreen from './CarouselScreen';
import ProductListing from './ProductListing';
import {
  savePhoneNumber,
  getPhoneNumber,
  removePhoneNumber,
} from '../utils/storageService';
import {fetchProducts} from '../utils/apiService';
import PaymentScreen from './PaymentScreen';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const HomeScreen = () => {
  const {width, height} = Dimensions.get('window').width;

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  //login modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const route = useRoute();
  const userName = route.params || {};
  console.log(
    'Received user data in HomeScreen from primary screen:',
    userName,
  );

  // check login status when app starts

  useFocusEffect(
    React.useCallback(() => {
      const checkLoginStatus = async () => {
        const storedPhoneNum = await getPhoneNumber();
        if (storedPhoneNum) {
          setIsLoggedIn(true);
          setPhoneNumber(storedPhoneNum);
        } else {
          setIsLoggedIn(false);
          setPhoneNumber('');
        }
      };

      checkLoginStatus();
    }, []),
  );

  // fetch data from api

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true); // loading starts
  //     try {
  //       const response = await axios.post(`${API_BASE_URL}productList`);
  //       console.log(response.data.products);
  //       // const apiUrl = "http://192.168.20.5:3000/";
  //       // const imgProductUrl = response.data.products[0].images[0];

  //       // const fullImgUrl = `${apiUrl}${imgProductUrl}`;
  //       setProduct(response.data.products);
  //     } catch (error) {
  //       console.error("Error fetching data", error);
  //     } finally {
  //       setLoading(false); // loading ends
  //     }
  //   };
  //   fetchProducts();
  // }, []); // empty array ensures it run only once

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts();
        console.log(response);
        setProduct(response);
      } catch (error) {
        console.error('Error fetching products nil', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // data for carousel

  const carouselData = useMemo(
    () => [
      {
        title: 'Express Yourself',
        subtitle: 'through Fashion 💛',
        colors: ['#D4EBF8', '#1F509A'], // Gradient colors
        // image: require("../assets/images/ad_img2-removebg-preview.png"),
        image: require('../../assets/girlImg.png'),
      },
      {
        title: 'Discover New Styles',
        subtitle: 'every day 🌟',
        colors: ['#D4EBF8', '#1F509A'],
        // image: require('../assets/images/Men_WoBg.png'),
        image: require('../../assets/menImg.png'),
      },
      {
        title: 'Stay in Trend',
        subtitle: 'with us 😇',
        colors: ['#D4EBF8', '#1F509A'],
        image: require('../../assets/kidImg.png'),
      },
    ],
    [],
  );

  const navigation = useNavigation();

  const goToCart = () => {
    navigation.navigate('CartScreen');
  };

  // allow users to type numerics only

  const handleInputChange = txt => {
    const numericVal = txt.replace(/[^0-9]/g, '');
    setPhoneNumber(numericVal);
  };

  //login

  const loginSubmit = async () => {
    const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);
    if (isValidPhoneNumber) {
      await savePhoneNumber(phoneNumber);
      setIsLoggedIn(true);
      setIsModalVisible(false);
      navigation.navigate('EnterOtpScreen', {phoneNumber});
    } else {
      Alert.alert('Invalid Number', 'Please enter a 10-digit phone number.');
    }
  };

  // clear phn num

  const clearPhoneNum = () => {
    setPhoneNumber('');
  };
  const toggleModal = () => {
    console.log('Toggle Btn is clickeddddd');
    setIsModalVisible(!isModalVisible);
  };

  const renderProduct = ({item}) => {
    // const defaultImage = require("../assets/images/pro_1.jpeg");
    // const image = item.images && item.images.length > 0 ? item.images[0] : null;

    const apiUrl = 'http://192.168.20.5:3000/';
    const imgProductUrl = item.images[0];

    const fullImgUrl = `${apiUrl}${imgProductUrl}`;
    console.log('Product ID:', item._id);

    // console.log(fullImgUrl);
    return (
      <View style={styles.gridItem}>
        <ProductCard
          name={item.name}
          price={item.price}
          fullImgUrl={fullImgUrl}
          productId={item._id}
          onPress={() =>
            navigation.navigate('ProductShow', {productId: item._id})
          }
        />
      </View>
    );
  };

  // fetch api

  // product details navigation

  const handleProductPress = productId => {
    navigation.navigate('ProductShow', {productId});
  };

  //logout function
  const logout = async () => {
    await removePhoneNumber();
    setIsLoggedIn(false);
    setPhoneNumber('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TopSearchScreen
            toggleModal={toggleModal}
            isLoggedIn={isLoggedIn}
            phoneNumber={phoneNumber}
            goToCart={goToCart}
          />
          <LoginModal
            isVisible={isModalVisible}
            phoneNumber={phoneNumber}
            toggleModal={toggleModal}
            handleInputChange={handleInputChange}
            loginSubmit={loginSubmit}
            isLoggedIn={isLoggedIn}
          />
        </View>

        {/* subcategoryscreen component to show sub categories */}
        <View style={styles.subCategoryContainer}>
          <SubCategoryScreen />
        </View>

        <CarouselScreen carouselData={carouselData} goToCart={goToCart} />

        <ProductListing
          product={product}
          loading={loading}
          onProductPress={handleProductPress}
        />

        {/* <FlatList
        data={product}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.productContainer}
        ListEmptyComponent={
          loading ? (
            <Text style={{ textAlign: "center", marginTop: 30 }}>
              Loading...
            </Text>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No products found.
            </Text>
          )
        }
      /> */}
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(1),
    gap: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // backgroundColor: 'green',
  },
  topContainer: {
    // height: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // gap: 15,
    // backgroundColor: 'blue',
  },
  productContainer: {
    // backgroundColor: "green",
    marginTop: 320,
  },
  subCategoryContainer: {
    // backgroundColor: 'green',
    // height: hp(20),
    marginVertical: hp(1),
    // flex: 1,
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    // backgroundColor: 'white',
  },
});
