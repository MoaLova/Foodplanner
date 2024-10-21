import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import WeeklyMenu from './Weeklymenu'; // Correct path to your components
import Recepies from './Recepies';
import Menu from './Menu';  // Ensure this matches the file name and path


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

        {/* Recepies button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('recepies')} // Set active view to 'recepies'
        >
          <Text style={styles.text}>Recepies</Text>
        </TouchableOpacity>

        {/* Weekly Menu button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('weeklyMenu')} // Set active view to 'weeklyMenu'
        >
          <Text style={styles.text}>Weekly Menu</Text>
        </TouchableOpacity>

        {/* Menus button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('menu')} // Set active view to 'menus'
        >
          <Text style={styles.text}>Menus</Text>
        </TouchableOpacity>

      
      </View>
    </View>
  );

  // Conditional Rendering of the Active View
  const renderActiveView = () => {
    switch (activeView) {
      case 'recepies':
        return <Recepies />;
      case 'weeklyMenu':
        return <WeeklyMenu />;
      case 'menu':
        return <Menu />; // Ensure Menu is rendered when 'menus' is selected
      default:
        return renderHome(); // Default to home view
    }
  };

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
) : activeView === 'menu' ? ( // Add this check for the 'menu' view
  <Menu onBack={() => setActiveView('home')} /> // Render Menu component
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