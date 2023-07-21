import {View, StyleSheet, Text, Keyboard} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
import {Auth} from "../../API/auth";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ReportScreen from './ReportScreen';
import CoursesScreen from './CoursesScreen';
import ProfileScreen from './ProfileScreen';
import { MaterialCommunityIcons, Feather, AntDesign  } from '@expo/vector-icons';
import Toast from "react-native-simple-toast";



const MainTab = createBottomTabNavigator();

export default function HomeScreen() {

  // const login1 = await AsyncStorage.getItem('@login');
  // console.log(login1)
  // const pass1 = await AsyncStorage.getItem('@pass');
  // console.log(pass1)
  useEffect(() => {

    async function checker(){
      if (AsyncStorage.getItem('@login') && AsyncStorage.getItem('@pass')){

        const login1 = await AsyncStorage.getItem('@login');
        // console.log(login1)
        const pass1 = await AsyncStorage.getItem('@pass');
        // console.log(pass1)
        const token = await AsyncStorage.getItem('@token');
        // console.log(token)
      //     const tryAuth = await Auth(login1, pass1);
      //     console.log(3)
      //     if (tryAuth.status == 'ok'){
      //         // console.log(token)
      //         //if (login && pass)
      //
      //         // if(token) {
      //         //     const userInfo = await GetUserInfo(token)
      //         //     console.log(userInfo)
      //         // }
      //
      //     }
      //     else
      //         Toast.show('Проблема при авторизации');
      //
      }
    }
    checker();

  }, []);

  return (
    <View style={styles.container}>


        <MainTab.Navigator  initialRouteName="Profile">
          <MainTab.Screen
              options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color }) => (
                    <AntDesign name="areachart" size={size} color={color} />
                ),
              }}
              name='Reports'
              component={ReportScreen}
          />
          <MainTab.Screen
              options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color }) => (
                    <AntDesign name="book" size={size} color={color} />
                ),
              }}
              name='Courses'
              component={CoursesScreen}
          />
          <MainTab.Screen
              options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color }) => <Feather name='user' size={size} color={color} />,
              }}
              name='Profile'
              component={ProfileScreen}
          />
        </MainTab.Navigator>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
