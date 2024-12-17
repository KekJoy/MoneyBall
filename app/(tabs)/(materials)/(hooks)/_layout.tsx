import {Stack} from "expo-router";
import React from "react";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="hooks" options={{ headerTitle: 'Крючки' }}/>
      <Stack.Screen name="add" options={{ headerTitle: 'Добавление крючка' }} />
    </Stack>
  )

}
export default Layout;