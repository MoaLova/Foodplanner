import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import styles from './Styles/MenuStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedRecipes = ({ navigation, setCurrentRecipe }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching saved recipes...');
    const fetchSavedRecipes = async () => {
      try {
        setLoading(true);
        const savedRecipesFromStorage = await AsyncStorage.getItem('savedRecipes');
        const parsedRecipes = savedRecipesFromStorage ? JSON.parse(savedRecipesFromStorage) : [];
        console.log('Fetched recipes:', parsedRecipes);
        setSavedRecipes(parsedRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
        setError('Could not load saved recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  const deleteRecipe = async (recipeId) => {
    console.log(`Attempting to delete recipe with ID: ${recipeId}`);
    try {
      const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== recipeId);
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
      console.log('Updated recipes after deletion:', updatedRecipes);
      setSavedRecipes(updatedRecipes);
      Alert.alert('Recipe deleted!');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      Alert.alert('Failed to delete recipe.');
    }
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <TouchableOpacity
          onPress={() => {
            console.log(`Selected recipe: ${item.title}`);
            setCurrentRecipe(item); // Set the selected recipe
            navigation.navigate('Recipes'); // Navigate to Recipes screen
          }}
        >
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeDetails}>{item.readyInMinutes} min</Text>
          {item.dishTypes && item.dishTypes.length > 0 && (
            <Text style={styles.recipeDishTypes}>
              Meal Types: {item.dishTypes.join(', ')}
            </Text>
          )}
          {item.diets && item.diets.length > 0 && (
            <Text style={styles.recipeAllergies}>
              Allergies: {item.diets.join(', ')}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteRecipe(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
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
