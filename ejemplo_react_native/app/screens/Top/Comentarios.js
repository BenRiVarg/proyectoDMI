import React,{useEffect,useState} from 'react'
import {StyleSheet,View, Text} from 'react-native'
import { Button, Rating } from "react-native-elements"; 

import { map } from "lodash"; 
import { firebaseApp } from "../../utils/firebase"; 
import firebase from "firebase/app"; 
import "firebase/firestore"; 
const db = firebase.firestore(firebaseApp)
export default function Comentarios(propiedades) {

    const { navigation ,route} = propiedades; 
    const { id ,nombre} = route.params; 
    const [reviews, setReviews] = useState([]); 

    useEffect(() => { 
        /*setOption nos permite cambiar las propiedades del stack ver_sucursal, en 
        nuestro caso cambiaremos el titulo de la ventana con el nombre de la     
         sucursal seleccionada de la lista*/ 
       navigation.setOptions({ title: nombre }); 
     }, []); 

     useEffect(() => { 
      db.collection("reviews") 
      .where("idSucursal", "==", id) 
      .get() 
      .then((response) => { 
        const resultReview = []; 
        response.forEach((doc) => { 
          const data = doc.data(); 
          data.id = doc.id; 
          resultReview.push(data); 
        }); 
        setReviews(resultReview); 
      
      });   
     }, []); 

    return (
        <View>
            <View>
            <Button 
              title="Regresar" 
              buttonStyle={styles.btnAddReview} 
              titleStyle={styles.btnTitleAddReview} 
              /* icon={{ 
                type: "material-community", 
                name: "square-edit-outline", 
                color: "#0A6ED3", 
              }}  */
              onPress={() => 
                {navigation.goBack(); }
              } 
            />
            </View>
            <Text>Comentarios Conectadas</Text>
            {map(reviews, (review, index) => ( 
                <Review key={index} review={review} /> 
              ))} 
        </View>
    )
}

function Review(propiedades) { 
    const { title, review, rating, createAt } = propiedades.review; 
    //Convertimos la fecha Timestamp  de firebase a una fecha de JavaScript 
    //Con una precision de millisecond. 
    const createReview = new Date(createAt.seconds * 1000); 
    return ( 
      <View style={styles.viewReview}> 
       
        <View style={styles.viewInfo}> 
          <Text style={styles.reviewTitle}>{title}</Text> 
          <Text style={styles.reviewText}>{review}</Text> 
          <Rating imageSize={15} startingValue={rating} readonly /> 
          <Text style={styles.reviewDate}> 
            {/*Extraemeo de la fecha los valores por separado */} 
            {createReview.getDate()}/{createReview.getMonth() + 1}/ 
            {createReview.getFullYear()} - {createReview.getHours()}: 
            {createReview.getMinutes() < 10 ? "0" : ""} 
            {createReview.getMinutes()} 
          </Text> 
        </View> 
      </View> 
    ); 
  }
  const styles = StyleSheet.create({ 
    btnAddReview: { 
      backgroundColor: "transparent", 
    }, 
    btnTitleAddReview: { 
      color: "#0A6ED3", 
    }, 
    viewReview: { 
      flexDirection: "row", 
      padding: 10, 
      paddingBottom: 20, 
      borderBottomColor: "#0A6ED3", 
      borderBottomWidth: 1, 
    }, 
     viewInfo: { 
      flex: 1, 
      alignItems: "flex-start", 
    }, 
    reviewTitle: { 
      fontWeight: "bold", 
    },
    reviewText: { 
        paddingTop: 2, 
        color: "grey", 
        marginBottom: 5, 
      }, 
      reviewDate: { 
        marginTop: 5, 
        color: "grey", 
        fontSize: 12, 
        position: "absolute", 
        right: 0, 
        bottom: 0, 
      }, 
    });