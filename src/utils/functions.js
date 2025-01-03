export const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => (acc += item.price * item.cantidad), 0)
}