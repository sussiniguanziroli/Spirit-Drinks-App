import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import products from "../data/products.json"
import ItemCard from '../components/ItemCard'


const ProductsScreen = () => {

    const renderProductItem = ({ item }) => {
        return (
            <ItemCard style={styles.productContainer}>
                <View>

                    <Image
                        source={{ uri: item.image }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productTextContainer}>
                    <Text style={styles.productTitle}>{item.name}</Text>
                    <Text style={styles.productDesc}>{item.description}</Text>

                    <View style={styles.productPriceContainer}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    </View>
                </View>
                
            </ItemCard>
        )
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
        />
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productContainer: {
        padding: 10,
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    productImage: {
        height: 90,
        width: 40,
    },
    productTextContainer: {
        marginHorizontal: 7,
        paddingHorizontal: 7,
        padding: 10,
        gap: 10,
    },
    productTitle: {
        fontSize: 18,
        paddingHorizontal: 7,
        marginHorizontal: 7,
    },
    productDesc: {
        paddingHorizontal: 7,
        marginHorizontal: 7,
    }
})