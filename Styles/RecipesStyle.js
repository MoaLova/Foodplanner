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
    marginTop: 20,
  },
  recipeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start', // Aligns items at the start of the container
  },
  recipeImage: {
    width: 100, // Adjust the width for better responsiveness
    height: 100, // Adjust the height accordingly
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
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
  backButtonContainer: {
    position: 'absolute', // Position it at the top left
    top: 40, // Padding from the top to avoid the dropdown bar
    left: 10, // Left margin for spacing
    zIndex: 1, // Ensure it’s above other content
  },
  backButton: {
    backgroundColor: 'transparent', // Transparent background
    paddingVertical: 5, // Smaller vertical padding
    paddingHorizontal: 10, // Smaller horizontal padding
    borderRadius: 5,
    flexDirection: 'row', // Align text and arrow
    alignItems: 'center', // Center items vertically
  },
  backButtonText: {
    color: 'black', // Black text color
    fontSize: 16, // Font size for the text
    fontWeight: 'bold',
    marginRight: 5, // Space between text and arrow
  },
});

export default styles;

