import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WeeklyMenu = ({ onBack }) => {
  const currentMonth = 'November';
  const [weekNumber, setWeekNumber] = useState(1); // State to track the week number
  const dateRanges = ['1-7', '8-14', '15-21', '22-28', '29-30']; // Array of week ranges
  const dateRange = dateRanges[weekNumber - 1]; // Current date range based on the week number

  // State for selected day and meals per week
  const [selectedDay, setSelectedDay] = useState(1); // Default selected day is 1
  const [mealsPerWeek, setMealsPerWeek] = useState({
    1: {
      1: { breakfast: '', lunch: '', dinner: '' },
      2: { breakfast: '', lunch: '', dinner: '' },
      3: { breakfast: '', lunch: '', dinner: '' },
      4: { breakfast: '', lunch: '', dinner: '' },
      5: { breakfast: '', lunch: '', dinner: '' },
      6: { breakfast: '', lunch: '', dinner: '' },
      7: { breakfast: '', lunch: '', dinner: '' },
    },
  });

  // Ensure that each week has its meal data structure initialized
  useEffect(() => {
    if (!mealsPerWeek[weekNumber]) {
      setMealsPerWeek((prevMeals) => ({
        ...prevMeals,
        [weekNumber]: {
          1: { breakfast: '', lunch: '', dinner: '' },
          2: { breakfast: '', lunch: '', dinner: '' },
          3: { breakfast: '', lunch: '', dinner: '' },
          4: { breakfast: '', lunch: '', dinner: '' },
          5: { breakfast: '', lunch: '', dinner: '' },
          6: { breakfast: '', lunch: '', dinner: '' },
          7: { breakfast: '', lunch: '', dinner: '' },
        },
      }));
    }
  }, [weekNumber, mealsPerWeek]);

  // Handle day selection
  const handleDayPress = (day) => {
    setSelectedDay(day); // Update the selected day
  };

  // Handle meal change for selected day and week
  const handleMealChange = (mealType, meal) => {
    setMealsPerWeek((prevMeals) => ({
      ...prevMeals,
      [weekNumber]: {
        ...prevMeals[weekNumber],
        [selectedDay]: {
          ...prevMeals[weekNumber][selectedDay],
          [mealType]: meal,
        },
      },
    }));
  };

  // Handle week change
  const handleWeekChange = (direction) => {
    setWeekNumber((prevWeekNumber) => {
      let newWeekNumber = prevWeekNumber;

      if (direction === 'previous' && prevWeekNumber > 1) {
        newWeekNumber = prevWeekNumber - 1;
      } else if (direction === 'next' && prevWeekNumber < dateRanges.length) {
        newWeekNumber = prevWeekNumber + 1;
      }

      // Reset the selected day when switching weeks
      setSelectedDay(1);
      return newWeekNumber;
    });
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => handleWeekChange('previous')}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>
          {currentMonth} {dateRange}
        </Text>

        <TouchableOpacity onPress={() => handleWeekChange('next')}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

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

      {selectedDay && mealsPerWeek[weekNumber] && (
        <View style={styles.mealContainer}>
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Frukost</Text>
            <View style={styles.mealBox}>
              <Text
                style={styles.mealBoxText}
                onPress={() => handleMealChange('breakfast', 'Gröt')}
              >
                {mealsPerWeek[weekNumber][selectedDay].breakfast || 'Ej vald'}
              </Text>
            </View>
          </View>

          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Lunch</Text>
            <View style={styles.mealBox}>
              <Text
                style={styles.mealBoxText}
                onPress={() => handleMealChange('lunch', 'Pasta')}
              >
                {mealsPerWeek[weekNumber][selectedDay].lunch || 'Ej vald'}
              </Text>
            </View>
          </View>

          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Middag</Text>
            <View style={styles.mealBox}>
              <Text
                style={styles.mealBoxText}
                onPress={() => handleMealChange('dinner', 'Pizza')}
              >
                {mealsPerWeek[weekNumber][selectedDay].dinner || 'Ej vald'}
              </Text>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  arrowText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
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
    backgroundColor: '#90EE90',
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
    marginBottom: 30,
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
    backgroundColor: '#90EE90',
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