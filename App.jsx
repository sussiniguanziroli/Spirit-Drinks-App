import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'; 
import TabNavigator from './src/navigation/TabNavigator';

import { store } from './src/app/store';
import { Provider } from 'react-redux';

SplashScreen.preventAutoHideAsync();

export default function App() {


    const [loaded, error] = useFonts({
        'PlayfairDisplay': require('./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
        'Cursiva': require('./assets/fonts/QwitcherGrypen-Regular.ttf'),
    });

    useEffect(() => {
       if (loaded || error){
        SplashScreen.hideAsync();
       } 
    },[loaded,error]);

    if (!loaded && !error) {
        return null;
    }


    return (

        <Provider store={store}>
            <TabNavigator />
            <StatusBar style="auto" />
        </Provider>
        

    );
}

