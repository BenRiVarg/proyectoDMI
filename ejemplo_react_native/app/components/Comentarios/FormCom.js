import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import {useNavigation} from "@react-navigation/native"


const db = firebase.firestore(firebaseApp);

//Extraemos el ancho de la ventana para ajustar la imagen al tamaño del dispositivo
const WidthScreen = Dimensions.get("window").width;

export default function FormCom(toast) {
  const navegacion=useNavigation();
  //Generamos una variable de estado para cada campo

  const [nombre,setNombre]=useState("");
  const [descripcion, setDescripcion] = useState("");
  const { toastRef } = toast;
  const [isLoading, setIsLoading] = useState(false); 
  /*Función que nos mostrará el valor de las variables de estado
 que contendrán la información de los campos del formulario*/
  const agregar = () => {
    
    const user = firebase.auth().currentUser; 
   

    var comentario={
      idUser: user.uid,
      nombre:nombre,
      descripcion:descripcion,
      fecha: new Date()
    }

    

    //Verificamos que no se envíen datos vacíos
    if (!nombre || !descripcion) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      toastRef.current.show("No puedes dejar campos vacios");
    }  else{
      db.collection("comments") 
    .add(comentario) 
    .then(() => { 
        /*si se almacena el comentario, ejecutamos la actualización 
        del raiting de la sucursal*/ 
      setIsLoading(false); 
      navegacion.navigate("Comentarios", { 
      }) 
    }) 
    .catch(() => { 
      toastRef.current.show("Error al registrar Comentario"); 
      setIsLoading(false); 
    }); 
    }
  };

 
  return (
    <ScrollView style={styles.scroll}>
     
      <Formulario
 
        setNombre={setNombre}
        setDescripcion={setDescripcion}
      />
      <Button
        title="Guardar Comentario"
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
  const { setNombre, setDescripcion } = propiedades;

  return (
    <View style={styles.vista}>
    
      <Input
        placeholder="Nombre Comentario"
        containerStyle={styles.form}
        //Modificamos el valor de la variable de estado acorde a lo que el usuario escribe
        onChange={(e) => setNombre(e.nativeEvent.text)}
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
