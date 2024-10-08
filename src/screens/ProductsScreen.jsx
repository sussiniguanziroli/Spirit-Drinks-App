import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import productos from "../data/products.json"
import ItemCard from '../components/ItemCard'
import { colores } from '../global/colores'


const ProductsScreen = ({categoryDown, setCategoryUp}) => {
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(()=> {
        const productsFilter = productos.filter((producto) => producto.category.id === categoryDown)
        setFilteredProducts(productsFilter)
    },[categoryDown]);

    

    const renderProductItem = ({ item }) => {
        return (
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
                            keyExtractor={()=>Math.random()}
                            renderItem= {({item})=>(<Text style={styles.tagsText}> {item} </Text>)}
                            />
                        }

                    </View>
                    {
                        item.stock<=0 && <Text style={styles.sinStockText}>Sin Stock</Text>
                    }
                    <Text style={styles.price}>Precio: $ {item.price}</Text>
                </View>

            </ItemCard>
        )
    }

    return (
        <>
            <Pressable onPress={()=>setCategoryUp("")}><Text  style={styles.backButton} >Volver</Text></Pressable>
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
    backButton: {
        padding: 7,
        fontSize: 18,
    },
})