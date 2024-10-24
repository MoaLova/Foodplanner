import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './Styles/AppStyle';  // Import the styles for your app
import WeeklyMenu from './Weeklymenu';  // Correct path to your WeeklyMenu component
import SavedRecipes from './SavedRecipes';  // Correct import for SavedRecipes component
import Menu from './Menu';  // Correct import for Menu component

const HomeScreen = ({ navigation }) => {
  const [activeView, setActiveView] = useState('home');  // Track which view is active

  useEffect(() => {
    console.log('HomeScreen has mounted');
  }, []);

  // Main Home View
  const renderHome = () => (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Foodplanner</Text>

        {/* Saved Recipes button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('SavedRecipes')}  // Navigate to SavedRecipes screen
        >
          <Text style={styles.text}>Saved Recipes</Text>
        </TouchableOpacity>

        {/* Weekly Menu button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('WeeklyMenu')}  // Navigate to WeeklyMenu screen
        >
          <Text style={styles.text}>Weekly Menu</Text>
        </TouchableOpacity>

        {/* Menus button */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Menu')}  // Navigate to Menu screen
        >
          <Text style={styles.text}>Menus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background image */}
      <ImageBackground
        source={{ uri: 'https://th.bing.com/th/id/OIP.oOmwtQwy26KXIh4LjWJdgwHaE5?rs=1&pid=ImgDetMain' }}  // Background image URL
        style={styles.background}
        resizeMode="cover"
      >
        {renderHome()}
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
