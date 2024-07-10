import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    item: {
        padding: 5,
        alignItems: 'center',
    },
});

const overThousand = (n) => {
    if (Number(n) < 1000) {
        return n;
    }
    return (Number(n) / 1000).toFixed(1) + 'k';
};

const RepositoryItemStats = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text fontWeight="bold">
                    {overThousand(item.stargazersCount)}
                </Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.item}>
                <Text fontWeight="bold">{overThousand(item.forksCount)}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.item}>
                <Text fontWeight="bold">{overThousand(item.reviewCount)}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.item}>
                <Text fontWeight="bold">{item.ratingAverage}</Text>
                <Text>Rating</Text>
            </View>
        </View>
    );
};

export default RepositoryItemStats;
