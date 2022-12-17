import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION,PLAYER_COLLECTION } from "@storage/storageConfig";
import { getGroupsAll } from "./groupsGetAll";

export const groupRemove = async (group: string) => {
    try {
        const groups = await getGroupsAll();
        const filteredGroups: string[] = groups.filter((groupFilter: string) => groupFilter !== group);
        const storage = JSON.stringify(filteredGroups);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`);
    } catch (error) {
        throw (error);
    }
}