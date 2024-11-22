import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { colores } from '../global/colores';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from '../features/user/userSlice';
import { usePutProfileDataMutation } from '../services/userService';
import { validationSchema } from '../validations/validationSchema';
import Toast from 'react-native-toast-message';

const SignUpScreen = ({ navigation }) => {
    const profileData = useSelector(state => state.userReducer);
    const localId = useSelector(state => state.authReducer.value.localId);

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

    const [triggerPutProfileDataMutation] = usePutProfileDataMutation();
    const [triggerSignUp, result] = useSignUpMutation();

    const dispatch = useDispatch();

    const handleChange = (key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000, 
        });
    };

    useEffect(() => {
        if (result.status === "fulfilled") {
            dispatch(setUser(result.data));
        }
    }, [result]);

    const onConfirmAge = () => {
        Alert.alert(
            "Confirmación de edad",
            "Debes ser mayor de 18 años para registrarte. ¿Confirmas que eres mayor de 18 años?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Sí",
                    onPress: () => handleSignUp(),
                },
            ]
        );
    };

    const handleSignUp = async () => {
        try {
            
            validationSchema.validateSync({ data, email, password, confirmPassword });
            setErrorConfirmPassword("");
            setErrorEmail("");
            setErrorPassword("");
            setErrorName("");
            setErrorSurname("");

           
            const signUpResponse = await triggerSignUp({ email, password }).unwrap();
            const { localId } = signUpResponse;

            dispatch(setUser(signUpResponse));

           
            const profilePayload = {
                name: data.name.trim(),
                surname: data.surname.trim(),
            };

            await triggerPutProfileDataMutation({ data: profilePayload, localId }).unwrap();
            dispatch(setProfileData(profilePayload));
            showToast("success", "Creaste tu cuenta con exito!")
            
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al registrarse. Inténtalo de nuevo.");
            switch (error.path) {
                case "email":
                    setErrorEmail(error.message);
                    break;
                case "password":
                    setErrorPassword(error.message);
                    break;
                case "confirmPassword":
                    setErrorConfirmPassword(error.message);
                    break;
                case "data":
                    setErrorName("El nombre debe ser válido");
                case "data":
                    setErrorSurname("El apellido debe ser válido");
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <View style={styles.container}>
            <Toast
                style={{ zIndex: 100, position: 'absolute', top: 0, left: 0, right: 0 }}
            />
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
                style={styles.input}
                placeholder="Email"
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
                onPress={onConfirmAge}
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


export default SignUpScreen;

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


