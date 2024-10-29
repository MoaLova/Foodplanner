import * as SQLite from 'expo-sqlite';
import React from 'react';

export const db = SQLite.openDatabase('MyFoodPlanner.db');

export function About() {
  // Skapa tabellen för recept om den inte redan finns
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Recipes (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT,
          image TEXT,
          readyInMinutes INTEGER,
          dishTypes TEXT,
          diets TEXT,
          instructions TEXT,
          ingredients TEXT
        );`,
        [],
        () => console.log('Table created successfully'),
        (txObj, error) => console.log('Error ', error)
      );
    });
  }, []);

  return null;  // Detta kan vara en informationsskärm om din app, men för SQLite setup är det null
}
