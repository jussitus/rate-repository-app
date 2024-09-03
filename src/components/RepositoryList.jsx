import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryOrder = ({ order, setOrder }) => {
    return (
        <Picker
            selectedValue={`${order.orderBy} ${order.orderDirection}`}
            onValueChange={(itemValue) => {
                const [orderBy, orderDirection] = itemValue.split(' ');
                setOrder({ orderBy, orderDirection });
            }}
        >
            <Picker.Item label="Latest repositories" value="CREATED_AT DESC" />
            <Picker.Item
                label="Highest rated repositories"
                value="RATING_AVERAGE DESC"
            />
            <Picker.Item
                label="Lowest rated repositories"
                value="RATING_AVERAGE ASC"
            />
        </Picker>
    );
};

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
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
            ListHeaderComponent={() => (
                <RepositoryOrder order={order} setOrder={setOrder} />
            )}
        />
    );
};

const RepositoryList = () => {
    const [order, setOrder] = useState({
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
    });
    const { repositories } = useRepositories(order);
    return (
        <RepositoryListContainer
            repositories={repositories}
            order={order}
            setOrder={setOrder}
        />
    );
};

export default RepositoryList;
