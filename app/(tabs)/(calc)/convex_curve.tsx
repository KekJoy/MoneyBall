import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

// Расчет выпуклой кривой
interface KnittingInputs {
  widthCm: number;       // Ширина в см
  heightCm: number;      // Высота в см
  curveSizeCm: number;   // Размер изгиба в см
  startRow: number;      // Начало вязания в рядах
  densityHorizontal: number; // Плотность вязания по горизонтали (петель на 1 см)
  densityVertical: number;   // Плотность вязания по вертикали (рядов на 1 см)
}

// Функция расчёта координат для выпуклой кривой
function calculateConvexCurve(inputs: KnittingInputs): number[][] {
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

  const curveCoordinates: number[][] = [];

  // Генерация координат кривой с квадратичной функцией
  for (let row = 0; row <= heightRows; row++) {
    const x = Math.round((widthStitches * row) / heightRows); // Линейное распределение по X
    const y = Math.round(curveSizeRows * Math.pow(row / heightRows, 2)); // Квадратичная функция по Y
    curveCoordinates.push([x, y]);
  }

  return curveCoordinates;
}

// Функция для форматированного вывода
function displayCurveFormatted(curve: number[][], startRow: number): string {
  let output = "";
  curve.forEach(([x, y], index) => {
    const rowNumber = startRow + index;
    output += `${rowNumber}(${x}), `;
  });

  return output.trim().replace(/,$/, "");
}

export default function ConvexScreen() {
  const [widthCm, setWidthCm] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [curveSizeCm, setCurveSizeCm] = useState('');
  const [startRow, setStartRow] = useState('');
  const [densityHorizontal, setDensityHorizontal] = useState('');
  const [densityVertical, setDensityVertical] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    if (
      isNaN(Number(widthCm)) ||
      isNaN(Number(heightCm)) ||
      isNaN(Number(curveSizeCm)) ||
      isNaN(Number(startRow)) ||
      isNaN(Number(densityHorizontal)) ||
      isNaN(Number(densityVertical)) ||
      Number(widthCm) <= 0 ||
      Number(heightCm) <= 0 ||
      Number(curveSizeCm) <= 0 ||
      Number(startRow) <= 0 ||
      Number(densityHorizontal) <= 0 ||
      Number(densityVertical) <= 0
    ) {
      Alert.alert('Ошибка', 'Все поля должны содержать положительные числа.');
      return;
    }

    const curve = calculateConvexCurve({
      widthCm: Number(widthCm),
      heightCm: Number(heightCm),
      curveSizeCm: Number(curveSizeCm),
      startRow: Number(startRow),
      densityHorizontal: Number(densityHorizontal),
      densityVertical: Number(densityVertical),
    });

    setResult(displayCurveFormatted(curve, Number(startRow)));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View>
          <TextInput
            placeholder="Ширина в см"
            value={widthCm}
            onChangeText={(text) => setWidthCm(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Высота в см"
            value={heightCm}
            onChangeText={(text) => setHeightCm(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Размер изгиба в см"
            value={curveSizeCm}
            onChangeText={(text) => setCurveSizeCm(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Начало вязания в рядах"
            value={startRow}
            onChangeText={(text) => setStartRow(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Плотность вязания по горизонтали (петель на 1 см)"
            value={densityHorizontal}
            onChangeText={(text) => setDensityHorizontal(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Плотность вязания по вертикали (рядов на 1 см)"
            value={densityVertical}
            onChangeText={(text) => setDensityVertical(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ maxHeight: '80%' }}>
            <Text style={styles.resultHeader}>Результат расчетов:</Text>
            <ScrollView style={styles.resultBox}>
              <Text style={styles.resultText}>{result}</Text>
            </ScrollView>
          </View>
          <View>
            <Button color={'tomato'} title="Рассчитать" onPress={handleCalculate} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  resultHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  resultText: {
    padding: 8,
  },
});
