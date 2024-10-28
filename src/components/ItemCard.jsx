import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {colores} from '../global/colores'

const ItemCard = ({children, style}) => {
  return (
    <View style={{...styles.cardContainer, ...style}}>
          
    {children}
        
    </View>
  )
}

export default ItemCard

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colores.grisClaro,
        shadowColor: "#000000",
        shadowOpacity: 1,
        shadowRadius:.5,
        shadowOffset: {width: 3, height:5,},
        elevation:5,
    },

})