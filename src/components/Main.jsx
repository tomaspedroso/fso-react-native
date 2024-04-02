import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SignOut from './SignOut';
import RepositoryPage from './RepositoryPage';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/repository/:id' element={<RepositoryPage />} />
        <Route path='/review' element={<ReviewForm />} />
        <Route path='/myreviews' element={<UserReviews />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='*' element={<Navigate to='/' replace /> } />
      </Routes>
    </View>
  );
};

export default Main;