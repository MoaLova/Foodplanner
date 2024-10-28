import React, { useEffect, useState } from 'react';
import { SPOONACULAR_API_KEY } from '@env'; // API key
import { View, TextInput, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './Styles/MenuStyle';

const Menu = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecipes = async (pageNumber = 1, search = '') => {
    try {
      setLoading(pageNumber === 1);
      setLoadingMore(pageNumber > 1);
      setError(null);

      console.log(`Fetching recipes with search term: ${searchTerm}, page: ${pageNumber}`);

      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=10&offset=${(pageNumber - 1) * 10}&query=${search}&addRecipeInformation=true`
      );

      const data = await response.json();
      console.log('API Response:', data); // Log response to see if data is coming through

      if (data && data.results && data.results.length > 0) {
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

  const fetchRecipeDetails = async (recipeId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
      );
      const recipeDetails = await response.json();
      
      navigation.navigate('Recipes', { recipe: recipeDetails });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError('Could not load recipe details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (SPOONACULAR_API_KEY) {
      fetchRecipes();
    } else {
      console.error('API key is missing');
      setError('Missing API key');
    }
  }, []);

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity onPress={() => fetchRecipeDetails(item.id)}>
      <View style={styles.recipeCard} key={item.id}>
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
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
              Allergies: {item.diets.join(', ')}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
     
        <Text style={styles.heading}>Menu</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for recipes..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={() => fetchRecipes(1, searchTerm)}
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
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
};

export default Menu;