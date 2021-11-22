import React, {useState, useEffect, useCallback}  from "react";
import { useFocusEffect } from "@react-navigation/native";
import {firebaseApp} from "../../utils/firebase"; 
import firebase from 'firebase/app'; 
import "firebase/firestore";
import { Text, View} from 'react-native'; 
import { useNavigation } from "@react-navigation/native";

import ListarTop from "../../components/Top/ListarTop";
const db = firebase.firestore(firebaseApp); 



export default function TopSucursales() {
  
  //useState de usuario
  const [usuario, setUsuario]=useState(null); 

  //useState para arreglo de Sucursales 
  const [sucursales, setSucursales]=useState([]); 
  //useState para contar sucursales 
  const [totalSuc, setTotalSuc]=useState(0); 
  //useState para mantener el control de las sucursales a mostrar 
  const [puntero, setPuntero]=useState(null);

    //validamos sesión existente 
    useEffect(()=>{ 
        firebase.auth().onAuthStateChanged((userInfo)=>{ 
        //si existe una sesión activa asignamos los datos de sesión al useState usuario 
            setUsuario(userInfo); 
        }); 
    },[]); 

 

  //Visualizar sucursales correctamente rankeadas
  useFocusEffect( 
    useCallback(()=>{ 
         /*accedemos a la colección de sucursales, consultamos los registros 
      con get y atrapamos la respuesta (se retorna una promesa con la lista sucursales) 
      contamos y asignamos el total de sucursales al useState totalSuc*/ 
      db.collection("sucursales") 
      .get() 
      .then((res)=>{ 
          setTotalSuc(res.size); 
          
      }); 

      const arrSucursales=[]; 
      db.collection("sucursales").orderBy("votos","desc").limit(5).get() 
          .then((res)=>{ 
            setPuntero(res.docs[res.docs.length -1]); 
            res.forEach((doc)=>{ 
              //extraemos cada documento y lo almacenamos en un objeto sucursal 
              const sucursal =doc.data(); 
              //la clave de la sucursal no asigna a menos que lo indiquemos 
              sucursal.id =doc.id; 
              //almacenamos cada sucursal en un arreglo. 
              arrSucursales.push(sucursal); 
          }); 
           //Al terminar de recuperar todos los documentos los almacenamos en el useState sucursales 
           setSucursales(arrSucursales); 
         

           
          });
      },[]) 
    );

    
       
    return (
        <View>
            <View> 
                <Text>Conoce las 5 sucursales más votadas por nuestos usuarios. Para ver  los comentarios de la gente, has tap en la sucursal</Text>
                
                </View>
               <ListarTop sucursales={sucursales}/>
                
        </View>
    )
}

