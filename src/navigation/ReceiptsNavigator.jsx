import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ReceiptScreen from "../screens/ReceiptScreen";
import Header from "../components/Header";

const ReceiptStack = createNativeStackNavigator();

const ReceiptsNavigator = () => {
  return (
    <ReceiptStack.Navigator
    screenOptions={{
      header: ({ route }) => <Header subtitle={route.name} />
    }}>
        <ReceiptStack.Screen name='Recibos' component={ReceiptScreen}/>
    </ReceiptStack.Navigator>
  )
}

export default ReceiptsNavigator

