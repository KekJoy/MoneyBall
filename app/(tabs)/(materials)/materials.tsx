import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {Link, useRouter} from 'expo-router';

export default function MaterialScreen() {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Материалы</Text>
        <View style={{ paddingVertical: 8 }}>
          <Link href={'/(tabs)/(materials)/(hooks)/hooks'} asChild>
            <Button color={'tomato'} title={'Крючки'} />
          </Link>
        </View>
        <View style={{ paddingVertical: 8 }}>
          <Link href={'/(tabs)/(materials)/(needle)/needle'} asChild>
            <Button color={'tomato'} title={'Спицы'} />
          </Link>
        </View>
        <View style={{ paddingVertical: 8 }}>
          <Link href={'/(tabs)/(materials)/(yarn)/yarn'} asChild>
            <Button color={'tomato'} title={'Пряжа'} />
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  listItem: { padding: 16, backgroundColor: '#f9f9f9', marginBottom: 8, borderRadius: 8 },
});
