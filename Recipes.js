import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './Styles/RecipesStyle';

const Recipes = ({ recipe, onBack, onSaveRecipe, onAddToMenu }) => {
  const [details, setDetails] = useState('');

  // Visa ingredienser
  const changeToIngredients = () => {
    const ingredientsList = recipe.extendedIngredients
      ? recipe.extendedIngredients.map((ingredient, index) => `${index + 1}. ${ingredient.original}`).join('\n')
      : 'No ingredients available.';
    setDetails(`Ingredients:\n${ingredientsList}`);
  };

  // Visa instruktioner
  const changeToInstructions = () => {
    const instructionsList = recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0
      ? recipe.analyzedInstructions[0].steps.map((step, index) => `${index + 1}. ${step.step}`).join('\n')
      : 'No instructions available.';
    setDetails(`Instructions:\n${instructionsList}`);
  };

  return (
    <View style={styles.container}>
      {/* Top-right corner buttons */}
      <View style={styles.topRightButtonsContainer}>
        <TouchableOpacity style={styles.topButton} onPress={onSaveRecipe}>
          <Text style={styles.topButtonText}>Save Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} onPress={onAddToMenu}>
          <Text style={styles.topButtonText}>Add to Menu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentBox}>
        {/* Receptbild */}
        <View style={styles.recipeContainer}>
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

          <View style={styles.textContainer}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.recipeInfo}>{recipe.readyInMinutes} minutes</Text>
            <Text style={styles.recipeInfo}>Category: {recipe.dishTypes ? recipe.dishTypes.join(', ') : 'Not available'}</Text>
            <Text style={styles.recipeInfo}>Diet: {recipe.diets ? recipe.diets.join(', ') : 'No specific diet'}</Text>
          </View>
        </View>

        {/* Receptbeskrivning */}
        <Text style={styles.recipeText}>{recipe.summary.replace(/<[^>]*>?/gm, '') || 'No description available.'}</Text>

        {/* Knappar för Ingredienser och Instruktioner */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={changeToIngredients}>
            <Text style={styles.buttonText}>Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={changeToInstructions}>
            <Text style={styles.buttonText}>Instructions</Text>
          </TouchableOpacity>
        </View>

        {/* Visa ingredienser eller instruktioner */}
        <Text style={styles.detailsText}>{details || 'Select Ingredients or Instructions to view details.'}</Text>

        {/* Tillbaka-knapp */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recipes;
