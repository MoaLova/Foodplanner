import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './Styles/RecipesStyle';

const Recipes = ({ onBack }) => {
  const [description, setDescription] = useState('This is the initial description of the recipe.');
  const [details, setDetails] = useState(''); // State for the new text section

  // Functions to change the text for ingredients and instructions
  const changeToIngredients = () => setDetails('Ingredients: List of ingredients here.');
  const changeToInstructions = () => setDetails('Instructions: Step-by-step instructions here.');

  return (
    <View style={styles.container}>
      {/* Light yellow box covering the content */}
      <View style={styles.contentBox}>
        {/* Layout with image and text header paragraph */}
        <View style={styles.recipeContainer}>
          {/* Placeholder for an image with colored background */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Image Placeholder</Text>
          </View>

          {/* Text next to the image */}
          <View style={styles.textContainer}>
            {/* Placeholder for recipe title */}
            <Text style={styles.recipeTitle}>Recipe Title</Text>

            {/* Additional information below the title */}
            <Text style={styles.recipeInfo}>30 minutes</Text>
            <Text style={styles.recipeInfo}>Lunch</Text>
            <Text style={styles.recipeInfo}>Lactose-free</Text>
          </View>
        </View>

        {/* Move description directly below the image and title */}
        <Text style={styles.recipeText}>
          {description} {/* Dynamic text for recipe description */}
        </Text>

        {/* Buttons to change description, now in a row */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={changeToIngredients}>
            <Text style={styles.buttonText}>Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={changeToInstructions}>
            <Text style={styles.buttonText}>Instructions</Text>
          </TouchableOpacity>
        </View>

        {/* Display the details based on button click */}
        <Text style={styles.detailsText}>
          {details} {/* Dynamic text for ingredients or instructions */}
        </Text>

        {/* Back button at the bottom */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Recipes;
