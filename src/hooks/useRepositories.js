import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = (order, searchKeyword) => {
    const { loading, error, data } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { ...order, searchKeyword },
    });

    if (loading || error) {
        return { loading, error };
    }
    const repositories = data.repositories;
    return { loading, error, repositories };
};

export default useRepositories;
