import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import {useSQLiteContext} from "expo-sqlite";

// Расчет вогнутой кривой
interface KnittingInputs {
  widthCm: number;       // Ширина в см
  heightCm: number;      // Высота в см
  curveSizeCm: number;   // Размер изгиба в см
  startRow: number;      // Начало вязания в рядах
  densityHorizontal: number; // Плотность вязания по горизонтали (петель на 1 см)
  densityVertical: number;   // Плотность вязания по вертикали (рядов на 1 см)
}

// Функция расчёта координат для вогнутой кривой
function calculateConcaveCurve(inputs: KnittingInputs): number[][] {
  const {
    widthCm,
    heightCm,
    curveSizeCm,
    densityHorizontal,
    densityVertical,
  } = inputs;

  // Преобразование размеров в количество петель и рядов
  const widthStitches = Math.round(widthCm * densityHorizontal);
  const heightRows = Math.round(heightCm * densityVertical);
  const curveSizeRows = Math.round(curveSizeCm * densityVertical);

  // Массив для хранения координат кривой
  const curveCoordinates: number[][] = [];

  // Генерация координат кривой с использованием вогнутой квадратичной функции
  for (let row = 0; row <= heightRows; row++) {
    const x = Math.round((widthStitches * row) / heightRows); // Линейное распределение по X
    const y = Math.round(curveSizeRows * (1 - Math.pow(row / heightRows, 2))); // Вогнутая функция по Y

    curveCoordinates.push([x, y]);
  }

  return curveCoordinates;
}

// Функция для вывода координат в формате, указанном на скриншоте
function displayCurveFormatted(curve: number[][], startRow: number) {
  let output = "";
  curve.forEach(([x, y], index) => {
    const rowNumber = startRow + index;
    output += `${rowNumber}(${x}), `;
  });

  // Удаляем последнюю запятую и пробел
  output = output.trim().replace(/,$/, "");

  return output
}


export default function ConcaveScreen() {
  const [widthCm, setWidthCm] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [curveSizeCm, setCurveSizeCm] = useState('')
  const [startRow, setStartRow] = useState('')
  const [densityHorizontal, setDensityHorizontal] = useState('')
  const [densityVertical, setDensityVertical] = useState('')

  const [result, setResult] = useState('')

  const handleSave = () => {
    if (isNaN(Number(widthCm)) || Number(widthCm) <= 0) {
      Alert.alert('Ошибка', 'Введите корректное значение ширины (положительное число).');
      return;
    }
    if (isNaN(Number(heightCm)) || Number(heightCm) <= 0) {
      Alert.alert('Ошибка', 'Введите корректное значение высоты (положительное число).');
      return;
    }
    if (isNaN(Number(curveSizeCm)) || Number(curveSizeCm) <= 0) {
      Alert.alert('Ошибка', 'Введите корректное значение размера изгиба (положительное число).');
      return;
    }
    if (isNaN(Number(startRow)) || Number(startRow) <= 0) {
      Alert.alert('Ошибка', 'Введите корректное значение начала вязания (положительное число).');
      return;
    }
    if (isNaN(Number(densityHorizontal)) || Number(densityHorizontal) <= 0) {
      Alert.alert('Ошибка', 'Введите корректное значение плотности вязания по горизонтали (положительное число).');
      return;
    }
    if (isNaN(Number(densityVertical)) || Number(densityVertical) <= 0) {
      Alert.alert('Ошибка', 'Введите корректное значение плотности вязания по вертикали (положительное число).');
      return;
    }

    const result = calculateConcaveCurve({
      widthCm: Number(widthCm),
      heightCm: Number(heightCm),
      curveSizeCm: Number(curveSizeCm),
      startRow: Number(startRow),
      densityHorizontal: Number(densityHorizontal),
      densityVertical: Number(densityVertical)
    })

    setResult(displayCurveFormatted(result, Number(startRow)))

  };


  return (
    <View style={styles.container}>

      <View style={{  flex: 1}}>
        <View>
          <TextInput
            placeholder="Ширина в см"
            value={widthCm}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^0-9.]/g, ''); // Оставляем только цифры и точку
              setWidthCm(filteredText);
            }}
            keyboardType='numeric'
            style={styles.input}
          />
          <TextInput
            placeholder="Высота в см"
            value={heightCm}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^0-9.]/g, ''); // Оставляем только цифры и точку
              setHeightCm(filteredText);
            }}
            keyboardType='numeric'
            style={styles.input}
          />
          <TextInput
            placeholder="Размер изгиба в см"
            value={curveSizeCm}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^0-9.]/g, ''); // Оставляем только цифры и точку
              setCurveSizeCm(filteredText);
            }}
            keyboardType='numeric'
            style={styles.input}
          />
          <TextInput
            placeholder="Начало вязания в рядах"
            value={startRow}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^0-9.]/g, ''); // Оставляем только цифры и точку
              setStartRow(filteredText);
            }}
            keyboardType='numeric'
            style={styles.input}
          />
          <TextInput
            placeholder="Плотность вязания по горизонтали (петель на 1 см)"
            value={densityHorizontal}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^0-9.]/g, ''); // Оставляем только цифры и точку
              setDensityHorizontal(filteredText);
            }}
            keyboardType='numeric'
            style={[styles.input]}
            multiline={true}
          />
          <TextInput
            placeholder="Плотность вязания по вертикали (рядов на 1 см)"
            value={densityVertical}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^0-9.]/g, ''); // Оставляем только цифры и точку
              setDensityVertical(filteredText);
            }}
            keyboardType='numeric'
            style={styles.input}
            multiline={true}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{maxHeight: '80%'}}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
              Результат расчетов:
            </Text>
            <ScrollView style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, }}>
              <Text style={{ padding: 8, overflow: 'scroll'}}>{result}</Text>
            </ScrollView>
          </View>
          <View style={{}}>
            <Button color={'tomato'} title="Рассчитать" onPress={handleSave} />
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16
  },
});
