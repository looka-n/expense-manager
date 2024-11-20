import { SafeAreaView, StyleSheet, Text, View, Dimensions, ScrollView, Button } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from './.FirebaseConfig';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const connection = initializeApp(firebaseConfig);
const db = getFirestore(connection);

const CategoryCard = () => {
  const handlePress = async () => {
    try {
      const docidx = await addDoc(collection(db, "categories"), {
        date: new Date(),
        title: "Sample Title",
        category: "Sample Category",
        expense: "Sample Expense",
        description: "Sample Description",
      });
      console.log("Document written with ID: ", docidx.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <View style={styles.view_category}>
      <Text style={styles.text_title}>Category</Text>
      <View style={styles.button_container}>
        <Button title="More ▶" onPress={handlePress} color="#ffffff"/>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.view_base}>
      <View style={styles.view_header}>
        <SafeAreaView>
          <Text style={styles.text_title}>Summary</Text>
          <Button title="Press Me"/>
        </SafeAreaView>
      </View>
      <ScrollView contentContainerStyle={styles.view_content}>
        <CategoryCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view_base: {
    backgroundColor: '#1a1a1a',
    flex: 1,
  },
  text_title: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  view_header: {
    backgroundColor: '#262626',
    height: DEVICE_HEIGHT * 0.2,
    marginBottom: 10,
    padding: 10,
    paddingTop: 60,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    zIndex: 1,
  },
  view_content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  view_category: {
    backgroundColor: '#262626',
    borderRadius: 10,
    height: DEVICE_HEIGHT * 0.2,
    marginTop: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    width: DEVICE_WIDTH * 0.98,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button_container: {
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
});