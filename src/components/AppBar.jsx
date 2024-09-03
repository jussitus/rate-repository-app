import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: theme.colors.appBar,
    },
});

const AppBar = () => {
    const me = useMe();
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab link="/" text="Repositories" />
                {me && <AppBarTab link="/review" text="Create a review" />}
                {!me && <AppBarTab link="/signin" text="Sign in" />}
                {!me && <AppBarTab link="/signup" text="Sign up" />}
                {me && <AppBarTab link="/signout" text="Sign out" />}
            </ScrollView>
        </View>
    );
};

export default AppBar;
