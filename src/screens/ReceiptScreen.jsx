import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetReceiptsQuery } from '../services/receiptsService';
import ItemCard from '../components/ItemCard';
import { colores } from '../global/colores';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReceiptScreen = () => {
    const localId = useSelector(state => state.authReducer.value.localId)
    const { data, error, isLoading } = useGetReceiptsQuery(localId);

    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = (receipt) => {
        setSelectedReceipt(receipt);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedReceipt(null);
        setModalVisible(false);
    };



    const renderReceiptItem = ({ item }) => {
        const preTotal = item.cart.reduce((acumulador, cartItem) => acumulador + cartItem.cantidad * cartItem.price, 0);
        const total = preTotal.toFixed(2);

        const dateOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };

        return (
            <ItemCard style={styles.receiptContainer}>
                <Text style={styles.title}>Recibo nro: {item.id}</Text>
                <Text style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} Hs.</Text>
                <Text style={styles.total}>Total: ${total}</Text>
                <TouchableOpacity onPress={() => handleOpenModal(item)}>
                    <Icon name="keyboard-arrow-down" size={24} color={colores.mainTheme} style={styles.viewIcon} />
                </TouchableOpacity>
            </ItemCard>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colores.mainTheme} />
                <Text>Cargando recibos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error al cargar los recibos. Por favor, intenta nuevamente.</Text>
            </View>
        );
    }

    const receiptArray = data
        ? Object.entries(data).map(([id, receipt]) => ({ id, ...receipt }))
        : [];

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={receiptArray}
                keyExtractor={(item) => item.id}
                renderItem={renderReceiptItem}
            />

            {/* Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Detalles del Recibo</Text>
                        <ScrollView style={styles.modalScroll}>
                            {selectedReceipt?.cart.map((item, index) => (
                                <View key={index} style={styles.cartItem}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemQuantity}>Cantidad: {item.cantidad}</Text>
                                    <Text style={styles.itemPrice}>Precio: ${item.price.toFixed(2)}</Text>
                                    <Text style={styles.itemSubtotal}>
                                        Subtotal: ${(item.cantidad * item.price).toFixed(2)}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
    receiptContainer: {
        padding: 20,
        justifyContent: 'flex-start',
        margin: 16,
        gap: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 3,
    },
    title: {
        fontWeight: '700',
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    total: {
        fontSize: 16,
        fontWeight: '700',
    },
    viewIcon: {
        alignSelf: 'flex-end',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },

    receiptContainer: {
        padding: 20,
        justifyContent: 'flex-start',
        margin: 16,
        gap: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 3,
    },
    title: {
        fontWeight: '700',
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    total: {
        fontSize: 16,
        fontWeight: '700',
    },
    viewIcon: {
        alignSelf: 'flex-end',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colores.mainTheme,
    },
    modalScroll: {
        maxHeight: 300,
    },
    cartItem: {
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
    },
    itemSubtotal: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: colores.mainTheme,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

});
