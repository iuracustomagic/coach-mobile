import {View, StyleSheet, Text, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetReportInfo} from "../../API/api";
import {currentUrl} from "../../consts/consts";

export default function ReportScreen() {
  const[reports, setReports] = useState([])

  useEffect(() => {

    async function checker(){

        const token = await AsyncStorage.getItem('@token');

        if(token) {
          const reportsInfo = await GetReportInfo(token)

          setReports(reportsInfo['reports'])
          console.log(reports)
        }
      }

    checker();

  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Отчеты</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.tableHeader}>
          <View style={styles.headerBlock1}>
            <Text style={styles.headerText}>Курс</Text>
          </View>
          <View style={styles.headerBlock2}>
            <Text style={styles.headerText}>Урок</Text>
          </View>
          <View style={styles.headerBlock3}>
            <Text style={styles.headerText}>Ср. оценка</Text>
          </View>
        </View>
        <View style={styles.tableBody}>
        {reports ? reports.map(report => (
            <View key={report.id} style={styles.reportItem}>
              <View style={styles.reportColumn1}>
                <Text style={styles.reportTitle}>{report.course_id}</Text>
              </View>
              <View style={styles.reportColumn2}>
                <Text style={styles.reportTitle}>{report.lesson_id}</Text>
              </View>
              <View style={styles.reportColumn3}>
                <Text style={styles.reportTitle}>{report.avg_mark}</Text>
              </View>

            </View>

        )): <Text style={styles.reportTitle}>У вас нет доступных курсов</Text>
        }
        </View>
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

    // padding: 20,
    backgroundColor: '#fff'
  },
  tableHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'stretch',
    // alignItems: 'center',
    // padding: 10,
    backgroundColor: '#efefe3'
  },
  headerBlock1: {
    flex: 0.3,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#807d7d',
  },
  headerBlock2: {
    flex: 0.5,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#807d7d',
  },
  headerBlock3: {
    flex: 0.2,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#807d7d',
  },
  headerText: {
    fontSize: 18,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
  },
  tableBody: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    // paddingLeft: 10,
    // justifyContent: 'space-between',
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop: 10,
    // paddingBottom: 10,
    // borderWidth: 1,
    // borderColor: '#807d7d',
  },
  reportColumn1: {
    flex: 0.3,
    padding: 10,
    borderWidth: 1,
    borderColor: '#807d7d',
  },
  reportColumn2: {
    flex: 0.5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#807d7d',
  },
  reportColumn3: {
    flex: 0.2,
    padding: 10,
    borderWidth: 1,
    borderColor: '#807d7d',
  },
  reportTitle: {

  },
});
