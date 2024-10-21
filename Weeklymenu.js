import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WeeklyMenu = ({ onBack }) => {
  const currentMonth = 'January';
  const nextMonth = 'February';
  const [weekNumber, setWeekNumber] = useState(1); // State to track the week number
  const dateRanges = [
    { start: 1, end: 7 },
    { start: 8, end: 14 },
    { start: 15, end: 21 },
    { start: 22, end: 28 },
    { start: 29, end: 5, carryOver: true }, // Last week carries over to the next month
  ]; // Array of week ranges

  const { start, end, carryOver } = dateRanges[weekNumber - 1]; // Get the start, end dates, and carry-over status for the current week

  // State for selected day and meals per week
  const [selectedDay, setSelectedDay] = useState(start); // Default selected day is the first day of the week
  const [mealsPerWeek, setMealsPerWeek] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  });

  // Ensure that each week has its meal data structure initialized
  useEffect(() => {
    if (!mealsPerWeek[weekNumber]) {
      const weekData = {};
      for (let i = start; i <= (carryOver ? 7 : end); i++) {
        weekData[i] = { breakfast: '', lunch: '', dinner: '' };
      }
      setMealsPerWeek((prevMeals) => ({
        ...prevMeals,
        [weekNumber]: weekData,
      }));
    }
  }, [weekNumber, mealsPerWeek, start, end, carryOver]);

  // Handle day selection
  const handleDayPress = (day) => {
    setSelectedDay(day); // Update the selected day
  };

  // Handle meal change for selected day and week
  const handleMealChange = (mealType, meal) => {
   
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

      // Reset the selected day to the first day of the new week when switching weeks
      setSelectedDay(dateRanges[newWeekNumber - 1].start);
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
          {carryOver
            ? `${currentMonth} ${start}-31, ${nextMonth} 01-${end}`
            : `${currentMonth} ${start}-${end}`}
        </Text>

        <TouchableOpacity onPress={() => handleWeekChange('next')}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic date buttons based on the selected week */}
      <View style={styles.dateContainer}>
        {Array.from({ length: (carryOver ? 7 : end) - start + 1 }, (_, i) => {
          const day = start + i;
          return (
            <TouchableOpacity
              key={day}
              onPress={() => handleDayPress(day)}
              style={[styles.dateBox, selectedDay === day && styles.selectedDateBox]}
            >
              <Text style={styles.dateText}>
                {carryOver && day > 31 ? `0${day - 31}` : day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Meal selection for selected day */}
      {selectedDay && mealsPerWeek[weekNumber] && (
        <View style={styles.mealContainer}>
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Frukost</Text>
            <View style={styles.mealBox}>
              <Text
                style={styles.mealBoxText}
                
              >
                {mealsPerWeek[weekNumber][selectedDay]?.breakfast || '+Add meal'}
              </Text>
            </View>
          </View>

          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Lunch</Text>
            <View style={styles.mealBox}>
              <Text
                style={styles.mealBoxText}
               
              >
                {mealsPerWeek[weekNumber][selectedDay]?.lunch || '+Add meal'}
              </Text>
            </View>
          </View>

          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Middag</Text>
            <View style={styles.mealBox}>
              <Text
                style={styles.mealBoxText}
               
              >
                {mealsPerWeek[weekNumber][selectedDay]?.dinner || '+Add meal'}
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