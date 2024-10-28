import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './Styles/AppStyle';
import WeeklyMenu from './Weeklymenu';
import SavedRecipes from './SavedRecipes';
import Menu from './Menu';
import Recipes from './Recipes';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [activeView, setActiveView] = useState('home');
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const renderActiveView = () => {
    switch (activeView) {
      case 'weeklyMenu':
        return <WeeklyMenu />;
      case 'savedRecipes':
        return <SavedRecipes />;
      case 'menu':
        return (
          <ErrorBoundary>
            <Menu setActiveView={setActiveView} setCurrentRecipe={setCurrentRecipe} />
          </ErrorBoundary>
        );
      case 'recipes':
        return (
          <ErrorBoundary>
            <Recipes recipe={currentRecipe} setActiveView={setActiveView} />
          </ErrorBoundary>
        );
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Foodplanner</Text>
        <TouchableOpacity style={styles.box} onPress={() => setActiveView('savedRecipes')}>
          <Text style={styles.text}>Saved Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => setActiveView('weeklyMenu')}>
          <Text style={styles.text}>Weekly Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => setActiveView('menu')}>
          <Text style={styles.text}>Menus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://th.bing.com/th/id/OIP.oOmwtQwy26KXIh4LjWJdgwHaE5?rs=1&pid=ImgDetMain' }}
      style={styles.background}
      resizeMode="cover"
    >
      {renderActiveView()}
    </ImageBackground>
  );
};

export default App;
