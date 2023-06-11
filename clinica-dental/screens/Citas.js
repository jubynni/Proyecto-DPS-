import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image,Button, SafeAreaView, FlatList, Alert,Pressable } from 'react-native';
import image from "../assets/logo.jpeg";
import { useNavigation } from '@react-navigation/native'

const Citas = () => {
    const [citas, setCitas] = useState([]);

    const navigation = useNavigation();

    const eliminar = async (id) => {
      try {
        const response = await fetch(`http://192.168.1.29:5000/citas/eliminar/${id}`, {
          method: 'GET',        
            headers: {
            'Content-Type': 'application/json',          
            },
            });

            if (response.ok) {
              alert('Cita eliminada con éxito');
              obtenerCitas();           
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
        'Eliminar Cita',
        '¿Estás seguro de que quieres eliminar esta cita?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', onPress: () => eliminar(id) },
        ]
      );
    };
    
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

        <View style = {styles.menu}>
          <Pressable onPress={() => navigation.navigate('Modificar Cita', {item})} style={styles.button}>
            <Text style={styles.textButton}>Modificar</Text>
          </Pressable>
          <Pressable  onPress={() => confirmarEliminar(item.id_cita)}  style={styles.button_eliminar}>
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