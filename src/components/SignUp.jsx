import { useFormik } from 'formik';
import { View, TextInput, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import Text from './Text';
import formTheme from '../themes/FormTheme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(5, 'Username must have at least 5 characters')
    .max(30, 'Username cannot have more than 30 characters'),
  password: yup.string()
    .required('Password is required')
    .min(5, 'Password must have at least 5 characters')
    .max(50, 'Password cannot have more than 50 characters'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Password confirmation must be equal to password')
    .required('Password confirmation is required')
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { username, password } = values;
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (<SignUpContainer onSubmit={onSubmit} />);
};

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={formTheme.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          formTheme.inputBox,
          formik.touched.username && formik.errors.username && formTheme.inputError
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color='textError'>{formik.errors.username}</Text>
      )}

      <TextInput
        placeholder='Password'
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[
          formTheme.inputBox,
          formik.touched.password && formik.errors.password && formTheme.inputError
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color='textError'>{formik.errors.password}</Text>
      )}

      <TextInput
        placeholder='Password confirmation'
        secureTextEntry={true}
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        style={[
          formTheme.inputBox,
          formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && formTheme.passwordConfirmation
        ]}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text color='textError'>{formik.errors.passwordConfirmation}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={formTheme.submitButton}>
        <Text 
          color='textWhite'
          fontSize='subheading'
          fontWeight='bold'
        >
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;