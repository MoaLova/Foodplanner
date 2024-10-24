import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Styles/WeeklyMenuStyles';

const WeeklyMenu = ({ route, navigation }) => {  
  const { selectedRecipe } = route.params || {};  // Get the recipe passed from Recipes.js
  const currentMonth = 'January';
  const nextMonth = 'February';
  const [weekNumber, setWeekNumber] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [mealsPerWeek, setMealsPerWeek] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  });

  const dateRanges = [
    { start: 1, end: 7 },
    { start: 8, end: 14 },
    { start: 15, end: 21 },
    { start: 22, end: 28 },
    { start: 29, end: 5, carryOver: true },
  ];

  const { start, end, carryOver } = dateRanges[weekNumber - 1];

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

  const handleAddMealPress = (mealType) => {
    if (selectedRecipe && selectedDay) {
      setMealsPerWeek((prevMeals) => ({
        ...prevMeals,
        [weekNumber]: {
          ...prevMeals[weekNumber],
          [selectedDay]: {
            ...prevMeals[weekNumber][selectedDay],
            [mealType]: selectedRecipe,  // Assign the passed recipe to the selected meal
          },
        },
      }));
    }
  };

  const handleBack = () => {
    navigation.goBack();  // Navigate back to the previous screen
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
          {/* Breakfast */}
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Breakfast</Text>
            <TouchableOpacity style={styles.mealBox} onPress={() => handleAddMealPress('breakfast')}>
              {mealsPerWeek[weekNumber][selectedDay]?.breakfast ? (
                <View style={styles.textContainer}>
                  <Text style={styles.recipeTitle}>{mealsPerWeek[weekNumber][selectedDay].breakfast.title}</Text>
                  <Text style={styles.recipeInfo}>{mealsPerWeek[weekNumber][selectedDay].breakfast.readyInMinutes} minutes</Text>
                  <Text style={styles.recipeInfo}>
                    Category: {mealsPerWeek[weekNumber][selectedDay].breakfast.dishTypes?.join(', ') || 'Not available'}
                  </Text>
                  <Text style={styles.recipeInfo}>
                    Diet: {mealsPerWeek[weekNumber][selectedDay].breakfast.diets?.join(', ') || 'No specific diet'}
                  </Text>
                </View>
              ) : (
                <Text style={styles.mealBoxText}>+Add meal</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Lunch */}
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Lunch</Text>
            <TouchableOpacity style={styles.mealBox} onPress={() => handleAddMealPress('lunch')}>
              {mealsPerWeek[weekNumber][selectedDay]?.lunch ? (
                <View style={styles.textContainer}>
                  <Text style={styles.recipeTitle}>{mealsPerWeek[weekNumber][selectedDay].lunch.title}</Text>
                  <Text style={styles.recipeInfo}>{mealsPerWeek[weekNumber][selectedDay].lunch.readyInMinutes} minutes</Text>
                  <Text style={styles.recipeInfo}>
                    Category: {mealsPerWeek[weekNumber][selectedDay].lunch.dishTypes?.join(', ') || 'Not available'}
                  </Text>
                  <Text style={styles.recipeInfo}>
                    Diet: {mealsPerWeek[weekNumber][selectedDay].lunch.diets?.join(', ') || 'No specific diet'}
                  </Text>
                </View>
              ) : (
                <Text style={styles.mealBoxText}>+Add meal</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Dinner */}
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Dinner</Text>
            <TouchableOpacity style={styles.mealBox} onPress={() => handleAddMealPress('dinner')}>
              {mealsPerWeek[weekNumber][selectedDay]?.dinner ? (
                <View style={styles.textContainer}>
                  <Text style={styles.recipeTitle}>{mealsPerWeek[weekNumber][selectedDay].dinner.title}</Text>
                  <Text style={styles.recipeInfo}>{mealsPerWeek[weekNumber][selectedDay].dinner.readyInMinutes} minutes</Text>
                  <Text style={styles.recipeInfo}>
                    Category: {mealsPerWeek[weekNumber][selectedDay].dinner.dishTypes?.join(', ') || 'Not available'}
                  </Text>
                  <Text style={styles.recipeInfo}>
                    Diet: {mealsPerWeek[weekNumber][selectedDay].dinner.diets?.join(', ') || 'No specific diet'}
                  </Text>
                </View>
              ) : (
                <Text style={styles.mealBoxText}>+Add meal</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WeeklyMenu;
