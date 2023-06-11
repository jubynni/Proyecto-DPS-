import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image,Button, SafeAreaView, FlatList, Alert } from 'react-native';
import image from "../assets/logo.jpeg";
import { useNavigation } from '@react-navigation/native'

const Citas = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        // obtener lista de Citas al cargar la pantalla
        obtenerCitas();
    }, []);

    const obtenerCitas = () => {
        fetch('http://192.168.1.29:5000/citas/')
        .then(response => response.json())
        .then(data => setCitas(data))
        .catch(error => console.error(error));  
    };
    
    const renderItem = ({ item }) => (   
    <View style={styles.item}>
        <Text style={styles.nombre}></Text>
        <Text style={styles.nombre}>ID: {item.id_cita}</Text>
        <Text style={styles.nombre}>{item.paciente}</Text>
        <Text style={styles.nombre}>{item.doctor}</Text>
        <Text>Fecha: {item.fecha_cita}</Text>
        <Text>Hora: {item.hora_cita}</Text>  
        {/* <Button title="Eliminar" onPress={() => confirmarEliminarPaciente(item.id)} /> */}
    </View>
    );

    return (
        <SafeAreaView style={styles.container}>
          <Image style = {styles.logo}
            source={image}>
          </Image>

          <Text style={styles.title}>Lista Citas</Text>
          <FlatList
            data={citas}
            renderItem={renderItem}
            keyExtractor={item => item.id_cita.toString()}       
          />      
        </SafeAreaView>
      );
}

export default Citas


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
      marginLeft: 40,
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
    }
});