import { View, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Отчеты</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flex: 0.3,
    flexDirection: 'row',
    paddingBottom: 40,
    paddingTop: 45,
  },
  title: {
    fontSize: 17,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
  },

});
