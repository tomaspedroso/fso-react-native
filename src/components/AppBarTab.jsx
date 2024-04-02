import Text from './Text';

const AppBarTab = ({ ...props }) => {
  return (
    <Text
      color='textWhite'
      fontSize='subheading'
      fontWeight='bold'
      {...props}
    />
  );
};

export default AppBarTab;