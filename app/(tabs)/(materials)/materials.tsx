import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {Link, useRouter} from 'expo-router';

interface Material {
  id: string;
  name: string;
  type: 'yarn' | 'needle';
}

export const materials: Material[] = [
  { id: '1', name: 'Пряжа A', type: 'yarn' },
  { id: '2', name: 'Спицы 4 мм', type: 'needle' },
];

export default function MaterialScreen() {
  const router = useRouter();

  const renderItem = (item: Material) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => router.push(`/(tabs)/(materials)/detail?id=${item.id}`)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Материалы</Text>

      <Text style={styles.subHeader}>Пряжа</Text>
      <FlatList
        data={[{ id: 'add', name: 'Добавить пряжу', type: 'yarn' }, ...materials.filter((m) => m.type === 'yarn')]}
        renderItem={({ item }) =>
          item.id === 'add' ? (
            <Button title="Добавить пряжу" onPress={() => router.push('/(tabs)/(materials)/add?type=yarn')} />
          ) : (
            renderItem(item)
          )
        }
      />

      <Text style={styles.subHeader}>Спицы</Text>
      <FlatList
        data={[{ id: 'add', name: 'Добавить спицы', type: 'needle' }, ...materials.filter((m) => m.type === 'needle')]}
        renderItem={({ item }) =>
          item.id === 'add' ? (
            <Button title="Добавить спицы" onPress={() => router.push('/(tabs)/(materials)/add?type=needle')} />
          ) : (
            renderItem(item)
          )
        }
      />
      <Text>This is index.tsx</Text>

      <Link href={'/(tabs)/(materials)/add'} asChild>
        <Button title={'To add'}/>
      </Link>

      <Link href={'/(tabs)/(materials)/detail'} asChild>
        <Button title={'To detail'}/>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  listItem: { padding: 16, backgroundColor: '#f9f9f9', marginBottom: 8, borderRadius: 8 },
});
