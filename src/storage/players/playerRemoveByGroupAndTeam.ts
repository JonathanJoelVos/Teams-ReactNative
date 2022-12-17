import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerRemoveByGroupAndTeam(group: string, name: string) {
    try {
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
        const filteredPlayers = players.filter(player => player.name !== name);
        const newStorage = JSON.stringify(filteredPlayers);
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, newStorage);
    } catch (error) {
        throw error;
    }
}