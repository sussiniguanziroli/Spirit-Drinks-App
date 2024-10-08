import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './src/screens/CategoriesScreen';
import Header from './src/components/Header';
import ProductsScreen from './src/screens/ProductsScreen';

export default function App() {
    return (

        <>
        <Header />
        <ProductsScreen/>
        <StatusBar style="auto" />
        </>
        

    );
}

