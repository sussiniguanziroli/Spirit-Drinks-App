import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { colores } from '../global/colores';

const StartScreen = ({ navigation }) => {
    const handleCategoriesPress = () => {
        navigation.navigate("TabNavigator", { screen: "Categories" });
    };

    const handleTourPress = () => {
        navigation.navigate('Tour'); 
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://i.ibb.co/zfJvBXF/spirit-full-3.png' }}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>¡Bienvenido a Spirit Drinks!</Text>
            <Text style={styles.subtitle}>
                Explora nuestras categorías y descubre todo lo que tenemos para ofrecerte.
            </Text>

            <Pressable style={({ pressed }) => [styles.button, { backgroundColor: pressed ? colores.dorado : colores.doradoApagado }]} onPress={handleCategoriesPress}>
                <Text style={styles.buttonText}>Ver Categorías</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [styles.buttonOutline, { borderColor: pressed ? colores.blancoApagado : colores.doradoApagado }]} onPress={handleTourPress}>
                <Text style={styles.buttonTextOutline}>Hacer un Tour</Text>
            </Pressable>
        </View>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.mainTheme, // Cambia según el esquema de colores global
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: '100%',
        height: 90,
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colores.dorado,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: colores.blancoApagado,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 16,
        color: colores.blanco,
        fontWeight: 'bold',
    },
    buttonOutline: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
    },
    buttonTextOutline: {
        fontSize: 16,
        color: colores.dorado,
        fontWeight: 'bold',
    },
});
