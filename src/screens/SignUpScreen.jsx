import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colores } from '../global/colores';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { usePutProfileDataMutation } from '../services/userService';

const SignUpScreen = ({ navigation }) => {

    const profileData = useSelector(state => state.userReducer)
    const localId = useSelector(state => state.authReducer.value.localId)

    const [data, setData] = useState({
        name: profileData.name,
        surname: profileData.surname,
    });


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [triggerPutProfileDataMutation, resultBis] = usePutProfileDataMutation();
    const [triggerSignUp, result] = useSignUpMutation();

    const dispatch = useDispatch();

    const handleChange = (key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };



    useEffect(() => {
        if (result.status === "rejected") {
        } else if (result.status === "fulfilled") {
            dispatch(setUser(result.data))
        }
    }, [result])

    const onSubmit = async () => {
        try {
            // Primero, intenta registrar al usuario
            const signUpResponse = await triggerSignUp({
                email,
                password,
            }).unwrap(); // unwrap para manejar errores directamente
    
            // Si se crea el usuario, obtén el localId
            const { localId } = signUpResponse;
    
            // Actualiza el estado global con la información del usuario
            dispatch(setUser(signUpResponse));
    
            // Prepara los datos del perfil
            const profilePayload = {
                name: data.name.trim(),
                surname: data.surname.trim(),
            };
    
            // Guarda los datos del perfil en Firebase
            await triggerPutProfileDataMutation({ data: profilePayload, localId }).unwrap();
    
            // Actualiza el estado global con los datos del perfil
            dispatch(setProfileData(profilePayload));
    
        } catch (error) {
            // Manejo de errores
            console.error("Error durante el registro:", error);
            Alert.alert("Error", "Hubo un problema al registrarse. Inténtalo de nuevo.");
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Spirit Drinks</Text>
            <Text style={styles.subtitle}>Registro</Text>


            <TextInput
                placeholderTextColor={colores.grisClaro}
                style={styles.input}
                placeholder="Nombre"
                value={data.name}
                onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
                placeholderTextColor={colores.grisClaro}
                style={styles.input}
                placeholder="Apellido"
                value={data.surname}
                onChangeText={(value) => handleChange("surname", value)}
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
