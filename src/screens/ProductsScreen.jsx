import { StyleSheet, Text, View, FlatList, Image, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { colores } from '../global/colores'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setProductId } from '../features/shop/shopSlice';


const ProductsScreen = ({ navigation, route }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();

    const filteredProductsByCategory = useSelector(state => state.shopReducer.value.filteredProductsByCategory)
    useEffect(() => {
        setFilteredProducts(filteredProductsByCategory)
        if (search) {
            setFilteredProducts(filteredProductsByCategory.filter(product => product.name.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search]);



    const renderProductItem = ({ item }) => {
        return (
            <Pressable onPress={() => 
                {dispatch(setProductId(item.id))
                navigation.navigate("Product")}}
            >
                <ItemCard style={styles.productContainer}>
                    <View>

                        <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.productTextContainer}>
                        <Text style={styles.productTitle}>{item.name}</Text>
                        <Text style={styles.productDesc}>{item.description}</Text>
                        <View style={styles.tagView}>
                            {
                                <FlatList
                                    style={styles.tags}
                                    data={item.tags}
                                    keyExtractor={() => Math.random()}
                                    renderItem={({ item }) => (<Text style={styles.tagsText}> {item} </Text>)}
                                />
                            }

                        </View>
                        {
                            item.stock <= 0 && <Text style={styles.sinStockText}>Sin Stock</Text>
                        }
                        <Text style={styles.price}>Precio: $ {item.price}</Text>
                    </View>

                </ItemCard>
            </Pressable>
        )
    }

    return (
        <>
            <Pressable onPress={() => navigation.goBack()}><Icon style={styles.iconoAtras} name='arrow-back-ios-new' size={20} color={colores.mainTheme} /></Pressable>
            <Search setSearch={setSearch} />
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id}
                renderItem={renderProductItem}
            />
        </>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productContainer: {
        borderRadius: 10,
        padding: 10,
        margin: 7,
        marginHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    productTextContainer: {
        padding: 10,
    },
    productImage: {
        borderRadius: 10,
        height: 120,
        width: 70,
    },
    productDesc: {
        textAlign: 'left',
        width: 260,
    },
    productTitle: {
        paddingVertical: 5,
        fontSize: 18,
        fontFamily: 'PlayfairDisplay',
    },
    tags: {
        flexDirection: 'row',
    },
    tagsText: {
        fontFamily: 'Cursiva',
        fontSize: 32,
    },
    tagView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    price: {
        fontWeight: 'bold',
        backgroundColor: colores.doradoApagado,
        borderRadius: 10,
        marginVertical: 5,
        padding: 5,
        alignSelf: 'flex-start',
    },
    sinStockText: {
        fontWeight: 'bold',
        color: colores.borgona,
    },
    iconoAtras: {
        margin: 10,
    },
})