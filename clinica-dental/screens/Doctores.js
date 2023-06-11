import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image,Button, SafeAreaView, FlatList, Alert } from 'react-native';
import image from "../assets/logo.jpeg";
import { useNavigation } from '@react-navigation/native'

const Doctores = () => {
    const [doctores, setDoctores] = useState([]);

    const eliminar = async (id) => {
      try {
        const response = await fetch(`http://192.168.1.29:5000/doctores/eliminar/${id}`, {
          method: 'GET',        
            headers: {
            'Content-Type': 'application/json',          
            },
            });

            if (response.ok) {
              alert('Doctor eliminado con éxito');
              obtenerDoctores();           
            } else {             
              alert('Error al eliminar');            
            }
            } catch (error) {
              console.error(error);
              // alert('Error al eliminar ');
              alert('Error al eliminar ' + error.message);
            }
      };
  
      const confirmarEliminar = (id) => {
        Alert.alert(
          'Eliminar Doctor',
          '¿Estás seguro de que quieres eliminar este doctor?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', onPress: () => eliminar(id) },
          ]
        );
      };

    useEffect(() => {
        // obtener lista de doctores al cargar la pantalla
        obtenerDoctores();
    }, []);

    const obtenerDoctores = () => {
        fetch('http://192.168.1.29:5000/doctores/')
        .then(response => response.json())
        .then(data => setDoctores(data))
        .catch(error => console.error(error));
    };
    
    const renderItem = ({ item }) => (   
    <View style={styles.item}>
        <Text style={styles.nombre}></Text>
        <Text style={styles.nombre}>ID: {item.id_doctor}</Text>
        <Text style={styles.nombre}>{item.nombre_completo}</Text>
        <Text style={styles.nombre}>{item.especialidad}</Text>
        <Text>{item.horario}</Text>
        <Text>Fecha Nacimiento: {item.fecha_nac}</Text>
        <Text>Domicilio: {item.domicilio}</Text>  
        <Text>Teléfono: {item.telefono}</Text>
        <Button title="Eliminar" onPress={() => confirmarEliminar(item.id_doctor)} />
        {/* <Button title="Eliminar" onPress={() => confirmarEliminarPaciente(item.id)} /> */}
    </View>
    );

    return (
        <SafeAreaView style={styles.container}>
          <Image style = {styles.logo}
            source={image}>
          </Image>

          <Text style={styles.title}>Lista doctores</Text>
          <FlatList
            data={doctores}
            renderItem={renderItem}
            keyExtractor={item => item.id_doctor.toString()}       
          />      
        </SafeAreaView>
      );
}

export default Doctores


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