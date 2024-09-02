import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
const useMe = () => {
    const { loading, error, data } = useQuery(ME);

    if (loading || error) {
        return { loading, error };
    }
    return data.me;
};

export default useMe;
