import React, {useState, useEffect, useCallback}  from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import ListarComentarios from "../../components/Comentarios/ListarComentarios";


import {firebaseApp} from "../../utils/firebase"; 
import firebase from 'firebase/app'; 
import "firebase/firestore";

const db = firebase.firestore(firebaseApp); 

export default function Comentarios() {

  const navegacion = useNavigation();
  //State para el Usuario
  const [usuario, setUsuario]=useState(null); 
  //State para el puntero
  const [puntero, setPuntero]=useState(null);

  const [comentario, setComentario]=useState([]); 

  //definimos el acceso a las rutas de sucursales
  
    //validamos sesión existente 
    useEffect(()=>{ 
      firebase.auth().onAuthStateChanged((userInfo)=>{ 
      //si existe una sesión activa asignamos los datos de sesión al useState usuario 
          setUsuario(userInfo); 
      }); 
  },[]); 

  useFocusEffect( 
    useCallback(()=>{ 
         /*accedemos a la colección de sucursales, consultamos los registros 
      con get y atrapamos la respuesta (se retorna una promesa con la lista sucursales) 
      contamos y asignamos el total de sucursales al useState totalSuc*/ 
     /*  db.collection("comments") 
      .get() 
      .then((res)=>{ 
          setTotalSuc(res.size); 
          
      });  */

      const arrComentario=[]; 
      db.collection("comments").orderBy("fecha","desc").limit(10).get() 
          .then((res)=>{ 
            setPuntero(res.docs[res.docs.length -1]); 
            res.forEach((doc)=>{ 
              //extraemos cada documento y lo almacenamos en un objeto sucursal 
              const comentario =doc.data(); 
              //la clave del comentario no asigna a menos que lo indiquemos 
              comentario.id =doc.id; 
              //almacenamos cada sucursal en un arreglo. 
              arrComentario.push(comentario); 
          }); 
           //Al terminar de recuperar todos los documentos los almacenamos en el useState sucursales 
           setComentario(arrComentario); 
          
          });
      },[]) 
    );


  return (
    <View style={styles.vista}>
      {/*Colocaremos un botón de agregar nueva sucursal*/}
      <ListarComentarios comentarios={comentario}/>
      {usuario && ( 
      <Icon
        reverse
        type="material_community"
        name="add"
        color="#0A6ED3"
        containerStyle={styles.btn}
        //Vinculamos el envió a la ruta agregar-suc
        onPress={() => navegacion.navigate("Agregar Comentarios")}
      />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  btn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    //Para IOS mostrará una sombra para el botón
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },


  ctnComentario:{
    width:"100%",
  },

  titComentario:{
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#000033"
  },

  ctnDescripcion:{
    width: "100%",
    alignItems: 'center',
    
  }
,
Descripcion:{
  width: "90%",
  textAlign: "center"
}
,
Fecha:{
  alignItems:'flex-end',
  marginTop: 10,
  marginBottom: 10,
}
 
});

