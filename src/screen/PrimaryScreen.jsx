import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native';
import {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const PrimaryScreen = ({route}) => {
  const navigation = useNavigation();

  const {phoneNumber} = route.params || {};
  console.log('received phn num in primary screen', phoneNumber);

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(phoneNumber || '');
  const [email, setEmail] = useState('');
  const [value, setValue] = useState(null);
  const [pincode, setPinCode] = useState();
  const [city, setCity] = useState();
  const [password, setPassword] = useState();

  // gender

  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ]);

  // languages

  const [languageOpen, setlanguageOpen] = useState();
  const [selectedLanguage, setselectedLanguage] = useState();
  const [languageItems, setLanguageItems] = useState([
    {label: 'Tamil', value: 'Tamil'},
    {label: 'English', value: 'English'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'Malayalam', value: 'Malayalam'},
    {label: 'Kannada', value: 'Kannada'},
    {label: 'Telugu', value: 'Telugu'},
  ]);

  // occupation

  // const [occupationOpen, setOccupationOpen] = useState();
  // const [selectedOccupation, setSelectedOccupation] = useState();
  // const [occupationItems, setOccupationItems] = useState([
  //   { label: "Teacher", value: "Teacher" },
  //   { label: "Developer", value: "Developer" },
  //   { label: "Police", value: "Police" },
  //   { label: "Dancer", value: "Dancer" },
  //   { label: "Driver", value: "Driver" },
  // ]);

  // state

  const [stateOpen, setStateOpen] = useState();
  const [selectedState, setSelectedState] = useState();
  const [stateItems, setStateItems] = useState([
    {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
    {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
    {label: 'Assam', value: 'Assam'},
    {label: 'Bihar', value: 'Bihar'},
    {label: 'Chhattisgarh', value: 'Chhattisgarh'},
    {label: 'Goa', value: 'Goa'},
    {label: 'Gujarat', value: 'Gujarat'},
    {label: 'Haryana', value: 'Haryana'},
    {label: 'Jharkhand', value: 'Jharkhand'},
    {label: 'Karnataka', value: 'Karnataka'},
    {label: 'Tamil Nadu', value: 'Tamil Nadu'},
  ]);

  const resetForm = () => {
    setPhoto(null),
      setName(''),
      setPhone(''),
      setEmail(''),
      setPassword(''),
      setSelectedGender(null),
      // setSelectedOccupation(null),
      setSelectedState(null),
      setselectedLanguage([]),
      setPinCode(''),
      setCity('');
  };

  const getFormData = () => {
    return {
      photo,
      name,
      phone,
      email,
      // gender: selectedGender,
      // occupation: selectedOccupation,
      // language: selectedLanguage,
      // state: selectedState,
      // pincode,
      // city,
    };
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedPhoneNum = await AsyncStorage.getItem('phone');
        const storedMail = await AsyncStorage.getItem('mail');
        const storedPassword = await AsyncStorage.getItem('password');
        const storedPincode = await AsyncStorage.getItem('pincode');
        const storedCity = await AsyncStorage.getItem('city');
        const storedState = await AsyncStorage.getItem('state');
        const storedGender = await AsyncStorage.getItem('gender');
        const storedLanguage = await AsyncStorage.getItem('language');

        if (storedName) {
          setName(storedName);
        }
        if (storedMail) {setEmail(storedMail);}
        if (storedPhoneNum) {setPhone(storedPhoneNum);}
        if (storedPassword) {setPassword(storedPassword);}
        if (storedCity) {setCity(storedCity);}
        if (storedGender) {setSelectedGender(storedGender);}
        if (storedLanguage) {setselectedLanguage(storedLanguage);}
        if (storedPincode) {setPinCode(storedPincode);}
        if (storedState) {setSelectedState(storedState);}
      } catch (error) {
        console.error('Failed to load user data', error);
        Alert.alert('Failed to load user data');
      }
    };
    loadUserData();
  }, []);

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !pincode ||
      !city ||
      !selectedState ||
      !selectedGender ||
      !selectedLanguage
    ) {
      Alert.alert('Please fill all the fields');
    }

    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('phone', phone);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('pincode', pincode);
      await AsyncStorage.setItem('city', city);
      await AsyncStorage.setItem('state', selectedState);
      await AsyncStorage.setItem('gender', selectedGender);
      await AsyncStorage.setItem('language', JSON.stringify(selectedLanguage));

      Alert.alert('Profile updated Successfully');
      navigation.navigate('HomeScreen', {userName: name});
    } catch (error) {
      console.error('Failed to save user data', error);
      Alert.alert('Error', 'Failed to save user data.');
    }

    // const formData = getFormData();
    // console.log("formData", formData);

    resetForm();
  };

  const selectPhoto = () => {
    // launchImageLibrary({ mediaType: "photo" }, (response) => {
    //   console.log("response", response);
    //   if (response.didCancel) {
    //     console.log("User cancelled image selection");
    //   } else if (response.errorCode) {
    //     console.log("Error retrieving image", response.errorCode);
    //   } else {
    //     const uri = response.assets[0]?.uri;
    //     setPhoto(uri);
    //   }
    // });
  };

  const OpenCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          console.log('Error taking photo', response.errorCode);
        } else {
          console.log('camera Image picked successfully');
          const uri = response.assets[0].uri;
          console.log(uri);
          setPhoto(uri);
        }
      },
    );
  };

  const OpenGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image selection');
        } else if (response.errorCode) {
          console.log('Error taking image', response.errorCode);
        } else {
          console.log(' gallery Image picked successfully');
          const uri = response.assets[0].uri;
          console.log('uri');
          setPhoto(uri);
        }
      },
    );
  };

  const showOptions = () => {
    Alert.alert(
      'Select Option',
      'Choose an option to pick an image',
      [
        {text: 'Camera', onPress: OpenCamera},
        {text: 'Gallery', onPress: OpenGallery},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancellable: true},
    );
  };

  useEffect(() => {
    setPhone(phoneNumber);
  }, [phoneNumber]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          data={[1]}
          renderItem={() => (
            <View style={styles.picContainer}>
              <TouchableOpacity onPress={showOptions}>
                <Image
                  source={
                    // pic chosen by user ? that pic : or default pic
                    photo
                      ? {uri: photo}
                      : require('../../assets/images/userImg.png')
                  }
                  style={styles.profilePic}
                />
                <Text style={styles.picTxt}>Add Picture</Text>
              </TouchableOpacity>

              {/* form start */}
              <FloatingLabelInput
                label={'Name *'}
                value={name}
                onChangeText={setName}
                containerStyles={styles.inputContainer}
                customLabelStyles={styles.labelFont}
              />

              <FloatingLabelInput
                label={'Phone Number *'}
                value={phone}
                onChangeText={setPhone}
                containerStyles={styles.inputContainer}
                customLabelStyles={styles.labelFont}
              />

              <FloatingLabelInput
                label={'Email *'}
                value={email}
                onChangeText={setEmail}
                containerStyles={styles.inputContainer}
                customLabelStyles={styles.labelFont}
              />

              <FloatingLabelInput
                label={'Password *'}
                value={password}
                onChangeText={setPassword}
                containerStyles={styles.inputContainer}
                customLabelStyles={styles.labelFont}
              />
              <FloatingLabelInput
                label={'Pin Code *'}
                value={pincode}
                onChangeText={setPinCode}
                containerStyles={styles.inputContainer}
                customLabelStyles={styles.labelFont}
              />

              <FloatingLabelInput
                label={'City *'}
                value={city}
                onChangeText={setCity}
                containerStyles={styles.inputContainer}
                customLabelStyles={styles.labelFont}
              />

              <DropDownPicker
                open={stateOpen}
                value={selectedState}
                items={stateItems}
                setOpen={setStateOpen}
                setValue={setSelectedState}
                setItems={setStateItems}
                placeholder="State *"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                dropDownDirection="TOP"
                scrollViewProps={{showsVerticalScrollIndicator: true}}
                listMode="SCROLLVIEW"
              />
              <DropDownPicker
                open={open}
                value={selectedGender}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedGender}
                setItems={setItems}
                placeholder="Choose gender"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                dropDownDirection="BELOW"
              />

              {/* <DropDownPicker
                open={occupationOpen}
                value={selectedOccupation}
                items={occupationItems}
                setOpen={setOccupationOpen}
                setValue={setSelectedOccupation}
                setItems={setOccupationItems}
                placeholder="Occupation *"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                dropDownDirection="TOP"
              /> */}

              <DropDownPicker
                open={languageOpen}
                value={selectedLanguage}
                items={languageItems}
                setOpen={setlanguageOpen}
                setValue={setselectedLanguage}
                setItems={setLanguageItems}
                placeholder="Languages known *"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                dropDownDirection="TOP"
                mode="BADGE"
                multiple={true}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PrimaryScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#0A3981',
  },
  picContainer: {
    marginTop: 30,
    alignItems: 'center',
    // backgroundColor: "cyan",
  },
  picTxt: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#0A3981',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 20,
    resizeMode: 'cover',
  },
  inputContainer: {
    border: 'none',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  labelFont: {
    fontSizeBlurred: 15,
    // fontSizeFocused: 13,
    colorBlurred: '#555',
    colorFocused: '#0A3981',
  },
  //dropdown

  dropdown: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: 'transparent',
    borderRadius: 5,
    // width: 400,
    zIndex: 10,
    position: 'relative',
    marginVertical: 7,
  },
  dropdownContainer: {
    borderColor: '#0A3981',
    zIndex: 1000,
  },

  submitButton: {
    backgroundColor: '#0A3981',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
    paddingHorizontal: 50,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
