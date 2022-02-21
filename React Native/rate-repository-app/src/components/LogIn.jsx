import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'

import Text from './Text';
import FormikTextInput from './FormikTextInput';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const LogIn = () => {
    const loginUser = credentials => {
        console.log(credentials);
    }
    
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={loginUser}
            validationSchema={validationSchema}
        >
            {
                ({ handleSubmit }) => <LogInForm onSubmit={handleSubmit} />
            }
        </Formik>
    );
};

const LogInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='username' placeholder='Username' />
            </View>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
            </View>           
            <Pressable onPress={onSubmit}>
                <Text fontWeight='bold' fontSize='subheading' style={styles.loginBtn}>Log In</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
    },
    inputWrapper: {
        marginBottom: 12,
    },  
    loginBtn: {
        backgroundColor: '#0365d0',
        color: '#ffffff',
        padding: 8,
        borderRadius: 5,
        textAlign: 'center',
    }
  });

export default LogIn;