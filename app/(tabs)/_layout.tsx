import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Stack, Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import Index from "@/app/(tabs)/materials";
import ProjectsScreen from "@/app/(tabs)/projectsScreen";
import CalculatorScreen from "@/app/(tabs)/calculatorScreen";
import RowCounterScreen from "@/app/(tabs)/rowCounter";

// Импортируем экраны



export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // скрываем заголовки на вкладках
        tabBarStyle: {
          backgroundColor: '#fff', // цвет фона панели вкладок
        },
        tabBarActiveTintColor: 'tomato', // активный цвет
        tabBarInactiveTintColor: 'gray', // неактивный цвет
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="projectsScreen"
        options={{
          tabBarLabel: 'Проекты',
          tabBarIcon: ({ color }) => <Ionicons name="briefcase-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calculatorScreen"
        options={{
          tabBarLabel: 'Калькуляторы',
          tabBarIcon: ({ color }) => <Ionicons name="calculator-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(materials)"
        options={{
          headerShown: false,
          tabBarLabel: 'Материалы',
          tabBarIcon: ({ color }) => <Ionicons name="color-palette-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rowCounter"
        options={{
          tabBarLabel: 'Счетчик рядов',
          tabBarIcon: ({ color }) => <Ionicons name="stats-chart-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
