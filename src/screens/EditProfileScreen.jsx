import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colores } from '../global/colores'
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import CameraIcon from '../components/CameraIcon';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { setProfileData } from '../features/user/userSlice';
import { setProfilePicture } from '../features/auth/authSlice';
import { usePutProfileDataMutation } from '../services/userService';


const EditProfileScreen = ({navigation}) => {

    const user = useSelector(state => state.authReducer.value.email)
    const profilePicture = useSelector(state => state.authReducer.value.profilePicture)
    const localId = useSelector(state=>state.authReducer.value.localId)
    const profileData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();


    const [triggerPutProfileDataMutation, dataResult] = usePutProfileDataMutation();
    
    const [data, setData] = useState({
        name: profileData.name,
        surname: profileData.surname,
        location: profileData.location,
        birthdate: profileData.birthdate,
        favoriteDrink: profileData.favoriteDrink,
        experienceLevel: profileData.experienceLevel,
    });

    const handleChange = (key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const saveProfile = () => {
        dispatch(setProfileData(data));
        triggerPutProfileDataMutation({profilePicture, data, localId})
    };

    


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


            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={data.name}
                onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={data.surname}
                onChangeText={(value) => handleChange("surname", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Ubicación"
                value={data.location}
                onChangeText={(value) => handleChange("location", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento"
                value={data.birthdate}
                onChangeText={(value) => handleChange("birthdate", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Bebida favorita"
                value={data.favoriteDrink}
                onChangeText={(value) => handleChange("favoriteDrink", value)}
            />
            <Picker
                selectedValue={data.experienceLevel}
                style={styles.picker}
                onValueChange={(value) => handleChange("experienceLevel", value)}
            >
                <Picker.Item label="Novato" value="Novato" />
                <Picker.Item label="Intermedio" value="Intermedio" />
                <Picker.Item label="Experto" value="Experto" />
            </Picker>

            <Pressable
                style={({ pressed }) => [
                    styles.saveButton,
                    { backgroundColor: pressed ? colores.verdeOscuro : colores.verdeEsmeralda },
                ]}
                onPress={()=> {{saveProfile(),navigation.navigate("Perfil")}}}
            >
                <Text style={styles.saveButtonText}>Guardar Perfil</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    styles.saveButton,
                    { backgroundColor: pressed ? colores.dorado : colores.doradoApagado },
                ]}
                onPress={()=> {{navigation.navigate("Perfil")}}}
            >
                <Text style={styles.saveButtonText}>Cancelar</Text>
            </Pressable>
        </ScrollView>

    )
}

export default EditProfileScreen

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
        marginVertical: 10,
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
})
