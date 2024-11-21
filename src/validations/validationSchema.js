import {object, string, ref} from 'yup';



export const validationSchema = object({
    confirmPassword: 
        string()
        .required("La contraseña no puede estar vacía")
        .oneOf([ref('password'), null], "Las contraseñas deben coincidir")
    ,
    password:
        string()
        .required("La contraseña no puede estar vacía")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
    ,
    email:
        string()
        .required("El email no puede estar vacio")
        .email("Por favor, introduce un email valido")
    ,
    data:
        object()
        .required("El nombre debe ser completado")
    ,
})

