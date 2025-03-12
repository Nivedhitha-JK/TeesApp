import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SubCategoryScreen = () => {
  const {width, height} = Dimensions.get('window');
  // dummy subcategory datas to use
  const subCategories = [
    {
      name: 'New Arrivals',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
    {
      name: 'Men',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
    {
      name: 'Women',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
    {
      name: 'Kids',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
    {
      name: 'Women',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
    {
      name: 'Kids',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
    {
      name: 'Kids',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
    {
      name: 'Kids',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
    {
      name: 'Women',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
    {
      name: 'Men',
      image: require('../../assets/categoryImages/subCategory_Men.png'),
    },
  ];

  const renderSubCategory = ({item}) => {
    return (
      <View style={styles.subCircle}>
        <Image style={styles.categoryImg} source={item.image} />
        <Text style={styles.categoryTxt} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={subCategories}
        renderItem={renderSubCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.FlatlistContent}
      />
    </View>
  );
};

export default SubCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 5,
    // backgroundColor: 'red',
    height: hp(15),
  },
  subCircle: {
    backgroundColor: '#0A3981',
    width: 65,
    height: 60,
    // borderRadius: 40,
    marginVertical: 20,
    // position: 'absolute',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative',
  },
  subCategory: {
    color: 'white',
  },
  categoryImg: {
    width: 40,
    height: 80,
  },
  FlatlistContent: {
    width: wp(100),
    // height: hp(10),
    flex: 1,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    gap: wp(2),
  },
  categoryTxt: {
    color: 'black',
    // fontWeight: "bold",
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
});
