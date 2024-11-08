import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView } from 'react-native';
import { colores } from '../global/colores';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import CameraIcon from '../components/CameraIcon';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {

    const user = useSelector(state=>state.authReducer.value.email)

    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [favoriteDrink, setFavoriteDrink] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('novato');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.uri);
        }
    };

    const saveProfile = () => {
        // Lógica para guardar el perfil del usuario
        console.log("Perfil guardado");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>


            <View style={styles.imageProfileContainer}>
                {
                    profileImage
                        ?
                        <Image source={{ uri: profileImage }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                    <CameraIcon />
                </Pressable>
            </View>






            <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor={colores.grisClaro}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colores.grisClaro}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Ubicación"
                placeholderTextColor={colores.grisClaro}
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento (DD/MM/AAAA)"
                placeholderTextColor={colores.grisClaro}
                value={birthdate}
                onChangeText={setBirthdate}
            />

            <Text style={styles.label}>Preferencia de bebida:</Text>
            <Picker
                selectedValue={favoriteDrink}
                onValueChange={(itemValue) => setFavoriteDrink(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecciona una opción" value="" />
                <Picker.Item label="Cerveza" value="cerveza" />
                <Picker.Item label="Vino" value="vino" />
                <Picker.Item label="Whisky" value="whisky" />
                <Picker.Item label="Tequila" value="tequila" />
                <Picker.Item label="Vodka" value="vodka" />
                <Picker.Item label="Ron" value="ron" />
            </Picker>

            <Text style={styles.label}>Nivel de experiencia:</Text>
            <Picker
                selectedValue={experienceLevel}
                onValueChange={(itemValue) => setExperienceLevel(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Novato" value="novato" />
                <Picker.Item label="Entusiasta" value="entusiasta" />
                <Picker.Item label="Experto" value="experto" />
            </Picker>

            <Pressable
                style={({ pressed }) => [
                    styles.saveButton,
                    { backgroundColor: pressed ? colores.verdeOscuro : colores.verdeEsmeralda },
                ]}
                onPress={saveProfile}
            >
                <Text style={styles.saveButtonText}>Guardar Perfil</Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colores.mainTheme,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 28,
        color: colores.dorado,
        fontWeight: 'bold',
        marginBottom: 20,
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
