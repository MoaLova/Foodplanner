import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Image, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Hämta enhetens bredd

const Menu = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data för recept
  const dummyRecipes = [
    {
      id: 1,
      name: 'Dummy Recipe 1',
      image: 'https://via.placeholder.com/80',
      time: 30,
      allergy: 'Nuts',
      mealType: 'Lunch',
    },
    {
      id: 2,
      name: 'Dummy Recipe 2',
      image: 'https://via.placeholder.com/80',
      time: 45,
      allergy: 'Dairy',
      mealType: 'Dinner',
    },
    {
      id: 3,
      name: 'Dummy Recipe 3',
      image: 'https://via.placeholder.com/80',
      time: 20,
      allergy: 'Gluten',
      mealType: 'Breakfast',
    },
  ];

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setRecipes(dummyRecipes);
        setLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recepies</Text>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Sök recept..." 
        />
        <Button title="Filter" onPress={() => {}} />
      </View>

      {loading ? (
        <Text>Laddar...</Text>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
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
    padding: 10,
    marginRight: 10,
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey', // Tydlig bakgrundsfärg
    borderWidth: 1,
    borderColor: 'black', // Tydlig kant
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%', // Full bredd
    height: 100, // Fasta höjd
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recipeImage: {
    width: 80,
    height: 80,
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
    color: 'black', // Tydlig textfärg
  },
});

export default Menu;
