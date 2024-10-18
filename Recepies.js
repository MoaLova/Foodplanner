import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Recepies = ({ onBack }) => {
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

            {/* Placeholder for description text */}
            <Text style={styles.recipeText}>
              {description} {/* Dynamic text */}
            </Text>

            {/* Buttons to change description */}
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
          </View>
        </View>

        {/* Back button at the bottom */}
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentBox: {
    width: '75%',
    height: '75%',
    backgroundColor: '#FFFACD', // Light yellow background (LemonChiffon)
    borderRadius: 20, // Rounded corners
    padding: 20,
    justifyContent: 'space-between', // Place the button at the bottom
  },
  recipeContainer: {
    flexDirection: 'row', // Horizontal layout for image and text
    alignItems: 'center', // Center image and text vertically
    marginTop: 20,
  },
  imagePlaceholder: {
    width: 100, // Width of placeholder
    height: 100, // Height of placeholder
    backgroundColor: '#D3D3D3', // Light gray background for placeholder
    borderRadius: 10, // Rounded corners
    justifyContent: 'center', // Center text in placeholder
    alignItems: 'center', // Center text in placeholder
    marginRight: 20, // Space between image and text
  },
  placeholderText: {
    fontSize: 12,
    color: 'black',
  },
  textContainer: {
    flex: 1, // Flexible space for the text to take up remaining space
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  recipeText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Horizontal layout for buttons
    justifyContent: 'space-between', // Distribute space between buttons
  },
  button: {
    flex: 1, // Make each button equally wide
    height: 40,
    backgroundColor: '#ADD8E6', // Light blue background for buttons
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5, // Space between buttons
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsText: {
    fontSize: 16,
    color: 'black',
    marginTop: 20, // Space above the details text
  },
  backButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#90EE90', // Green background for back button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Recepies;
