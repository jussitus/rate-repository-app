import { Pressable, TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required.'),
    password: yup.string().required('Password is required.'),
});

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        paddingVertical: 15,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    inputElement: {
        marginBottom: 10,
        marginHorizontal: 15,
    },
    errorInput: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: 'red',
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

const InputBox = ({ formik, inputType }) => {
    const style =
        formik.touched[inputType] && formik.errors[inputType]
            ? styles.errorInput
            : styles.input;
    return (
        <View style={styles.inputElement}>
            <TextInput
                {...(inputType === 'password' && { secureTextEntry: true })}
                style={style}
                placeholder={inputType}
                value={formik.values[inputType]}
                onChangeText={formik.handleChange(inputType)}
            ></TextInput>
            {formik.touched[inputType] && formik.errors[inputType] && (
                <Text color="errorRed">{formik.errors[inputType]}</Text>
            )}
        </View>
    );
};

export const SignInContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    return (
        <View style={styles.box}>
            <InputBox formik={formik} inputType="username"></InputBox>
            <InputBox formik={formik} inputType="password"></InputBox>
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

const SignIn = () => {
    const [signIn] = useSignIn();
    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };
    return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
