import React, { useState } from 'react';
import { RecipeContainer, RecipeCard, RecipeTitle, RecipeButton } from './SavedRecipesStyle';

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Spaghetti Carbonara', description: 'A delicious Italian pasta dish.' },
    { id: 2, title: 'Chicken Tikka Masala', description: 'A flavorful Indian chicken curry.' },
    { id: 3, title: 'Sushi Rolls', description: 'Homemade sushi with fresh ingredients.' },
  ]);

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <RecipeContainer>
      <h1>Saved Recipes</h1>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id}>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <p>{recipe.description}</p>
          <RecipeButton onClick={() => deleteRecipe(recipe.id)}>Delete</RecipeButton>
        </RecipeCard>
      ))}
    </RecipeContainer>
  );
};

export default SavedRecipes;
