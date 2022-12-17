import { ThemeProvider } from 'styled-components/native';
import themes from './src/themes';
import {useFonts, Roboto_700Bold, Roboto_400Regular} from '@expo-google-fonts/roboto';
import Loading from '@components/Loading';
import { StatusBar } from 'react-native';
import { Routes } from '@routes/index';

export default function App() {
  const [ fontsLoaded ]= useFonts({
    Roboto_700Bold,
    Roboto_400Regular
  })

  return (
    <ThemeProvider theme={themes}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}

