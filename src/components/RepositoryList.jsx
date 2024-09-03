import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];
    const navigate = useNavigate();
    const renderItem = ({ item }) => {
        return <RepositoryItem item={item} navigate={navigate} />;
    };
    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
        />
    );
};

const RepositoryList = () => {
    const { repositories } = useRepositories();
    return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
