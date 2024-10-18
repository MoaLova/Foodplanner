import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WeeklyMenu from './Weeklymenu'; // Make sure the path is correct

const App = () => { 
  const [activeView, setActiveView] = useState('home'); // Håller reda på aktiv vy

  useEffect(() => {
    console.log('App has mounted');
  }, []);

  // Huvudvyn (Home)
  const renderHome = () => (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Foodplanner</Text>
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.text}>Recipe</Text>
        </View>
        {/* Gör Weekly Menu-boxen till en knapp */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('weeklyMenu')}
        >
          <Text style={styles.text}>Weekly Menu</Text>
        </TouchableOpacity>
        <View style={styles.box}>
          <Text style={styles.text}>List</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Saved</Text>
        </View>
      </View>
    </View>
  );

  // Rendera antingen huvudvyn eller veckomenyn beroende på aktiv vy
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Bakgrundsbild */}
      <ImageBackground
        source={{ uri: 'https://th.bing.com/th/id/OIP.oOmwtQwy26KXIh4LjWJdgwHaE5?rs=1&pid=ImgDetMain' }} // Bildens URL
        style={styles.background}
        resizeMode="cover"
      >
        {activeView === 'home' ? renderHome() : <WeeklyMenu onBack={() => setActiveView('home')} />}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Genomskinlig bakgrund
    justifyContent: 'flex-start',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 80, // Extra avstånd till toppen
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
    color: '#000',
  },
});

export default App;
