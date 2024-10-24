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
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    width: width * 0.9,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  recipeDetails: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 30,
  },
  backButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  noDataText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
