import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import ReceiptsNavigator from "./ReceiptsNavigator";
import { StyleSheet, Image } from "react-native";
import { colores } from "../global/colores";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileNavigator from "./ProfileNavigator";
import LocationsNavigator from "./LocationsNavigator";
import { useSelector } from "react-redux";

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
            <Tab.Screen
                name="Locations"
                component={LocationsNavigator} store
                options={{
                    tabBarIcon: ({ focused }) => (<Icon name="pin-drop" size={25} color={focused ? colores.doradoApagado : colores.blancoApagado} />)
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        // Obtener imagen de perfil del usuario desde Redux o un estado global
                        const profilePicture = useSelector(state => state.authReducer.value.profilePicture);

                        return profilePicture ? (
                            <Image
                                source={{ uri: profilePicture }}
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    borderWidth: focused ? 2 : 0,
                                    borderColor: colores.doradoApagado,
                                }}
                            />
                        ) : (
                            <Icon
                                name="account-circle"
                                size={25}
                                color={focused ? colores.doradoApagado : colores.blancoApagado}
                            />
                        );
                    },
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

