import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { usePostReceiptMutation } from '../services/receiptsService';
import { clearCart } from '../features/cart/cartSlice';
import { useGetDireccionsQuery } from '../services/userService';

const CartConfirmationScreen = ({ navigation }) => {
    const cart = useSelector(state => state.cartReducer.value.cartItems);
    const total = useSelector(state => state.cartReducer.value.total);
    const localId = useSelector(state => state.authReducer.value.localId);
    const { data: direcciones = [], error, result, refetch } = useGetDireccionsQuery(localId);

    const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
    const [triggerPost] = usePostReceiptMutation();
    const dispatch = useDispatch();


    useEffect(() => {
      refetch()
    }, [direcciones])
    

    const handleConfirm = () => {
        if (!direccionSeleccionada) {
            Alert.alert('Atención', 'Por favor, selecciona una dirección de envío.');
            return;
        }

        const receipt = {
            cart,
            total,
            createdAt: Date.now(),
            direccion: direccionSeleccionada,
        };

        triggerPost({ localId, receipt })
            .then(() => {
                dispatch(clearCart());
                navigation.navigate('Receipts');
            })
            .catch(error => {
                Alert.alert('Error', 'Hubo un problema al confirmar tu orden.');
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirmación de Compra</Text>
            <Text style={styles.total}>Total: $ {total}</Text>

            <Text style={styles.subtitle}>Elige una dirección de envío:</Text>
            <FlatList
                data={direcciones}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        style={[
                            styles.direccion,
                            item.id === direccionSeleccionada?.id && styles.selectedDireccion,
                        ]}
                        onPress={() => setDireccionSeleccionada(item)}
                    >
                        <Text>{item.title} - {item.address}</Text>
                    </Pressable>
                )}
                ListEmptyComponent={<Text style={styles.emptyMessage}>No tienes direcciones guardadas.</Text>}
            />

            <View style={styles.buttonsContainer}>
                <Pressable style={styles.backButton} onPress={() => {navigation.goBack(), refetch()}}>
                    <Text style={styles.buttonText}>Volver al carrito</Text>
                </Pressable>
                <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>Confirmar Orden</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
    total: { fontSize: 16, marginBottom: 20 },
    subtitle: { fontSize: 18, fontWeight: '500', marginBottom: 10 },
    direccion: { 
        padding: 10, 
        marginVertical: 5, 
        borderWidth: 1, 
        borderRadius: 5, 
        backgroundColor: '#f8f8f8' 
    },
    selectedDireccion: { borderColor: 'green', backgroundColor: '#d0f0c0' },
    buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    backButton: { backgroundColor: '#ff6f61', padding: 15, borderRadius: 10, flex: 0.45 },
    confirmButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, flex: 0.45 },
    buttonText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
    emptyMessage: { textAlign: 'center', marginTop: 20, color: '#888' },
});

export default CartConfirmationScreen;
