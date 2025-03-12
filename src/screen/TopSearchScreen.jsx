import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const TopSearchScreen = ({isLoggedIn, phoneNumber, goToCart}) => {
  console.log(isLoggedIn);
  console.log(phoneNumber);
  const {width, height} = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity>
          <FontAwesome name="user-circle-o" size={38} color={'#0A3981'} />
        </TouchableOpacity>
        <Text style={styles.txt}>{isLoggedIn ? phoneNumber : 'Guest'}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Ionicons name={'search'} size={25} style={styles.searchIcon} />
        <Ionicons name={'notifications'} size={25} style={styles.bellIcon} />
        <MaterialCommunityIcons
          name={'cart'}
          size={25}
          style={styles.cartIcon}
          onPress={goToCart}
        />
      </View>
      {/* <View style={styles.inputContainer}>
        <View style={styles.iconWrapper}>
          <Fontisto name={"search"} size={25} style={styles.icon} />
        </View>
        <TextInput
          placeholder="search here"
          style={styles.txtInput}
          placeholderTextColor="black"
        />
        <View style={styles.iconWrapper}>
          <Octicons name={"filter"} size={25} style={styles.icon1} />
        </View>
      </View> */}
    </View>
  );
};
export default TopSearchScreen;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    flex: 1,
    // backgroundColor: 'pink',
  },
  // userContainer: {
  //   marginVertical: 20,
  //   flexDirection: "row",
  //   gap: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  inputContainer: {
    flex: 2.5,
    borderRadius: 50,
    color: '#0A3981',
    // height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 3,
    borderColor: '#0A3981',
  },
  iconWrapper: {
    width: 50,
    alignItems: 'center',
  },
  icon: {
    color: 'white',
    backgroundColor: '#0A3981',
    padding: 10,
    borderRadius: 50,
  },
  txtInput: {
    flex: 1,
    height: 50,
    fontSize: 18,
    fontFamily: 'Nunito-ExtraBold',
    // backgroundColor: "blue",
  },
  icon1: {
    color: 'white',
    backgroundColor: '#0A3981',
    padding: 10,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    // backgroundColor: 'lightgreen',
    flexDirection: 'row',
    padding: wp(1),
    // justifyContent: 'flex-start',
    // gap: 15,
  },
  txt: {
    fontFamily: 'Nunito-ExtraBold',
    color: '#0A3981',
  },
  searchIcon: {
    color: '#0A3981',
  },
  bellIcon: {
    color: '#0A3981',
    // fontWeight: 'bold',
  },
  cartIcon: {
    color: '#0A3981',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: wp(5),
    flex: 1,
    // backgroundColor: "green",
  },
});
