import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
// import OtpInputs from "react-native-otp-inputs";
import { OtpInput } from "react-native-otp-entry";
import Toast from "react-native-toast-message";
import {
  saveAuthToken,
  saveIsNewUserInfo,
  savePhoneNumber,
} from "../utils/storageService";
import ProductShow from "../components/ProductShow";
import { CommonActions } from "@react-navigation/native";
import OTPTextInput from "react-native-otp-textinput";
import { verifyPhnOtp } from "../utils/apiService";

const EnterOtpScreen = () => {
  const route = useRoute();
  const { phoneNumber, tempProduct, productId, isNewUser } = route.params;
  console.log("Route Params", route.params);
  console.log(phoneNumber);
  console.log(tempProduct);
  console.log(isNewUser);

  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const navigation = useNavigation();

  if (!phoneNumber) {
    return (
      <View>
        <Text>Phone number is not provided</Text>
      </View>
    );
  }

  // const verifyOtp = () => {
  //   if (isOtpValid) {
  //     navigation.navigate("CartScreen"); // Navigate to Cart screen after login
  //   } else {
  //     Alert.alert("Invalid OTP", "Please enter a valid OTP.");
  //   }

  //   const isOtpValid = true;
  //   if (isOtpValid) {
  //     navigation.navigate("UserScreen", { phoneNumber });
  //   } else {
  //     Alert.alert("Invalid OTP, Please Enter Valid OTP");
  //   }
  // };

  const verifyOtp = async () => {
    console.log("Entered OTP:", otp, phoneNumber);
    if (otp === "123456") {
      // setIsOtpValid(true);
      // setIsLoggedIn(true);
      try {
        const response = await verifyPhnOtp(phoneNumber, otp);
        console.log("API RESPONSE VERIFYOTP", response);

        if (response.data && response.data.token) {
          const authToken = response.data.token;
          console.log(authToken);
          await saveAuthToken(authToken); //save token
          console.log("Token Saved:", authToken);

          savePhoneNumber(phoneNumber).then(() => {
            console.log("phoneNumber saved successfully", phoneNumber);
          });
          const userInfo = response.data.user;
          console.log(userInfo);
          await saveIsNewUserInfo(userInfo);

          Alert.alert("Success", "OTP verified successfully!", [
            {
              text: "OK",
              onPress: () => {
                Toast.show({
                  type: "success",
                  text1: "Product Added",
                  text2: "The Product has been added to cart",
                  position: "center",
                  autoHide: true,
                });

                // setTimeout(() => {
                //   navigation.navigate("ProductShow", {
                //     addedProduct: tempProduct,
                //     showToast: true,
                //     productId,
                //   });
                // }, 2000);

                if (isNewUser) {
                  navigation.navigate("user", {
                    screen: "EditProfileScreen",
                    params: { phoneNumber },
                  });
                } else {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: "HomeScreen" },
                        {
                          name: "ProductShow",
                          params: {
                            addedProduct: tempProduct,
                            showToast: true,
                            productId,
                          },
                        },
                      ],
                    })
                  );
                  // navigation.navigate("ProductShow", {
                  //   addedProduct: tempProduct,
                  //   showToast: true,
                  //   productId,
                  // });
                }
              },
            },
          ]);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("OTP Verification Error:", error);
        Alert.alert("Error", "Invalid OTP. Please try again.");
      }
    } else {
      Alert.alert("Invalid OTP", "Please enter a valid OTP.");
      // navigation.navigate("CartScreen");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.txt}>Verify with OTP</Text>
        <Text style={styles.numTxt}>sent via SMS to {phoneNumber}</Text>
      </View>

      <View style={styles.wrapper}>
        <OTPTextInput
          inputCount={6}
          handleTextChange={(text) => setOtp(text)}
          tintColor="#0A3981"
          textInputStyle={styles.otpBox}
        />
        {/* <OtpInput
          focusColor="#0A3981"
          theme={{
            // containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            // pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            // placeholderTextStyle: styles.placeholderText,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
            // disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
          }}
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          // onChangeText={setOtp}
          onChangeText={(text) => {
            console.log("OTP entered:", text); // Log entered OTP
            setOtp(text); // Update OTP state
          }}
        /> */}

        {/* <TextInput
          style={styles.input}
          value={otp}
          onChangeText={setOtp} // Update OTP state when text changes
          keyboardType="numeric"
          maxLength={6}
          placeholder="Enter OTP"
        /> */}
      </View>
      <TouchableOpacity style={styles.btn} onPress={verifyOtp}>
        <Text style={styles.btnTxt}>Submit</Text>
      </TouchableOpacity>

      {/* <View style={styles.otpContainer}> */}
      {/* <OtpInputs
          handleChange={(code) => console.log(code)}
          numberOfInputs={6}
        /> */}
      {/* <OTPInputView
          style={{ width: "80%", height: 80 }}
          pinCount={6}
          autoFocusOnLoad
          code={otpCode}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={(code) => {
            setOtpCode({ code });
          }}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        /> */}
      {/* </View> */}
      <Toast />
    </View>
  );
};

export default EnterOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    // backgroundColor: "blue",
    padding: 20,
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  txtContainer: {
    flexDirection: "column",
    gap: 10,
  },
  numTxt: {
    color: "gray",
    // fontWeight: "600",
  },
  wrapper: {
    marginVertical: 10,
    // backgroundColor: "blue",
    paddingHorizontal: 5,
  },
  filledPinCodeContainer: {
    borderColor: "#0A3981",
    borderBottomWidth: 5,
  },
  activePinCodeContainer: {
    borderColor: "#0A3981",
  },
  pinCodeContainer: {
    width: 50,
    height: 60,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: "#0A3981",
    borderRadius: 3,
    marginVertical: 10,
  },
  btnTxt: {
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
  },
  otpBox: {
    borderWidth: 2,
    borderColor: "#0A3981",
    borderRadius: 10,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 20,
    color: "#0A3981",
    backgroundColor: "#fff",
  },
});
