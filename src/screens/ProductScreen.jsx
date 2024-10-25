import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colores } from '../global/colores'
import products from '../data/products.json'


const ProductScreen = ({navigation,  route }) => {

    const [productFound, setProductFound] = useState({});

    const productId = route.params
    // Se hace el use effect con el metodo find para traer el objeto entero del producto, ya que sino estariamos trayendo unicamente el id, no toda la info.

    useEffect(()=> {
        setProductFound(products.find(product=>product.id === productId))
    },[])


  return (
    <View>
        <Pressable onPress={()=>navigation.goBack()}><Icon style={styles.iconoAtras} name='arrow-back-ios-new' size={20} color={colores.mainTheme} /></Pressable>
      <Text>{productFound.name}</Text>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    iconoAtras: {
        margin: 10,
    },
})