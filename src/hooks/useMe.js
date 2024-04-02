import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const { data, loading, refetch } = useQuery(GET_ME, {
    variables: {
      includeReviews: includeReviews,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    me: data?.me,
    loading,
    refetch,
  };
};

export default useMe;