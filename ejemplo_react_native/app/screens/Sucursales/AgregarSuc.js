import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import Toast from "react-native-easy-toast";
//Importamos el formulario para registrar sucursal
import FormComentario from "../../components/Comentarios/FormCom";
export default function AgregarSuc() {
  const toastRef = useRef();

  return (
    <View>
      {/* Agregamos el formulario contenido en FormSuc */}
      <FormComentario toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}
const styles = StyleSheet.create({});
