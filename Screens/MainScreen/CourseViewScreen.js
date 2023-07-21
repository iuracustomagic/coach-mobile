import {View, StyleSheet, Text, Image, FlatList, SafeAreaView } from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetLessonsList} from "../../API/api";
import {Link} from "@react-navigation/native";
import {currentUrl} from "../../consts/consts";
import { AntDesign } from '@expo/vector-icons';

export default function CourseViewScreen({route}) {

  const[lessons, setLessons] = useState([])
  const[lessonName, setLessonName] = useState('')
  const[courseId, setCourseId] = useState(route.params.id)

  useEffect(() => {

    setCourseId(route.params.id)

    async function checker(){

      console.log(route.params.id)
      // const courseId = route.params.id;

        const token = await AsyncStorage.getItem('@token');

        if(token) {
          const lessonsInfo = await GetLessonsList(token, courseId)

          setLessonName(lessonsInfo['name'])
          setLessons(lessonsInfo['lessons'])
        }

    }
    checker();

  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link to={{screen: 'Courses'}} style={styles.link}>
          <AntDesign name="back" size={24} color="black" />
        </Link>
        <Text style={styles.title}>{lessonName}</Text>

      </View>
      <SafeAreaView  style={styles.content}>
        {lessons ? <FlatList data={lessons} keyExtractor={item => item.id} renderItem={({item}) => (
                <Link key={item.id} to={{ screen: 'Course', params: { id: item.id } }}>
                  <View style={styles.lessonItem}>
                    <Image style={styles.image}
                           source={{uri: item.banner ? currentUrl + '/' + item.banner.replace("public", "storage") : 'https://place-hold.it/286x180?text=NO%20IMAGE'}} />
                    <Text style={styles.lessonTitle}>{item.name}</Text>
                  </View>
                </Link>
            )}/>
            : <Text style={styles.lessonTitle}>У вас нет доступных уроков</Text>
        }
        {/*{lessons ? lessons.map(lesson => (*/}
        {/*    <Link key={lesson.id} to={{ screen: 'Course', params: { id: lesson.id } }}>*/}
        {/*      <View style={styles.lessonItem}>*/}
        {/*        <Image style={styles.image}*/}
        {/*               source={{uri: lesson.banner ? currentUrl + '/' + lesson.banner.replace("public", "storage") : 'https://place-hold.it/286x180?text=NO%20IMAGE'}} />*/}
        {/*        <Text style={styles.lessonTitle}>{lesson.name}</Text>*/}
        {/*      </View>*/}
        {/*    </Link>*/}
        {/*)): <Text style={styles.lessonTitle}>У вас нет доступных уроков</Text>*/}


      </SafeAreaView >
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
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingTop: 30,
    backgroundColor: '#f6d1d1'
  },
  link: {
    flex: 0.2,
    paddingLeft: 10,
  },
  title: {
    flex: 0.8,
    fontSize: 20,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
  },
  content: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

    backgroundColor: '#e2eed6'
  },
  lessonItem: {
    marginHorizontal: 15,
    paddingBottom: 10,
  },
  image: {
    width: 220,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  lessonTitle: {
    width: 220,
    fontSize: 16,
    textAlign: 'center',
  },
});
