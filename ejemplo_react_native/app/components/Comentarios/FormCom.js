import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
//Importamos la función map para recuperar las imagenes del arreglo
import { map, size, filter } from "lodash";
import uuid from "random-uuid-v4";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import {useNavigation} from "@react-navigation/native"


const db = firebase.firestore(firebaseApp);

//Extraemos el ancho de la ventana para ajustar la imagen al tamaño del dispositivo
const WidthScreen = Dimensions.get("window").width;
console.disableYellowBox = true;

export default function FormSuc(toast) {
  const navegacion=useNavigation();
  //Generamos una variable de estado para cada campo
  const [fechaCreacion, setfechaCreacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const { toastRef } = toast;
  /*Función que nos mostrará el valor de las variables de estado
 que contendrán la información de los campos del formulario*/
  const agregar = () => {
    console.log(fechaCreacion);
    console.log(direccion);
    console.log(descripcion);
    //Verificamos que no se envíen datos vacíos
    if (!fechaCreacion || !direccion || !descripcion) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      toastRef.current.show("No puedes dejar campos vacios");
    } //Si todo es correcto probaremos la carga de imágenes a Storage
  };

 
  return (
    <ScrollView style={styles.scroll}>
      {/*Implementamos la función que nos mostrará la imagen de encabezado
 la cual será la primera imagen de la sucursal a registrar, para ello
 enviamos como parámetro la imagen de la posición 0 del arreglo*/}

      {/*El formulario de sucursales contendra una estructura amplia
 para separarlo de la estructura general lo separaremos de la estructura
 a través de una función Formulario*/}
      <Formulario
        /*Enviamos las funciones set que nos permitiran asignar el
 valor del formulario a las variables de estado*/
        setNombre={setfechaCreacion}
        setDireccion={setDireccion}
        setDescripcion={setDescripcion}
      />
      <Button
        title="Registrar"
        buttonStyle={styles.btn}
        /*Al dar clic activamos el método agregar */
        onPress={agregar}
      />
    </ScrollView>
  );
}

/*Función que contiene la estructura del formulario
recibe en el apartado de propiedades las funciones set de las variables de estado*/
function Formulario(propiedades) {
  const { setNombre, setDireccion, setDescripcion } = propiedades;

  return (
    <View style={styles.vista}>
      <Input
        placeholder="Fecha de creacion"
        containerStyle={styles.form}
        //Modificamos el valor de la variable de estado acorde a lo que el usuario escribe
        onChange={(e) => setfechaCreacion(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.form}
        //Modificamos el valor de la variable de estado acorde a lo que el usuario escribe
        onChange={(e) => setDireccion(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripción"
        //Definimos multiples lineas para convertir en un text area
        multiline={true}
        inputContainerStyle={styles.textArea}
        //Modificamos el valor de la variable de estado acorde a lo que el usuario escribe
        onChange={(e) => setDescripcion(e.nativeEvent.text)}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  scroll: {
    height: "100%",
  },
  form: {
    width: "100%",
  },
  vista: {
    marginTop: 35,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },

  btn: {
    backgroundColor: "#0A6ED3",
    margin: 20,
  },
  vistaImagenes: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  icono: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
