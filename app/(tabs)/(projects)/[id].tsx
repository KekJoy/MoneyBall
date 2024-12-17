import React, {useCallback, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {useFocusEffect, useLocalSearchParams, useRouter} from 'expo-router';
import {string} from "prop-types";
import {useSQLiteContext} from "expo-sqlite";
import {Project} from "@/app/(tabs)/(projects)/projects";

export default function MaterialDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>()
  const [projects, setProjects] = useState<Project>();

  const handleDelete = () => {
    db.execSync(`DELETE FROM project WHERE id = ${id};`)
    router.back(); // Вернуться к списку
  };

  const db = useSQLiteContext();

  async function fetchData() {
    try {
      const result = await db.getAllAsync<Project>(`SELECT * FROM project WHERE id == ${Number(id)};`);
      setProjects(result[0]);
    } catch (error) {
      setProjects(undefined);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  return (
    <View style={styles.container}>
      {projects
        ? (
            <>
              <Text style={styles.header}>Проект «{projects.name}»</Text>
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                  <View style={{ paddingVertical: 16, borderColor: '#ccc', borderBottomWidth: 1}}>
                    <Text style={styles.h2}>Используемые материалы:</Text>
                    <Text>{projects.materials}</Text>
                  </View>
                  <View style={{ paddingVertical: 16, borderColor: '#ccc', borderBottomWidth: 1}}>
                    <Text style={styles.h2}>Схема:</Text>
                    <Text>{projects.schema}</Text>
                  </View>
                  <View style={{ paddingVertical: 16, borderColor: '#ccc', borderBottomWidth: 1}}>
                    <Text style={styles.h2}>Фото:</Text>
                    <Text>{projects.photo}</Text>
                  </View>
                </View>
                <View style={{ alignSelf: 'flex-end'}}>
                  <Button title={'Удалить проект'} color={'tomato'} onPress={handleDelete} />
                </View>
              </View>
            </>
        )
        : (
          <>
            <Text>
              Произошла ошибка
            </Text>
            <Button title={'Вернуться'} onPress={() => router.back()} />
          </>
        )
      }



    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  h2: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 12
  }
});
