import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
const StartLayout = () => {

    
  const colorScheme = useColorScheme();



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index"  options={{ headerShown: false }} />
        <Stack.Screen name="lp"  options={{ headerShown: false }} />

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default StartLayout;