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

      {/* Tre kolumner för Frukost, Lunch, Middag */}
      <View style={styles.mealContainer}>
        <View style={styles.mealColumn}>
          <Text style={styles.mealText}>Frukost</Text>
        </View>
        <View style={styles.mealColumn}>
          <Text style={styles.mealText}>Lunch</Text>
        </View>
        <View style={styles.mealColumn}>
          <Text style={styles.mealText}>Middag</Text>
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
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  mealContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  mealColumn: {
    width: '30%',
    height: 50,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  backButton: {
    width: '100%',
    height: 50,
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

