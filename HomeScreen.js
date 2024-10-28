import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/AppStyle';

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

export default HomeScreen;
