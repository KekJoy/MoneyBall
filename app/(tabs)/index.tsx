import { Link } from 'expo-router';

import {SafeAreaView, ScrollView, Text, View, Button, Image} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Добро пожаловать в WoolWizard!</Text>
        <Image source={require('../../assets/4da48.webp')} resizeMode={'contain'} style={{height: 200, width: '100%' }}/>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Используйте калькуляторы:</Text>
          <Link href="/calculatorScreen" asChild>
            <Button title="Калькулятор пряжи" />
          </Link>
          <Link href="/calculatorScreen" asChild>
            <Button title="Калькулятор выкройки" />
          </Link>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ваши проекты:</Text>
          <Link href="/projectsScreen" asChild>
            <Button title="Мой проект 1" />
          </Link>
          <Link href="/projectsScreen" asChild>
            <Button title="Мой проект 2" />
          </Link>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Используйте счётчик рядов:</Text>
          <Link href='/rowCounter' asChild>
            <Button title="Открыть счётчик рядов" />
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { StyleSheet } from 'react-native';
import RowCounterScreen from "@/app/(tabs)/rowCounter";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',  // Светлый фон для всего экрана
    paddingTop: 20,  // Оставляем место для статус-бара
  },
  scrollViewContainer: {
    paddingBottom: 20,  // Отступ снизу
    paddingHorizontal: 15,  // Отступы по бокам
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',  // Тёмный цвет текста
    marginVertical: 20,  // Отступ сверху и снизу
    textAlign: 'center',
  },
  section: {
    marginVertical: 15,  // Отступ между секциями
    gap: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',  // Немного светлее, чем основной цвет
    marginBottom: 10,  // Отступ снизу
  },
  material: {
    fontSize: 16,
    color: '#666',  // Легкий серый цвет для материалов
    marginBottom: 5,  // Отступ снизу
  },
  button: {
    backgroundColor: '#4CAF50',  // Зеленый цвет для кнопок
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,  // Закругленные углы
    marginVertical: 10,  // Отступ между кнопками
    alignItems: 'center',  // Выравнивание текста по центру
  },
  buttonText: {
    color: '#fff',  // Белый цвет текста на кнопке
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    backgroundColor: '#2196F3',  // Синий цвет для ссылок
  },
});


