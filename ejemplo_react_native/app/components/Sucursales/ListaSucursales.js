import React from 'react'; 
import { StyleSheet, Text, View,FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'; 
import {useNavigation} from "@react-navigation/native";
import {Image} from 'react-native-elements'; 
import {size} from 'lodash'; 




export default function ListaSucursales(propiedades){ 
  
    const {sucursales}=propiedades; 
    //const sucursales = []; 
    return( 
        <View> 
            {size(sucursales)>0?( 
               <FlatList 
               data={sucursales} 
               renderItem={(sucursales)=> <Sucursales sucursales={sucursales}/>} 
               keyExtractor={(item,index)=> index.toString()} 
           /> 
            ):( 
                <View style={styles.sucursales}> 
                     
                    <ActivityIndicator size="large" color="#0000ff"/> 
                    <Text>Cargando Sucursales</Text> 
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

function Sucursales(propiedades){ 
    const navegacion= useNavigation();

    //Recibe la lista de sucursales 
    const {sucursales} =propiedades; 

    console.log("Ejemplo Sucursales----------------")
    console.log(propiedades);
    console.log("Ejemplo Sucursales----------------")
    
    //en cada iteración obtiene los datos de la sucursal 
    const {imagenes,nombre,direccion, descripcion,id} =sucursales.item; 
    //Método que se ejecutará al dar clic a los items de la lista 
    const consultarRestaurante = () => { 
        navegacion.navigate("ver_sucursal",{id,nombre});
    }; 

    return ( 
        //Agregamos el clic a cada item al dar clic el item se opaca 
        <TouchableOpacity onPress={consultarRestaurante}> 
        {/*Esturctura de cada item */} 
        <View style={styles.lista}> 
            <View style={styles.viewImagen}> 
        {/*cover escala la imagen de forma uniforme para evitar distorsión 
                PlaceholderContent mostrará un spiner si tarda la carga de imagen 
                source define que se mostrará la imagen 0 del arreglo de imágenes guardadas, si sucediera que 
                no hay imagen se muestra la imagen no-encontrada cargada en el proyecto*/} 
                <Image 
                    resizeMode="cover" 
                    PlaceholderContent={<ActivityIndicator color="#0000ff"/>} 
                    source={imagenes[0] ? {uri: imagenes[0] }: require("../../../assets/img/no-encontrada.png")} 
                    style={styles.imagen} 
                /> 
            </View> 
            {/*Mostramos los datos adicionales de la sucursal, en el caso de la descripción dado que puede ser 
            larga limitamos el texto a mostrar*/} 
            <View> 
                <Text style={styles.nombre}>{nombre}</Text> 
                <Text style={styles.direccion}>{direccion}</Text> 
                <Text style={styles.descripcion}>{descripcion.substring(0,60)}...</Text> 
            </View> 
        </View> 
        </TouchableOpacity> 
    ); 
} 