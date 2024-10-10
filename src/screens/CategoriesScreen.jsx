import { StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native'
import React from 'react'
import categories from '../data/categories.json'
import ItemCard from '../components/ItemCard'

const CategoriesScreen = ({setCategory}) => {

    const renderCategoryItem = ({item}) => {
        return (
            
            <Pressable onPress={()=>setCategory(item.id)}>
            <ItemCard style={styles.flatCardContainer}>
                {/* La prop de children dentro de ItemCard responde a todo lo que ponemos dentro de la etiqueta componente */}
                <Image
                    source={{uri:item.image}}
                    style={styles.image}
                    resizeMode= "contain"
                />
                <Text style={styles.categoryTitle}>{item.name}</Text>
            </ItemCard>
            </Pressable>
        )
    }

  return (
    <View style={styles.categoriesContainer}>
        <Text style={styles.categoriasContainerTitulo}>Categorias</Text>
      <FlatList
        data={categories}
        keyExtractor={item=>item.id}
        renderItem={renderCategoryItem}
      />
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    flatCardContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row-reverse',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
        margin: 10,
        fontSize: 18,
    },
    image: {
        width: 120,
        height: 50,
    },
    categoryTitle: {
        fontSize: 30,
    },
    categoriasContainerTitulo: {
        margin: 10,
        marginHorizontal: 10,
        fontSize: 18,
    }
})