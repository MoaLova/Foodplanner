// WeeklyMenu.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WeeklyMenu = ({ onBack }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Weekly Menu</Text>
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.text}>Monday: Pasta</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Tuesday: Salad</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Wednesday: Soup</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Thursday: Pizza</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Friday: Burger</Text>
        </View>
      </View>
      {/* Tillbaka-knapp */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Gör texten mer läsbar med mörkare bakgrund
    justifyContent: 'flex-start', // Flytta innehållet högre upp
  },
  headerContainer: {
    padding: 20,
    paddingTop: 80, // Extra avstånd till toppen
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'white', // Vita boxar
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
    color: '#000', // Svart text
  },
  backButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#90EE90', // Grön bakgrund på tillbaka-knappen
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
});

export default WeeklyMenu;
