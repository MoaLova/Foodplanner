import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import WeeklyMenu from './Weeklymenu'; // Make sure the file name matches
import Recepies from './Recepies'; // Import the Recepies component

const App = () => {
  const [activeView, setActiveView] = useState('home'); // Track the active view


  useEffect(() => {
    console.log('App has mounted');
  }, []);

  // Main Home View
  const renderHome = () => (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Foodplanner</Text>

        {/* Make Recepies button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('recepies')} // Set active view to 'recepies'
        >
          <Text style={styles.text}>Reccepies</Text>
        </TouchableOpacity>

        {/* Make Weekly Menu button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('weeklyMenu')} // Set active view to 'weeklyMenu'
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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Background image */}
      <ImageBackground
        source={{ uri: 'https://th.bing.com/th/id/OIP.oOmwtQwy26KXIh4LjWJdgwHaE5?rs=1&pid=ImgDetMain' }} // URL for background image
        style={styles.background}
        resizeMode="cover"
      >
        {/* Conditionally render home, weekly menu, or recepies */}
        {activeView === 'home' ? (
          renderHome()
        ) : activeView === 'weeklyMenu' ? (
          <WeeklyMenu onBack={() => setActiveView('home')} />
        ) : (
          <Recepies onBack={() => setActiveView('home')} /> // Add rendering for Recepies component
        )}
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

    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    justifyContent: 'flex-start', // Push content up

  },
  headerContainer: {
    padding: 20,
    paddingTop: 80, // Extra padding at the top
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  box: {
    width: 150,
    height: 150,

    backgroundColor: 'white', // White boxes
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
    color: '#000', // Black text

  },
});

export default App;