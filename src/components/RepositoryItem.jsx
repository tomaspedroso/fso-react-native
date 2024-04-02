import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { openURL } from 'expo-linking';
import Text from './Text';
import theme from '../theme';
import RepositoryStat from './RepositoryStat';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  flexContainer: {
    flexDirection: 'row',
  }, 
  mainDetails: {
    marginLeft: 15,
    marginRight: 40,
    gap: 10,
  },
  languageBlock: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    marginRight: 'auto',
    borderRadius: 3,
  },
  statsDetails: {
    marginTop: 15,
    justifyContent: 'space-evenly',
  },
  openButton: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    marginHorizontal: 3,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  }
});

const RepositoryItem = ({ repository }) => {
  const navigate = useNavigate();

  return (
    <Pressable 
      onPress={() => navigate(`/repository/${repository.id}`)} 
      disabled={repository.url}     // If repository URL exists, the user is already on the repository page
    >
      <View style={styles.container} testID='repositoryItem'>
        <View style={styles.flexContainer}>
          <Image 
            style={styles.image}
            source={{
              uri: repository.ownerAvatarUrl
            }}
          />

          <View style={styles.mainDetails}>
            <Text fontWeight='bold' fontSize='subheading'>{repository.fullName}</Text>
            <Text>{repository.description}</Text>
            <View style={styles.languageBlock}>
              <Text color='textWhite'>{repository.language}</Text>
            </View>
          </View>
        </View>   

        <View style={[styles.flexContainer, styles.statsDetails]}>
          <RepositoryStat name='Stars' number={repository.stargazersCount} />
          <RepositoryStat name='Forks' number={repository.forksCount} />
          <RepositoryStat name='Reviews' number={repository.reviewCount} />
          <RepositoryStat name='Rating' number={repository.ratingAverage} />
        </View>
        
        {repository.url && 
          <Pressable 
            onPress={() => openURL(repository.url)} 
            style={styles.openButton}
          >
            <Text 
              fontWeight='bold' 
              fontSize='subheading' 
              color='textWhite'
            >
              Open in Git Hub
            </Text>
          </Pressable>
        }
      
      </View>
    </Pressable>
    
  );
};

export default RepositoryItem;