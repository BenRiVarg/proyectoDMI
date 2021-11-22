import React from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase/app";



export default function UserLogged() {

  const [userInfo,setUserInfo]=useState(null);
  const [reloadUserInfo,setReloadUserInfo]=useState(false);
  const [cargando,setCargando]=useState("false");
  const toastRef = useRef();

  useEffect(() => {
    (async()=>{
      const user=await firebase.auth().currentUser;
      setUserInfo(user);
    
  })();
  setReloadUserInfo(false);
}[reloadUserInfo]
  return (
    <View>
      <Text>Logueado</Text>
      <Button title="Cerrar Sesión" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
