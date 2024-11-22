
# Spirit Drinks App

## Descripción
**Spirit Drinks** es una aplicación móvil desarrollada con **React Native** y **Expo SDK 51**, destinada a ofrecer una experiencia fluida para la compra de bebidas alcohólicas. La aplicación incluye funcionalidades de autenticación, carrito de compras, localizaciones, recibos, y un sistema de perfil de usuario personalizable y persistible.

---

## Funcionalidades Principales
- **Shop:** Explora una variedad de bebidas alcohólicas y agrégalas al carrito.
- **Carrito:** Gestiona los productos seleccionados antes de confirmar la compra.
- **Ubicaciones:** Guarda y gestiona direcciones de entrega.
- **Recibos:** Consulta los recibos de compras anteriores.
- **Perfil:** Administra la información personal del usuario.

---

## Requisitos del Sistema
1. **Node.js**: Versión más reciente recomendada.
2. **Expo CLI**: Instalación necesaria para ejecutar la aplicación.

```bash
npm install -g expo-cli
```

3. **Firebase**: Configuración de Realtime Database y autenticación.
---

## Instalación y ejecución
1. Clona el repositorio:

```bash
git clone https://github.com/sussiniguanziroli/Spirit-Drinks-App
cd spirit-drinks-app
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el entorno de desarrollo:

```bash
npx expo start
```

4. Escanea el código QR desde la app de Expo Go para ejecutar la aplicación en un dispositivo físico.

---

## Configuración Inicial

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes claves:

```
EXPO_PUBLIC_BASE_URL=tu_link_a_database_aqui
EXPO_PUBLIC_BASE_AUTH_URL=tu_url_auth_aqui
EXPO_PUBLIC_API_KEY=tu_api_key_aqui
EXPO_PUBLIC_GEOCODING_API_KEY=tu_api_key_geolocalizacion_geocoding
```

### Instalación de Dependencias
Ejecuta el siguiente comando en la terminal para instalar todas las dependencias necesarias:

```bash
npm install
```

---

## Estructura del Proyecto

```
/src
  /components     -> Componentes reutilizables.
  /app            -> Configuración de Redux Store.
  /db             -> Configuración SQLite para persistencia de datos.
  /features       -> Slices de Redux (auth, cart, shop, user).
  /firebase       -> Configuración de Firebase y claves de acceso.
  /global         -> Archivo colores.json con esquema de colores.
  /navigation     -> Todos los navegadores de la app.
  /screens        -> Pantallas de la aplicación.
  /utils          -> Funciones reutilizables (e.g., calcular total).
  /validations    -> Schema de validación con Yup.
/services         -> Servicios para la conexión con Firebase.
```

---

## Servicios de Firebase

### Configuración
La configuración de Firebase se encuentra en `firebase/config.js` y utiliza variables de entorno para mayor seguridad:

```javascript
import { EXPO_PUBLIC_BASE_URL, EXPO_PUBLIC_BASE_AUTH_URL, EXPO_PUBLIC_API_KEY, EXPO_PUBLIC_GEOCODING_API_KEY } from '@env';

export const base_url = EXPO_PUBLIC_BASE_URL;
export const base_auth_url = EXPO_PUBLIC_BASE_AUTH_URL;
export const api_key = EXPO_PUBLIC_API_KEY;
export const geocoding_api_key = EXPO_PUBLIC_GEOCODING_API_KEY;
```

### Ejemplo: Servicio de Autenticación
El archivo `services/authService.js` gestiona las llamadas a la API de autenticación:

```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_auth_url, api_key } from '../firebase/config';

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_auth_url }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({ ...auth }) => ({
                url: `accounts:signUp?key=${api_key}`,
                method: 'POST',
                body: auth,
            })
        }),
        login: builder.mutation({
            query: ({ ...auth }) => ({
                url: `accounts:signInWithPassword?key=${api_key}`,
                method: 'POST',
                body: auth,
            })
        })
    })
});

export const { useSignUpMutation, useLoginMutation } = authApi;
```

---

## Comandos de Desarrollo

- **Iniciar la App:**

```bash
npx expo start
```

---

## Permisos de Geolocalización
La funcionalidad de geolocalización utiliza los permisos nativos de Expo y solicita autorización al usuario automáticamente al iniciar.

---

## Validación de Formularios
La validación de formularios se realiza mediante **Yup**, validando campos críticos como:
- **Email:** Verifica el formato correcto.
- **Contraseña:** Requiere un mínimo de 8 caracteres.

---

## Notas Adicionales
La aplicación permite agregar localizaciones directamente desde la pantalla de compras, mejorando la experiencia del usuario al gestionar direcciones de entrega.

---

## Futuras Mejoras
1. Implementar sistema de notificaciones push.
2. Mejorar las animaciones en las transiciones entre pantallas.
3. Incorporar un sistema de recomendaciones personalizadas.
4. Incorporar amplia variedad de plataformas de pago para **Production Build**.
