import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentBox: {
    width: '95%',
    height: '95%',
    backgroundColor: '#FFFACD', // Light yellow background (LemonChiffon)
    borderRadius: 20, // Rounded corners
    padding: 20,
    justifyContent: 'flex-start', // Align items from the top
  },
  recipeContainer: {
    flexDirection: 'row', // Horizontal layout for image and text
    alignItems: 'flex-start', // Align image and text to the start (top)
    marginTop: 20,
  },
  imagePlaceholder: {
    width: 150, // Width of placeholder
    height: 150, // Height of placeholder
    backgroundColor: '#D3D3D3', // Light gray background for placeholder
    borderRadius: 10, // Rounded corners
    justifyContent: 'center', // Center text in placeholder
    alignItems: 'center', // Center text in placeholder
    marginRight: 20, // Space between image and text
  },
  placeholderText: {
    fontSize: 12,
    color: 'black',
  },
  textContainer: {
    flex: 1, // Take up remaining space for the title
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  recipeInfo: {
    fontSize: 14,
    color: 'black',
    marginTop: 5, // Space between title and info texts
  },
  recipeText: {
    fontSize: 14,
    color: 'black',
    marginTop: 10, // Space above the recipe description
  },
  buttonContainer: {
    flexDirection: 'row', // Horizontal layout for buttons
    justifyContent: 'space-between', // Distribute space between buttons
    marginTop: 10, // Space above the button container
    marginBottom: 10, // Space below the button container
  },
  button: {
    flex: 1, // Make each button equally wide
    height: 40,
    backgroundColor: 'white', // White background for buttons
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5, // Space between buttons
    borderWidth: 1, // Add black border
    borderColor: '#000', // Black border color
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  detailsText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10, // Space above the details text
  },
  backButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'white', // Change to white background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 'auto', // Ensure it stays at the bottom of the content box
    borderWidth: 1, // Add black border
    borderColor: '#000', // Black border color
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Change text to black
  },
});

export default styles;