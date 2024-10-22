import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Menu from './Menu';  // Import the Menu component
import styles from './Styles/WeeklyMenuStyles';

const WeeklyMenu = ({ onBack }) => {
  const currentMonth = 'January';
  const nextMonth = 'February';
  const [weekNumber, setWeekNumber] = useState(1);
  const [showMenu, setShowMenu] = useState(false); // State to toggle Menu component
  const dateRanges = [
    { start: 1, end: 7 },
    { start: 8, end: 14 },
    { start: 15, end: 21 },
    { start: 22, end: 28 },
    { start: 29, end: 5, carryOver: true },
  ];

  const { start, end, carryOver } = dateRanges[weekNumber - 1];
  const [selectedDay, setSelectedDay] = useState(start);
  const [mealsPerWeek, setMealsPerWeek] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  });

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

  const handleDayPress = (day) => {
    setSelectedDay(day);
  };

  const handleWeekChange = (direction) => {
    setWeekNumber((prevWeekNumber) => {
      let newWeekNumber = prevWeekNumber;
      if (direction === 'previous' && prevWeekNumber > 1) {
        newWeekNumber = prevWeekNumber - 1;
      } else if (direction === 'next' && prevWeekNumber < dateRanges.length) {
        newWeekNumber = prevWeekNumber + 1;
      }
      setSelectedDay(dateRanges[newWeekNumber - 1].start);
      return newWeekNumber;
    });
  };

  const handleAddMealPress = () => {
    setShowMenu(true); // Show Menu component when "+Add meal" is pressed
  };

  const handleMenuBack = () => {
    setShowMenu(false); // Go back to WeeklyMenu from Menu
  };

  if (showMenu) {
    return <Menu onBack={handleMenuBack} />; // Render Menu if showMenu is true
  }

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

      {selectedDay && mealsPerWeek[weekNumber] && (
        <View style={styles.mealContainer}>
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Breakfast</Text>
            <TouchableOpacity style={styles.mealBox} onPress={handleAddMealPress}>
              <Text style={styles.mealBoxText}>
                {mealsPerWeek[weekNumber][selectedDay]?.breakfast || '+Add meal'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Lunch</Text>
            <TouchableOpacity style={styles.mealBox} onPress={handleAddMealPress}>
              <Text style={styles.mealBoxText}>
                {mealsPerWeek[weekNumber][selectedDay]?.lunch || '+Add meal'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Dinner</Text>
            <TouchableOpacity style={styles.mealBox} onPress={handleAddMealPress}>
              <Text style={styles.mealBoxText}>
                {mealsPerWeek[weekNumber][selectedDay]?.dinner || '+Add meal'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WeeklyMenu;
