import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';
import { getGroupsAll } from './groupsGetAll';

export const groupCreate = async (newGroup: string) => {
    try {
        const groups = await getGroupsAll();

        const groupsAlreadyExist = groups.includes(newGroup);

        if (groupsAlreadyExist) {
            throw new AppError('Group already exists');
        }

        const storage = JSON.stringify([...groups, newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}
