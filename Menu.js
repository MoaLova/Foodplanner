import React, { useEffect, useState } from 'react';
import { SPOONACULAR_API_KEY } from '@env';
import { View, TextInput, Text, Image, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './Styles/MenuStyle';

const Menu = ({ onBack }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch recipes based on search term
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

  useEffect(() => {
    fetchRecipes(); // Initial load
  }, []);

  const handleBack = () => {
    onBack();  // Use onBack here to trigger the parent function
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Recipe Selected: ', item.id)}>
      <View style={styles.recipeCard} key={item.id}>
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeDetails}>{item.readyInMinutes} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const loadMoreRecipes = () => {
    if (!loadingMore && hasMoreData) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRecipes(nextPage, searchTerm); // Pass search term for next page
    }
  };

  const handleSearch = () => {
    setPage(1); // Reset to first page for new search
    fetchRecipes(1, searchTerm); // Fetch recipes based on search term
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Menu</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for recipes..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch} // Trigger search when "enter" is pressed
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
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={loadMoreRecipes}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

export default Menu;
