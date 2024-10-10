import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {colores} from '../global/colores'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Spirit Drinks</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        height: 130,
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: colores.mainTheme,
    },
    title: {
        fontFamily: 'PlayfairDisplay',
        fontSize: 18,
        color: colores.blancoApagado,
        alignSelf: 'center',
    }
})

