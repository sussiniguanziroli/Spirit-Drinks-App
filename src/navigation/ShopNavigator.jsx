import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CategoriesScreen, ProductScreen, ProductsScreen } from '../screens'
import Header from '../components/Header'
import StartScreen from '../screens/StartScreen'


const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  return (

    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => <Header subtitle={route.name} />
      }}>
        <Stack.Screen name="Bienvenido" component={StartScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>

  )
}

export default ShopNavigator

