import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = ({ order, searchKeyword, first }) => {
    const { loading, error, data, fetchMore, ...results } = useQuery(
        GET_REPOSITORIES,
        {
            variables: { ...order, searchKeyword, first },
        }
    );
    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }
        console.log('here');
        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                variables: { ...order, searchKeyword, first },
            },
        });
    };
    return {
        loading,
        error,
        fetchMore: handleFetchMore,
        repositories: data?.repositories,
        ...results,
    };
};

export default useRepositories;
