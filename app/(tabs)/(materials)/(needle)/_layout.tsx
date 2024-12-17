import {Stack} from "expo-router";
import React from "react";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="needle" options={{ headerTitle: 'Спицы' }}/>
      <Stack.Screen name="add" options={{ headerTitle: 'Добавление спицы' }} />
    </Stack>
  )

}
export default Layout;