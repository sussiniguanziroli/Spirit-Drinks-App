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
        shadowColor: colores.doradoApagado,
        shadowOpacity: 1,
        shadowRadius:1,
        shadowOffset: {width: 3, height:5,},
        elevation:5,
    },

})