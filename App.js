import * as Font from 'expo-font';
import { View } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import RegistrationScreen from './Screens/RegistrationScreen';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourseViewScreen from "./Screens/MainScreen/CourseViewScreen";


import HomeScreen from "./Screens/MainScreen/HomeScreen";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();


export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  // const loadApplication = async () => {
  //   await Font.loadAsync({
  //               'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  //               'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  //             }
  //   )
  // }
  //
  // if (!isReady) {
  //   return (
  //       <AppLoading startAsync={loadApplication} onFinish={()=> setIsReady(true)}/>
  //   )
  // }
  return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
           <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
          <Stack.Screen
            options={{ headerShown: false }}
            name='Home'
            component={HomeScreen}
          />
             <Stack.Screen
                 options={{ headerShown: false }}
                 name='Course'
                 component={CourseViewScreen}
             />

        </Stack.Navigator>

        </NavigationContainer>
      </View>
  );
}
