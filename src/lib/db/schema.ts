import {
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    real,
    varchar,
  } from "drizzle-orm/pg-core";
  
  // Define an enum for meal types
  export const mealType = pgEnum("meal_type", ["breakfast", "lunch", "dinner"]);
  
  // Define a table for meals including all necessary details
  export const meals = pgTable("meals", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    mealType: text("meal_type").notNull(), // Assuming mealType is text for this example
    date: timestamp("date").notNull(),
    foodEntries: text("food_entries").array().notNull(), // Array of food entries as text
    calories: real("calories").array().notNull(), // Parallel array of calories for each food entry
    createdAt: timestamp("created_at").notNull().defaultNow(),
  });