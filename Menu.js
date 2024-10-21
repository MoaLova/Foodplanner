import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Image, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window'); // Get device width

const Menu = ({ setActiveView }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for pagination
  const [page, setPage] = useState(1); // Track current page
  const [hasMoreData, setHasMoreData] = useState(true); // To know if there are more recipes to load
  const [error, setError] = useState(null); // Error state to handle API errors

  const fetchRecipes = async (pageNumber = 1) => {
    try {
      setLoading(pageNumber === 1);  // Set main loading state if it's the first page
      setLoadingMore(pageNumber > 1); // Set loadingMore for additional pages
      setError(null); // Reset error state before fetching

      // Replace this with your actual API call
      const response = await fetch(`https://example.com/api/recipes?page=${pageNumber}`); // Example API URL
      const data = await response.json();

      const newRecipes = data.recipes; // Adjust according to your API response structure

      if (newRecipes.length === 0) {
        setHasMoreData(false); // Stop fetching if there's no more data
      }

      setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Could not load recipes. Please try again later.'); // Set error message
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchRecipes(); // Initial load
  }, []);

  const onBack = () => {
    setActiveView('home');
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.name}</Text>
        <Text style={styles.recipeDetails}>{item.time} min</Text>
        <Text style={styles.recipeDetails}>{item.allergy}</Text>
        <Text style={styles.recipeDetails}>{item.mealType}</Text>
      </View>
    </View>
  );

  const loadMoreRecipes = () => {
    if (!loadingMore && hasMoreData) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRecipes(nextPage);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
      
      <Text style={styles.heading}>Recipes</Text>
      
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search recipes..." 
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text> // Show error message if API call fails
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  filterButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recipeImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    marginRight: 15,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  recipeDetails: {
    fontSize: 14,
    color: 'black',
  },
  flatListContent: {
    paddingBottom: 30,
  },
  separator: {
    height: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    zIndex: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Menu;
