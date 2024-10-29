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
    if (mealsPerWeek[weekNumber] && mealsPerWeek[weekNumber][selectedDay]?.[mealType]) {
      const existingRecipe = mealsPerWeek[weekNumber][selectedDay][mealType];
      navigation.navigate('Recipes', { recipe: existingRecipe });  
    } else if (!selectedRecipe) {
      navigation.navigate('Menu');
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
    if (selectedDay && mealsPerWeek[weekNumber] && mealsPerWeek[weekNumber][selectedDay]) {
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
          {/* Breakfast */}
          <View style={styles.mealColumn}>
            <Text style={styles.mealText}>Breakfast</Text>
            <TouchableOpacity style={styles.mealBox} onPress={() => handleAddMealPress('breakfast')}>
              {mealsPerWeek[weekNumber][selectedDay]?.breakfast ? (
                <View style={styles.textContainer}>
                  <Image 
                    source={{ uri: mealsPerWeek[weekNumber][selectedDay].breakfast.image }}  
                    style={styles.recipeImage}  
                  />
                  <Text style={styles.recipeTitle}>{mealsPerWeek[weekNumber][selectedDay].breakfast.title}</Text>
                  <Text style={styles.recipeInfo}>{mealsPerWeek[weekNumber][selectedDay].breakfast.readyInMinutes} minutes</Text>
                  <Text style={styles.recipeInfo}>
                    Category: {mealsPerWeek[weekNumber][selectedDay].breakfast.dishTypes?.join(', ') || 'Not available'}
                  </Text>
                  <Text style={styles.recipeInfo}>
                    Diet: {mealsPerWeek[weekNumber][selectedDay].breakfast.diets?.join(', ') || 'No specific diet'}
                  </Text>
                  <TouchableOpacity onPress={() => handleDeleteMeal('breakfast')} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>  
                  </TouchableOpacity>
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
                  <Image 
                    source={{ uri: mealsPerWeek[weekNumber][selectedDay].lunch.image }}  
                    style={styles.recipeImage}  
                  />
                  <Text style={styles.recipeTitle}>{mealsPerWeek[weekNumber][selectedDay].lunch.title}</Text>
                  <Text style={styles.recipeInfo}>{mealsPerWeek[weekNumber][selectedDay].lunch.readyInMinutes} minutes</Text>
                  <Text style={styles.recipeInfo}>
                    Category: {mealsPerWeek[weekNumber][selectedDay].lunch.dishTypes?.join(', ') || 'Not available'}
                  </Text>
                  <Text style={styles.recipeInfo}>
                    Diet: {mealsPerWeek[weekNumber][selectedDay].lunch.diets?.join(', ') || 'No specific diet'}
                  </Text>
                  <TouchableOpacity onPress={() => handleDeleteMeal('lunch')} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>  
                  </TouchableOpacity>
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
                  <Image 
                    source={{ uri: mealsPerWeek[weekNumber][selectedDay].dinner.image }}  
                    style={styles.recipeImage}  
                  />
                  <Text style={styles.recipeTitle}>{mealsPerWeek[weekNumber][selectedDay].dinner.title}</Text>
                  <Text style={styles.recipeInfo}>{mealsPerWeek[weekNumber][selectedDay].dinner.readyInMinutes} minutes</Text>
                  <Text style={styles.recipeInfo}>
                    Category: {mealsPerWeek[weekNumber][selectedDay].dinner.dishTypes?.join(', ') || 'Not available'}
                  </Text>
                  <Text style={styles.recipeInfo}>
                    Diet: {mealsPerWeek[weekNumber][selectedDay].dinner.diets?.join(', ') || 'No specific diet'}
                  </Text>
                  <TouchableOpacity onPress={() => handleDeleteMeal('dinner')} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>  
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.mealBoxText}>+Add meal</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default WeeklyMenu;
