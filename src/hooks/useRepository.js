import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
const useRepository = (id) => {
    const { loading, error, data } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: id },
    });

    if (loading || error) {
        return { loading, error };
    }
    const repository = data.repository;
    return { loading, error, repository };
};

export default useRepository;
