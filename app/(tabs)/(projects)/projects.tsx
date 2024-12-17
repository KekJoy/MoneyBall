import {View, Text, Button, TouchableOpacity, StyleSheet, FlatList, Pressable} from "react-native";
import {Link, router, useFocusEffect} from "expo-router";
import React, {useCallback, useEffect, useState} from "react";
import {useSQLiteContext} from "expo-sqlite";

export interface Project {
  id: number,
  name: string,
  materials: string,
  schema: string,
  photo: string
}

const projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const db = useSQLiteContext();

  async function fetchData() {
    try {
      const result = await db.getAllAsync<Project>('SELECT * FROM project;');
      setProjects(result);
    } catch (error) {
      setProjects([]);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  const renderHeader = () => (
    <View style={[styles.row, styles.header]}>
      <Text style={[styles.cell, styles.name_cell, styles.headerText]}>Название проекта</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Project }) => (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? 'tomato' : 'transparent' }, // Динамическое изменение цвета
      ]}
      onPress={() => {
        router.push(`/(tabs)/(projects)/${item.id}`)
      }}
    >
      <View style={styles.row}>
        <Text style={[styles.cell, styles.name_cell]}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Проекты</Text>
      <View style={{ alignSelf: 'flex-end' }}>
        <Link href={'/(tabs)/(projects)/add'} asChild >
          <Button color={'tomato'} title={'Добавить проект'} />
        </Link>
      </View>

      <View style={styles.tableContainer}>
        {renderHeader()}
        {projects.length > 0
          ? <FlatList
            data={projects}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id.toString()}
            bounces={false}
            showsVerticalScrollIndicator={false}
          />
          : <Text style={{ textAlign: 'center', padding: 8 }}>Проекты не найдены</Text>
        }
      </View>

    </View>
  )
}

export default projects;


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
  },
  tableContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: 'stretch'
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  table_header: {
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontWeight: "bold",
  },
  cell: {
    // flex: 1,
    padding: 8,
    textAlign: "left",
  },
  name_cell: {
    width: '100%',
    borderRightWidth: 1,
    borderColor: "#ccc",
    alignSelf: "stretch"
  },
});
