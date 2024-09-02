import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    getAccessToken() {
        return AsyncStorage.getItem(`${this.namespace}:accessToken`);
    }

    setAccessToken(accessToken) {
        const token = accessToken.authenticate.accessToken;
        AsyncStorage.setItem(`${this.namespace}:accessToken`, token);
    }

    removeAccessToken() {
        AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    }
}

export default AuthStorage;
