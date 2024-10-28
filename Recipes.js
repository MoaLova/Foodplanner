import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary
import styles from './Styles/RecipesStyle';

const Recipes = ({ recipe }) => {
  const [details, setDetails] = useState('');

  const saveRecipe = async () => {
    try {
      const savedRecipesJson = await AsyncStorage.getItem('savedRecipes');
      const savedRecipes = savedRecipesJson ? JSON.parse(savedRecipesJson) : [];

      const isAlreadySaved = savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id);

      if (isAlreadySaved) {
        Alert.alert('Recipe is already saved.');
      } else {
        const updatedSavedRecipes = [...savedRecipes, recipe];
        await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
        Alert.alert('Recipe saved!');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      Alert.alert('Failed to save recipe.');
    }
  };

  const changeToIngredients = () => {
    const ingredientsList = recipe.extendedIngredients
      ? recipe.extendedIngredients.map((ingredient, index) => `${index + 1}. ${ingredient.original}`).join('\n')
      : 'No ingredients available.';
    setDetails(`Ingredients:\n${ingredientsList}`);
  };

  const changeToInstructions = () => {
    const instructionsList = recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0
      ? recipe.analyzedInstructions[0].steps.map((step, index) => `${index + 1}. ${step.step}`).join('\n')
      : 'No instructions available.';
    setDetails(`Instructions:\n${instructionsList}`);
  };

  const handleAddToMenuPress = () => {
    // Implement adding the recipe to the weekly menu here if needed
  };

  return (
    <ErrorBoundary>
      <ScrollView style={styles.container}>
        <View style={styles.topRightButtonsContainer}>
          <TouchableOpacity style={styles.topButton} onPress={saveRecipe}>
            <Text style={styles.topButtonText}>Save Recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} onPress={handleAddToMenuPress}>
            <Text style={styles.topButtonText}>Add to Menu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentBox}>
          <View style={styles.recipeContainer}>
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <View style={styles.textContainer}>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.recipeInfo}>{recipe.readyInMinutes} minutes</Text>
              <Text style={styles.recipeInfo}>
                Category: {recipe.dishTypes ? recipe.dishTypes.join(', ') : 'Not available'}
              </Text>
              <Text style={styles.recipeInfo}>Diet: {recipe.diets ? recipe.diets.join(', ') : 'No specific diet'}</Text>
            </View>
          </View>

          <Text style={styles.recipeText}>
            {recipe.summary.replace(/<[^>]*>?/gm, '') || 'No description available.'}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={changeToIngredients}>
              <Text style={styles.buttonText}>Ingredients</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={changeToInstructions}>
              <Text style={styles.buttonText}>Instructions</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.detailsText}>{details || 'Select Ingredients or Instructions to view details.'}</Text>
        </View>
      </ScrollView>
    </ErrorBoundary>
  );
};

export default Recipes;
