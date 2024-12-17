import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

// Интерфейс для ввода данных о вязании и пряже
interface YarnCalculationInputs {
  widthCm: number;           // Ширина изделия в см
  heightCm: number;          // Высота изделия в см
  densityHorizontal: number; // Плотность вязания по горизонтали (петель на 1 см)
  densityVertical: number;   // Плотность вязания по вертикали (рядов на 1 см)
  yarnLengthPerBall: number; // Длина нити в одном мотке (в метрах)
  yarnConsumptionPerStitch: number; // Расход нити на одну петлю (в метрах)
}

// Функция расчёта количества пряжи в мотках
function calculateYarnBalls(inputs: YarnCalculationInputs): number {
  const {
    widthCm,
    heightCm,
    densityHorizontal,
    densityVertical,
    yarnLengthPerBall,
    yarnConsumptionPerStitch,
  } = inputs;

  // Общее количество петель в изделии
  const totalStitches =
    Math.round(widthCm * densityHorizontal) *
    Math.round(heightCm * densityVertical);

  // Общий расход нити в метрах
  const totalYarnLength = totalStitches * yarnConsumptionPerStitch;

  // Количество мотков (округление в большую сторону)
  const yarnBalls = Math.ceil(totalYarnLength / yarnLengthPerBall);

  return yarnBalls;
}

export default function YarnCalculatorScreen() {
  const [widthCm, setWidthCm] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [densityHorizontal, setDensityHorizontal] = useState('');
  const [densityVertical, setDensityVertical] = useState('');
  const [yarnLengthPerBall, setYarnLengthPerBall] = useState('');
  const [yarnConsumptionPerStitch, setYarnConsumptionPerStitch] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    if (
      isNaN(Number(widthCm)) ||
      isNaN(Number(heightCm)) ||
      isNaN(Number(densityHorizontal)) ||
      isNaN(Number(densityVertical)) ||
      isNaN(Number(yarnLengthPerBall)) ||
      isNaN(Number(yarnConsumptionPerStitch)) ||
      Number(widthCm) <= 0 ||
      Number(heightCm) <= 0 ||
      Number(densityHorizontal) <= 0 ||
      Number(densityVertical) <= 0 ||
      Number(yarnLengthPerBall) <= 0 ||
      Number(yarnConsumptionPerStitch) <= 0
    ) {
      Alert.alert('Ошибка', 'Все поля должны содержать положительные числа.');
      return;
    }

    const yarnBalls = calculateYarnBalls({
      widthCm: Number(widthCm),
      heightCm: Number(heightCm),
      densityHorizontal: Number(densityHorizontal),
      densityVertical: Number(densityVertical),
      yarnLengthPerBall: Number(yarnLengthPerBall),
      yarnConsumptionPerStitch: Number(yarnConsumptionPerStitch),
    });

    setResult(`Необходимое количество мотков пряжи: ${yarnBalls}`);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View>
          <TextInput
            placeholder="Ширина изделия (см)"
            value={widthCm}
            onChangeText={(text) => setWidthCm(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Высота изделия (см)"
            value={heightCm}
            onChangeText={(text) => setHeightCm(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Плотность вязания по горизонтали (петли/см)"
            value={densityHorizontal}
            onChangeText={(text) => setDensityHorizontal(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Плотность вязания по вертикали (ряды/см)"
            value={densityVertical}
            onChangeText={(text) => setDensityVertical(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Длина нити в мотке (м)"
            value={yarnLengthPerBall}
            onChangeText={(text) => setYarnLengthPerBall(text.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Расход нити на 1 петлю (м)"
            value={yarnConsumptionPerStitch}
            onChangeText={(text) => setYarnConsumptionPerStitch(text.replace(/[^0-9.]/g, ''))}
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
