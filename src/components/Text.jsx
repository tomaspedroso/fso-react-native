import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.textWhile,
  },
  colorError: {
    color: theme.colors.errorRed,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  backgroundColorPrimary: {
    backgroundColor: theme.colors.primary,
  }
});

const Text = ({ color, fontSize, fontWeight, backgroundColor, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'Primary' && styles.colorPrimary,
    color === 'textWhite' && styles.colorWhite,
    color === 'textError' && styles.colorError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    backgroundColor === 'primary' && styles.backgroundColorPrimary,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;