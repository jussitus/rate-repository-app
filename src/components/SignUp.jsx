import { Pressable, TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5, 'Username must be 5-30 characters long.')
        .max(30, 'Username must be 5-30 characters long.')
        .required('Username is required.'),
    password: yup
        .string()
        .min(5, 'Password must be 5-30 characters long.')
        .max(30, 'Password must be 5-30 characters long.')
        .required('Password is required.'),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match.')
        .required('Password confirmation is required.'),
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

const InputBox = ({ formik, inputType, placeholder }) => {
    const style =
        formik.touched[inputType] && formik.errors[inputType]
            ? styles.errorInput
            : styles.input;
    return (
        <View style={styles.inputElement}>
            <TextInput
                {...(['password', 'password_confirmation'].includes(
                    inputType
                ) && { secureTextEntry: true })}
                style={style}
                placeholder={placeholder}
                value={formik.values[inputType]}
                onChangeText={formik.handleChange(inputType)}
            ></TextInput>
            {formik.touched[inputType] && formik.errors[inputType] && (
                <Text color="errorRed">{formik.errors[inputType]}</Text>
            )}
        </View>
    );
};

export const SignUpContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    return (
        <View style={styles.box}>
            <InputBox
                formik={formik}
                inputType="username"
                placeholder="Username"
            ></InputBox>
            <InputBox
                formik={formik}
                inputType="password"
                placeholder="Password"
            ></InputBox>
            <InputBox
                formik={formik}
                inputType="password_confirmation"
                placeholder="Password confirmation"
            ></InputBox>
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text
                    color="white"
                    fontWeight="bold"
                    style={{ fontSize: 25, textAlign: 'center' }}
                >
                    Sign up
                </Text>
            </Pressable>
        </View>
    );
};

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signUp({ username, password });
            console.log(data);
            try {
                const { data } = await signIn({ username, password });
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            console.log(e);
        }
    };
    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
