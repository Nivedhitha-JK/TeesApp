import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window'); // Get device dimensions

const CategoryScreen = () => {
  const navigation = useNavigation();

  const handleCategoryPress = category => {
    console.log(category);
    navigation.navigate('CategoryProductListing', {category});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        {/* New Arrivals */}
        <TouchableOpacity
          style={styles.wCategory}
          onPress={() => handleCategoryPress('New Arrivals')}>
          <View>
            <Text style={styles.cTxt}>Explore</Text>
            <Text style={styles.cTxt}>Our New Arrivals</Text>
          </View>
          <Image
            source={require('../../assets/images/family1resize.png')}
            style={styles.aCard}
          />
        </TouchableOpacity>

        {/* Women */}
        <TouchableOpacity
          style={styles.wCategory}
          onPress={() => handleCategoryPress('Women')}>
          <View>
            <Text style={styles.cTxt}>Women</Text>
            <Text style={styles.cTxt}>Upto 30% Offer</Text>
          </View>
          <Image
            source={require('../../assets/images/women_category.png')}
            style={styles.wCard}
          />
        </TouchableOpacity>

        {/* Men */}
        <TouchableOpacity
          style={styles.wCategory}
          onPress={() => handleCategoryPress('Men')}>
          <View>
            <Text style={styles.cTxt}>Men</Text>
            <Text style={styles.cTxt}>Upto 20% Offer</Text>
          </View>
          <Image
            source={require('../../assets/images/mCategory.png')}
            style={styles.mCard}
          />
        </TouchableOpacity>

        {/* Kids */}
        <TouchableOpacity
          style={styles.wCategory}
          onPress={() => handleCategoryPress('Kids')}>
          <View>
            <Text style={styles.cTxt}>Kids</Text>
            <Text style={styles.cTxt}>Upto 40% Offer</Text>
          </View>
          <Image
            source={require('../../assets/images/kidCategory.png')}
            style={styles.kCard}
          />
        </TouchableOpacity>

        {/* Price Section */}
        <View style={styles.priceContainer}>
          {['₹ UNDER 99', '₹ UNDER 199', '₹ UNDER 299', '₹ UNDER 399'].map(
            (price, index) => (
              <View key={index} style={styles.priceBox}>
                <Text style={styles.priceTxt}>{price}</Text>
              </View>
            ),
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    // backgroundColor: 'green',
    // margin: width * 0.03, // Adjust margin based on screen size
    // gap: height * 0.00,
    margin: wp(3),
    gap: hp(2),
  },
  wCategory: {
    width: wp(95),
    height: hp(16),
    backgroundColor: '#0A3981',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(2),
    flexDirection: 'row',
    paddingHorizontal: wp(1),
    // marginBottom: height * 0.02,
  },
  cTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4%'), // Scale text size
    marginLeft: wp(3),
  },
  wCard: {
    width: wp(100),
    height: hp(15),
    resizeMode: 'contain',
    marginLeft: wp(-6),
    marginTop: hp(1),
  },
  mCard: {
    width: wp(100),
    height: hp(15),
    resizeMode: 'contain',
    marginLeft: wp(-6),
    marginTop: hp(1),
  },
  kCard: {
    width: wp(100),
    height: hp(15),
    resizeMode: 'contain',
    marginLeft: wp(-6),
    marginTop: hp(1),
  },
  aCard: {
    width: wp(100),
    height: hp(16),
    resizeMode: 'contain',
    marginLeft: wp(-6),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginTop: height * 0.02,
  },
  priceBox: {
    backgroundColor: '#0A3981',
    borderRadius: wp(10),
    width: wp(19),
    height: hp(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTxt: {
    color: 'white',
    fontSize: width * 0.035, // Scale text
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
