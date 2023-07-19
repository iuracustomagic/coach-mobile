import { View, StyleSheet, Text, Image } from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GetUserInfo} from "../../API/api";
import { MaterialIcons } from '@expo/vector-icons';
import {LogOut} from "../../API/auth";
import Toast from "react-native-simple-toast";


export default function ProfileScreen({ navigation }) {

  const [name, setName] = useState('')
  const [courses, setCourses] = useState('')
  const [lessons, setLessons] = useState('')
  const [quizzes, setQuizzes] = useState('')

  useEffect(() => {

    async function checker(){
      if (AsyncStorage.getItem('@login') && AsyncStorage.getItem('@pass')){

        const login1 = await AsyncStorage.getItem('@login');
        // console.log(login1)
        const pass1 = await AsyncStorage.getItem('@pass');
        // console.log(pass1)
        const token = await AsyncStorage.getItem('@token');
        console.log('Token in Profile screen', token)
        //if (login && pass)

        if(token) {
          const userInfo = await GetUserInfo(token)
          console.log(userInfo)
          setName(userInfo["userName"])
          setCourses(userInfo["courses"])
          setLessons(userInfo["lessons"])
          setQuizzes(userInfo["quizzes"])

        }
      }
    }
    checker();

  }, []);
async function Logout() {
  const token = await AsyncStorage.getItem('@token');
  console.log(token)
  //if (login && pass)


    await AsyncStorage.setItem('@login', '');
    await AsyncStorage.setItem('@pass', '');
    await AsyncStorage.setItem('@token', '');
    navigation.navigate('Login');
    // const logout = await LogOut(token)
    // if (logout.status == "ok") {
    //
    //   navigation.navigate('Login');
    //
    // } else
    //   Toast.show('Что-то пошло не так...');

}
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.userName}>{name}</Text>
        <MaterialIcons style={styles.exitIcon} name='logout' size={26} color='black' onPress={Logout} />
      </View>
      <View style={styles.statisticContainer}>
        <View style={styles.courseContainer}>
          <Image
              source={require('../../assets/icons/book-icon.png') }
              style={{width: 120, height: 120}}
          />
          <Text style={styles.statisticText}>Курсов: {courses && courses['count']}</Text>
          <Text  style={styles.statisticText}>Курсов пройдено: {courses && courses['passed']}</Text>
        </View>
        <View style={styles.lessonContainer}>
          <Image
              source={require('../../assets/icons/lesson-icon.jpg') }
              style={{width: 120, height: 120}}
          />
          <Text style={styles.statisticText}>Уроков: {lessons && lessons['count']}</Text>
          <Text  style={styles.statisticText}>Уроков пройдено: {lessons && lessons['passed']}</Text>
        </View>
        <View style={styles.quizContainer}>
          <Image
            source={require('../../assets/icons/quiz-icon.jpg') }
            style={{width: 100, height: 100}}
        />
          <Text style={styles.statisticText}>Тестов пройдено: {quizzes && quizzes['passed']}</Text>
          <Text  style={styles.statisticText}>Средняя оценка: {quizzes && quizzes['mark']}</Text></View>
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6d1d1',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 30,
  },
  userName: {
fontSize: 22,
  },
  exitIcon: {

  },
  statisticContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 20

  },
  statisticText: {
    fontSize: 20,
    color: '#f5fffa',
  },
  courseContainer: {
    backgroundColor: '#1e90ff',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
   marginBottom: 20,
    borderRadius: 4,
    shadowColor: "white",
  },
  lessonContainer: {
    backgroundColor: '#00ced1',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 4,
    shadowColor: "white",
  },
  quizContainer: {
    backgroundColor: '#90ee90',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    shadowColor: "white",
  }
});
