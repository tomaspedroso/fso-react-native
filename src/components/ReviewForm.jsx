import { View, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import formTheme from '../themes/FormTheme';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string()
    .required('Repository owner name is required'),
  repositoryName: yup.string()
    .required('Repository name is required'),
  rating: yup.number('Rating must be a number')
    .required('Rating is required')
    .integer('Rating must be an intenger')
    .min(0, 'Rating must be greater than 0')
    .max(100, 'Rating must be lower than 100'),
    text: yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    values.rating = Number(values.rating);

    try {
      const data = await createReview(values);
      navigate(`/repository/${data.createReview?.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (<ReviewFormContainer onSubmit={onSubmit} />);
};

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={formTheme.container}>
      <TextInput 
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={[
          formTheme.inputBox,
          formik.touched.ownerName && formik.errors.ownerName && formTheme.inputError
        ]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color='textError'>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={[
          formTheme.inputBox,
          formik.touched.repositoryName && formik.errors.repositoryName && formTheme.inputError
        ]}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color='textError'>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        placeholder='Rating'
        keyboardType='numeric'
        
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={[
          formTheme.inputBox,
          formik.touched.rating && formik.errors.rating && formTheme.inputError
        ]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color='textError'>{formik.errors.rating}</Text>
      )}

      <TextInput
        placeholder='Review'
        multiline={true}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        style={[
          formTheme.inputBox, formTheme.multilineInput,
          formik.touched.text && formik.errors.text && formTheme.inputError
        ]}
      />
      {formik.touched.text && formik.errors.text && (
        <Text color='textError'>{formik.errors.text}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={formTheme.submitButton}>
        <Text
          color='textWhite'
          fontSize='subheading'
          fontWeight='bold'
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;