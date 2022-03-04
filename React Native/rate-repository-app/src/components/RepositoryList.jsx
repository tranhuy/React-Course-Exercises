import { useState, Component } from 'react';
import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

import { repositories } from '../../data/repositories';
import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import RepositoryListHeader, { lastestRepository } from './RepositoryListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ededed',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends Component {
  
  renderHeader = () => {
    const { sortBy, setSortBy } = this.props;

    return (
      <RepositoryListHeader sortBy={sortBy} setSortBy={setSortBy} />
    );
  };

  render() {
    const baseUrl = '/repo';
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    return (
      <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (<Pressable onPress={() => navigate(`${baseUrl}/${item.id}`, { replace: true })}><RepositoryItem repo={item} /></Pressable>)}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
    const navigate = useNavigate();
    const [ sortCriteria, setSortCriteria ] = useState(lastestRepository);
    const { repositories } = useRepositories(sortCriteria);

    return <RepositoryListContainer navigate={navigate} repositories={repositories} sortBy={sortCriteria} setSortBy={setSortCriteria} />
};

export default RepositoryList;