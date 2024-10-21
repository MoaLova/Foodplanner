import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from './Styles/AppStyle';
import WeeklyMenu from './Weeklymenu'; // Correct path to your components
import Recipes from './Recipes';  // Ensure this is the correct import for Recipes
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

        {/* Recipes button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('recipes')} // Corrected to 'recipes'
        >
          <Text style={styles.text}>Recipes</Text>
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
      case 'recipes': // Corrected to 'recipes'
        return <Recipes />;
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
        {/* Conditionally render home, weekly menu, or recipes */}
        {activeView === 'home' ? (
          renderHome()
        ) : activeView === 'weeklyMenu' ? (
          <WeeklyMenu onBack={() => setActiveView('home')} />
        ) : activeView === 'menu' ? ( // Add this check for the 'menu' view
          <Menu onBack={() => setActiveView('home')} /> // Render Menu component
        ) : (
          <Recipes onBack={() => setActiveView('home')} /> // Add rendering for Recipes component
        )}
      </ImageBackground>
    </View>
  );
};

export default App;
