import * as yup from "yup";

export const newMarcaSchema = yup.object().shape({
  nombre: yup
    .string()
    .trim()
    .required("Debe de ingresar el nombre de la marca")
    .min(2, "Debe contener minimo 2 caracteres")
    .max(30, "Debe contener máximo 30 caracteres")
    .matches(
      /^[a-zA-Z\s]+$/,
      "El nombre solo puede contener letras y espacios"
    ),
  estado: yup
    .string()
    .required("Debe de establecer el estado de la marca")
    .oneOf(
      ["true", "false"],
      "Solo puede usar una de las opciones presentadas"
    ),
});
