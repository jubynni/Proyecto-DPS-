import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image,Button, SafeAreaView, FlatList, Alert, Pressable } from 'react-native';
import image from "../assets/logo.jpeg";
import { useNavigation } from '@react-navigation/native'

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);


    const eliminar = async (id) => {
      try {
        const response = await fetch(`http://192.168.1.29:5000/pacientes/eliminar/${id}`, {
          method: 'GET',        
            headers: {
            'Content-Type': 'application/json',          
            },
            });

            if (response.ok) {
              alert('Paciente eliminado con éxito');
              obtenerPacientes();           
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
          'Eliminar Paciente',
          '¿Estás seguro de que quieres eliminar este paciente?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', onPress: () => eliminar(id) },
          ]
        );
      };

    useEffect(() => {
        // obtener lista de pacientes al cargar la pantalla
        obtenerPacientes();
    }, []);

    const obtenerPacientes = () => {
        fetch('http://192.168.1.29:5000/pacientes/')
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

        <View style = {styles.menu}>
          <Pressable onPress={() => confirmarEliminar(item.id_paciente)}  style={styles.button}>
            <Text style={styles.textButton}>Modificar</Text>
          </Pressable>
          <Pressable onPress={() => confirmarEliminar(item.id_paciente)}  style={styles.button_eliminar}>
            <Text style={styles.textButton}>Eliminar</Text>
          </Pressable>
        </View>

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
    },
    button: {
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