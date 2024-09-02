import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';
const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHENTICATE);
    const navigate = useNavigate();

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        await authStorage.setAccessToken(data);
        apolloClient.resetStore();
        navigate('/');
        return { data };
    };
    return [signIn, result];
};

export default useSignIn;
