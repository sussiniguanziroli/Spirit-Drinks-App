import { StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native'
import React from 'react'
import categories from '../data/categories.json'
import ItemCard from '../components/ItemCard'
import { useWindowDimensions } from 'react-native';
import { colores } from '../global/colores';

const CategoriesScreen = ({navigation}) => {

    const {width, height} = useWindowDimensions()

    const renderCategoryItem = ({item}) => {
        return (
            
            <Pressable onPress={()=>navigation.navigate('Products', item.id)}>
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
        marginTop: 10,
        borderRadius: 10,
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
})