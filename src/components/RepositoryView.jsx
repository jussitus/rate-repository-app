import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const RepositoryView = () => {
    const { id } = useParams();
    const { loading, error, repository } = useRepository(id);
    if (loading || error) {
        return <Text>Loading... Or error.</Text>;
    }
    return <RepositoryItem item={repository} singleView={true} />;
};

export default RepositoryView;
