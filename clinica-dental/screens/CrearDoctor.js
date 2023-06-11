import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image,Button, SafeAreaView, FlatList, Alert, Pressable } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import image from "../assets/logo.jpeg";



const Doctor = () => {
    const [nombre, setNombre] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [correo, setCorreo] = useState('');
    const [fecha_nac, setFechaNac] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [horario, setHorario] = useState('');

    const agregarDoctor = () => {
        const nuevoDoctor = {
          nombre_completo: nombre,
          domicilio: domicilio,
          telefono: telefono,
          fecha_nac: fecha_nac,
          correo: correo,
          contrasenia: password,
          horario: horario,
          especialidad: especialidad,
        };
        fetch('http://192.168.1.29:5000/doctores/nuevo', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoDoctor)
        })
          .then(response => {
            if (response.ok) {
              setNombre('');
              setDomicilio('');
              setFechaNac('');
              setCorreo('');
              setPassword('');
              setTelefono('');
              setHorario('');
              setEspecialidad('');
              alert('Doctor agregado con éxito');
            } else {
              throw new Error('Error al agregar Doctor');
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
                placeholder="Nombre"
                value={nombre}
                onChangeText={text => setNombre(text)}
                />

                {/* <TextInput
                style={styles.input}
                placeholder="Fecha Nacimiento"
                value={fecha_nac}
                onChangeText={text => setFechaNac(text)}
                /> */}
                

                <TextInput
                style={styles.input}
                placeholder="Domicilio"
                value={domicilio}
                onChangeText={text => setDomicilio(text)}
                />

                <TextInput
                style={styles.input}
                placeholder="Telefono"
                value={telefono}
                onChangeText={text => setTelefono(text)}
                />


                <TextInput
                style={styles.input}
                placeholder="Correo"
                value={correo}
                onChangeText={text => setCorreo(text)}
                />
                
                <TextInput
                style={styles.input}
                placeholder="Fecha Nacimiento"
                value={fecha_nac}
                onChangeText={text => setFechaNac(text)}
                />

                {/* <DateTimePicker
                    testID="dateTimePicker"
                    value={fecha_nac}
                    mode= 'date'
                    is24Hour={true}
                    onChange={onChange}
                /> */}

                <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={text => setPassword(text)}
                />
                <TextInput
                style={styles.input}
                placeholder="Horario"
                value={horario}
                onChangeText={text => setHorario(text)}
                />
                <TextInput
                style={styles.input}
                placeholder="Especialidad"
                value={especialidad}
                onChangeText={text => setEspecialidad(text)}
                />
                <Pressable onPress={agregarDoctor}  style={styles.button}>
                    <Text style={styles.textButton}>Agregar</Text>
                </Pressable>

            </View>
        </SafeAreaView>
      );
}

export default Doctor


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