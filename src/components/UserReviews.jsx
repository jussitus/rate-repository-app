import useMe from '../hooks/useMe';
import Text from './Text';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

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
    reviewBoxInner: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingRight: 10,
        justifyContent: 'space-around',
    },
    reviewBoxOuter: {
        flexDirection: 'column',
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
    viewRepo: {
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    deleteReview: {
        backgroundColor: theme.colors.errorRed,
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviewItem = ({ review, navigate, deleteReview }) => {
    const onPress = async () =>
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                { text: 'CANCEL' },
                {
                    text: 'DELETE',
                    onPress: async () => {
                        try {
                            const { data } = await deleteReview(review.id);
                            console.log(data);
                        } catch (e) {
                            console.log(e);
                        }
                    },
                },
            ]
        );

    return (
        <View style={styles.reviewBoxOuter}>
            <View style={styles.reviewBoxInner}>
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
            <View style={styles.reviewBoxInner}>
                <Pressable
                    onPress={() => {
                        navigate(`/${review.repository.id}`);
                    }}
                >
                    <View style={styles.viewRepo}>
                        <Text fontWeight="bold" color="white">
                            View repository
                        </Text>
                    </View>
                </Pressable>
                <Pressable onPress={onPress}>
                    <View style={styles.deleteReview}>
                        <Text fontWeight="bold" color="white">
                            Delete review
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};
const UserReviews = () => {
    const { me } = useMe(true);
    const reviews = me ? me.reviews.edges.map((edge) => edge.node) : [];
    const navigate = useNavigate();
    const [deleteReview] = useDeleteReview();
    const renderItem = ({ item }) => {
        return (
            <UserReviewItem
                review={item}
                navigate={navigate}
                deleteReview={deleteReview}
            />
        );
    };
    return (
        <FlatList
            data={reviews}
            renderItem={renderItem}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default UserReviews;
