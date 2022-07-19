import React from 'react'
import {
    Animated,
    View,
    Text,
    Pressable,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

  import Ionicons from 'react-native-vector-icons/Ionicons';

function ImportantScreen({nav}) {

  return (
    <View style={{backgroundColor:"#FFF", width:'100%', borderRadius:5, padding:15, position:'relative'}}>
        <TouchableOpacity onPress={()=> nav.goBack()} style={{position:'absolute', right:8, top:8, zIndex:99}}><Ionicons name="close" size={25} color="#000"/></TouchableOpacity>
        <Text style={styles.popupHeading}>Important</Text>
        <View>
            <Text style={styles.PopupDesc}>You haven’t confirmed your email address <Text style={{fontWeight:"700"}}>example@domin.com</Text> yet.</Text>
            <Text style={styles.PopupDesc}>Please click on the confirmation link in the activation email we send you.</Text>
        </View>
        <TouchableOpacity style={styles.btn}>
            <Text style={{color:'#FFF', fontSize:18, textTransform:"uppercase"}}>Confirm</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    popupHeading:{
        color:'#333333',
        fontSize:22,
        textAlign:'center',
        marginBottom:15
    },
    formLabel:{
        color:'#333333',
        fontSize:17,
        fontWeight:'600',
        marginBottom:5
    },
    input:{
        height:40,
        borderWidth:1,
        borderColor:'#cccccc'
    },
    link:{
        color:"#00603b",
        fontSize:16,
        fontWeight:"600",
        marginTop:5
    },
    btn:{
        backgroundColor:'#00603b',
        alignItems:'center',
        padding:12,
        marginTop:20
    },
    PopupDesc:{
        fontSize: 15,
        color: "#333333",
        fontWeight: "300",
        paddingTop:20,
    }
})


export default ImportantScreen;
