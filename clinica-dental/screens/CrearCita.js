import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image,Button, SafeAreaView, FlatList, Alert, Pressable } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import image from "../assets/logo.jpeg";



const Citas = () => {
    const [id_paciente, setIdPaciente] = useState('');
    const [id_doctor, setIdDoctor] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const onChange = (event, selectedDate) => {
        setFechaNac(selectedDate);
        
    };

    const agregarCita = () => {
        const nuevaCita = {
            id_paciente: id_paciente,
            id_doctor: id_doctor,
            fecha: fecha,
            hora: hora
        };
        fetch('http://192.168.1.29:5000/citas/nuevo', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevaCita)
        })
          .then(response => {
            if (response.ok) {
              setIdDoctor('');
              setIdPaciente('');
              setFecha('');
              setHora('');
              alert('Cita agregada con éxito');
            } else {
              throw new Error('Error al agregar cita');
            }
          })
          .catch(error => console.error(error));
      };


    return (
        <SafeAreaView style={styles.container}>
          <Image style = {styles.logo}
            source={image}>
          </Image>

          <View style={styles.formulario}>   
        
                <TextInput
                style={styles.input}
                placeholder="Doctor"
                value={id_doctor}
                onChangeText={text => setIdDoctor(text)}
                />


                <TextInput
                style={styles.input}
                placeholder="Paciente"
                value={id_paciente}
                onChangeText={text => setIdPaciente(text)}
                />
                
                <TextInput
                style={styles.input}
                placeholder="Fecha"
                value={fecha}
                onChangeText={text => setFecha(text)}
                />

                <TextInput
                style={styles.input}
                placeholder="Hora"
                value={hora}
                onChangeText={text => setHora(text)}
                />

        
                <Pressable onPress={agregarCita}  style={styles.button}>
                    <Text style={styles.textButton}>Agregar</Text>
                </Pressable>

            </View>
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
      borderColor: '#f2f2f2',
      backgroundColor: '#f2f2f2',
      borderRadius: 3,
      padding: 15,
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
        width: 180,
        height: 40,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        margin: 5,
        backgroundColor: '#df48ec',   
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});