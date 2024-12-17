import {View, Text, Button, TouchableOpacity, StyleSheet} from "react-native";
import {Link, router, useFocusEffect} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import {useCallback, useEffect, useState} from "react";
import {useSQLiteContext} from "expo-sqlite";
import HooksTable from "@/components/ui/HooksTable";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";



export interface Hooks {
  id: number,
  maker: string,
  thickness: number,
}

const hooks = () => {
  const [hooks, setHooks] = useState<Hooks[]>([]);
  const db = useSQLiteContext();

  async function fetchData() {
    try {
      const result = await db.getAllAsync<Hooks>('SELECT * FROM hook;');
      setHooks(result);
    } catch (error) {
      setHooks([]);
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
        <Link href={'/(tabs)/(materials)/(hooks)/add'} asChild >
          <Button color={'tomato'} title={'Добавить'} />
        </Link>
      </View>
      <HooksTable data={hooks}/>
    </View>
  )
}

export default hooks;


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
