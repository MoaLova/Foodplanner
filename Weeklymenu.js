import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WeeklyMenu = ({ onBack }) => {
  const currentMonth = 'November';
  const dateRange = '1-7'; // Datumintervallet för den aktuella veckan

  // State for selected day and meals
  const [selectedDay, setSelectedDay] = useState(1); // Default selected day is 1
  const [meals, setMeals] = useState({
    1: { breakfast: '', lunch: '', dinner: '' },
    2: { breakfast: '', lunch: '', dinner: '' },
    3: { breakfast: '', lunch: '', dinner: '' },
    4: { breakfast: '', lunch: '', dinner: '' },
    5: { breakfast: '', lunch: '', dinner: '' },
    6: { breakfast: '', lunch: '', dinner: '' },
    7: { breakfast: '', lunch: '', dinner: '' },
  });

  // Handle day selection
  const handleDayPress = (day) => {
    setSelectedDay(day); // Update the selected day
  };

  // Handle meal change for selected day
  const handleMealChange = (mealType, meal) => {
    setMeals({
      ...meals,
      [selectedDay]: {
        ...meals[selectedDay],
        [mealType]: meal,
      },
    });
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>
          {currentMonth} {dateRange}
        </Text>
      </View>

      {/* Date buttons */}
      <View style={styles.dateContainer}>
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => handleDayPress(day)}
            style={[styles.dateBox, selectedDay === day && styles.selectedDateBox]}
          >
            <Text style={styles.dateText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Meal selection for selected day */}
      {selectedDay && (
        <View style={styles.mealContainer}>
          {/* Frukost */}
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Frukost</Text>
            <View style={styles.mealBox}>
              <Text
                style={styles.mealBoxText}
                onPress={() => handleMealChange('breakfast', 'Gröt')}
              >
                {meals[selectedDay].breakfast || 'Ej vald'}
              </Text>
            </View>
          </View>

          {/* Lunch */}
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Lunch</Text>
            <View style={styles.mealBox}>
              <Text
                style={styles.mealBoxText}
                onPress={() => handleMealChange('lunch', 'Pasta')}
              >
                {meals[selectedDay].lunch || 'Ej vald'}
              </Text>
            </View>
          </View>

          {/* Middag */}
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Middag</Text>
            <View style={styles.mealBox}>
              <Text
                style={styles.mealBoxText}
                onPress={() => handleMealChange('dinner', 'Pizza')}
              >
                {meals[selectedDay].dinner || 'Ej vald'}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Back button */}
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dateBox: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateBox: {
    backgroundColor: '#90EE90', // Färgändring för vald dag
  },
  dateText: {
    fontSize: 24,
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
    borderWidth: 6,
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





