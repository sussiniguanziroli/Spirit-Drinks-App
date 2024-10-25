import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {colores} from '../global/colores'

const Header = ({ subtitle }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Spirit Drinks</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
        fontSize: 22,
        color: colores.blancoApagado,
        alignSelf: 'center',
    },
    subtitle: {
        alignSelf: 'center',
        marginTop: 5,
        color: colores.blancoApagado,
        fontSize: 20,
    }
})

