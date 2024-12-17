import {Stack} from "expo-router";
import React from "react";
const Layout = () => {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="projects" options={{ headerShown: false }} />
      <Stack.Screen name="add" options={{ headerShown: true, headerTitle: 'Добавление проекта' }} />
      <Stack.Screen name="[id]" options={{ headerShown: true, headerTitle: 'Детали проекта' }} />

    </Stack>
  )

}
export default Layout;