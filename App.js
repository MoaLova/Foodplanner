import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the screens
import HomeScreen from './Homescreen';
import WeeklyMenu from './Weeklymenu';
import SavedRecipes from './SavedRecipes';
import Menu from './Menu';
import Recipes from './Recipes'; // Import the Recipes screen

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        {/* Define the screens */}
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="WeeklyMenu" 
          component={WeeklyMenu} 
          options={{ title: 'Weekly Menu' }} 
        />
        <Stack.Screen 
          name="SavedRecipes" 
          component={SavedRecipes} 
          options={{ title: 'Saved Recipes' }} 
        />
        <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ title: 'Menu' }} 
        />
        <Stack.Screen 
          name="Recipes" 
          component={Recipes} 
          options={{ title: 'Recipe Details' }} // Add Recipes screen here
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
