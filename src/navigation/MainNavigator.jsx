import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

import { useGetProfilePictureQuery } from "../services/userService";
import { setProfilePicture } from "../features/auth/authSlice";
import { fetchSessions } from "../db";
import { setUser } from "../features/auth/authSlice";
import { setProfileData } from "../features/user/userSlice";

import StartScreen from "../screens/StartScreen";
import TourScreen from "../screens/TourScreen";

const Stack = createNativeStackNavigator()

const MainNavigator = () => {

    const user = useSelector(state => state.authReducer.value.email);
    const localId = useSelector(state => state.authReducer.value.localId);
    const profileData = useSelector(state => state.userReducer);
    const [showStartScreen, setShowStartScreen] = useState(false);

    const dispatch = useDispatch();

    const { data: fetchedProfileData, isLoading, error } = useGetProfilePictureQuery(localId);

    useEffect(() => {
        if (fetchedProfileData) {
            dispatch(setProfilePicture(fetchedProfileData.profilePicture))
            dispatch(setProfileData(fetchedProfileData.data))
        }
    }, [fetchedProfileData])

    useEffect(() => {
        if (user && (!profileData || !profileData.name || !profileData.surname)) {
            setShowStartScreen(true);
        } else if (user && profileData.profilePicture || profileData.birthdate) {
            setShowStartScreen(false);
        }
    }, [user, profileData]);

    useEffect(() => {
        if (!user) {
            (async () => {
                try {
                    const session = await fetchSessions()
                    if (session.length) {
                        dispatch(setUser(session[0]))
                    }
                   
                } catch (error) {
                    
                }
            })()
        }
    }, [])



    return (
        <NavigationContainer>
            {user ? (
                showStartScreen ? (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="StartScreen"
                            component={StartScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='Tour'
                            component={TourScreen}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="TabNavigator"
                            component={TabNavigator}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                ) : (
                    <TabNavigator />
                )
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    )
}

export default MainNavigator