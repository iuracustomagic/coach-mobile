import { View, StyleSheet, Text, Image, FlatList, SafeAreaView } from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from '@react-navigation/native';
import {GetCourseInfo} from "../../API/api";
import {currentUrl} from "../../consts/consts";

export default function CoursesScreen() {

  const[courses, setCourses] = useState([])

  useEffect(() => {

    async function checker(){
      if (AsyncStorage.getItem('@login') && AsyncStorage.getItem('@pass')){

        const token = await AsyncStorage.getItem('@token');

        if(token) {
          const courseInfo = await GetCourseInfo(token)

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
      <SafeAreaView style={styles.content}>
        {courses ? <FlatList data={courses} keyExtractor={item => item.id} renderItem={({item}) => (
                <Link key={item.id} to={{ screen: 'Course', params: { id: item.id } }}>
                  <View style={styles.courseItem}>
                    <Image style={styles.image} source={{uri: currentUrl + '/' + item.banner.replace("public", "storage")}} />
                    <Text style={styles.courseTitle}>{item.name}</Text>
                  </View>
                </Link>
            )}/>
            : <Text style={styles.lessonTitle}>У вас нет доступных курсов</Text>
        }

      </SafeAreaView>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#e2eed6'
  },
  courseItem: {
    marginHorizontal: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingBottom: 10,
  },
  image: {
    width: 220,
    height: 180,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  courseTitle: {
    width: 220,
    fontSize: 20,
    textAlign: 'center',
  },
});
