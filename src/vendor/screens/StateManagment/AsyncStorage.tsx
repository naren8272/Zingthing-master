import AsyncStorage from '@react-native-async-storage/async-storage';

const saveValue = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Value saved successfully');
    } catch (e) {
        console.error('Failed to save the value to AsyncStorage', e);
    }
};

const getValue = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('Retrieved value:', value);
            return value;
        } else {
            console.log('No value found for key:', key);
        }
    } catch (e) {
        console.error('Failed to retrieve the value from AsyncStorage', e);
    }
};

const removeValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('Value removed successfully');
    } catch (e) {
        console.error('Failed to remove the value from AsyncStorage', e);
    }
};