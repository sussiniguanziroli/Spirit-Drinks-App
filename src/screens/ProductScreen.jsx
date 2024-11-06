import { StyleSheet, Text, View, Pressable, ScrollView, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colores } from '../global/colores'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../features/cart/cartSlice';
import { useGetProductQuery } from '../services/shopService';


const ProductScreen = ({ navigation }) => {

    const { width, height } = useWindowDimensions();
    const [categoriaEncontrada, setCategoriaEncontrada] = useState('');

    const dispatch = useDispatch();

    const productFound = useSelector(state => state.shopReducer.value.productIdSelected)


    useEffect(() => {
        setCategoriaEncontrada(productFound.category.name);
    }, [productFound]);



    return (
        <ScrollView style={styles.productContainer}>
            <Pressable onPress={() => navigation.goBack()}><Icon style={styles.goBack} name="arrow-back-ios" size={24} /></Pressable>
            <Text style={styles.textBrand}>{categoriaEncontrada}</Text>
            <Text style={styles.textTitle}>{productFound.name}</Text>
            <View style={styles.imageView}>
                <Image
                    source={{ uri: productFound.image }}
                    alt={productFound.name}
                    width='100%'
                    height={width * .7}
                    resizeMode='contain'
                />
            </View>
            <Text style={styles.longDescription}>{productFound.description}</Text>
            <View style={styles.tagsContainer}>
                <View style={styles.tags}>
                    <Text style={styles.tagText}>Tags : </Text>
                    {
                        /* <FlatList
                            style={styles.tags}
                            data={productFound.tags}
                            keyExtractor={() => Math.random()}
                            renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
                        /> */
                        productFound.tags?.map(tag => <Text key={Math.random()} style={styles.tagText}>{tag}</Text>)
                    }
                </View>

                {
                    productFound.discount > 0 && <View style={styles.discount}><Text style={styles.discountText}>- {productFound.discount} %</Text></View>
                }
            </View>
            {
                productFound.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>
            }
            <Text style={styles.price}>Precio: $ {productFound.price}</Text>
            <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToCartButton]}
                onPress={() => dispatch(addItem({ ...productFound, cantidad: 1 }))}>
                <Text style={styles.textAddToCart}>Agregar al carrito</Text>
            </Pressable>
        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    goBack: {
        margin: 10,
        color: colores.mainTheme
    },
    productContainer: {
        paddingHorizontal: 16
    },
    textBrand: {
        color: colores.doradoApagado,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700'
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        paddingVertical: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8
    },
    tags: {
        flexDirection: 'row',
        gap: 5,
    },
    tagText: {
        //fontFamily:"Montserrat",
        fontWeight: '600',
        fontSize: 14,
        color: colores.mainTheme
    },
    price: {
        fontWeight: '800',
        fontSize: 18
    },
    discount: {
        backgroundColor: colores.doradoApagado,
        width: 64,
        height: 64,
        //padding: 8,
        borderRadius: 64,
        //alignSelf: 'flex-start',
    },
    discountText: {
        color: colores.blancoApagado,
        /* position:'absolute',
        top:16,
        left: 16, */
        textAlign: 'center',
        verticalAlign: 'center'
    },
    noStockText: {
        color: 'red'
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colores.mainTheme,
        borderRadius: 16,
        marginVertical: 16
    },
    textAddToCart: {
        color: colores.blancoApagado,
        fontSize: 24,
        textAlign: 'center',

    },
    imageView: {
        marginVertical: 17,
    }
})