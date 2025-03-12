import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ProductShow from './ProductShow';
import {addWishlist, removeWishlist} from '../utils/apiService';
import {useToast} from 'react-native-toast-notifications';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ProductCard = ({
  name,
  price,
  fullImgUrl,
  productId,
  onPress,

  // onProductPress,
}) => {
  // const width = Dimensions.get('windows');
  const [isLike, setIsLike] = useState(false);

  const toast = useToast();

  // const handleLike = async () => {
  //   try {
  //     if (isLike) {
  //       console.log("UnWishlisted Product ID is ", productId);

  //       const response = await removeWishlist(productId);
  //       console.log("Product removed from wishlist response:", response);
  //       if (response && response.message === "Product removed from wishlist") {
  //         // setIsLike(false);
  //         setIsLike((prevState) => !prevState);
  //         toast.show("Product removed from wishlist!", {
  //           type: "normal",
  //           placement: "bottom",
  //           duration: 2000,
  //           animationType: "slide-in",
  //         });
  //       }
  //     } else {
  //       console.log("Wishlisted Product ID is ", productId);
  //       const response = await addWishlist(productId);
  //       console.log("Product Added to wishlist response:", response);

  //       if (
  //         response &&
  //         response.data?.message === "Product added to wishlist"
  //       ) {
  //         // setIsLike((prevState) => !prevState);
  //         setIsLike(true);
  //         toast.show("Product added to wishlist!", {
  //           type: "normal",
  //           placement: "bottom",
  //           duration: 2000,
  //           animationType: "slide-in",
  //         });
  //       } else if (
  //         response &&
  //         response.message === "Product already exists in the wishlist"
  //       ) {
  //         setIsLike(true);
  //         toast.show(response.message, {
  //           type: "normal",
  //           placement: "bottom",
  //           duration: 2000,
  //           animationType: "slide-in",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error(
  //       " Error while updating to wishlist:",
  //       error.response || error.response?.message
  //     );

  //     Alert.alert(
  //       "Failed to add to wishlist. Try again!",
  //       error.response?.message || error.message
  //     );
  //   }
  // };

  const handleLike = async () => {
    console.log('Handling wishlist product func', productId);

    try {
      toast.hideAll();
      if (isLike) {
        console.log('Handling Unwishlist product', productId);
        const response = await removeWishlist(productId);
        console.log('remove wishlist response', response);

        setIsLike(false);
        if (
          response &&
          response.data?.message === 'Product removed from wishlist'
        ) {
          toast.show(response.data?.message, {
            type: 'normal',
            placement: 'bottom',
            duration: 1000,
            animationType: 'slide-in',
            style: {width: '90%'},
          });
        } else if (
          response &&
          response.message === 'Product not found in wishlist'
        ) {
          toast.show(response.message, {
            type: 'normal',
            placement: 'bottom',
            duration: 1000,
            animationType: 'slide-in',
            style: {width: '90%'},
          });
        }
      } else {
        console.log('Handling wishlist product', productId);
        const response = await addWishlist(productId);
        console.log('Addwishlist api response', response);
        if (response && response.message === 'Product added to wishlist') {
          setIsLike(true);
          toast.show(response.message, {
            type: 'normal',
            placement: 'bottom',
            duration: 1000,
            animationType: 'slide-in',
            style: {
              width: '90%',
              //  borderRadius: 50
            },
          });
        } else if (
          response &&
          response.message === 'Product already exists in the wishlist'
        ) {
          toast.show(response.message, {
            type: 'normal',
            placement: 'bottom',
            duration: 1000,
            animationType: 'slide-in',
            style: {
              width: '90%',
              //  borderRadius: 50
            },
          });
        }
      }
    } catch (error) {
      console.error('Error while updating wishlist', error.response);
      Alert.alert(
        'Error while updating wishlist',
        error.response?.message || error.response,
      );
    }
  };

  const navigation = useNavigation();

  // goToProductShowPage = () => {
  //   navigation.navigate("ProductShow", { name, price, fullImgUrl, productid });
  // };

  // console.log("product Id", productId);
  // console.log(fullImgUrl);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{uri: fullImgUrl}}
          // source={require("../assets/images/pro_1.jpeg")}
          style={styles.proImg}
        />
      </TouchableOpacity>

      <Text style={styles.proTxt}>{name}</Text>
      <Text style={styles.proTxt1}>
        {price ? `$${price}` : 'price not available'}
      </Text>
      <TouchableOpacity style={styles.likecontainer} onPress={handleLike}>
        {isLike ? (
          <AntDesign
            name={'heart'}
            size={15}
            color={'red'}
            style={{margin: 10}}
          />
        ) : (
          <AntDesign
            name={'hearto'}
            size={15}
            color={'red'}
            style={{margin: 10}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  proImg: {
    height: 250,
    width: '90%',
    borderRadius: 25,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    // flexDirection: "column",
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative',
    // backgroundColor: "lightgreen",
    width: 200,
  },
  proTxt: {
    fontSize: 14,
    marginLeft: 15,
    fontWeight: '600',
  },
  proTxt1: {
    fontSize: 14,
    marginLeft: 15,
    marginTop: 5,
    fontWeight: '600',
    color: 'gray',
  },
  likecontainer: {
    height: 35,
    width: 35,
    backgroundColor: 'white',
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 40,
    position: 'absolute',
    top: 20,
    right: 18,
  },
});
