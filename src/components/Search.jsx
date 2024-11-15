import { StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { colores } from '../global/colores';

const Search = ({ setSearch }) => {
    const { width } = useWindowDimensions();
    const searchWidth = width * 0.86;

    return (
        <TextInput
            placeholder='Buscar un producto'
            onChangeText={(text) => setSearch(text)}
            style={[styles.searchInput, { width: searchWidth }]} 
        />
    );
};

export default Search;

const styles = StyleSheet.create({
    searchInput: {
        margin: 5,
        borderWidth: 1,
        borderColor: colores.borgona,
        borderRadius: 10,
        padding: 5,
        paddingLeft: 5,
    }
});
