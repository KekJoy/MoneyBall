import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

export default function CalculatorsScreen() {
  const [yarnLength, setYarnLength] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateYarn = () => {
    const length = parseFloat(yarnLength);
    if (isNaN(length)) {
      Alert.alert('Ошибка', 'Введите корректное значение для длины пряжи');
    } else {
      const calculated = length * 2; // Пример расчета
      setResult(calculated);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Введите длину пряжи:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={yarnLength}
        onChangeText={setYarnLength}
      />
      <Button title="Рассчитать" onPress={calculateYarn} />
      {result !== null && <Text>Результат: {result} м</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
