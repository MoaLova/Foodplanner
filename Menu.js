import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window'); // Get device width

const Menu = ({ setActiveView }) => { // Access setActiveView passed as prop to manage view change
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for recipes
  const dummyRecipes = [
    { id: 1, name: 'Dummy Recipe 1', image: 'https://via.placeholder.com/80', time: 30, allergy: 'Nuts', mealType: 'Lunch' },
    { id: 2, name: 'Dummy Recipe 2', image: 'https://via.placeholder.com/80', time: 45, allergy: 'Dairy', mealType: 'Dinner' },
    { id: 3, name: 'Dummy Recipe 3', image: 'https://via.placeholder.com/80', time: 20, allergy: 'Gluten', mealType: 'Breakfast' },
  ];

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setRecipes(dummyRecipes);
        setLoading(false);
      }, 1000);
    };
    loadData();
  }, []);

  // Define onBack function inside Menu
  const onBack = () => {
    setActiveView('home');  // Assuming 'home' is the view you want to navigate to
  };

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
      {/* Back Button */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
      
      <Text style={styles.heading}>Recipes</Text>
      
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search recipes..." 
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  filterButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recipeImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    marginRight: 15,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  recipeDetails: {
    fontSize: 14,
    color: 'black',
  },

  // Back Button Styles
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    zIndex: 10, // Ensure the back button is above other elements
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Menu;

