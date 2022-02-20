import { View, Image, StyleSheet } from "react-native";

import Text from "./Text";

const RepositoryItem = ({ repo }) => {
    
    const parseCount = (value) => {
        if (value < 1000) return value;
        
        return Math.round(Number(value)/1000 * 10)/10 + 'k';
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', height: 140 }}>
                <Image 
                    source={{
                        uri: `${repo.ownerAvatarUrl}`
                    }}
                    style={styles.avatarImage}
                />
                <View style={{ flexDirection: 'column', justifyContent: 'space-around', padding: 20 }}>
                    <Text fontSize='subheading' fontWeight='bold'>{repo.fullName}</Text>
                    <Text color='textSecondary'>{repo.description}</Text>
                    <Text style={styles.language}>{repo.language}</Text>
                </View>
            </View> 
            <View style={styles.repoStatsSection}>  
                <View style={styles.singleStatSection}>
                    <Text fontSize='subheading' fontWeight='bold' align='center'>{parseCount(repo.stargazersCount)}</Text>
                    <Text color='textSecondary' align='center'>Stars</Text>
                </View>
                <View style={styles.singleStatSection}>
                    <Text fontSize='subheading' fontWeight='bold' align='center'>{parseCount(repo.forksCount)}</Text>
                    <Text color='textSecondary' align='center'>Forks</Text>
                </View>
                <View style={styles.singleStatSection}>
                    <Text fontSize='subheading' fontWeight='bold' align='center'>{parseCount(repo.reviewCount)}</Text>
                    <Text color='textSecondary' align='center'>Reviews</Text>
                </View>
                <View style={styles.singleStatSection}>
                    <Text fontSize='subheading' fontWeight='bold' align='center'>{parseCount(repo.ratingAverage)}</Text>
                    <Text color='textSecondary' align='center'>Rating</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
    repoStatsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    singleStatSection: {
        flexDirection: 'column',
    },
    language: {
        alignSelf: 'flex-start',
        backgroundColor: '#0365d0',
        color: '#ffffff',
        padding: 8,
        borderRadius: 5,
        textAlign: 'center',
    },  
    avatarImage: {
        alignSelf: 'flex-start',
        width: 70,
        height: 70,
        borderRadius: 5
    }
})

export default RepositoryItem;