import React from 'react'; 
import { StyleSheet, Text, View,FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'; 
import {useNavigation} from "@react-navigation/native";
import {Image} from 'react-native-elements'; 
import {size} from 'lodash'; 




export default function ListaComentario(propiedades){ 
     const {comentarios}=propiedades; 
    //const sucursales = []; 
    return( 
        <View> 
            {size(comentarios)>0?( 
               <FlatList 
               data={comentarios} 
               renderItem={(comentario)=> <Comentario comentario={comentario}/>} 
               keyExtractor={(item,index)=> index.toString()} 
           /> 
            ):( 
                <View style={styles.sucursales}> 
                     
                    <ActivityIndicator size="large" color="#0000ff"/> 
                    <Text>Cargando Comentarios</Text> 
                </View> 
            )} 


        </View> 
    ); 
}

const styles=StyleSheet.create({ 
  

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

function Comentario(propiedades){
  console.log("resultado-------------");
    const {comentario} = propiedades;
    //console.log(comentario.item);
    const {nombre,descripcion,fecha}=comentario.item;

     //Convertimos la fecha Timestamp  de firebase a una fecha de JavaScript 
    //Con una precision de millisecond. 
    const fechaComentario = new Date(fecha.seconds * 1000); 

    return(
    <View style={styles.ctnComentario}>
      <Text style={styles.titComentario}>{nombre}</Text>
      
      <View style={styles.ctnDescripcion}>
      <Text style={styles.Descripcion}> {descripcion}</Text>
      </View>
      
      <View style={styles.Fecha}>
      <Text style={{color:"#b3b3cc"}}>
            {fechaComentario.getDate()}/{fechaComentario.getMonth() + 1}/ 
            {fechaComentario.getFullYear()} - {fechaComentario.getHours()}: 
            {fechaComentario.getMinutes() < 10 ? "0" : ""} 
            {fechaComentario.getMinutes()} 
      </Text>
      </View>
     
    </View>);
  }