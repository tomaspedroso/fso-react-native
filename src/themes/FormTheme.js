import { StyleSheet } from 'react-native';
import theme from '../theme';

const FormTheme = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
  inputBox: {
    padding: 18,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: theme.fontSizes.subheading,
    marginTop: 15,
    marginBottom: 5,
  },
  multilineInput: {
    paddingTop: 18
  },
  inputError: {
    borderColor: theme.colors.errorRed,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    borderRadius: 4,
    padding: 18,
    marginTop: 15,
  },
});

export default FormTheme;