import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useEffect } from 'react';
import 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Platform, SafeAreaView, StyleSheet, StatusBar as RNStatusBar} from "react-native";

import {SQLiteDatabase, SQLiteProvider, useSQLiteContext} from "expo-sqlite";
import * as Sharing from 'expo-sharing';
import * as SQLite from "expo-sqlite";



async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 4
  // @ts-ignore
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  console.log(currentDbVersion)
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 3) {
    console.log('here')
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS yarns (id INTEGER PRIMARY KEY AUTOINCREMENT, color TEXT, composition TEXT, thickness REAL, maker TEXT);
CREATE TABLE IF NOT EXISTS needle (id INTEGER PRIMARY KEY AUTOINCREMENT, thickness REAL, maker TEXT, type TEXT);
CREATE TABLE IF NOT EXISTS hook (id INTEGER PRIMARY KEY AUTOINCREMENT, thickness REAL, maker TEXT);
CREATE TABLE IF NOT EXISTS project (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, materials TEXT, schema TEXT, photo TEXT);
`);
    currentDbVersion = 4;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}




// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <SQLiteProvider databaseName="materials.db" onInit={migrateDbIfNeeded}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  );
}

