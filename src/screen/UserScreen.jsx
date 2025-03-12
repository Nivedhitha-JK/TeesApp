import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderComp from '../components/HeaderComp';
import {iconSize, spacing} from '../constants/dimensions';
import {color} from '../constants/color';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  removePhoneNumber,
  getPhoneNumber,
  removeAuthToken,
} from '../utils/storageService';
import LoginModal from '../components/LoginModal';
import {StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
const UserScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const {phoneNumber} = route.params || {};

  const toEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const getPhnNum = await getPhoneNumber();
      setIsLoggedIn(!!getPhnNum);
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    if (isLoggedIn) {
      await removePhoneNumber();
      await removeAuthToken();
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Please Login', 'You need to log in first to logout.');
      // setIsModalVisible(true);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <HeaderComp />
      <ScrollView>
        <View style={styles.container}>
          {/* header section */}
          <View style={styles.container1}>
            <View style={styles.userView}>
              <Text style={styles.letter}>S</Text>
            </View>

            <TouchableOpacity style={styles.userView1} onPress={toEditProfile}>
              {phoneNumber ? (
                <Text style={styles.txt1}>{phoneNumber}</Text>
              ) : (
                <Text style={styles.txt1}>Saravana</Text>
              )}

              <Entypo name={'chevron-right'} size={25} style={styles.arrow} />
            </TouchableOpacity>
          </View>

          {/* smartcoins section */}
          <View style={styles.container2}>
            <View>
              <Text style={styles.txt3}>SmartCoins</Text>
            </View>
            <TouchableOpacity style={styles.arrBg}>
              <Entypo name={'chevron-right'} size={28} style={styles.arrow1} />
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <TouchableOpacity style={styles.box1}>
              <Feather name="phone-call" size={30} color={'black'} />
              <Text style={styles.bTxt}>Help Centre</Text>
            </TouchableOpacity>
            <View style={styles.box2}>
              <Entypo name="language" size={30} color={'black'} />
              <Text style={styles.bTxt}>Change Language</Text>
            </View>
          </View>

          {/* list section */}
          <View style={styles.listSection}>
            <Text style={styles.headTxt}>My Payments</Text>
            <TouchableOpacity style={styles.list1}>
              <Icon name="account-balance-wallet" size={25} color={'black'}/>
              <Text style={styles.list1Txt}>Bank & UPI Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.list1}>
              <Icon name="payment" size={25} color={'black'}/>
              <Text style={styles.list1Txt}>Payment & Refund</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listSection}>
            <Text style={styles.headTxt}>My Activity</Text>
            <TouchableOpacity style={styles.list1}>
              <Feather name="box" size={25} color={'black'}/>
              <Text style={styles.list1Txt}>Your Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.list1}>
              <Icon name="favorite" size={25} color={'black'}/>
              <Text style={styles.list1Txt}>Wishlisted Products</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.list1}>
              <Entypo name="address" size={25} color={'black'}/>
              <Text style={styles.list1Txt}>Your Address</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listSection}>
            <Text style={styles.headTxt}>Others</Text>
            {/* <TouchableOpacity style={styles.list1}>
            <Feather name="box" size={25} color="#000" />
            <Text style={styles.list1Txt}>Community</Text>
          </TouchableOpacity> */}
            <TouchableOpacity style={styles.list1}>
              <AntDesign name="star" size={25} color={'black'}/>
              <Text style={styles.list1Txt}>Rate Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.list1} onPress={handleLogout}>
              <MaterialIcons name="logout" size={25} color={'black'}/>
              <Text style={styles.list1Txt}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <LoginModal toggleModal={toggleModal} isModalVisible={isModalVisible} />
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    marginVertical: hp(2),
    // padding: wp(3),
    // backgroundColor: 'green',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(1),
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#7F8487',
    marginTop: 5,
    marginLeft: 5,
    fontFamily: 'Nunito-Bold',
  },
  container1: {
    backgroundColor: '#0A3981',
    flex: 1,
    // backgroundColor: 'red',
    width: wp(95),
    // height: hp(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userView: {
    width: wp(22),
    height: hp(10),
    backgroundColor: 'white',
    borderRadius: wp(25),
    margin: wp(5),
  },
  userView1: {
    margin: wp(1),
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  letter: {
    fontWeight: 'bold',
    fontSize: wp(15),
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    color: 'black',
  },
  txt1: {
    fontWeight: 'bold',
    fontSize: wp(5),
    letterSpacing: 2,
    color: 'white',
    fontFamily: 'Nunito-Bold',
  },
  arrow: {
    color: 'white',
  },
  container2: {
    width: wp(95),
    flexDirection: 'row',
    backgroundColor: '#0A3981',
    padding: wp(2),
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt3: {
    color: 'white',
    letterSpacing: 1,
    fontSize: wp(4),
    fontFamily: 'Nunito-Bold',
  },
  arrow1: {
    color: 'black',
  },
  arrBg: {
    backgroundColor: 'white',
    borderRadius: wp(5),
  },
  box1: {
    // width: 170,
    // height: 100,
    // flex: 1,
    height: hp(12),
    width: wp(45),
    borderWidth: 2,
    borderRadius: wp(2),
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: hp(1),
    fontFamily: 'Helvetica',
    cursor: 'pointer',
    padding: wp(2),
  },
  box2: {
    // width: 170,
    // height: 100,
    // flex: 1,
    height: hp(12),
    width: wp(45),
    borderWidth: 2,
    borderRadius: wp(2),
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: hp(1),
    fontFamily: 'Helvetica',
    cursor: 'pointer',
  },
  box: {
    flex: 1,
    width: wp(95),
    flexDirection: 'row',
    gap: wp(2),
    // backgroundColor: 'yellow',
    padding: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bTxt: {
    fontSize: wp(3.5),
    letterSpacing: 1,
    color: '#0A3981',
    fontFamily: 'Nunito-Bold',
  },
  headTxt: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: '#0A3981',
    fontFamily: 'Nunito-Bold',
    // marginTop: 10,
    // marginBottom: 10,
  },
  list1: {
    flex: 1,
    width: wp(93),
    flexDirection: 'row',
    gap: hp(2),
    // backgroundColor: 'pink',
    padding: wp(2),
    margin: wp(1),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#D3D3D3',
    // marginVertical: 10,
  },
  list1Txt: {
    fontSize: wp(4.5),
    fontFamily: 'Nunito-Bold',
    color: 'black',
    // marginBottom: 20,
  },
  listSection: {
    flex: 1,
    width: wp(95),
    // backgroundColor: 'blue',
    gap: hp(1),
    // marginTop: 15,
  },
  safeArea: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
