import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 6,
  },
});

const RepositoryStat = ({ name, number }) => {
  if (number > 1000) {
    number = `${(number/1000).toFixed(1)}k`;
  }

  return (
    <View style={styles.container}>
      <Text fontWeight='bold' fontSize={'subheading'}>{number}</Text>
      <Text>{name}</Text>
    </View>
  );
};

export default RepositoryStat;
