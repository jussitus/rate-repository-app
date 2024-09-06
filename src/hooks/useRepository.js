import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
const useRepository = (id) => {
    const { loading, error, data } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: id },
    });

    return { loading, error, repository: data?.repository };
};

export default useRepository;
