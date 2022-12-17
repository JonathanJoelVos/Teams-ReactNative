import { Button } from "@components/ Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import Header from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import ListEmpty from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playersGetByGroup } from "@storage/players/playersGetByGroup";
import { AppError } from "@utils/AppError";
import { playersGetByGroupAndTeam } from "@storage/players/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { playerRemoveByGroupAndTeam } from "@storage/players/playerRemoveByGroupAndTeam";
import { groupRemove } from "@storage/groups/groupRemove";
import Loading from "@components/Loading";

type RouteParams = {
    group: string;
}

export function Players() {
    const routes = useRoute();
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState("");
    const [team, setTeam]= useState("Time A");
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const { group } = routes.params as RouteParams;
    const navigation = useNavigation();

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0){
            return Alert.alert("Novo Jogador","Nome do jogador é obrigatório");
        }    

        const newPlayer = {
            name: newPlayerName,
            team,
        };

        try {
            await playerAddByGroup(newPlayer, group);
            setNewPlayerName('');
            fetchPlayersByTeam();
            newPlayerNameInputRef.current?.blur()
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert("Novo Jogador", error.message);
            } else {
                Alert.alert("Novo Jogador", "Não foi possível adicionar o jogador");
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Não foi possível carregar os jogadores");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRemovePlayer(group: string, name: string){
        await playerRemoveByGroupAndTeam(group, name);
        fetchPlayersByTeam();
        
    }

    async function handleRemoveGroup() {
        Alert.alert("Remover turma", "Tem certeza que deseja remover a turma?", [
            {
                text: "Não",
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: async () => {
                    await groupRemove(group);
                    setPlayers([]);
                    navigation.navigate("groups")
                }
            }
        ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton/>
            <Highlight 
                title={group}
                subtitle="adicione a galera e separe os times"
            />
            <Form 
            >
                <Input 
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome do participante"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon 
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>
            <HeaderList>
                <FlatList 
                    data={["Time A", "Time B"]}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>
            {
                isLoading ? 
                <Loading /> : 
                <FlatList
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <PlayerCard
                            name={item.name}
                            onRemove={() => handleRemovePlayer(group,item.name)}
                        />
                    )}
                    ListEmptyComponent={() => <ListEmpty menssage='Nao ha jogadores cadastrados'
                    />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        {paddingBottom: 100},
                        players.length === 0 && { flex: 1 }
                    ]}
                />
            }
            
            <Button 
                title="Remover turma"
                type="secondary"
                onPress={handleRemoveGroup}
            />
        </Container>
    )
}