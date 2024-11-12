import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LocationsScreen from "../screens/LocationsScreen";
import Header from "../components/Header";

const CartStack = createNativeStackNavigator();

const LocationsNavigator = () => {
  return (
    <CartStack.Navigator
    screenOptions={{
      header: ({ route }) => <Header subtitle={route.name} />
    }}
    >
        <CartStack.Screen component={LocationsScreen} name='Ubicaciones'/>
    </CartStack.Navigator>
  )
}

export default LocationsNavigator
