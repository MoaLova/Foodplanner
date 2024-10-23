import React, { useEffect, useState } from 'react';
import { SPOONACULAR_API_KEY } from '@env';  // API nyckel
import { View, TextInput, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './Styles/MenuStyle';
import Recipes from './Recipes';  // Importera Recipes Component

const Menu = ({ onBack }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);  // Ny state för valt recept

  const fetchRecipes = async (pageNumber = 1, search = '') => {
    try {
      setLoading(pageNumber === 1);
      setLoadingMore(pageNumber > 1);
      setError(null);

      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=10&offset=${(pageNumber - 1) * 10}&query=${search}`
      );

      const data = await response.json();

      if (data && data.results.length > 0) {
        setRecipes((prevRecipes) => pageNumber === 1 ? data.results : [...prevRecipes, ...data.results]);
        setHasMoreData(data.results.length === 10);
      } else {
        setHasMoreData(false);
      }

      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Could not load recipes. Please try again later.');
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Nytt: Hämta detaljer om ett specifikt recept från Spoonacular API
  const fetchRecipeDetails = async (recipeId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
      );
      const recipeDetails = await response.json();
      setSelectedRecipe(recipeDetails);  // Sätt det hämtade receptet som valt recept
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError('Could not load recipe details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity onPress={() => fetchRecipeDetails(item.id)}>  {/* Hämta receptdetaljer */}
      <View style={styles.recipeCard} key={item.id}>
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeDetails}>{item.readyInMinutes} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (selectedRecipe) {
    return <Recipes recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;  // Skicka valt recept
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Menu</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for recipes..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={() => fetchRecipes(1, searchTerm)}  // Sökning
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : recipes.length === 0 ? (
        <Text style={styles.noDataText}>No recipes available. Please try again later.</Text>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
          initialNumToRender={3}
          onEndReached={() => {
            if (hasMoreData && !loadingMore) {
              setPage(page + 1);
              fetchRecipes(page + 1, searchTerm);
            }
          }}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default Menu;
