import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CategoriesScreen, ProductScreen, ProductsScreen } from '../screens'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            header: ({route}) =><Header subtitle={route.name} />
        }}>
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

