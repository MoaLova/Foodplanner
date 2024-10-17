// WeeklyMenu.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WeeklyMenu = ({ onBack }) => {
  const currentMonth = 'November';
  const dateRange = '1-7'; // Datumintervallet för den aktuella veckan

  return (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>
          {currentMonth} {dateRange}
        </Text>
      </View>

      {/* Horisontell rad med datum */}
      <View style={styles.dateContainer}>
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <View key={day} style={styles.dateBox}>
            <Text style={styles.dateText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Vertikal layout för Frukost, Lunch och Middag */}
      <View style={styles.mealContainer}>
        {/* Frukost */}
        <View style={styles.mealColumn}>
          <Text style={styles.mealText}>Frukost</Text>
          <View style={styles.mealBox}>
            <Text style={styles.mealBoxText}>Ex. Gröt</Text>
          </View>
        </View>

        {/* Lunch */}
        <View style={styles.mealColumn}>
          <Text style={styles.mealText}>Lunch</Text>
          <View style={styles.mealBox}>
            <Text style={styles.mealBoxText}>Ex. Pasta</Text>
          </View>
        </View>

        {/* Middag */}
        <View style={styles.mealColumn}>
          <Text style={styles.mealText}>Middag</Text>
          <View style={styles.mealBox}>
            <Text style={styles.mealBoxText}>Ex. Pizza</Text>
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Mörkare bakgrund för att göra texten läsbar
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  headerContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dateBox: {
    width: 60,  // Större boxar för datum
    height: 60,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,  // Tydligare outline på boxen
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 24,  // Större text och fet stil för att göra datum mer synligt
    fontWeight: 'bold',
    color: 'black',
  },
  mealContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  mealColumn: {
    marginBottom: 30, // Avstånd mellan Frukost, Lunch och Middag
  },
  mealText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  mealBox: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  mealBoxText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#90EE90', // Grön bakgrund för tillbaka-knappen
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default WeeklyMenu;
