import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import ProductCard from '../components/ProductCard';
// import LoaderKit from 'react-native-loader-kit';
import API_BASE_URL from '../config/api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {BallIndicator} from 'react-native-indicators';
const ProductListing = ({product, loading, onProductPress}) => {
  const width = Dimensions.get('window');
  const renderProduct = ({item}) => {
    // const defaultImage = require("../assets/images/pro_1.jpeg");
    // const image = item.images && item.images.length > 0 ? item.images[0] : null;

    // const apiUrl = "http://192.168.20.5:3000/";
    const apiUrl = 'http://localhost:5005/';
    const imgProductUrl = item.images[0];

    const fullImgUrl = `${API_BASE_URL}${imgProductUrl}`;
    console.log(fullImgUrl);
    console.log('Product ID:', item._id);

    // console.log(fullImgUrl);
    return (
      <View style={styles.gridItem}>
        <ProductCard
          name={item.name}
          price={item.price}
          fullImgUrl={fullImgUrl}
          productId={item._id}
          onPress={() => onProductPress(item._id)}
          key={item._id}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={product}
      keyExtractor={item => item._id.toString()}
      renderItem={renderProduct}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={styles.productContainer}
      ListEmptyComponent={
        loading ? (
          <View style={styles.loader} key="loader">
            {/* <LoaderKit
              style={{width: 70, height: 70}}
              name={'Pacman'}
              color={'#0A3981'}
            /> */}
            {/* <PacmanIndicator color="#0A3981" size="90" /> */}
            {/* <BallIndicator color="#0A3981" /> */}
            <Text style={styles.loadTxt}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.imgContainer}>
            <Image
              source={require('../../assets/images/noProductFound.png')}
              style={styles.img}
            />
            <Text style={styles.txt}>No products found</Text>
          </View>
        )
      }
    />
  );
};

export default ProductListing;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'pink',
    // alignItems: "center",
  },
  productContainer: {
    // backgroundColor: 'red',
    marginTop: hp(35),
    padding: wp(1),
    width: wp(95),
  },
  img: {
    width: wp(25),
    height: wp(25),
  },
  imgContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    // backgroundColor: 'green',
    padding: wp(2),
  },
  txt: {
    fontSize: wp(4),
    fontFamily: 'Nunito-Bold',
    color: '#0A3981',
  },
  loader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(5),
    margin: wp(2),
  },
  loadTxt: {
    fontSize: wp(4),
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
});
