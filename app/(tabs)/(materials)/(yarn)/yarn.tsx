import {View, Text, Button, TouchableOpacity, StyleSheet} from "react-native";
import {Link, router, useFocusEffect} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import {useSQLiteContext} from "expo-sqlite";

import YarnsTable from "@/components/ui/YarnsTable";



export interface Yarn {
  id: number,
  color: string,
  composition: string, // состав
  thickness: number,
  maker: string,
}

const yarn = () => {
  const [yarns, setYarns] = useState<Yarn[]>([]);
  const db = useSQLiteContext();

  async function fetchData() {
    try {
      const result = await db.getAllAsync<Yarn>('SELECT * FROM yarns;');
      setYarns(result);
    } catch (error) {
      setYarns([]);
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
        <Link href={'/(tabs)/(materials)/(yarn)/add'} asChild >
          <Button color={'tomato'} title={'Добавить'} />
        </Link>
      </View>
      <YarnsTable data={yarns}/>
    </View>
  )
}

export default yarn;


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
