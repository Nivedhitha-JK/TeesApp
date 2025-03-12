import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CarouselScreen = ({carouselData, goToCart}) => {
  const width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={hp(45)}
        data={carouselData}
        renderItem={({item}) => (
          <LinearGradient colors={['#D4EBF8', '#1F509A']} style={styles.card}>
            {/* <View style={styles.imgContainer}>
              <Image source={item.image} style={styles.img1} />
            </View> */}
            <Image source={item.image} style={styles.img1} />
            {/* <TouchableOpacity style={styles.cartContainer} onPress={goToCart}>
            <MaterialCommunityIcons name={"cart"} size={23} />
          </TouchableOpacity> */}

            <View style={styles.txtContainer}>
              <Text style={styles.bannerTxt}>{item.title}</Text>
              <Text style={styles.subBannerTxt}>{item.subtitle}</Text>
            </View>
          </LinearGradient>
        )}
        autoPlay={true}
        scrollAnimationDuration={1000}
        loop={true}
      />
    </View>
  );
};

export default CarouselScreen;

const styles = StyleSheet.create({
  card: {
    width: wp(95),
    height: hp(25),
    // backgroundColor: "#0A3981",
    borderRadius: wp(3),
    // opacity: 0.9,
    // flex: 1,
    flexDirection: 'row',
    // alignItems: "center",
    // overflow: 'hidden',
    // position: 'relative',
  },
  img1: {
    flex: 1,
    width: wp(25),
    height: hp(25),
    // backgroundColor: 'yellow',
    // padding: wp(1),
    // marginTop:hp(1),
    // paddingHorizontal:wp(10)
  },
  cartContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: 300,
    marginTop: 10,
  },
  txtContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(1),
    padding: wp(1),
  },
  bannerTxt: {
    // fontWeight: "bold",
    fontSize: wp(4),
    fontFamily: 'Nunito-Bold',
  },
  subBannerTxt: {
    // fontWeight: "700",
    letterSpacing: 1,
    fontSize: wp(3.5),
    fontFamily: 'MierA-Book',
  },
  container: {
    // backgroundColor: 'pink',
    height: hp(1),
    borderRadius: 1,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
