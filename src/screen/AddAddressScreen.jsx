import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
const AddAddressScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pincode, setPinCode] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [value, setValue] = useState('home');
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const handleValidation = () => {
    let valid = true;

    if (name.trim() === '') {
      setNameError('This field is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (phoneNumber.trim() === '') {
      setPhoneError('This field is required');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (valid) {
      console.log('Submitted name', name);
      console.log('Submitted phone', phoneNumber);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.txt1}>Contact Details</Text>
            <View style={styles.inputBox}>
              <TextInput
                label={'Name*'}
                mode="outlined"
                value={name}
                onChangeText={setName}
                outlineColor="gray"
                activeOutlineColor="#0A3981"
              />
              <TextInput
                label={'Phone Number*'}
                mode="outlined"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                outlineColor="gray"
                activeOutlineColor="#0A3981"
              />
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.txt1}>Address</Text>
            <View style={styles.inputBox}>
              <TextInput
                label={'Pin Code*'}
                mode="outlined"
                value={pincode}
                onChangeText={setPinCode}
                outlineColor="gray"
                activeOutlineColor="#0A3981"
              />
              <TextInput
                label={'Address (House No, Building, Street, Area)*'}
                mode="outlined"
                value={address}
                onChangeText={setAddress}
                outlineColor="gray"
                activeOutlineColor="#0A3981"
              />
              <TextInput
                label={'City*'}
                mode="outlined"
                value={city}
                onChangeText={setCity}
                outlineColor="gray"
                activeOutlineColor="#0A3981"
              />
              <TextInput
                label={'State*'}
                mode="outlined"
                value={state}
                onChangeText={setState}
                outlineColor="gray"
                activeOutlineColor="#0A3981"
              />
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.txt1}>Address Type</Text>
            <View style={styles.radioBox}>
              <RadioButton.Group onValueChange={setValue} value={value}>
                <View style={styles.radioContainer}>
                  <View style={styles.radioItem}>
                    <RadioButton value="home" color="#0A3981" />
                    <Text>Home</Text>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="office" color="#0A3981" />
                    <Text>Office</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity onPress={handleValidation}>
                    <Text style={styles.btn}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleValidation}>
                    <Text style={styles.btn}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "gray",
  },
  container1: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 30,
    marginVertical: 20,
  },
  input: {
    // width: "100%",
    borderBottomWidth: 1,
    fontWeight: 500,
    // backgroundColor: "blue",
  },
  inputContainer: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#0A3981',
    color: 'white',
    textAlign: 'center',
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 60,
    // width: 150,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    // backgroundColor:"lightblue",
    padding: 20,
    elevation: 10, // Shadow effect on Android
    shadowColor: '#000', // Shadow effect on iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginHorizontal: 20,
  },
  formContainer: {
    // marginVertical: 10,
    // gap: 10,
  },
  box: {
    backgroundColor: 'white',
    paddingVertical: 20,
    marginHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'column',
    gap: 20,
    marginVertical: 10,
  },
  txt1: {
    // fontWeight: "bold",
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 20,
    fontFamily: 'Nunito-ExtraBold',
  },
  inputBox: {
    marginHorizontal: 10,
    flexDirection: 'column',
    gap: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
