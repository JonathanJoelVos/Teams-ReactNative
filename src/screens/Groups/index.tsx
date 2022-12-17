import { Button } from '@components/ Button';
import { GroupCard } from '@components/GroupCard';
import Header from '@components/Header';
import { Highlight } from '@components/Highlight';
import ListEmpty from '@components/ListEmpty';
import { useCallback, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { Container } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getGroupsAll } from '@storage/groups/groupsGetAll';
import Loading from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNavigateToNewGroup() { 
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const response = await getGroupsAll();
      setGroups(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, 
  []));

  return (
    <Container>
      <Header/>
      <Highlight 
        title="Turmas"
        subtitle="jogue com a sua turma"
      />
      {
        isLoading ? <Loading /> :
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => 
          <GroupCard 
            title={item}  
            onPress={() => handleOpenGroup(item)}
          />}
          ListEmptyComponent={() => <ListEmpty menssage='Que tal cadastrar uma turma?'
          />}
          contentContainerStyle = {groups.length === 0 ? { flex: 1 } : {}}
          showsVerticalScrollIndicator={false}
      />
      }
      
      <Button 
        title='Criar nova turma'
        onPress={handleNavigateToNewGroup}
      />
    </Container>
  );
}