import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";

import { useGetProfilePictureQuery } from "../services/userService";
import { setProfilePicture } from "../features/auth/authSlice";
import { fetchSessions } from "../db";
import { setUser } from "../features/auth/authSlice";

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
    
    const user = useSelector(state => state.authReducer.value.email);
    const localId = useSelector(state=> state.authReducer.value.localId);

    const dispatch = useDispatch();

    const {data: profilePictures, isLoading, error} = useGetProfilePictureQuery(localId);

    useEffect(() => {
        if (profilePictures) {
            dispatch(setProfilePicture(profilePictures.profilePicture))
        }
    }, [profilePictures])

    useEffect(()=> {
        if(!user) {
            (async ()=> {
                try {
                    const session = await fetchSessions()
                    if (session.length) {
                        dispatch(setUser(session[0]))
                    }
                    console.log('sesion', session)
                } catch(error) {
                    console.log('error al obtener la sesion', error)
                }
            })()
        }
    },[])
    
    

    return (
        <NavigationContainer>
        {
            user
            ?
            <TabNavigator />
            :
            <AuthNavigator />
        }
        </NavigationContainer>
    )
}

export default MainNavigator