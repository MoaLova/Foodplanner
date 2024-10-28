import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import styles from './Styles/MenuStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedRecipes = ({ setActiveView }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const deleteRecipe = async (recipeId) => {
    try {
      const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== recipeId);
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
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
            setActiveView('recipes', item); // Pass the selected recipe to the Recipes view
          }}
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
        <TouchableOpacity onPress={() => setActiveView('home')} style={styles.backButton}>
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
