import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colores } from '../global/colores';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Spirit Drinks</Text>
            <Text style={styles.subtitle}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colores.grisClaro}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={colores.grisClaro}
                secureTextEntry
            />

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? colores.verdeOscuro : colores.verdeEsmeralda },
                ]}
                onPress={() => {
                    // Acción de iniciar sesión
                    console.log("Iniciar sesión presionado");
                }}
            >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>

            <Text style={styles.linkText}>
                ¿No tienes una cuenta?
                <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}> Crear una</Text>
            </Text>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.mainTheme,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        fontSize: 32,
        color: colores.dorado,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 24,
        color: colores.verdeEsmeralda,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: colores.blancoApagado,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        color: colores.azulOscuro,
    },
    button: {
        width: '100%',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: colores.blancoApagado,
        fontWeight: 'bold',
    },
    linkText: {
        color: colores.grisClaro,
    },
    link: {
        color: colores.verdeEsmeralda,
        fontWeight: 'bold',
    },
    guestText: {
        color: colores.grisClaro,
        marginTop: 20,
    },
    guestLink: {
        color: colores.verdeEsmeralda,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
