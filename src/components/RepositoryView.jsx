import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
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
const RepositoryInfo = ({ item }) => {
    return (
        <View style={styles.repoInfo}>
            <RepositoryItem item={item} singleView={true} />
        </View>
    );
};

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.reviewBox}>
            <View style={styles.rating}>
                <Text style={styles.reviewScore}>{review.rating}</Text>
            </View>
            <View style={styles.reviewInfo}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {review.user.username}
                </Text>
                <Text>{format(review.createdAt, 'dd.MM.yyyy')}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
};
const RepositoryView = () => {
    const { id } = useParams();
    console.log(id);
    const { loading, error, repository, fetchMore } = useRepository({
        repositoryId: id,
        first: 1,
    });
    if (loading || error) {
        return <Text>Loading... Or error.</Text>;
    }
    const reviews = repository.reviews.edges.map((edge) => edge.node);
    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo item={repository} />}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={() => fetchMore()}
        />
    );
};

export default RepositoryView;
