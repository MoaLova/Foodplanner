import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    justifyContent: 'flex-start', // Push content up

  },
  headerContainer: {
    padding: 20,
    paddingTop: 80, // Extra padding at the top
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  box: {
    width: 150,
    height: 150,

    backgroundColor: 'white', // White boxes
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black text

  },
});

export default styles;
