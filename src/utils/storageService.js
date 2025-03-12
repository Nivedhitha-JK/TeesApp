import AsyncStorage from "@react-native-async-storage/async-storage";

//save phone num in async storage
export const savePhoneNumber = async (phoneNumber) => {
  try {
    await AsyncStorage.setItem("userPhoneNumber", phoneNumber);
  } catch (error) {
    console.error("Error saving phone number", error);
  }
};

// get phone(retrive) num from async storage

export const getPhoneNumber = async () => {
  try {
    const phoneNumber = await AsyncStorage.getItem("userPhoneNumber");
    return phoneNumber;
  } catch (error) {
    console.error("Error retrieving phone number", error);
    return null;
  }
};

// remove phone number (logout)

export const removePhoneNumber = async () => {
  try {
    await AsyncStorage.removeItem("userPhoneNumber");
  } catch (error) {
    console.error("Error removing phone number", error);
  }
};

//save auth token

export const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("error saving Token", error);
  }
};

/** Retrieve authentication token */
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    console.log("retrived token", token);
    return token ? token : null;
  } catch (error) {
    console.error("Error retrieving auth token", error);
    return null;
  }
};

/** Remove authentication token (logout) */
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error removing auth token", error);
  }
};

export const saveIsNewUserInfo = async (userInfo) => {
  try {
    if (!userInfo) throw new Error("userInfo is undefined");
    await AsyncStorage.setItem("isNewUserInfo", JSON.stringify(userInfo));
  } catch (error) {
    console.error("error saving isNewUserInfo", error);
  }
};

export const getIsNewUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("isNewUserInfo");
    console.log("retrived user info from storage", userInfo);
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error retrieving user info", error);
    return null;
  }
};

export const removeIsNewUserInfo = async () => {
  try {
    await AsyncStorage.removeItem("isNewUserInfo");
  } catch (error) {
    console.error("Error while removing user info");
  }
};
