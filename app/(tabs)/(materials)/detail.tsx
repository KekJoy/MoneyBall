import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';

export default function MaterialDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams()

  // const handleDelete = () => {
  //   console.log(`Удален материал с ID: ${id}`);
  //   router.push('/materialScreen'); // Вернуться к списку
  // };

  return (
    <View style={styles.container}>
      {/*<Text style={styles.header}>Детали материала</Text>*/}
      {/*<Text>Название: Пряжа A</Text>*/}
      {/*<Text>Цвет: Красный</Text>*/}
      {/*<Text>Объем: 200 г</Text>*/}
      {/*<Text>Плотность: 50 г/м</Text>*/}

      {/*<Button title="Удалить" color="red" onPress={handleDelete} />*/}
      {/*<Button title="Назад" onPress={() => router.back()} />*/}
      <Text>This is detail.tsx</Text>
      {id && <Text>{id}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
