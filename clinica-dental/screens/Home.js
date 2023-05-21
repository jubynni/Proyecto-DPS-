import React from 'react';
import { StyleSheet, Text, View, Image,Button, SafeAreaView, Pressable } from 'react-native';
import image from "../assets/logo.jpeg";
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
        <Image style = {styles.logo} source={image}></Image>

        <View style = {styles.menu}>
        <Text style = {styles.title}>Pacientes</Text> 
          <Pressable onPress={() => navigation.navigate('Doctores')}  style={styles.button}>
            <Text style={styles.textButton}>Crear</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Pacientes')}  style={styles.button}>
            <Text style={styles.textButton}>Ver</Text>
          </Pressable>
        </View>

        <View style = {styles.menu}>
        <Text style = {styles.title}>Doctores</Text> 
          <Pressable onPress={() => navigation.navigate('Doctores')}  style={styles.button}>
            <Text style={styles.textButton}>Crear</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Doctores')}  style={styles.button}>
            <Text style={styles.textButton}>Ver</Text>
          </Pressable>
        </View>

        <View style = {styles.menu}>
        <Text style = {styles.title}>Citas</Text> 
          <Pressable onPress={() => navigation.navigate('Doctores')}  style={styles.button}>
            <Text style={styles.textButton}>Crear</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Citas')}  style={styles.button}>
            <Text style={styles.textButton}>Ver</Text>
          </Pressable>
        </View>

        
      </SafeAreaView>
    )
}

export default Home




const styles = StyleSheet.create({
    container: {
      flex: 1,     
      backgroundColor: 'white',
    },    
    logo: {
      alignSelf: 'center',
      width: 300,
      height: 300
    },
    title:{
      fontSize: 25,
      paddingBottom: 4,
      textAlign: 'left',
      width: '100%',
      fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
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
    },  
    menu: {
        alignSelf: 'center',
        flex: 1,
        width: 400,
        marginHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
});