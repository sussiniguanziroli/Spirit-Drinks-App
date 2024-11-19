import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colores } from '../global/colores';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { usePutProfileDataMutation } from '../services/userService';
import { validationSchema } from '../validations/validationSchema';
import { Alert } from 'react-native';


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

    const [errorName, setErrorName] = useState("");
    const [errorSurname, setErrorSurname] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const [genericValidationError, setGenericValidationError] = useState("");


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
            validationSchema.validateSync({data, email, password, confirmPassword })
            setErrorConfirmPassword("")
            setErrorEmail("")
            setErrorPassword("")
            setErrorName("")
            setErrorSurname("")
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
            switch (error.path) {
                case "email":
                    setErrorEmail(error.message)
                    break
                case "password":
                    setErrorPassword(error.message)
                    break
                case "confirmPassword":
                    setErrorConfirmPassword(error.message)
                    break
                case "data":
                    setErrorName(error.message)
                case "data":
                    setErrorSurname(error.message)
                    break
                default:
                    setGenericValidationError(error.message)
                    break
            }
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
            <Text style={styles.whiteLabel}>{errorName}</Text>
            <TextInput
                placeholderTextColor={colores.grisClaro}
                style={styles.input}
                placeholder="Apellido"
                value={data.surname}
                onChangeText={(value) => handleChange("surname", value)}
            />
            <Text style={styles.whiteLabel}>{errorSurname}</Text>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input} placeholder="Email"
                placeholderTextColor={colores.grisClaro}
            />
            <Text style={styles.whiteLabel}>{errorEmail}</Text>
            <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={colores.grisClaro}
                secureTextEntry
            />
            <Text style={styles.whiteLabel}>{errorPassword}</Text>
            <TextInput
                onChangeText={(text) => setConfirmPassword(text)}
                style={styles.input}
                placeholder="Repetir contraseña"
                placeholderTextColor={colores.grisClaro}
                secureTextEntry
            />
            <Text style={styles.whiteLabel}>{errorConfirmPassword}</Text>
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
    whiteLabel: {
        color: colores.rojoError,
        alignSelf: "flex-start",
        margin: 0,
    }
});

export default SignUpScreen;
