import {View, Text, Button, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import { useState } from 'react';
import {Link} from "expo-router";

export default function ProjectsScreen() {
  const [projects, setProjects] = useState([
    { id: '1', name: 'Проект 1', material: 'Пряжа A', photo: 'photo1.png' },
    { id: '2', name: 'Проект 2', material: 'Пряжа B', photo: 'photo2.png' },
  ]);

  const addProject = () => {
    const newProject = { id: Date.now().toString(), name: 'Новый проект', material: 'Новая пряжа', photo: '' };
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.projectItem}>
            <Text>{item.name}</Text>
            <Text>{item.material}</Text>
            <Button title="Просмотреть схему" onPress={() => {}} />
            <Button title="Добавить фото" onPress={() => {}} />
          </View>
        )}
      />
      <Button title="Добавить проект" onPress={addProject} />

      <View >
          <Text>Используйте счётчик рядов:</Text>
          <Link href='/counter' asChild>
            <Button title="Открыть счётчик рядов" />
          </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  projectItem: {
    marginBottom: 15,
  },
});
