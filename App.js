import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  useEffect(() => {
    console.log('App has mounted');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Bakgrundsbild */}
      <ImageBackground
        source={{ uri: 'https://th.bing.com/th/id/OIP.oOmwtQwy26KXIh4LjWJdgwHaE5?rs=1&pid=ImgDetMain' }} // Bildens URL
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>Foodplanner</Text>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Text style={styles.text}>Recipe</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>Weekly Menu</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>List</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>Saved</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lägger en genomskinlig overlay för att göra texten mer läsbar
    justifyContent: 'flex-start', // Flyttar innehållet högre upp
  },
  headerContainer: {
    padding: 20,
    paddingTop: 80, // Lägg till extra avstånd till toppen om nödvändigt
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  boxContainer: {
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
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular'
  },
});

export default App;
