import {Stack} from "expo-router";
import React from "react";
const Layout = () => {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="calc" options={{ headerShown: false }} />
      <Stack.Screen name="concave_curve" options={{ headerShown: true, headerTitle: 'Расчет вогнутой кривой'}} />
      <Stack.Screen name="convex_curve" options={{ headerShown: true, headerTitle: 'Расчет выпуклой кривой' }} />
      <Stack.Screen name="materials_calc" options={{ headerShown: true, headerTitle: 'Расчет материалов для изделия' }} />
    </Stack>
  )

}
export default Layout;