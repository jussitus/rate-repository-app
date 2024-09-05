import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
const useMe = (includeReviews) => {
    const { loading, error, data } = useQuery(ME, {
        variables: { includeReviews },
    });
    if (loading || error) {
        return null;
    }
    return data.me;
};

export default useMe;
