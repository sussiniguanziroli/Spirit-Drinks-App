import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { colores } from '../global/colores';
import ItemCard from '../components/ItemCard'
import { useWindowDimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../services/shopService';

const CategoriesScreen = ({ navigation }) => {


    //const categories = useSelector(state => state.shopReducer.value.categories)

    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    const dispatch = useDispatch();

    const renderCategoryItem = ({ item }) => {
        return (

            <Pressable onPress={() => {
                dispatch(setCategory(item.id))//item.id es action.payload
                navigation.navigate('Products')
            }}>
                <ItemCard style={styles.flatCardContainer}>
                    {/* La prop de children dentro de ItemCard responde a todo lo que ponemos dentro de la etiqueta componente */}
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.categoryTitle}>{item.name}</Text>
                </ItemCard>
            </Pressable>
        )
    }

    return (
        <View style={styles.categoriesContainer}>
            {
                isLoading
                    ?
                    <View style={styles.ActivityIndicatorView}>
                        <ActivityIndicator size="large" color={colores.mainTheme} />
                    </View>
                    :
                    error
                        ?
                        <Text>Error al cargar las categorias</Text>
                        :
                        <FlatList
                            data={categories}
                            keyExtractor={item => item.id}
                            renderItem={renderCategoryItem}
                        />
            }

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
    ActivityIndicatorView: {
        height: '100%',
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
    }
})