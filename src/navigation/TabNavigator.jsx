import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import ReceiptsNavigator from "./ReceiptsNavigator";
import { StyleSheet } from "react-native";
import { colores } from "../global/colores";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Shop"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen
                name="Shop"
                component={ShopNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name='store' size={25} color={focused ? colores.doradoApagado : colores.blancoApagado} />),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="shopping-cart" size={25} color={focused ? colores.doradoApagado : colores.blancoApagado} />)
                }}
            />
            <Tab.Screen
                name="Receipts"
                component={ReceiptsNavigator} store
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="receipt" size={25} color={focused ? colores.doradoApagado : colores.blancoApagado} />)
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar: {
        height: 50,
        backgroundColor: colores.mainTheme,
    }
})

