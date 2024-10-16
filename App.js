import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  useEffect(() => {
    console.log('App has mounted');
  }, []);

  return (
    <View style={styles.background}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Ensure text is inside Text component */}
        <View style={styles.box}>
          <Text style={styles.text}>Recipe</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Weekly Menu</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Box 3</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Box 4</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#90EE90', // Light green color
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;


