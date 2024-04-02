import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  containerRow: {
    flexDirection: 'row',
  },
  rating: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  content: {
    padding: 1,
    marginRight: 60,
  },
  textSpace: {
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 14,
    marginHorizontal: 8,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
  redColor: {
    backgroundColor: theme.colors.errorRed,
  },
});

const ReviewItem = ({ review, showButtons = false, refetch }) => {
  const date = format(review.createdAt, 'dd.mm.yyyy');
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleDeleteAlert = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review', [
      { text: 'Cancel' },
      { text: 'DELETE', onPress: handleDelete },
    ]);
  };

  const handleDelete = async () => {
    await deleteReview(review.id);
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <View style={styles.rating}>
          <Text
            fontWeight='bold'
            fontSize='subheading'
            color='Primary'
          >
            {review.rating}
          </Text>
        </View>

        <View style={styles.content}>
          <Text
            fontWeight='bold'
            fontSize='subheading'
          >
            {review.user.username}
          </Text>

          <Text
            color='textSecondary'
            style={styles.textSpace}
          >
            {date}
          </Text>
      
          <Text>
            {review.text}
          </Text>
        </View>
      </View>
      
      {showButtons && (
        <View style={[styles.containerRow, styles.buttonContainer]}>
        <Pressable 
          onPress={() => navigate(`/repository/${review.repositoryId}`)} 
          style={styles.button}
        >
          <Text
            fontSize='subheading'
            fontWeight='bold'
            color='textWhite'
            style={styles.buttonText}
          >
            View Repository
          </Text>
        </Pressable>
        <Pressable 
          onPress={handleDeleteAlert}
          style={[styles.button, styles.redColor]}
        >
          <Text
            fontSize='subheading'
            fontWeight='bold'
            color='textWhite'
            style={styles.buttonText}
          >
            Delete Review
          </Text>
        </Pressable>
      </View>
      )}
    </View>
  );
};

export default ReviewItem;