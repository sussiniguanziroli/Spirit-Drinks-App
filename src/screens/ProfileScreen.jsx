import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { colores } from '../global/colores';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../features/auth/authSlice';
import { clearSessions } from '../db';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useWindowDimensions } from 'react-native';
import { clearProfileData } from '../features/user/userSlice';



const ProfileScreen = ({ navigation }) => {

    const user = useSelector(state => state.authReducer.value.email)
    const profilePicture = useSelector(state => state.authReducer.value.profilePicture)
    const dispatch = useDispatch();
    const profileData = useSelector(state => state.userReducer)

    const { width } = useWindowDimensions();
    const headerWidth = width * 0.86;

    const handleLogOut = () => {
        clearSessions();
        dispatch(clearUser());
        dispatch(clearProfileData());
    }

    useEffect(() => {
        // Comprueba si solo hay nombre y apellido definidos
        const { name, surname, ...rest } = profileData;
        const hasAdditionalInfo = Object.values(rest).some(value => value);

        if (!hasAdditionalInfo) {
            Alert.alert(
                "Completa tu perfil",
                "Por favor, agrega más información en tu perfil para mejorar tu experiencia.",
                [
                    { text: "Completar Informacion", onPress: () => navigation.navigate('EditarPerfil') },
                    { text: "Cerrar", style: "cancel" },
                ]
            );
        }
    }, [profileData, navigation]);


    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={[styles.profileHeaderContainer, { width: headerWidth }]}>

                <Pressable
                    onPress={() => { navigation.navigate("EditarPerfil") }}
                >
                    <Icon name='edit' color={colores.blancoApagado} size={25} />
                </Pressable>


                <Text style={styles.title}>Mi Perfil</Text>

                <Pressable
                    onPress={handleLogOut}
                >
                    <Icon name='logout' color={colores.blancoApagado} size={25} />
                </Pressable>



            </View>

            <View style={styles.imageProfileContainer}>
                {
                    profilePicture
                        ?
                        <Image source={{ uri: profilePicture }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>


                }
            </View>

            <Text style={styles.label}>Nombre: {profileData.name || "Sin especificar"}</Text>
            <Text style={styles.label}>Apellido: {profileData.surname || "Sin especificar"}</Text>
            <Text style={styles.label}>Ubicación: {profileData.location || "Sin especificar"}</Text>
            <Text style={styles.label}>Fecha de nacimiento: {profileData.birthdate || "Sin especificar"}</Text>
            <Text style={styles.label}>Bebida favorita: {profileData.favoriteDrink || "Sin especificar"}</Text>
            <Text style={styles.label}>Experiencia: {profileData.experienceLevel || "Sin especificar"}</Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    profileHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        flexGrow: 1,
        backgroundColor: colores.mainTheme,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    title: {
        fontSize: 28,
        color: colores.verdeEsmeralda,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colores.grisClaro,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    imagePlaceholder: {
        color: colores.azulOscuro,
        fontSize: 14,
    },
    input: {
        width: '100%',
        backgroundColor: colores.blancoApagado,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        color: colores.azulOscuro,
    },
    label: {
        color: colores.grisClaro,
        fontSize: 16,
        alignSelf: 'flex-start',
        marginVertical: 5,
    },
    picker: {
        width: '100%',
        backgroundColor: colores.blancoApagado,
        borderRadius: 10,
        marginVertical: 10,
    },
    saveButton: {
        width: '100%',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginVertical: 20,
    },
    saveButtonText: {
        color: colores.blancoApagado,
        fontWeight: 'bold',
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colores.blancoApagado,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    textProfilePlaceHolder: {
        color: colores.verdeOscuro,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
});

export default ProfileScreen;
