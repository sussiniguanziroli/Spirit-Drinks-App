import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { colores } from '../global/colores';
import ItemCard from '../components/ItemCard';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { clearCart } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { usePostReceiptMutation } from '../services/receiptsService';

const CartScreen = ({navigation}) => {


    const total = useSelector(state => state.cartReducer.value.total);
    const cart = useSelector(state => state.cartReducer.value.cartItems);
    const [triggerPost, result] = usePostReceiptMutation();

    const dispatch = useDispatch();


    const FooterComponent = () => {
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.footerTotal}>Total: $  {total}</Text>
                <Pressable style={styles.confirmButton}
                    onPress={() => {triggerPost({cart, total, createdAt: Date.now()})
                    dispatch(clearCart())
                    navigation.navigate("Receipts")
                    }}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                </Pressable>
            </View>
        )
    }

    const renderCartItem = ({ item }) => (
        <ItemCard style={styles.cartContainer}>
            <View>
                <Image
                    source={{ uri: item.image }}
                    style={styles.cartImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
                <Text stlyle={styles.quantity}>Cantidad: {item.cantidad}</Text>
                <Text style={styles.total}>Subtotal: $ {item.cantidad * item.price}</Text>
                <Icon name="delete" size={24} color="#FC7A5E" style={styles.trashIcon} />
            </View>
        </ItemCard>
    )

    return (
        <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu Carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
        />
    )
}

export default CartScreen

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 14,
        alignItems: "center",
        gap: 10,
        borderRadius: 20,
    },
    cartImage: {
        width: 80,
        height: 80
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '700'
    },
    total: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700'
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    footerContainer: {
        padding: 32,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTotal: {
        fontSize: 16,
        fontWeight: '700'
    },
    confirmButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colores.mainTheme,
        borderRadius: 16,
        marginBottom: 24,
    },
    confirmButtonText: {
        color: colores.blancoApagado,
        fontSize: 16,
        fontWeight: '700'
    }, cartScreenTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: "center",
        paddingVertical: 8
    }
})