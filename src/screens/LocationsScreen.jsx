import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colores } from '../global/colores';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import ItemCard from '../components/ItemCard';
import MapView, { Marker } from 'react-native-maps';
import { geocoding_api_key } from '../firebase/config';
import { useAddDireccionMutation, useGetDireccionsQuery } from '../services/userService';
import * as Location from 'expo-location';
import { useDeleteDireccionMutation } from '../services/userService';

const LocationsScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [places, setPlaces] = useState([]);

    const localId = useSelector(state => state.authReducer.value.localId);
    const { data: direcciones, error, isLoading, refetch } = useGetDireccionsQuery(localId);
    const [triggerAddLocation, result] = useAddDireccionMutation();
    const [triggerDeleteLocation] = useDeleteDireccionMutation();

    const validDirecciones = Array.isArray(direcciones) ? direcciones : [];  

    useEffect(() => {
        refetch()
    }, [direcciones])

    const deletePlace = async (id) => {
        try {
            await triggerDeleteLocation({ localId, direccionId: id }).unwrap();
            showToast("success", "¡Dirección eliminada exitosamente!");
            refetch(); 
        } catch (error) {
            showToast("error", "Hubo un problema al eliminar la dirección.");
        }
    };
    

    const allPlaces = [...validDirecciones, ...places];

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000,
        });
    };

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return false;
        }
        return true;
    };

    const renderPlaceItem = ({ item }) => (
        <ItemCard style={styles.placeContainer}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ latitude: item.coords.latitude, longitude: item.coords.longitude }} />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
            </View>
            <Pressable onPress={() => deletePlace(item.id)} style={styles.deleteButton}>
                <Icon name="delete" color={colores.rojoError} size={24} />
            </Pressable>
        </ItemCard>
    );

    const getLocation = async () => {
        refetch()
        const permissionOk = await getPermissions();
        if (!permissionOk) {
            setErrorMsg('Permission to access location was denied');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            if (location) {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${geocoding_api_key}`
                );
                const data = await response.json();
                if (data.status === 'OK') {
                    const formattedAddress = data.results[0].formatted_address;
                    setAddress(formattedAddress);
                } else {
                    console.log('Error en geocodificación inversa:', data.error_message);
                }
                showToast("success", "¡Ubicación obtenida!");
            } else {
                setErrorMsg('Error getting location');
                showToast("error", "No se pudo obtener la ubicación");
            }
            setLocation(location.coords);
        }
    };

    const savePlace = async () => {
        if (location && title) {
            const nuevaDireccion = {
                title,
                address,
                coords: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                },
            };

            try {
                await triggerAddLocation({ localId, direccion: nuevaDireccion }).unwrap();
                setPlaces((prevState) => [...prevState, { ...nuevaDireccion, id: Math.random().toString() }]);
                setTitle("");
                setLocation(null);
                setAddress("");
                showToast("success", "¡Dirección guardada exitosamente!");
            } catch (error) {
                console.error("Error guardando dirección:", error);
                showToast("error", "Hubo un problema al guardar la dirección.");
            }
        } else {
            showToast("error", "Completa todos los campos antes de guardar.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis lugares:</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Ingresa un título" onChangeText={(text) => setTitle(text)} value={title} />
                <Pressable onPress={getLocation}><Icon name="location-on" color={colores.borgona} size={24} /></Pressable>
                <Pressable onPress={savePlace}><Icon name="add-circle" color={colores.verdeEsmeralda} size={32} /></Pressable>
            </View>
            <Text style={styles.subtitle}>Tus lugares favoritos:</Text>
            <FlatList
                data={allPlaces}  
                keyExtractor={item => item.id.toString()}
                renderItem={renderPlaceItem}
            />
            <Toast />
        </View>
    );
};

export default LocationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
    },
    subtitle: {
        fontSize: 12,
        color: colores.grisMedio
    },
    inputContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: colores.grisMedio,
        borderRadius: 20,
        padding: 8,
        width: '80%',
        paddingLeft: 16,
    },
    placeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 16,
        margin: 4,
        gap: 24
    },
    mapContainer: {
        width: 120,
        height: 120,
        borderRadius: 25,
        overflow: "hidden",
        elevation: 5,
    },
    map: {
        width: 120,
        height: 120,
    },
    mapTitle: {
        fontWeight: '700'
    },
    address: {},
    placeDescriptionContainer: {
        width: '60%',
        padding: 8
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
});
