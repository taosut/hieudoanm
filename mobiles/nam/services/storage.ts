import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  public async setObject(key: string, value: any): Promise<void> {
    try {
      const str: string = JSON.stringify(value);
      await AsyncStorage.setItem(key, str);
    } catch (error) {
      console.error('error', error);
    }
  }

  public async getObject(key: string): Promise<any> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('error', error);
    }
  }
}
