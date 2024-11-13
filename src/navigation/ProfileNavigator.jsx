import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import Header from '../components/Header';
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name='Perfil' component={ProfileScreen} />
        <Stack.Screen name='EditarPerfil' component={EditProfileScreen} />
    </Stack.Navigator>
)

export default ProfileNavigator