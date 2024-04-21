import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';


export default function Categories({ navigation }) {
  const [CategoryList, setCategoryList] = useState([]);
  const isFocused = useIsFocused();

  const loadCategory = async () => {
    try {
      const url = 'https://fakestoreapi.com/products/categories'
      const res = await fetch(url)
      const data = await res.json();
      setCategoryList(data);
      // console.log("data", data);
    }
    catch (e) {
      console.error('error fetch address ', e)
      Alert.alert("Error", e?.message ?? "unknown error ",
        [{ text: 'OK', }]);
    }
    finally {
      console.log('after fetch address')

    }

  }
  const onProducts = (category) => {
    navigation.navigate('ProductList', { category })
  }
  useEffect(() => {
    if (isFocused) {
      loadCategory();
    }
  }, [isFocused]);
  return (

    <View style={styles.container}>
      <View style={styles.Title}>
        <Text style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 5, fontSize: 35, fontWeight: '800' }}> Categories</Text>
      </View>
      <View style={styles.Inner}>
        <FlatList
          data={CategoryList}
          renderItem={({ item }) => (
            <View style={{ margin: 20 }}>
              <Button title={item} onPress={() => onProducts(item)} color="green" />
            </View>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>

  );

};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 110,
  },
  buttonSpacer: {
    width: 20,
  },
  Title: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'green',
    width: 300,
    alignSelf: 'center',
    margin: 20,

  },
  Inner: {
    flex: 9,

  }
});
