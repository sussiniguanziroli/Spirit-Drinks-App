import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { colores } from '../global/colores';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import CameraIcon from '../components/CameraIcon';
import { useSelector, useDispatch } from 'react-redux';
import { setProfilePicture } from '../features/auth/authSlice';
import { usePutProfilePictureMutation } from '../services/userService';

const ProfileScreen = ({navigation}) => {

    const user = useSelector(state => state.authReducer.value.email)
    const profilePicture = useSelector(state => state.authReducer.value.profilePicture)
    const localId = useSelector(state=>state.authReducer.value.localId)
    const dispatch = useDispatch();

    

    

    const verifyPermissions = async () => {
        const { granted: cameraGranted } = await ImagePicker.requestCameraPermissionsAsync();
        const { granted: galleryGranted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!cameraGranted || !galleryGranted) {
            Alert.alert("Permisos insuficientes", "Necesitas otorgar permisos de cámara y galería para continuar.", [{ text: "Ok" }]);
            return false;
        }
        return true;
    };

    const pickImage = async () => {
        const permissionOK = await verifyPermissions();
        if (!permissionOK) return;

        Alert.alert(
            "Seleccionar imagen",
            "¿Deseas tomar una foto o seleccionar de la galería?",
            [
                {
                    text: "Cámara",
                    onPress: async () => {
                        let result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            aspect: [1, 1],
                            base64: true,
                            quality: 1,
                        });

                        if (!result.canceled) {
                            dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`));
                        }
                    }
                },
                {
                    text: "Galería",
                    onPress: async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            aspect: [1, 1],
                            base64: true,
                            quality: 1,
                        });

                        if (!result.canceled) {
                            dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`));
                        }
                    }
                },
                {
                    text: "Cancelar",
                    style: "cancel"
                }
            ]
        );
    };


   

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>


            <View style={styles.imageProfileContainer}>
                {
                    profilePicture
                        ?
                        <Image source={{ uri: profilePicture }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>


                }
                <Pressable onPress={() => { pickImage() }} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                    <CameraIcon />
                </Pressable>
            </View>

            <Pressable
                onPress={() => {navigation.navigate("EditarPerfil")}}
            ><Text>Editar Perfil</Text></Pressable>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    }
});

export default ProfileScreen;
