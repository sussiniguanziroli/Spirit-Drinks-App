import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colores } from '../global/colores';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/auth/authSlice';
import { UseDispatch, useDispatch } from 'react-redux';

const SignUpScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [triggerSignUp, result] = useSignUpMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (result.status==="rejected") {
            console.log("Error al agregar el usuario", result)
        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con exito")
            dispatch(setUser({email:result.data}))
        }
    },[result])

    const onSubmit = () => {
        console.log(username ,email, password, confirmPassword)

        triggerSignUp({
            email,
            password
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Spirit Drinks</Text>
            <Text style={styles.subtitle}>Registro</Text>

            <TextInput
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor={colores.grisClaro}
            />

            <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input} placeholder="Email"
                placeholderTextColor={colores.grisClaro}
            />

            <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={colores.grisClaro}
                secureTextEntry
            />

            <TextInput
                onChangeText={(text) => setConfirmPassword(text)}
                style={styles.input}
                placeholder="Repetir contraseña"
                placeholderTextColor={colores.grisClaro}
                secureTextEntry
            />

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? colores.verdeOscuro : colores.verdeEsmeralda },
                ]}
                onPress={() => {
                   onSubmit()
                }}
            >
                <Text style={styles.buttonText}>Registrarse</Text>
            </Pressable>

            <Text style={styles.linkText}>
                ¿Ya tienes una cuenta?
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Ingresar</Text>
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
});

export default SignUpScreen;
