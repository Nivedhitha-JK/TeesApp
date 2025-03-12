import axios from 'axios';
import API_BASE_URL from '../config/api';
import {getAuthToken, getIsNewUserInfo, saveAuthToken} from './storageService';

//fetch product details

export const fetchProductDetails = async productId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}getProductById?productId=${productId}`,
    );
    return response.data.product;
  } catch (error) {
    console.error('Error Fetching product details:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}productList`);
    console.log('API Response on Phone:', response.data);

    return response.data.products;
  } catch (error) {
    console.error('Error fetching product', error);
    throw error;
  }
};

// check user phn num

export const phoneNoLogin = async phoneNumber => {
  try {
    const response = await axios.post(`${API_BASE_URL}mobileLogin`, {
      phone_number: phoneNumber,
    });

    if (response.status === false) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    console.log('API error', error);
    if (error.response && error.response.status === false) {
      throw new Error(
        response.message || 'Something Went Wrong, please try again',
      );
    }
    throw new Error('Could not send OTP. Please try again.');
  }
};

//verify otp

export const verifyPhnOtp = async (phoneNumber, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}verifyOtp`, {
      phone_number: phoneNumber,
      otp: otp,
    });
    if (response.status === false) {
      throw new Error(response.message);
    }

    const token = response.data.token;
    console.log('Received token', token);
    await saveAuthToken(token);
    return response;
  } catch (error) {
    console.log('API error', error);
    if (error.response && error.response.status === false) {
      throw new Error(
        response.message || 'Something Went Wrong, please try again',
      );
    }
    throw new Error('Could not send OTP. Please try again.');
  }
};

// wishlist the product
// export const addWishlist = async (productId) => {
//   try {
//     const token = await getAuthToken();
//     console.log("Token auth", token);
//     if (!token) {
//       throw new Error("No authentication token found");
//     }
//     console.log(
//       "🔹 API Request: Sending request to",
//       `${API_BASE_URL}createWishlist`
//     );
//     console.log("🔹 Request Body:", { productId });

//     const response = await axios.post(
//       `${API_BASE_URL}createWishlist`,
//       { productId: productId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Wishlist API Response:", response);
//     return response || "Product added to wishlist successfully";
//   } catch (error) {
//     throw new Error(
//       error.response.message || "Failed to add product to wishlist."
//     );
//   }
// };

export const addWishlist = async productId => {
  console.log('Wishlisted Product ID is ', productId);
  try {
    const token = await getAuthToken();
    if (!token) throw new Error('No authentication token found');

    const response = await axios.post(
      `${API_BASE_URL}createWishlist`,
      {productId},
      {
        headers: {Authorization: `${token}`},
      },
    );

    console.log('Wishlist API Response:', response.data); // Log full response
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);

    // Return the full error for debugging
    throw (
      error.response?.data || new Error('Failed to add product to wishlist.')
    );
  }
};

// remove the wishlisted product

export const removeWishlist = async productId => {
  console.log('UnWishlisted Product ID is ', productId);
  try {
    const token = await getAuthToken();
    console.log(token);

    if (!token) {
      throw new error('No authentication token found');
    }

    const response = await axios.post(
      `${API_BASE_URL}removeWishlistItem`,
      {productId: productId},
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response || 'Product removed from wishlist successfully';
  } catch (error) {
    throw new Error(
      error.response.message || 'Failed to add product to wishlist.',
    );
  }
};

// check for wishlisted products

export const checkIfWishlist = async productId => {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_BASE_URL}checkWishlist`, {
      params: {productId},
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    throw new Error('Failed to check wishlist status.' || error.response);
  }
};

// get wishlisted products to show in wishlist page

export const getWishlistedProducts = async userId => {
  console.log(userId);
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    // get api - pass key use like this
    const response = await axios.get(`${API_BASE_URL}getWishlist`, {
      params: {id: userId},
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization: `${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw new Error('Failed to fetch wishlist');
  }
};
