import { FlatList, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './ItemSeparator';

const OrderPicker = ({ order, setOrder, filter, setFilter }) => {

  return (
    <View>
      <Searchbar 
        placeholder='Search'
        value={filter}
        onChangeText={setFilter}
      />
      <Picker
        selectedValue={order}
        onValueChange={(itemValue) =>
          setOrder(itemValue)
        }
        itemStyle={{ height: 60 }}
      >
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highrated' />
        <Picker.Item label='Lowest rated repositories' value='lowrated' />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, order, setOrder, filter, setFilter, onEndReach }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList 
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem repository={item}/>}
      keyExtractor={item => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
      ListHeaderComponent={<OrderPicker order={order} setOrder={setOrder} filter={filter} setFilter={setFilter} />}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [orderType, setOrderType] = useState('CREATED_AT');
  const [direction, setDirection] = useState('ASC');
  const [filter, setFilter] = useState('');
  const [filterDeb] = useDebounce(filter, 500);

  useEffect(() => {
    switch(order) {
      case 'latest':
        setOrderType('CREATED_AT');
        break;
      case 'highrated':
        setOrderType('RATING_AVERAGE');
        setDirection('ASC');
        break;
      case 'lowrated':
        setOrderType('RATING_AVERAGE');
        setDirection('DESC');
        break;
      default:
        setOrderType('CREATED_AT');
        break;
    }
  }, [order]);

  const { repositories, fetchMore } = useRepositories(orderType, direction, filterDeb);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      order={order}
      setOrder={setOrder}
      filter={filter}
      setFilter={setFilter}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;