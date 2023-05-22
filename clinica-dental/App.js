import React from 'react';
import Home from './screens/Home';
import Doctores from './screens/Doctores'
import Pacientes from './screens/Pacientes'
import Citas from './screens/Citas'
import CrearPaciente from './screens/CrearPaciente'
import CrearDoctor from './screens/CrearDoctor'

import  { NavigationContainer } from '@react-navigation/native';
import  { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Inicio" component={Home}/>
        <Stack.Screen name ="Doctores" component={Doctores}/>
        <Stack.Screen name ="Pacientes" component={Pacientes}/>
        <Stack.Screen name ="Citas" component={Citas}/>
        <Stack.Screen name ="Crear Paciente" component={CrearPaciente}/>
        <Stack.Screen name ="Crear Doctor" component={CrearDoctor}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
