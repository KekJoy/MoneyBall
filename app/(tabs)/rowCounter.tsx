import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';



interface Todo {
  value: string;
  intValue: number;
}

let test: any[] = []

export default function RowCounterScreen() {
  const [rowCount, setRowCount] = useState(0);

  const increment = () => setRowCount((prev) => prev + 1);
  const decrement = () => setRowCount((prev) => Math.max(0, prev - 1));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Счетчик рядов</Text>
      <View>
        <Text style={styles.count}>{rowCount}</Text>
      </View>
      <View style={styles.button}>
        <Button color={'tomato'} title="Добавить ряд" onPress={increment} />
      </View>
      <View style={styles.button}>
        <Button color={'tomato'} title="Убрать ряд" onPress={decrement} />
      </View>
      <View style={styles.button}>
        <Button color={'tomato'} title={'Сбросить'} onPress={() => setRowCount(0)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  count: {
    padding: 80,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: 'tomato',
    textAlign: 'center',
    fontSize: 120
  },
  button: {
    paddingVertical: 8,
  }
});
