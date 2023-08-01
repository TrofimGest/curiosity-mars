import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';

export {ErrorBoundary} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    regular: require('../../assets/fonts/Dosis-Regular.ttf'),
    extralight: require('../../assets/fonts/Dosis-ExtraLight.ttf'),
    semibold: require('../../assets/fonts/Dosis-SemiBold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return <Stack screenOptions={{headerShown: false}} />;
}
