import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import RepositoryItemStats from './RepositoryItemStats';
import theme from '../theme';

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    container: {
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'row',
    },
    itemInfo: {
        flexShrink: 1,
        alignItems: 'baseline',
    },
    language: {
        backgroundColor: theme.colors.primary,
        padding: 5,
        borderRadius: 5,
    },
});

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container} testID="repositoryItem">
            <View style={styles.item}>
                <Image
                    style={styles.avatar}
                    source={{ uri: item.ownerAvatarUrl }}
                />
                <View style={styles.itemInfo}>
                    <Text fontSize="subheading" fontWeight="bold">
                        {item.fullName}
                    </Text>
                    <Text>{item.description}</Text>
                    <View style={styles.language}>
                        <Text color="white">{item.language}</Text>
                    </View>
                </View>
            </View>
            <RepositoryItemStats item={item} />
        </View>
    );
};

export default RepositoryItem;
