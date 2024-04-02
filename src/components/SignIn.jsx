import { Pressable, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import formTheme from '../themes/FormTheme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required'),
  password: yup.string()
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (<SignInContainer onSubmit={onSubmit} />);
};

export const SignInContainer = ({ onSubmit }) => {
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

      <Pressable onPress={formik.handleSubmit} style={formTheme.submitButton}>
        <Text 
          color='textWhite'
          fontSize='subheading'
          fontWeight='bold'
        > 
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;