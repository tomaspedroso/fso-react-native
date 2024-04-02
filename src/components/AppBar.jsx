import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import Constants from 'expo-constants';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundDark,
    padding: 20,
    flexDirection: 'row',
  },
  tab: {
    marginRight: 20,
    marginTop: 10,
  },
});

const AppBar = () => {
  const { me } = useMe();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/' style={styles.tab}>
          <AppBarTab>
            Repositories
          </AppBarTab>
        </Link>

        {me ? (
          <>
            <Link to='/review' style={styles.tab}>
              <AppBarTab>
                Create a review
              </AppBarTab>
            </Link>
            <Link to='/myreviews' style={styles.tab}>
              <AppBarTab>
                My Reviews
              </AppBarTab>
            </Link>
            <Link to='/signout' style={styles.tab}>
              <AppBarTab>
                Sign Out
              </AppBarTab>
            </Link>
          </>
        ) : (
          <>
            <Link to='/signin' style={styles.tab}>
              <AppBarTab>
                Sign In
              </AppBarTab>
            </Link>
            <Link to='/signup' style={styles.tab}>
              <AppBarTab>
                Sign Up
              </AppBarTab>
            </Link>
          </>
        )}

      </ScrollView>
    </View>
  );
};

export default AppBar;