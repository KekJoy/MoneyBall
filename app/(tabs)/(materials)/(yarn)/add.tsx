import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {useSQLiteContext} from "expo-sqlite";

export default function YarnAddScreen() {
  const router = useRouter();

  const [color, setColor] = useState(''); // Цвет
  const [composition, setComposition] = useState(''); // Состав
  const [thickness, setThickness] = useState(''); // Толщина
  const [maker, setMaker] = useState('');       // Производитель

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
    if (!color.trim()) {
      Alert.alert('Ошибка', 'Укажите цвет.');
      return;
    }
    if (!composition.trim()) {
      Alert.alert('Ошибка', 'Введите состав.');
      return;
    }


    db.runSync(`INSERT INTO yarns (color, composition, thickness, maker ) VALUES (?, ?, ?, ?)`,
      [color, composition, thicknessValue, maker])
    console.log({maker, thickness: thicknessValue, composition, color});

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

      <TextInput
        placeholder="Цвет"
        value={color}
        onChangeText={setColor}
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

      <TextInput
        placeholder="Состав"
        value={composition}
        onChangeText={setComposition}
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
