// apiService.js

import axios from 'axios';
import ApiNames from './ApiNames';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiService = axios.create({
  baseURL: ApiNames.BASE_URL,
});

// Function to set the authorization token in the request headers
const setAuthToken =  token => {
  console.log("set TOl")
  if (token) {
    apiService.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete apiService.defaults.headers.common['Authorization'];
  }
};

// Function to retrieve the token from AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token from AsyncStorage:', error);
    return null;
  }
};

// Axios request interceptor to add the token to all requests
apiService.interceptors.request.use(
  async config => {
    try {
      const token = await getToken(); // Retrieve token from your storage
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

const postData = async (url, data) => {
  try {
    let API_URL = `${ApiNames.BASE_URL}${url}`;
    const response = await apiService.post(API_URL, data);
    return response;
  } catch (error) {
    throw error;
  }
};


const getData = async (url, data) => {
  try {
    let API_URL = `${ApiNames.BASE_URL}${url}`;
    const response = await apiService.get(API_URL);
    return response;
  } catch (error) {
    throw error;
  }
};

export { apiService, setAuthToken, postData ,getData};
