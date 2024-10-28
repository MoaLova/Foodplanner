import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  contentBox: {
    backgroundColor: '#FAEAB6',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    marginTop: 20, // Added margin to separate it from buttons
  },
  recipeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  recipeImage: {
    width: 300, // Set a fixed width for the image
    height: 300, // Set a fixed height for the image
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Aligns text at the top
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8, // Space between title and other info
  },
  recipeInfo: {
    fontSize: 18,
    color: '#555',
  },
  recipeText: {
    fontSize: 18,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  detailsText: {
    fontSize: 16,
    marginTop: 16,
    color: '#333',
  },
  topRightButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
  },
  topButton: {
    backgroundColor: '#819171',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 10,
    borderRadius: 5,
  },
  topButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
