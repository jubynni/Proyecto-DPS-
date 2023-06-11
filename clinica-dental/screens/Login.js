import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image,Button, SafeAreaView, FlatList, Alert,Pressable } from 'react-native';
import image from "../assets/logo.jpeg";
import { useNavigation } from '@react-navigation/native'


const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const iniciarSesion = () => {
        const login = {
            correo: usuario,
            password: password
        };
        fetch('http://192.168.1.29:5000/auth/login-admin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(login)
        })
          .then(response => {
            if (response.ok) {
              alert('Bienvenido');
              navigation.navigate('Inicio')

            } else {
              throw new Error('Error al iniciar sesión');
            }
          })
          .catch(error => console.error(error));
      };

    return (
        <SafeAreaView style={styles.container}>
            <Image style = {styles.logo}
            source={image}>
            </Image>

            <Text style={styles.title}>Inicia Sesión</Text>
            <View style={styles.formulario}>   
        
                <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={usuario}
                onChangeText={text => setUsuario(text)}
                />
        
                <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={text => setPassword(text)}
                />


                <Pressable onPress={iniciarSesion}  style={styles.button}>
                    <Text style={styles.textButton}>Iniciar Sesión</Text>
                </Pressable>

            </View>
        </SafeAreaView>
      );
}

export default Login


const styles = StyleSheet.create({
    container: {
      flex: 1,      
      backgroundColor: 'white'
    },    
    logo: {
      alignSelf: 'center',
      width: 300,
      height: 300
    },
    title:{
      fontSize: 25,
      padding: 10,
      marginLeft: 5,
      fontWeight: 'bold'
    },
    formulario: {      
     padding: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 3,
      padding: 10,
      marginBottom: 10,
    },
    lista: {
      flex: 1,
      padding: 10,
    },
    item: {
      marginHorizontal: 40,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    nombre: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    menu:{
      color: 'red '
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: 150,
      height: 40,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      margin: 5,
      backgroundColor: '#df48ec',   
  },
  button_eliminar: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: 130,
      height: 40,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      margin: 5,
      backgroundColor: '#D11A2A',   
  },
  textButton: {
      fontSize: 14,
      lineHeight: 0,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
  },
  menu: {
    alignSelf: 'center',
    flex: 1,
    width: 350,
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});