import { StyleSheet, Text, View, TextInput } from 'react-native'
import { colores } from '../global/colores'


const Search = ({setSearch}) => {
  return (
    <TextInput
        placeholder='Buscar un producto'
        onChangeText={(text)=> setSearch(text)}
        style={styles.searchInput}
    />
  )
}

export default Search

const styles = StyleSheet.create({
    searchInput: {
        margin: 5,
        borderWidth: 1,
        borderColor: colores.borgona,
        borderRadius: 10,
        padding: 5,
        paddingLeft: 5,
    }
})