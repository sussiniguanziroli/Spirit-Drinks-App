import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { colores } from '../global/colores';

const { width: screenWidth } = Dimensions.get('window');

const slides = [
    {
        id: 1,
        title: "¡Bienvenido!",
        description: "Explora nuestra app y descubre todo lo que tenemos para ti.",
        image: 'https://i.pinimg.com/736x/51/86/f4/5186f4de5f79e013ed04cd15c5d70f7c.jpg',
    },
    {
        id: 2,
        title: "Compra Fácil",
        description: "Encuentra productos de calidad y agrégalos a tu carrito.",
        image: 'https://i.pinimg.com/control2/736x/4b/5c/70/4b5c7078ee3497f8ee1bc68e78bf6be8.jpg',
    },
    {
        id: 3,
        title: "Soporte 24/7",
        description: "Estamos aquí para ayudarte en todo momento.",
        image: 'https://i.pinimg.com/736x/66/ae/4c/66ae4cc1e810c62cbb04ac44b7ec7d61.jpg',
    },
];

const TourScreen = ({ navigation }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const renderSlide = ({ item }) => (
        <View style={[styles.slide, { width: screenWidth }]}>
            <Image source={{ uri: item.image }}
            resizeMode='cover' style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    const handleScroll = (event) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setActiveSlide(slideIndex);
    };

    return (
        <View style={styles.container}>
        
            <FlatList
                data={slides}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />


            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeSlide === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>

            
            {activeSlide === slides.length - 1 ? (
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => navigation.navigate("TabNavigator", { screen: "Categories" })} 
                >
                    <Text style={styles.startButtonText}>¡Empezar!</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => navigation.navigate("TabNavigator", { screen: "Categories" })}
                >
                    <Text style={styles.skipButtonText}>Saltar</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TourScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.mainTheme,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        borderRadius: 30,
        width: 300,
        height: 300,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colores.dorado,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: colores.blancoApagado,
        textAlign: 'center',
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    pagination: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colores.blancoApagado,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: colores.verdeEsmeralda,
    },
    startButton: {
        marginTop: 30,
        backgroundColor: colores.verdeOscuro,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 20,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
    skipButton: {
        marginTop: 30,
        marginVertical: 20,
    },
    skipButtonText: {
        color: colores.verdeEsmeralda,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
