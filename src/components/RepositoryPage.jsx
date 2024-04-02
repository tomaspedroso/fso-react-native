import { useParams } from 'react-router-native';
import { FlatList, View } from 'react-native';
import useRepository from '../hooks/useRepository';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {
  
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem repository={repository} />
    </View>
  );
};

const RepositoryPage = () => {
  const { id } = useParams();

  const { repository, fetchMore, loading } = useRepository(id);

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <FlatList 
      data={repository.reviews?.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default RepositoryPage;