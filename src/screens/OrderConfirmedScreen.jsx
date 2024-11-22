import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colores } from '../global/colores'; 

const OrderConfirmedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={120} color={colores.verdeEsmeralda} />
      </View>

      <Text style={styles.title}>¡Orden Enviada!</Text>
      <Text style={styles.subtitle}>Tu pedido está en camino. Gracias por comprar con nosotros.</Text>

      <Pressable
        style={styles.button}
        onPress={() =>  navigation.navigate("TabNavigator", { screen: "Categories" })}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </Pressable>
    </View>
  );
};

export default OrderConfirmedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.blancoApagado, 
    padding: 20,
  },
  iconContainer: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.verdeEsmeralda,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colores.grisMedio, 
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: colores.verdeEsmeralda,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
