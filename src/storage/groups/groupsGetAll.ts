import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';

export const getGroupsAll= async () => {
    try {
        const groups = await AsyncStorage.getItem(GROUP_COLLECTION);
        return groups ? JSON.parse(groups) : [];
    } catch (error) {
        throw error;
    }
}