import React, { useEffect, useState } from 'react'; 
import {StyleSheet, View, Text, ScrollView, Dimensions,ActivityIndicator} from "react-native"; 
import {firebaseApp} from "../../utils/firebase"; 
import firebase from 'firebase/app'; 
import "firebase/firestore"; 
import CarouselImagenes from '../../components/Sucursales/CarouselImagenes'; 
const db = firebase.firestore(firebaseApp); 
//Obtenemos el ancho de la ventana del dispositivo 
const screenWidth=Dimensions.get("window").width; 


export default function Sucursal(propiedades){ 

    //Extraemos los objetos navigation y route  
    const {navigation,route}=propiedades; 
   //Extraemos el id y nombre contenido en el objeto params de route  
    const {id,nombre}=route.params; 
     
    //useState para almacenar datos de la sucursal 
    const[sucursal,setSucursal]=useState(null); 


    useEffect(() => { 
         /*setOption nos permite cambiar las propiedades del stack ver_sucursal, en 
         nuestro caso cambiaremos el titulo de la ventana con el nombre de la     
          sucursal seleccionada de la lista*/ 
        navigation.setOptions({ title: nombre }); 
      }, []); 

      useEffect(() => { 
        /*Consultamos la sucursal con id recibido como parámetro desde la lista de sucursales*/ 
       db.collection("sucursales").doc(id).get() 
            .then((resp) =>{ 
               /*Extraemos los datos del documento recuperado en la consulta*/ 
                const datos=resp.data(); 
                /*Asignamos el id al conjunto de datos*/ 
                datos.id=resp.id; 
                /*Asignamos los datos de la sucursal recuperado a nuestro useState*/ 
                setSucursal(datos); 
            }); 
     }, []);

   return( 
        <View> 
            {sucursal?( 
                
                <ScrollView> 
                    <CarouselImagenes 
                    /*Enviamos la lista de imagenes de la sucursal, el ancho  
                    alto que tomará el carousel */ 
                        arrayImages={sucursal.imagenes} 
                        height={250} 
                        width={screenWidth} 
                    /> 
                </ScrollView> 
            ):( 
                <View style={styles.sucursales}> 
                     
                    <ActivityIndicator size="large" color="#0000ff"/> 
                    <Text>Cargando Sucursal</Text> 
                </View> 
            )} 
        </View> 
         
    )
} 
const styles = StyleSheet.create({}) 