import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key,value) => {

    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
    }
};

const getData = async (key,onSuccess) => {

    try {
      const value = await AsyncStorage.getItem(key);
      if(value !== null) {
        onSuccess(value);
      }
    } catch (e) {
    }
  };

  export default { storeData,getData };

