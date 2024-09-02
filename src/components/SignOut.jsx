import { useEffect } from 'react';
import useSignOut from '../hooks/useSignOut';

const SignOut = () => {
    const signOut = useSignOut();
    useEffect(() => {
        (async () => {
            await signOut();
        })();
    }, []);
};

export default SignOut;
