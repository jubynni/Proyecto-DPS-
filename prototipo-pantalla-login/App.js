import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica para manejar el inicio de sesión
    // Puedes realizar aquí las llamadas a la API o autenticación

    // Ejemplo básico: verificar si el email y la contraseña son válidos
    if (email === 'user@example.com' && password === 'password') {
      alert('Inicio de sesión exitoso');
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
