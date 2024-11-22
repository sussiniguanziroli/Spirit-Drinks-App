import '../Spirit-Drinks-App/src/firebase/config';

export default {
  expo: {
    name: "spirit-drinks-app",
    slug: "spirit-drinks-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    newArchEnabled: true,
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      icon: "./assets/icon.png",
      package: "com.sussiniguanziroli.spiritdrinksapp",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GEOCODING_API_KEY, // Vinculado con la clave de entorno
        },
      },
    },
    plugins: ["expo-font"],
    extra: {
      apiKey: process.env.EXPO_PUBLIC_API_KEY,
      baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
      baseAuthUrl: process.env.EXPO_PUBLIC_BASE_AUTH_URL,
      geocodingApiKey: process.env.EXPO_PUBLIC_GEOCODING_API_KEY,
      eas: {
        projectId: "83a8e462-881d-4ac3-a9cb-9399573fef01",
      },
    },
    owner: "sussiniguanziroli",
  },
};
