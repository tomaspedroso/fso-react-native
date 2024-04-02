import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';
import useSignOut from '../hooks/useSignOut';

const SignOut = () => {
  const navigate = useNavigate();
  const signout = useSignOut();

  useEffect(() => {
    const performSignOut = async () => {
      await signout();
      navigate('/');
    };

    performSignOut();
  }, []);
};

export default SignOut;