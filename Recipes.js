import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './Styles/RecipesStyle';

const Recipes = ({ recipe, onBack }) => {
  const [details, setDetails] = useState('');

  const changeToIngredients = () => {
    const ingredientsList = recipe.ingredients
      ? recipe.ingredients.map((ingredient, index) => `${index + 1}. ${ingredient}`).join('\n')
      : 'No ingredients available.';
    setDetails(`Ingredients:\n${ingredientsList}`);
  };

  const changeToInstructions = () => {
    const instructionsList = recipe.instructions
      ? recipe.instructions.join('\n')
      : 'No instructions available.';
    setDetails(`Instructions:\n${instructionsList}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <View style={styles.recipeContainer}>
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

          <View style={styles.textContainer}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.recipeInfo}>{recipe.readyInMinutes} minutes</Text>
            <Text style={styles.recipeInfo}>Category: {recipe.category || 'Lunch'}</Text>
            <Text style={styles.recipeInfo}>{recipe.diet || 'Lactose-free'}</Text>
          </View>
        </View>

        <Text style={styles.recipeText}>{recipe.description || 'This is a detailed description of the recipe.'}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={changeToIngredients}>
            <Text style={styles.buttonText}>Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={changeToInstructions}>
            <Text style={styles.buttonText}>Instructions</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.detailsText}>{details || 'Select Ingredients or Instructions to view details.'}</Text>

        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recipes;
