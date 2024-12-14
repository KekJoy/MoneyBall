import { View, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function RowCounterScreen() {
  const [rowCount, setRowCount] = useState(0);

  const increment = () => setRowCount((prev) => prev + 1);
  const decrement = () => setRowCount((prev) => Math.max(0, prev - 1));

  return (
    <View style={styles.container}>
      <Text>Счётчик рядов</Text>
      <Text>{rowCount} рядов</Text>
      <Button title="Добавить ряд" onPress={increment} />
      <Button title="Убрать ряд" onPress={decrement} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
