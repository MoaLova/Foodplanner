import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light background color for better contrast
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly more transparent overlay
    justifyContent: 'flex-start',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 60, // Adjusted for a universal look on all devices
    alignItems: 'center',
  },
  heading: {
    fontSize: 48, // Reduced font size for a cleaner look
    fontWeight: '600',
    color: '#ffffff', 
    fontFamily: 'Arial', // Arial as a web-safe font for cross-platform compatibility
    textAlign: 'center',
  },
  box: {
    width: 160,
    height: 160,
    backgroundColor: 'white',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    shadowColor: '#000', // Shadow for depth on all platforms
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  text: {
    fontSize: 18, // Slightly smaller font for better hierarchy
    fontWeight: '500',
    color: '#444', // Dark gray for softer contrast
    fontFamily: 'Arial',
    textAlign: 'center',
    padding: 8,
  },
});

export default styles;
