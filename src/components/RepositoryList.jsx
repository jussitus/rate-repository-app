import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    search: {
        backgroundColor: 'white',
        padding: 10,
        height: 50,
        fontSize: 15,
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

const RepositoryFilter = ({ searchword, setSearchword }) => {
    return (
        <TextInput
            style={styles.search}
            onChangeText={setSearchword}
            value={searchword}
            placeholder="Search..."
        />
    );
};
export const RepositoryListContainer = ({
    repositories,
    order,
    setOrder,
    searchword,
    setSearchword,
    onEndReach,
}) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];
    const navigate = useNavigate();
    const renderItem = ({ item }) => {
        return <RepositoryItem item={item} navigate={navigate} />;
    };

    function repositoryHeader() {
        return (
            <View>
                <RepositoryFilter
                    searchword={searchword}
                    setSearchword={setSearchword}
                />
                <RepositoryOrder order={order} setOrder={setOrder} />
            </View>
        );
    }

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            ListHeaderComponent={repositoryHeader()}
            onEndReached={onEndReach}
        />
    );
};

const RepositoryList = () => {
    const [order, setOrder] = useState({
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
    });
    const [searchword, setSearchword] = useState('');
    const [debouncedSearchword] = useDebounce(searchword, 500);
    const { repositories, fetchMore } = useRepositories({
        order,
        searchKeyword: debouncedSearchword,
        first: 8,
    });

    const onEndReach = () => {
        fetchMore();
    };
    return (
        <RepositoryListContainer
            repositories={repositories}
            order={order}
            setOrder={setOrder}
            searchword={searchword}
            setSearchword={setSearchword}
            onEndReach={onEndReach}
        />
    );
};

export default RepositoryList;
