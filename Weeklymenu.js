import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles/WeeklyMenuStyles';

const WeeklyMenu = ({ route, navigation }) => {
  const { selectedRecipe } = route.params || {};
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

  // Load saved meals from AsyncStorage on component mount
  useEffect(() => {
    const loadMeals = async () => {
      try {
        const storedMeals = await AsyncStorage.getItem('mealsPerWeek');
        if (storedMeals) {
          setMealsPerWeek(JSON.parse(storedMeals));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load saved meals.');
      }
    };
    loadMeals();
  }, []);

  // Save meals to AsyncStorage
  const saveMealsToStorage = async (updatedMeals) => {
    try {
      await AsyncStorage.setItem('mealsPerWeek', JSON.stringify(updatedMeals));
    } catch (error) {
      Alert.alert('Error', 'Failed to save meals.');
    }
  };

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
    if (mealsPerWeek[weekNumber]?.[selectedDay]?.[mealType]) {
      const existingRecipe = mealsPerWeek[weekNumber][selectedDay][mealType];
      navigation.navigate('Recipes', { recipe: existingRecipe });
    } else if (!selectedRecipe) {
      Alert.alert('No recipe selected. Please select a recipe from the list.');
    } else if (selectedRecipe && selectedDay) {
      const updatedMeals = {
        ...mealsPerWeek,
        [weekNumber]: {
          ...mealsPerWeek[weekNumber],
          [selectedDay]: {
            ...mealsPerWeek[weekNumber][selectedDay],
            [mealType]: selectedRecipe,
          },
        },
      };
  
      setMealsPerWeek(updatedMeals);
      saveMealsToStorage(updatedMeals);
    }
  };

  const handleDeleteMeal = (mealType) => {
    if (selectedDay && mealsPerWeek[weekNumber]?.[selectedDay]) {
      const updatedMeals = {
        ...mealsPerWeek,
        [weekNumber]: {
          ...mealsPerWeek[weekNumber],
          [selectedDay]: {
            ...mealsPerWeek[weekNumber][selectedDay],
            [mealType]: null,
          },
        },
      };

      setMealsPerWeek(updatedMeals);
      saveMealsToStorage(updatedMeals);
    }
  };

  const handleBack = () => {
    navigation.goBack();
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
          {['breakfast', 'lunch', 'dinner'].map((mealType) => (
            <View key={mealType} style={styles.mealColumn}>
              <Text style={styles.mealText}>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</Text>
              <TouchableOpacity style={styles.mealBox} onPress={() => handleAddMealPress(mealType)}>
                {mealsPerWeek[weekNumber][selectedDay]?.[mealType] ? (
                  <View style={styles.textContainer}>
                    <Image 
                      source={{ uri: mealsPerWeek[weekNumber][selectedDay][mealType].image }}  
                      style={styles.recipeImage}  
                    />
                    <Text style={styles.recipeTitle}>{mealsPerWeek[weekNumber][selectedDay][mealType].title}</Text>
                    <Text style={styles.recipeInfo}>{mealsPerWeek[weekNumber][selectedDay][mealType].readyInMinutes} minutes</Text>
                    <Text style={styles.recipeInfo}>
                      Category: {mealsPerWeek[weekNumber][selectedDay][mealType].dishTypes?.join(', ') || 'Not available'}
                    </Text>
                    <Text style={styles.recipeInfo}>
                      Diet: {mealsPerWeek[weekNumber][selectedDay][mealType].diets?.join(', ') || 'No specific diet'}
                    </Text>
                    <TouchableOpacity onPress={() => handleDeleteMeal(mealType)} style={styles.deleteButton}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.mealBoxText}>+Add meal</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WeeklyMenu;
