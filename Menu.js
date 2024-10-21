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

  // Mock fetch function to simulate API call
  const fetchRecipes = async (pageNumber = 1) => {
    try {
      setLoading(pageNumber === 1);  // Set main loading state if it's the first page
      setLoadingMore(pageNumber > 1); // Set loadingMore for additional pages
      setError(null); // Reset error state before fetching

      // Simulate API call with a promise
      const response = await fetch(`https://api.example.com/recipes?page=${pageNumber}`); // Replace with your actual API endpoint
      const data = await response.json();

      if (data && data.recipes.length > 0) {
        setRecipes((prevRecipes) => [...prevRecipes, ...data.recipes]); // Update state with fetched recipes
        setHasMoreData(data.hasMore); // Assume the API returns this information
      } else {
        setHasMoreData(false); // No more data
      }

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
    <View style={styles.recipeCard} key={item.id}> {/* Ensure the key is set here */}
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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Recipes</Text>
      </View>

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
      ) : recipes.length === 0 ? (
        <Text style={styles.noDataText}>No recipes available. Please try again later.</Text> // Message for no data
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the heading
    marginBottom: 20,
    width: '100%', // Full width to align properly
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20, // Space around the heading
    flex: 1, // Allow the heading to take available space
    textAlign: 'center', // Center the heading text
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
    borderRadius: 25, // Rounded corners
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    height: 50, // Set a specific height
  },
  filterButton: {
    backgroundColor: '#2196F3', // Blue background
    paddingVertical: 12, // Adjusted for larger button
    paddingHorizontal: 20, // Horizontal padding for width
    borderRadius: 25, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center', // Center the text in the button
    height: 50, // Set same height as search input for uniformity
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16, // Adjust font size for better visibility
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    width: width * 0.95, // 95% of screen width
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
  noDataText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Menu;
