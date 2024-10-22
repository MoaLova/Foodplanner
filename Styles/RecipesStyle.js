import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  contentBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  recipeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeInfo: {
    fontSize: 14,
    color: '#555',
  },
  recipeText: {
    fontSize: 16,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  detailsText: {
    fontSize: 16,
    marginTop: 16,
    color: '#333',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default styles;
