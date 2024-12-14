import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {materials} from "@/app/(tabs)/(materials)/materials";

export default function MaterialAddScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [volume, setVolume] = useState('');
  const [density, setDensity] = useState('');
  const [size, setSize] = useState('');

  const handleSave = () => {
    console.log({ name, color, volume, density, size });
    materials.push({ id: '3', name, type: 'yarn' })
    router.push('/(tabs)/(materials)/materials'); // Вернуться к списку материалов
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Добавить {type === 'yarn' ? 'Пряжу' : 'Спицы'}</Text>

      <TextInput
        placeholder="Название"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {type === 'yarn' && (
        <>
          <TextInput
            placeholder="Цвет"
            value={color}
            onChangeText={setColor}
            style={styles.input}
          />
          <TextInput
            placeholder="Объем (г)"
            value={volume}
            onChangeText={setVolume}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Плотность (г/м)"
            value={density}
            onChangeText={setDensity}
            keyboardType="numeric"
            style={styles.input}
          />
        </>
      )}

      {type === 'needle' && (
        <TextInput
          placeholder="Размер (мм)"
          value={size}
          onChangeText={setSize}
          keyboardType="numeric"
          style={styles.input}
        />
      )}

      <Button title="Сохранить" onPress={handleSave} />
      <Text>This is add.tsx</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 8 },
});
