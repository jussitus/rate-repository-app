import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: theme.colors.appBar,
    },
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab link="/" text="Repositories" />
                <AppBarTab link="/signin" text="Sign in" />
            </ScrollView>
        </View>
    );
};

export default AppBar;
