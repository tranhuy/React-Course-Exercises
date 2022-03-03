import { useState } from 'react';
import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

import { repositories } from '../../data/repositories';
import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import SortPicker, { lastestRepository } from './SortPicker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ededed',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
    const navigate = useNavigate();
    const baseUrl = '/repo';
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    return (
      <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (<Pressable onPress={() => navigate(`${baseUrl}/${item.id}`, { replace: true })}><RepositoryItem repo={item} /></Pressable>)}
          keyExtractor={item => item.id}
      />
    )
}

const RepositoryList = () => {
    const [ sortCriteria, setSortCriteria ] = useState(lastestRepository);
    const { repositories } = useRepositories(sortCriteria);

    const navigate = useNavigate();
    const baseUrl = '/repo';
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    return (
      <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (<Pressable onPress={() => navigate(`${baseUrl}/${item.id}`, { replace: true })}><RepositoryItem repo={item} /></Pressable>)}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => <SortPicker sortBy={sortCriteria} setSortBy={setSortCriteria} />}
      />
    );

    //return <RepositoryListContainer repositories={repositories} />
};

export default RepositoryList;