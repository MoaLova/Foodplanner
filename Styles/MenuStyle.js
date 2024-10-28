import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20,
    flex: 1,
    textAlign: 'center',
  },
  searchInput: {
    width: '85%', // Fixed width to prevent it from expanding
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    height: 40, // Adjusted height
    marginBottom: 15, // Space below the input
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    width: width * 0.9,
    minHeight: 50,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recipeImage: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: 8,
    marginRight: 10,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  recipeDetails: {
    fontSize: 18,
    color: 'black',
  },
  recipeDishTypes: {
    fontSize: 15,
    color: 'black',
    marginTop: 3,
  },
  recipeAllergies: {
    fontSize: 15,
    color: 'red',
    marginTop: 3,
  },
  flatListContent: {
    paddingBottom: 30,
  },
  text: {
    fontSize: 16,
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
  backButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'flex-start',
    margin: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  
  
});

export default styles;
