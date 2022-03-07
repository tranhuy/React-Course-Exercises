import { View, FlatList, StyleSheet } from "react-native";
import * as Utils from "../utils/utils";

import Text from "./Text";

import useLoggedInUser from "../hooks/useLoggedInUser";

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

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rewiewRating}>
                <Text fontSize='subheading' align='center' style={{ color: '#3980c7' }}>{review.rating}</Text>
            </View>
            <View style={styles.reviewText}>
                <View>
                    <Text fontWeight='bold'>{review.repository.fullName}</Text>
                </View>
                <View>
                    <Text color='textSecondary'>{Utils.formatDate(review.createdAt)}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text>{review.text}</Text>
                </View>
            </View>
        </View>
    );
}

const MyReviews = () => {
    const { user } = useLoggedInUser(true);   
    const reviews = user?.reviews.edges.map(edge => edge.node);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={({ id }) => id}
        />
    );
}

export default MyReviews;