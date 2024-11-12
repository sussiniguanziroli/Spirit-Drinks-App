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
        shadowOpacity: 0.2,
        shadowRadius:.2,
        shadowOffset: {width: 1, height:2,},
        elevation:5,
    },

})