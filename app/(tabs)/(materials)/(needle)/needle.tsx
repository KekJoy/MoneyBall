import {View, Text, Button, TouchableOpacity, StyleSheet} from "react-native";
import {Link, router, useFocusEffect} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import {useSQLiteContext} from "expo-sqlite";

import NeedleTable from "@/components/ui/NeedleTable";



export interface Needle {
  id: number,
  maker: string,
  thickness: number,
  type: string
}

const needle = () => {
  const [needles, setNeedles] = useState<Needle[]>([]);
  const db = useSQLiteContext();

  async function fetchData() {
    try {
      const result = await db.getAllAsync<Needle>('SELECT * FROM needle;');
      setNeedles(result);
    } catch (error) {
      setNeedles([]);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'flex-end' }}>
        <Link href={'/(tabs)/(materials)/(needle)/add'} asChild >
          <Button color={'tomato'} title={'Добавить'} />
        </Link>
      </View>
      <NeedleTable data={needles}/>
    </View>
  )
}

export default needle;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 16
  },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 8 },
  list_container: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  }
});
