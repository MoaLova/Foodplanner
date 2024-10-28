import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground } from 'react-native';
import styles from './Styles/AppStyle';
import WeeklyMenu from './Weeklymenu';
import SavedRecipes from './SavedRecipes';
import Menu from './Menu';
import Recipes from './Recipes'
import HomeScreen from './HomeScreen'; // Import HomeScreen
import ErrorBoundary from './ErrorBoundary';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ImageBackground
        source={{ uri: 'https://th.bing.com/th/id/OIP.oOmwtQwy26KXIh4LjWJdgwHaE5?rs=1&pid=ImgDetMain' }}
        style={styles.background}
        resizeMode="cover"
      >
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WeeklyMenu" component={WeeklyMenu} />
          <Stack.Screen name="SavedRecipes" component={SavedRecipes} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Recipes" component={Recipes} />
        </Stack.Navigator>
      </ImageBackground>
    </NavigationContainer>
  );
};

export default App;
