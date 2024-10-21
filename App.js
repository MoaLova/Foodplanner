import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Menu = () => {
  const [recipes, setRecipes] = useState([]); // State for recipes
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    console.log('App has mounted');
  }, []);

  // Dummy recipe data
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
    // Simulate loading and set dummy data
    const loadData = () => {
      setTimeout(() => {
        setRecipes(dummyRecipes);
        setLoading(false);
      }, 1000); // Simulating a delay of 1 second
    };

    loadData();
  }, []);

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.name}</Text>
        <Text style={styles.recipeDetails}>{item.time} min</Text>
        <Text style={styles.recipeDetails}>Allergy: {item.allergy}</Text>
        <Text style={styles.recipeDetails}>Meal Type: {item.mealType}</Text>
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
        <Button title="Filter" onPress={() => { /* Add filter logic here */ }} />
      </View>

      {loading ? (
        <Text>Loading...</Text> // Display loading message
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()} // Ensure each card has a unique key
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 32, // Heading size
    fontWeight: 'bold',
    color: 'black', // Heading color
    marginBottom: 20, // Space below heading
  },
  searchContainer: {
    flexDirection: 'row', // Row layout for search field and button
    alignItems: 'center',
    marginBottom: 20, // Margin below search field
  },
  searchInput: {
    flex: 1, // Search field takes as much space as possible
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10, // Padding for the search input
    marginRight: 10, // Margin to the right of the search input
  },
  recipeCard: {
    flexDirection: 'row', // Layout image and text side by side
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow effect
  },
  recipeImage: {
    width: 80, // Image width
    height: 80, // Image height
    borderRadius: 10,
    marginRight: 15,
  },
  recipeInfo: {
    flex: 1, // Make the info take the rest of the space
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black text color
  },
  recipeDetails: {
    fontSize: 14,
    color: '#666', // Grey text color
  },
});

export default Menu;
