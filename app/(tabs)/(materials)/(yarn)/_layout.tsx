import {Stack} from "expo-router";
import React from "react";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="yarn" options={{ headerTitle: 'Пряжа' }}/>
      <Stack.Screen name="add" options={{ headerTitle: 'Добавление пряжи' }} />
    </Stack>
  )

}
export default Layout;