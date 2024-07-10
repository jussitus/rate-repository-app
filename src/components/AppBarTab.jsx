import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    tab: {
        paddingHorizontal: 10,
    },
});

const AppBarTab = (props) => {
    return (
        <Pressable>
            <Link style={styles.tab} to={props.link}>
                <Text color="appBar" fontWeight="bold" fontSize="subheading">
                    {props.text}
                </Text>
            </Link>
        </Pressable>
    );
};

export default AppBarTab;
