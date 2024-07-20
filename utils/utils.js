import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { getData } from '../securityFile/configFile';
import ApiNames from '../securityFile/ApiNames';


export const Toaster = (message) => {
  return Toast.show(message)
};

export const getNotificationsCount = async () => {
  try {
      const api = `${ApiNames.getNotificationsCount}`;
      const response = await getData(api, '');
      return response.data
  } catch (err) {
      console.error(err);
  }
};
export const LocationInfo = (message) => {
  return message
};

