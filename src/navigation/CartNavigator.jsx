import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CartScreen from "../screens/CartScreen";
import Header from "../components/Header";
import CartConfirmationScreen from "../screens/CartConfirmationScreen";

const CartStack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <CartStack.Navigator
    screenOptions={{
      header: ({ route }) => <Header subtitle={route.name} />
    }}
    >
        <CartStack.Screen component={CartScreen} name='Carrito'/>
        <CartStack.Screen name="CartConfirmation" component={CartConfirmationScreen} />
    </CartStack.Navigator>
  )
}

export default CartNavigator
