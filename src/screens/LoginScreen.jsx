import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colores } from '../global/colores';
import { useLoginMutation } from '../services/authService';
import { setUser } from '../features/auth/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()


    useEffect(()=>{
        if(result.status==="rejected"){
            console.log("Error al iniciar sesión", result)
        }else if(result.status==="fulfilled"){
            console.log("Usuario logueado con éxito")
            dispatch(setUser(result.data))
            
        }
        
    },[result]) 

    const onsubmit = ()=>{
        //console.log(email,password)       
        triggerLogin({email,password})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Spirit Drinks</Text>
            <Text style={styles.subtitle}>Login</Text>

            <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colores.grisClaro}
            />

            <TextInput
                onChangeText={(text) => setPassword(text)}
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
                    onsubmit()
                }}
            >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>

            <Text style={styles.linkText}>
                ¿No tienes una cuenta?
                <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}> Crear una</Text>
            </Text>

            <Pressable onPress={()=>dispatch(setUser({email:"demo@mundogeek.com",token:"demo"}))}>
                <Text style={styles.guestText}>
                    ¿Sólo quieres dar un vistazo?
                    <Text style={styles.guestLink}> Ingresa como invitado</Text>
                </Text>
            </Pressable>

            
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
