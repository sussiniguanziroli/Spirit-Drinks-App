import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { usePostReceiptMutation } from '../services/receiptsService';
import { clearCart } from '../features/cart/cartSlice';
import { usePostReceiptOutMutation } from '../services/receiptsService';

const CartConfirmationScreen = ({ navigation }) => {
    const cart = useSelector(state => state.cartReducer.value.cartItems);
    const total = useSelector(state => state.cartReducer.value.total);
    const localId = useSelector(state => state.authReducer.value.localId)

    const [triggerPost, result] = usePostReceiptMutation();
    const [triggerOutPost, resutBis] = usePostReceiptOutMutation();

    const dispatch = useDispatch();

    const handleConfirm = () => {
        const receipt = { cart, total, createdAt: Date.now() };
        triggerPost({ localId, receipt });
        navigation.navigate('Receipts');
        dispatch(clearCart())
        triggerOutPost({localId,receipt});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirmación de Compra</Text>
            <Text style={styles.total}>Total: $ {total}</Text>
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmar Orden</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.confirmButton,
                    { backgroundColor: '#3498db', margin: 10 }
                ]}
                onPress={()=> navigation.navigate("Carrito")}
            >
                <Text
                    style={[
                        styles.confirmButtonText,
                        { color: '#fff' }
                    ]}
                >
                    Volver
                </Text>
            </Pressable>

        </View>
    );
};

export default CartConfirmationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
    total: {
        fontSize: 16,
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: '700',
    },
});
