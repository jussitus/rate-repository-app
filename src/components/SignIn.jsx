import { Pressable, TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useFormik } from 'formik';

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        paddingVertical: 15,
    },
    input: {
        borderWidth: 1,
        marginBottom: 15,
        marginHorizontal: 15,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: theme.colors.primary,
        marginHorizontal: 15,
        padding: 15,
        borderRadius: 5,
    },
});

const initialValues = {
    username: '',
    password: '',
};

const onSubmit = (values) => {
    console.log(values);
};

const SignIn = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });
    return (
        <View style={styles.box}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            ></TextInput>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
            ></TextInput>
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text
                    color="white"
                    fontWeight="bold"
                    style={{ fontSize: 25, textAlign: 'center' }}
                >
                    Sign in
                </Text>
            </Pressable>
        </View>
    );
};

export default SignIn;
