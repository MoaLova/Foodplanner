import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import WeeklyMenu from './Weeklymenu'; // Make sure the file name matches
import Recepies from './Recepies'; // Import the Recepies component


const Menu = () => {
  const [recipes, setRecipes] = useState([]); // State för att hålla recepten
  const [loading, setLoading] = useState(true); // State för att hantera laddning



  useEffect(() => {
    console.log('App has mounted');
  }, []);

  // Main Home View
  const renderHome = () => (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Foodplanner</Text>

  // Dummy data för recept
  const dummyRecipes = [
    {
      id: 1,
      name: 'Dummy Recipe 1',
      image: 'https://via.placeholder.com/80', // Placeholder image
      time: 30,
      allergy: 'Nuts',
      mealType: 'Lunch',
    },
    {
      id: 2,
      name: 'Dummy Recipe 2',
      image: 'https://via.placeholder.com/80', // Placeholder image
      time: 45,
      allergy: 'Dairy',
      mealType: 'Dinner',
    },
    {
      id: 3,
      name: 'Dummy Recipe 3',
      image: 'https://via.placeholder.com/80', // Placeholder image
      time: 20,
      allergy: 'Gluten',
      mealType: 'Breakfast',
    },
  ];


  useEffect(() => {
    // Simulera laddning och sätt dummy-data
    const loadData = () => {
      setTimeout(() => {
        setRecipes(dummyRecipes);
        setLoading(false);
      }, 1000); // Simulera en fördröjning på 1 sekund
    };

    loadData();
  }, []);

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.name}</Text>
        <Text style={styles.recipeDetails}>{item.time} min</Text>
        <Text style={styles.recipeDetails}>{item.allergy}</Text>
        <Text style={styles.recipeDetails}>{item.mealType}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recepies</Text>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Sök recept..." 
        />
        <Button title="Filter" onPress={() => { /* Lägg till filter-logik här */ }} />
      </View>

      {loading ? (
        <Text>Laddar...</Text> // Visa laddningsmeddelande
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()} // Se till att varje kort har en unik nyckel
        />
      )}
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
    justifyContent: 'flex-start', // Ändra till flex-start för att placera innehåll högst upp
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Valfri bakgrundsfärg
    padding: 20, // Lägg till padding
  },
  heading: {
    fontSize: 32, // Storlek på huvudrubriken
    fontWeight: 'bold',
    color: 'black', // Färg på rubriken
    marginBottom: 20, // Marginal under rubriken
  },

  box: {
    width: 150,
    height: 150,
    backgroundColor: 'white', // White boxes
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 18,
    justifyContent: 'center',

  searchContainer: {
    flexDirection: 'row', // Gör så att sökfält och knapp är i rad

    alignItems: 'center',
    marginBottom: 20, // Marginal under sökfältet
  },
  searchInput: {
    flex: 1, // Gör så att sökfältet tar upp så mycket plats som möjligt
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10, // Padding för sökfältet
    marginRight: 10, // Marginal till höger om sökfältet
  },
  recipeCard: {
    flexDirection: 'row', // Gör så att bilden och texten ligger i rad
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%', // Gör rektanglarna bredare
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Lägg till skugga
  },
  recipeImage: {
    width: 80, // Bredd på bilden
    height: 80, // Höjd på bilden
    borderRadius: 10,
    marginRight: 15,
  },
  recipeInfo: {
    flex: 1, // Gör så att info tar upp resten av platsen
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black text


  },
  recipeDetails: {
    fontSize: 14,
    color: '#666',

  },
});

export default Menu;
