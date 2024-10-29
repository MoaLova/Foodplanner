import SQLite from 'react-native-sqlite-storage';

// Öppna eller skapa databasen
const db = SQLite.openDatabase({ name: 'recipes.db', location: 'default' });

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS savedRecipes (id INTEGER PRIMARY KEY NOT NULL, title TEXT, image TEXT, readyInMinutes INTEGER, dishTypes TEXT, diets TEXT);',
      [],
      () => {
        console.log('Table created successfully');
      },
      (tx, error) => {
        console.log('Error creating table: ', error);
      }
    );
  });
};

export const saveRecipe = (recipe) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO savedRecipes (title, image, readyInMinutes, dishTypes, diets) VALUES (?, ?, ?, ?, ?)',
      [recipe.title, recipe.image, recipe.readyInMinutes, recipe.dishTypes.join(','), recipe.diets.join(',')],
      () => {
        console.log('Recipe saved successfully');
      },
      (tx, error) => {
        console.log('Error saving recipe: ', error);
      }
    );
  });
};

export const fetchSavedRecipes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM savedRecipes',
      [],
      (tx, results) => {
        const recipes = [];
        for (let i = 0; i < results.rows.length; i++) {
          recipes.push(results.rows.item(i));
        }
        callback(recipes);
      },
      (tx, error) => {
        console.log('Error fetching recipes: ', error);
      }
    );
  });
};

export default db;
