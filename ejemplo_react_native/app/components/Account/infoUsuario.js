import React from "react";
import {StyleSheet,View,Text} from "react-native";
import {Avatar} from "react-native-elements";
import * as Permissions from "expo permissions";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/app";
import "firebase/storage";
import { result } from "lodash";

export default function InfoUsuario(propiedades){
   /*  Recibimos los datos del usuario registrado que accedio 
    al módulo la foto y nombre serán vacíos ya que no se encuentra actualmente,
    recibimos el tosat para mostrar mensajes y un estado que nos permitirá indicar su un proceso aun esta cargando 
    o termino */

    const{
        userInfo:{uid,photoURL,displayName,email},
        toastRef, 
        setCargando
    }=propiedades


    const cambiarAvatar=async()=>{
        //Se solicita acceso a la galería
        const resultPermiso=await Permissions.askAsync(
            Permissions.MEDIA_LIBRARY
        );

        //Si la respesta de usuario al otorgar permiso es denegada
        const solicitudPermiso=resultPermiso.permissions.mediaLibrary.status;

        if(solicitudPermiso==="denied"){
            toastRef.current.show("Es necesario aceptar los permisios de la galería");

        }else{ //Si se otorga el permiso
            //Lanzamos la visualizacion de la galería de imagenes al dispositivo
            const result=await ImagePicker.launchImageLibraryAsync({
                //Permitirá editar la imagen
                allowsEditing:true,
                // resolución estandar SD marcará el tamaño de la imagen
                aspect:[4,3],
            });
        }

        //Si se cierra la galería sin elegir imagenes

        if(result.cancelled){
            toastRef.current.show("Has cerrado la selección de imágenes")
        }else{
            //Si se selecciona imagen se inicia el registro en firebase
            subirImagen(result.uri)
            .then(()=>{
                //Si el almacenamiento es correcto se actualiza el avatar en la ventana
                updatePhotoUrl();
            })
            .catch(()=>{
                toastRef.current.show("Error al actualizar el avatar")
            })
        }
    }

    const subirImagen=async(uri)=>{
        /* Dado que el proceso de carga de imagen puede tardar
        emplearemos un estado que identifique cuanto se está en espera
        o el proceso culmino */
        setCargando(true);
        
        toastRef.current.show("Realizando cambios");
        const response=await fetch(uri);
        const blob= await response.blob;
        const ref=firebase.storage().ref().child('avatar/${uid}');
        return ref.put(blob);
    };

    const updatePhotoUrl=()=>{
        firebase.storage().ref('avatar/${uid}')
        .getDownloadURL()
        .then(async (response)=>{
            const update={
                photoURL: response,
            }

            await firebase.auth().currentUser.updateProfile(update);
            setCargando(false);
        })
        .catch(()=>{
            toastRef.current.show("Error al actualizar el avatar. ");
        })
    }

    return(
        <View styel={styles.ViewUserINfo}>
            <Avatar rounded
            size="large" 
            onPress={cambiarAvatar}
            containerStyle={styles.userInfoAvatar}
            source={
                photoURL?{
                    uri:photoURL
                }:
                require("../../../assets/img/avatar-default.jpeg")

            }
            >
                <Avatar.Accessory size={24} />
        </View>
        <View>
            <Text style={styles.displayName}>
                {displayName ? displayName:"Anonimo"}
            </Text>
            <Text>{email? email: "Login Social"}</Text>
        </View>
    )

    const styles=StyleSheet.create({
        viewUserInfo:
         {alignItems:"center",
         justifyContent: "center",
         flexDirection: "row",
         backgroundColor: "#f2f2f2",
         paddingTop: 30,
         paddingBottom: 30,
    }
    ,
    userInfoAvatar:{
        marginRight:20,
    }
    displayName:{
        fontWeight: "bold",
        paddingBottom: 5,
    }
    })
}