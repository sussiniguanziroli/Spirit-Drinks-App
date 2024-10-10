import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './src/screens/CategoriesScreen';
import Header from './src/components/Header';
import ProductsScreen from './src/screens/ProductsScreen';
import { useEffect } from 'react';

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

        <>
        <Header />
        <ProductsScreen/>
        <StatusBar style="auto" />
        </>
        

    );
}

