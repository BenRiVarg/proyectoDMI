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
    /* console.log(propiedades.comentario);
    const {descripcion}= propiedades.comentario.descripcion;
   // console.log(nombre);
    console.log(descripcion); */
    //console.log(createAt);
    return(
    <View style={styles.ctnComentario}>
      <Text style={styles.titComentario}>Componente de Comentario listos</Text>
      
      <View style={styles.ctnDescripcion}>
      <Text style={styles.Descripcion}> Not TrollLorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </Text>
      </View>
      
      <View style={styles.Fecha}>
      <Text style={{color:"#b3b3cc"}}>fecha </Text>
      </View>
     
    </View>);
  }