import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image,Button, SafeAreaView, FlatList, Alert } from 'react-native';
import image from "../assets/logo.jpeg";
import { useNavigation } from '@react-navigation/native'

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        // obtener lista de pacientes al cargar la pantalla
        obtenerPacientes();
    }, []);

    const obtenerPacientes = () => {
        fetch('http://192.168.1.19:5000/pacientes/')
        .then(response => response.json())
        .then(data => setPacientes(data))
        .catch(error => console.error(error));
    };
    
    const renderItem = ({ item }) => (   
    <View style={styles.item}>
        <Text style={styles.nombre}></Text>
        <Text style={styles.nombre}>ID: {item.id_paciente}</Text>
        <Text style={styles.nombre}>{item.nombre_completo}</Text>
        <Text>Fecha Nacimiento: {item.fecha_nac}</Text>
        <Text>Domicilio: {item.domicilio}</Text>  
        <Text>Teléfono: {item.telefono}</Text>
        {/* <Button title="Eliminar" onPress={() => confirmarEliminarPaciente(item.id)} /> */}
    </View>
    );

    return (
        <SafeAreaView style={styles.container}>
          <Image style = {styles.logo}
            source={image}>
          </Image>

          <Text style={styles.title}>Lista pacientes</Text>
          <FlatList
            data={pacientes}
            renderItem={renderItem}
            keyExtractor={item => item.id_paciente.toString()}       
          />      
        </SafeAreaView>
      );
}

export default Pacientes


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