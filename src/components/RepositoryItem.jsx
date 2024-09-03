import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import RepositoryItemStats from './RepositoryItemStats';
import theme from '../theme';
import * as Linking from 'expo-linking';
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
    github: {
        backgroundColor: theme.colors.primary,
        marginHorizontal: 15,
        padding: 15,
        borderRadius: 5,
    },
});

const RepositoryItem = ({ item, singleView, navigate }) => {
    const handlePress = () => {
        if (!singleView) {
            navigate(`/${item.id}`);
        }
    };
    return (
        <Pressable onPress={handlePress}>
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
                {singleView && (
                    <Pressable onPress={() => Linking.openURL(singleView.url)}>
                        <View style={styles.github}>
                            <Text
                                color="white"
                                style={{ fontSize: 20, textAlign: 'center' }}
                            >
                                Open in GitHub
                            </Text>
                        </View>
                    </Pressable>
                )}
            </View>
        </Pressable>
    );
};

export default RepositoryItem;
