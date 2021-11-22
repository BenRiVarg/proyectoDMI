import React from 'react'; 
import { StyleSheet, Text, View,FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'; 
import {useNavigation} from "@react-navigation/native";
import {Image,Rating} from 'react-native-elements'; 
import {size} from 'lodash'; 





export default function ListarTop(propiedades){ 
     const {sucursales}=propiedades; 
     
    //const sucursales = []; 
    return( 
        <View> 

            {size(sucursales)>0?( 
               <FlatList 
               data={sucursales} 
               renderItem={(sucursal)=> <Sucursal sucursal={sucursal}/>} 
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
  sucursales:{ 
      marginTop:10, 
      marginBottom:10, 
      alignItems: 'center', 
  } ,
  lista: { 
      flexDirection:"row", 
      margin:10 
  }, 
  viewImagen: { 
      marginRight:15 
  }, 
  imagen: { 
      width:80, 
      height:80 
  }, 
  nombre: { 
      fontWeight:"bold" 
  },
  direccion: { 
      paddingTop:2, 
      color:"grey" 
  }, 
  descripcion: { 
      paddingTop:2, 
      color:"grey", 
      width:300 
  } 
});

function Sucursal(propiedades){

  const navegacion= useNavigation();
     const {sucursal}= propiedades;
     
     const {id,imagenes,nombre,rating}=sucursal.item;

    

     


    return(
      <View>
        <TouchableOpacity onPress={()=>{ navegacion.navigate("comentarioSucursal",{id,nombre})}}>
            <View style={styles.lista}> 
                <View style={styles.viewImagen}> 
                    <Image 
                        resizeMode="cover" 
                        PlaceholderContent={<ActivityIndicator color="#0000ff"/>} 
                        source={imagenes[0] ? {uri: imagenes[0] }: require("../../../assets/img/no-encontrada.png")} 
                        style={styles.imagen} 
                    /> 
                </View> 
              
                <View> 
                    <Text style={styles.nombre}>{nombre}</Text> 
                    <Rating imageSize={15} startingValue={rating} readonly /> 
                </View> 
            </View> 
        </TouchableOpacity>
      </View>
    );
   
  }