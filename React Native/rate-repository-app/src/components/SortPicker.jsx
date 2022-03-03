import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import theme from "../../styles/theme";

const styles = StyleSheet.create({
    picker: {
        padding: 14,
        fontSize: theme.fontSizes.subheading,
        backgroundColor: theme.backColors.picker,
        borderWidth: 0
    },
});

export const lastestRepository = {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC'
}

export const highestRated = {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC'
}

export const lowestRated = {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC'
}

const SortPicker = ({ sortBy, setSortBy }) => {
    return (
        <Picker
            selectedValue={JSON.stringify(sortBy)}
            onValueChange={val => setSortBy(JSON.parse(val))}
            style={styles.picker}
        >            
            <Picker.Item label='Select an item...' enabled={false} />
            <Picker.Item label='Latest repositories' value={JSON.stringify(lastestRepository)} />
            <Picker.Item label='Highest rated repositories' value={JSON.stringify(highestRated)} />
            <Picker.Item label='Lowest rated repositories' value={JSON.stringify(lowestRated)} />            
        </Picker>
    );
}

export default SortPicker;

