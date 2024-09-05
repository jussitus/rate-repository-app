import useMe from '../hooks/useMe';
import Text from './Text';
import { FlatList, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    rating: {
        height: 50,
        width: 50,
        flexShrink: 0,
        borderRadius: 25,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewBox: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingRight: 10,
    },
    reviewScore: {
        fontSize: 20,
        color: theme.colors.primary,
    },
    reviewInfo: {
        flex: 1,
    },
    repoInfo: {
        marginBottom: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviewItem = ({ review }) => {
    return (
        <View style={styles.reviewBox}>
            <View style={styles.rating}>
                <Text style={styles.reviewScore}>{review.rating}</Text>
            </View>
            <View style={styles.reviewInfo}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {review.repository.fullName}
                </Text>
                <Text>{format(review.createdAt, 'dd.MM.yyyy')}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
};
const UserReviews = () => {
    const me = useMe(true);
    if (!me) {
        return <Text>Loading... or error.</Text>;
    }
    const reviews = me.reviews.edges.map((edge) => edge.node);
    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <UserReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default UserReviews;
