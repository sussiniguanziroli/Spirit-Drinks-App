import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductScreen = ({productId}) => {
  return (
    <View>
      <Text>{productId}</Text>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({})