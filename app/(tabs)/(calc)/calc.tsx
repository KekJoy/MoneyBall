import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {Link, useRouter} from 'expo-router';

export default function CalcScreen() {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Калькуляторы</Text>
        <View style={{ paddingVertical: 8 }}>
          <Link href={'/(tabs)/(calc)/concave_curve'} asChild>
            <Button color={'tomato'} title={'Калькулятор вогнутой кривой'} />
          </Link>
        </View>
        <View style={{ paddingVertical: 8 }}>
          <Link href={'/(tabs)/(calc)/convex_curve'} asChild>
            <Button color={'tomato'} title={'Калькулятор выпуклой кривой'} />
          </Link>
        </View>
        <View style={{ paddingVertical: 8 }}>
          <Link href={'/(tabs)/(calc)/materials_calc'} asChild>
            <Button color={'tomato'} title={'Калькулятор материалов для изделия'} />
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
