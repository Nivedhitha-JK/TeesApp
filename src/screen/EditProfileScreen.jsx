import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import UserScreen from './UserScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PrimaryScreen from './PrimaryScreen';
import OtherInfoScreen from './OtherInfoScreen';
import SettingsScreen from './SettingsScreen';

const EditProfileScreen = ({route}) => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();

  const backToUser = () => {
    navigation.navigate('UserScreen');
  };
  const {phoneNumber} = route.params || {};

  console.log('received phn num', phoneNumber);
  return (
    <View style={styles.container}>
      {/* <View style={styles.tab}>
        <TouchableOpacity onPress={backToUser}>
          <Entypo name={"chevron-left"} size={30} />
        </TouchableOpacity>
        <Text style={styles.txt}>EDIT PROFILE INFORAMTION</Text>
      </View> */}

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#000000',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            // fontFamily: 'Helvetica',
          },
          tabBarInactiveTintColor: '#808080',
          tabBarStyle: {backgroundColor: '#FFFFFF'},
          tabBarIndicatorStyle: {
            backgroundColor: '#000000',
            height: 3,
          },
        }}>
        <Tab.Screen
          name="Primary"
          component={PrimaryScreen}
          // phoneNumber={phoneNumber}
          initialParams={{phoneNumber}}
        />
        <Tab.Screen name="Other Info" component={OtherInfoScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    // borderBottomWidth: 1,
    // borderBottomColor: "black",
    // paddingVertical: 10,
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 3,
    letterSpacing: 1,
    // fontFamily: "Helvetica",
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
