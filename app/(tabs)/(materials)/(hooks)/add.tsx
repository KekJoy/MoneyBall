import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {useSQLiteContext} from "expo-sqlite";

export default function HooksAddScreen() {
  const router = useRouter();
  const [maker, setMaker] = useState('');       // Производитель
  const [thickness, setThickness] = useState(''); // Толщина
  const db = useSQLiteContext();

  const handleSave = () => {
    const thicknessValue = parseFloat(thickness);

    if (!maker.trim()) {
      Alert.alert('Ошибка', 'Введите производителя.');
      return;
    }
    if (isNaN(thicknessValue) || thicknessValue <= 0) {
      Alert.alert('Ошибка', 'Введите корректное значение толщины (положительное число).');
      return;
    }


    db.runSync(`INSERT INTO hook (thickness, maker) VALUES (?, ?)`, [thicknessValue, maker])
    console.log({maker, thickness: thicknessValue});

    router.back();
  };

  return (
    <View style={styles.container}>

      {/* Поле Производитель */}
      <TextInput
        placeholder="Производитель"
        value={maker}
        onChangeText={setMaker}
        style={styles.input}
      />

      {/* Поле Толщина */}
      <TextInput
        placeholder="Толщина (например, 1.5)"
        value={thickness}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^0-9.]/g, ''); // Оставляем только цифры и точку
          setThickness(filteredText);
        }}
        keyboardType='numeric'
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
