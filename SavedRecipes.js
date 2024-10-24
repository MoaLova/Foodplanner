import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './Styles/MenuStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedRecipes = ({ navigation }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch saved recipes from AsyncStorage
    const fetchSavedRecipes = async () => {
      try {
        setLoading(true);
        const savedRecipesFromStorage = await AsyncStorage.getItem('savedRecipes');
        const parsedRecipes = savedRecipesFromStorage ? JSON.parse(savedRecipesFromStorage) : [];
        setSavedRecipes(parsedRecipes);
        setLoading(false);
      } catch (error) {
        setError('Could not load saved recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  // Function to delete a recipe
  const deleteRecipe = async (recipeId) => {
    try {
      const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== recipeId); // Remove recipe from the list
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes)); // Update AsyncStorage
      setSavedRecipes(updatedRecipes); // Update state
      Alert.alert('Recipe deleted!');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      Alert.alert('Failed to delete recipe.');
    }
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <TouchableOpacity
        style={styles.recipeInfo}
        onPress={() => navigation.navigate('Recipes', { recipe: item })} // Navigate to Recipes screen with the clicked recipe
      >
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeDetails}>{item.readyInMinutes} min</Text>
        {item.dishTypes && item.dishTypes.length > 0 && (
          <Text style={styles.recipeDishTypes}>
            Måltidstyper: {item.dishTypes.join(', ')}
          </Text>
        )}
        {item.diets && item.diets.length > 0 && (
          <Text style={styles.recipeAllergies}>
            Allergier: {item.diets.join(', ')}
          </Text>
        )}
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteRecipe(item.id)} // Call delete function on press
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Saved Recipes</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : savedRecipes.length === 0 ? (
        <Text style={styles.noDataText}>You have no saved recipes.</Text>
      ) : (
        <FlatList
          data={savedRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

export default SavedRecipes;
