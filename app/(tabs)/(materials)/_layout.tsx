import {Stack} from "expo-router";
import React from "react";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="materials" options={{ headerShown: false }} />
      <Stack.Screen name="add" options={{ headerTitle: 'Добавление' }} />
      <Stack.Screen name="detail" options={{ headerTitle: 'Информация' }} />
    </Stack>
  )

}
export default Layout;