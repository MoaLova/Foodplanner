import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './Styles/AppStyle';
import WeeklyMenu from './Weeklymenu';
import SavedRecipes from './SavedRecipes';
import Menu from './Menu';
import Recipes from './Recipes';
import ErrorBoundary from './ErrorBoundary';

const Stack = createNativeStackNavigator();

const App = () => {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [activeView, setActiveView] = useState('');

  return (
    <NavigationContainer>
      <ImageBackground
        source={{ uri: 'https://th.bing.com/th/id/OIP.oOmwtQwy26KXIh4LjWJdgwHaE5?rs=1&pid=ImgDetMain' }}
        style={styles.background}
        resizeMode="cover"
      >
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="WeeklyMenu" component={WeeklyMenu} />
          <Stack.Screen name="SavedRecipes">
            {props => (
              <SavedRecipes {...props} setCurrentRecipe={setCurrentRecipe} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Menu">
            {props => (
              <Menu 
                {...props} 
                setCurrentRecipe={setCurrentRecipe} 
                setActiveView={setActiveView}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Recipes">
            {props => (
              <Recipes {...props} recipe={currentRecipe} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </ImageBackground>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => (
  <View style={styles.overlay}>
    <View style={styles.headerContainer}>
      <Text style={styles.heading}>Foodplanner</Text>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('SavedRecipes')}>
        <Text style={styles.text}>Saved Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('WeeklyMenu')}>
        <Text style={styles.text}>Weekly Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.text}>Menus</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default App;
