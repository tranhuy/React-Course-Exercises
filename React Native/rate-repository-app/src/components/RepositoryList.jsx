import { FlatList, View, StyleSheet } from 'react-native';
import { repositories } from '../../data/repositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ededed',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => ( <RepositoryItem repo={item} /> )}
        keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;