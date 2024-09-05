import { useApolloClient, useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
const useDeleteReview = () => {
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async (deleteReviewId) => {
        const { data } = await mutate({
            variables: {
                deleteReviewId,
            },
        });
        apolloClient.resetStore();
        console.log(data);
        return { data };
    };
    return [deleteReview, result];
};

export default useDeleteReview;
