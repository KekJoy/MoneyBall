import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {useSQLiteContext} from "expo-sqlite";




export default function HooksAddScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [materials, setMaterials] = useState('');
  const [schema, setSchema] = useState('');
  const [photo, setPhoto] = useState('');

  const db = useSQLiteContext();

  const handleSave = () => {

    if (!name.trim()) {
      Alert.alert('Ошибка', 'Введите название проекта.');
      return;
    }
    if (!materials.trim()) {
      Alert.alert('Ошибка', 'Введите материалы.');
      return;
    }
    if (!schema.trim()) {
      Alert.alert('Ошибка', 'Выберите схему.');
      return;
    }
    if (!photo.trim()) {
      Alert.alert('Ошибка', 'Выберите фото.');
      return;
    }

    db.runSync(
      `INSERT INTO project (name, materials, schema, photo) VALUES (?, ?, ?, ?)`,
      [name, materials, schema, photo]
    )

    router.back();
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Название проекта"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Материалы"
        value={materials}
        onChangeText={setMaterials}
        style={styles.input}
      />
      <TextInput
        placeholder="Схема"
        value={schema}
        onChangeText={setSchema}
        style={styles.input}
      />
      <TextInput
        placeholder="Фото"
        value={photo}
        onChangeText={setPhoto}
        style={styles.input}
      />

      <Button color={'tomato'} title="Сохранить" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16
  },
});
