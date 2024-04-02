import { FlatList } from 'react-native';
import useMe from '../hooks/useMe';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import Text from './Text';

const UserReviews = () => {
  const { me, loading, refetch } = useMe(true);

  if (loading) {
    return (
      <Text>Loading</Text>
    );
  }

  return (
    <FlatList 
      data={me.reviews?.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} showButtons={true} refetch={refetch} />}
      keyExtractor={({ node }) => node.id}
    />
  );
};

export default UserReviews;