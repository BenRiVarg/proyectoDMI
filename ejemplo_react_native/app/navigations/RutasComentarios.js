import React from "react";
/*Importamos la libreria de StackNavigation, la cual
 permite definir forma para que su aplicación haga
 la transición entre pantallas */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Creamos el objeto de control de nuestra pila de pantallas
const Stack = createNativeStackNavigator();
//Importamos las pantallas que deseamos agregar a la ruta
import Comentarios from "../screens/Comentarios/Comentarios";
import AddComment from "../screens/Comentarios/AgregarComentario";
export default function RutasComentarios() {
  //Las primera pantalla que aparece en la pila será la que se muestre
  //por default al importar nuestro archivo
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Comentarios"
        component={Comentarios}
        options={{ title: "Comentarios" }}
      />
      <Stack.Screen
        name="Agregar Comentarios"
        component={AddComment}
        options={{ title: "Nuevo Comentario" }}
      />
    </Stack.Navigator>
  );
}
