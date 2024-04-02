import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignout = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAcessToken();
    apolloClient.resetStore();
  };

  return signOut;
};

export default useSignout;