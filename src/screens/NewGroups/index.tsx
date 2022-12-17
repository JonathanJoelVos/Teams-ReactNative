import { Button } from "@components/ Button";
import Header from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { groupCreate } from "@storage/groups/groupCreate";
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";

export function NewGroups() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation();
  
  async function handleNewGroup() {
    try {

      if(group.trim().length === 0) return Alert.alert('Novo Grupo', 'O nome da turma não pode ser vazio');

      await groupCreate(group);
      navigation.navigate('players', { group })
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Ocorreu um erro ao criar a turma');
      }
    }
  }
  
  return (
    <Container>
        <Header showBackButton/>
        <Content >
          <Icon />
          <Highlight 
            title="Nova turma"
            subtitle="Crie uma nova turma para adicionar pessoas"
          />
          <Input 
            style={{marginBottom: 20}}
            placeholder="Nome da turma"
            onChangeText={setGroup}
          /> 
          <Button 
            title="Criar" 
            style={{marginTop: 20}}
            onPress={handleNewGroup}
          />
        </Content>
    </Container>
  );
}