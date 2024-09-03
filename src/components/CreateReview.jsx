import { Pressable, TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner is required.'),
    repositoryName: yup.string().required('Repository name is required.'),
    rating: yup
        .number()
        .typeError('Rating must an integer')
        .integer('Rating must be an integer.')
        .min(0, 'Rating must be at least 0.')
        .max(100, 'Rating must be at most 100.')
        .required('Rating is required.'),
    text: yup.string().optional(),
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
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
};

const InputBox = ({ formik, inputType, placeholder }) => {
    const style =
        formik.touched[inputType] && formik.errors[inputType]
            ? styles.errorInput
            : styles.input;
    return (
        <View style={styles.inputElement}>
            <TextInput
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

export const ReviewContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    return (
        <View style={styles.box}>
            <InputBox
                formik={formik}
                inputType="ownerName"
                placeholder={'Owner name'}
            ></InputBox>
            <InputBox
                formik={formik}
                inputType="repositoryName"
                placeholder={'Repository name'}
            ></InputBox>
            <InputBox
                formik={formik}
                inputType="rating"
                placeholder={'Rating'}
            ></InputBox>
            <InputBox
                formik={formik}
                inputType="text"
                placeholder={'Review'}
            ></InputBox>
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text
                    color="white"
                    fontWeight="bold"
                    style={{ fontSize: 25, textAlign: 'center' }}
                >
                    Create a review
                </Text>
            </Pressable>
        </View>
    );
};

const CreateReview = () => {
    const [createReview] = useCreateReview();
    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;

        try {
            const { data } = await createReview({
                ownerName,
                repositoryName,
                rating,
                text,
            });
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };
    return <ReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
