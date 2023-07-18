import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GetCourseInfo} from "../../API/api";
import {currentUrl} from "../../consts/consts";

export default function CoursesScreen() {

  const[courses, setCourses] = useState([])

  useEffect(() => {

    async function checker(){
      if (AsyncStorage.getItem('@login') && AsyncStorage.getItem('@pass')){

        const token = await AsyncStorage.getItem('@token');
        console.log('Token in Course screen', token)
        //if (login && pass)

        if(token) {
          const courseInfo = await GetCourseInfo(token)
          console.log(courseInfo['courses'])
          setCourses(courseInfo['courses'])
        }
      }
    }
    checker();

  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мои курсы</Text>
      </View>
      <View style={styles.content}>
      {courses ? courses.map(course => (
            <View key={course.id} style={styles.courseItem}>
              <Image style={styles.image} source={{uri: currentUrl + '/' + course.banner.replace("public", "storage")}} />
              <Text style={styles.courseTitle}>{course.name}</Text>
            </View>
      )): <Text style={styles.courseTitle}>У вас нет доступных курсов</Text>

      }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f6d1d1'
  },
  title: {
    fontSize: 22,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,

    backgroundColor: '#e2eed6'
  },
  courseItem: {
    // justifyContent: 'center',
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  courseTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
});
