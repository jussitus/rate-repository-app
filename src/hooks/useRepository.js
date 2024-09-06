import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
const useRepository = (variables) => {
    const { loading, error, data, fetchMore, ...result } = useQuery(
        GET_REPOSITORY,
        {
            fetchPolicy: 'cache-and-network',
            variables: { ...variables },
        }
    );
    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }
        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };
    return {
        loading,
        error,
        fetchMore: handleFetchMore,
        repository: data?.repository,
        ...result,
    };
};

export default useRepository;
