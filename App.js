import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from './Styles/AppStyle';  // Import the styles for your app
import WeeklyMenu from './Weeklymenu';  // Correct path to your WeeklyMenu component
import SavedRecipes from './SavedRecipes';  // Correct import for SavedRecipes component
import Menu from './Menu';  // Correct import for Menu component

const App = () => {
  const [activeView, setActiveView] = useState('home');  // Track which view is active

  useEffect(() => {
    console.log('App has mounted');
  }, []);

  // Main Home View
  const renderHome = () => (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Foodplanner</Text>

        {/* Saved Recipes button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('savedRecipes')}  // Change view to 'savedRecipes'
        >
          <Text style={styles.text}>Saved Recipes</Text>
        </TouchableOpacity>

        {/* Weekly Menu button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('weeklyMenu')}  // Set active view to 'weeklyMenu'
        >
          <Text style={styles.text}>Weekly Menu</Text>
        </TouchableOpacity>

        {/* Menus button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setActiveView('menu')}  // Set active view to 'menu'
        >
          <Text style={styles.text}>Menus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Conditional Rendering of the Active View
  const renderActiveView = () => {
    switch (activeView) {
      case 'savedRecipes':  // When 'savedRecipes' is active
        return <SavedRecipes onBack={() => setActiveView('home')} />;  // Render SavedRecipes component
      case 'weeklyMenu':  // When 'weeklyMenu' is active
        return <WeeklyMenu onBack={() => setActiveView('home')} />;  // Render WeeklyMenu component
      case 'menu':  // When 'menu' is active
        return <Menu onBack={() => setActiveView('home')} />;  // Render Menu component
      default:  // Default to home view
        return renderHome();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Background image */}
      <ImageBackground
        source={{ uri: 'https://th.bing.com/th/id/OIP.oOmwtQwy26KXIh4LjWJdgwHaE5?rs=1&pid=ImgDetMain' }}  // Background image URL
        style={styles.background}
        resizeMode="cover"
      >
        {/* Conditionally render the home, weekly menu, saved recipes, or menu */}
        {renderActiveView()}
      </ImageBackground>
    </View>
  );
};

export default App;
