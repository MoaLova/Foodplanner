import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './Styles/MenuStyle'; // Använder samma stil som Menu

const SavedRecipes = ({ onBack }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulerad hämtning av sparade recept (ersätt med faktisk hämtning om nödvändigt)
    const fetchSavedRecipes = async () => {
      try {
        setLoading(true);
        
        // Här ska du hämta sparade recept från AsyncStorage eller API (exempelvis från lokal lagring)
        const savedRecipesFromStorage = []; // Byt ut detta mot din faktiska lagringsmetod
        
        if (savedRecipesFromStorage.length > 0) {
          setSavedRecipes(savedRecipesFromStorage);
        }
        
        setLoading(false);
      } catch (error) {
        setError('Could not load saved recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.recipeCard} key={item.id}>
        <View style={styles.recipeInfo}>
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
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
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
