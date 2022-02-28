import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from "react-native";
import { format } from 'date-fns';

import useRepository from "../hooks/useRepository";

import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: '#ededed',
    },
    container: {
        flexDirection: 'row',
        padding: 14
    },
    rewiewRating: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: '#3980c7',
        borderWidth: 2,
        justifyContent: 'center',
    },
    reviewText: {
        flexShrink: 1,
        marginLeft: 8,
    }
  });

const formatDate = (strDate) => {
    const date = new Date(strDate);
    return format(new Date(date.getFullYear(),  date.getMonth(), date.getDate()), 'dd.MM.yyyy');
};
  
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
    return <RepositoryItem repo={repository} />;
}

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rewiewRating}>
                <Text fontSize='subheading' align='center' style={{ color: '#3980c7' }}>{review.rating}</Text>
            </View>
            <View style={styles.reviewText}>
                <View>
                    <Text fontWeight='bold'>{review.user.username}</Text>
                </View>
                <View>
                    <Text color='textSecondary'>{formatDate(review.createdAt)}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text>{review.text}</Text>
                </View>
            </View>
        </View>
    );
}

const SingleRepository = () => {
    const { id } = useParams();
    const { repository } = useRepository(id);
    const reviews = repository ? repository.reviews.edges.map(edge => edge.node): [];

    if (!repository) {
        return null;
    }

    return (
        <FlatList 
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        />
    );
}

export default SingleRepository;