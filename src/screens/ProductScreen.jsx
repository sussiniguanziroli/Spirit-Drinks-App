import { StyleSheet, Text, View, Pressable, ScrollView, Image, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colores } from '../global/colores'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../features/cart/cartSlice';
import { useGetProductQuery } from '../services/shopService';
import Toast from 'react-native-toast-message';



const ProductScreen = ({ navigation }) => {

    const { width, height } = useWindowDimensions();

    const productIdSelected = useSelector(state => state.shopReducer.value.productIdSelected)
    const { data: productFound, error, isLoading } = useGetProductQuery(productIdSelected);

    const dispatch = useDispatch();

    const handleAddItem = () => {
        dispatch(addItem({ ...productFound, cantidad: 1 }))
        showToast("success", "¡Producto Agregado al Carrito!");
    }

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 1000,
        });
    };

    return (
        <>
            <Toast
                style={{ zIndex: 100, position: 'absolute', top: 0, left: 0, right: 0 }}
            />
            {
                isLoading
                    ?
                    <View style={styles.ActivityIndicatorView}>
                        <ActivityIndicator size="large" color={colores.mainTheme} />
                    </View>
                    :
                    error
                        ?
                        <Text>Error al cargar producto</Text>
                        :
                        <>

                            < ScrollView style={styles.productContainer}>
                                <Pressable onPress={() => navigation.goBack()}><Icon style={styles.goBack} name="arrow-back-ios" size={24} /></Pressable>
                                <Text style={styles.textBrand}>{productFound.category.name}</Text>
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
                                    onPress={handleAddItem}>
                                    <Text style={styles.textAddToCart}>Agregar al carrito</Text>
                                </Pressable>
                            </ScrollView >
                        </>
            }
        </>
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
        borderRadius: 64,
    },
    discountText: {
        color: colores.blancoApagado,
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
    },
    ActivityIndicatorView: {
        height: '100%',
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
    }
})