import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './Styles/RecipesStyle';

const Recipes = ({ recipe, onBack }) => { // Receive recipe through props
  const [details, setDetails] = useState(''); // State for ingredients/instructions

  // Function to change the details to ingredients
  const changeToIngredients = () => {
    const ingredientsList = recipe.ingredients
      ? recipe.ingredients.map((ingredient, index) => `${index + 1}. ${ingredient}`).join('\n')
      : 'No ingredients available.';
    setDetails(`Ingredients:\n${ingredientsList}`);
  };

  // Function to change the details to instructions
  const changeToInstructions = () => {
    const instructionsList = recipe.instructions
      ? recipe.instructions.join('\n')
      : 'No instructions available.';
    setDetails(`Instructions:\n${instructionsList}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        {/* Recipe Image */}
        <View style={styles.recipeContainer}>
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} /> {/* Display the image */}

          <View style={styles.textContainer}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text> {/* Display the title */}
            <Text style={styles.recipeInfo}>{recipe.readyInMinutes} minutes</Text>
            <Text style={styles.recipeInfo}>Category: {recipe.category || 'Lunch'}</Text>
            <Text style={styles.recipeInfo}>{recipe.diet || 'Lactose-free'}</Text>
          </View>
        </View>

        {/* Recipe Description */}
        <Text style={styles.recipeText}>{recipe.description || 'This is a detailed description of the recipe.'}</Text>

        {/* Buttons for Ingredients and Instructions */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={changeToIngredients}>
            <Text style={styles.buttonText}>Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={changeToInstructions}>
            <Text style={styles.buttonText}>Instructions</Text>
          </TouchableOpacity>
        </View>

        {/* Display the ingredients or instructions based on button click */}
        <Text style={styles.detailsText}>{details || 'Select Ingredients or Instructions to view details.'}</Text>

        {/* Back Button */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recipes;
