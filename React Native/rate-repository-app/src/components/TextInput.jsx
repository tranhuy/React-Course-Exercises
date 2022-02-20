import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, style ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;