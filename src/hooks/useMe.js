import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
const useMe = (includeReviews) => {
    const { loading, error, data } = useQuery(ME, {
        variables: { includeReviews },
    });
    return { loading, error, me: data?.me };
};

export default useMe;
