import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
const useCreateReview = () => {
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();

    const createReview = async ({
        ownerName,
        repositoryName,
        rating,
        text,
    }) => {
        const { data } = await mutate({
            variables: {
                ownerName,
                repositoryName,
                rating: Number(rating),
                text,
            },
        });
        apolloClient.resetStore();
        console.log(data);
        navigate(`/${data.createReview.repository.id}`);
        return { data };
    };
    return [createReview, result];
};

export default useCreateReview;
