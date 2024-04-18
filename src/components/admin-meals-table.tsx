"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCw } from 'lucide-react';
import { MealEditDialog } from './admin-meal-editor';

export function AdminMealsTable() {
  const [meals, setMeals] = useState<Meal[]>([]); // Initialize with the specific type
  const [editMeal, setEditMeal] = useState(null);

  interface Meal {
    id: string; 
    userId: string;
    foodEntries: string[];
    mealType: string;
    date: string; // Assuming date is a string, adjust the type as necessary
    calories: number[];
}

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/admin-get-meals');
      const data = await response.json();
      setMeals(data.allUserMeals);
    } catch (error) {
      console.error('Failed to fetch meals');
    }
  };

  console.log(meals);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Meals</CardTitle>
            <CardDescription>Recent meals</CardDescription>
          </div>
          <Button variant="outline" onClick={fetchMeals}>
            Refresh
            <RotateCw className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Dishes</TableHead>
              <TableHead>Meal</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Total Calories</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                {meals.map((meal, index) => (
                  <TableRow key={index} className="">
                    <TableCell>{meal.userId}</TableCell>
                    <TableCell>{meal.foodEntries.join(" - ")}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="outline">
                            {meal.mealType}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(meal.date).toLocaleDateString()}</TableCell>
                    <TableCell className="hidden sm:table-cell">{new Date(meal.date).toLocaleTimeString()}</TableCell>
                    <TableCell className="text-right">{meal.calories.reduce((a, b) => a + b, 0)}</TableCell>
                    <TableCell>
                      <MealEditDialog meal={meal.id} onSave={fetchMeals} onCancel={() => setEditMeal(null)} />
                  </TableCell>
                  </TableRow>
                ))}
              </TableBody>

          {/* <TableBody>
            {meals.map(meal => (
              <TableRow key={meal.id}>
                <TableCell>{meal.userId}</TableCell>
                <TableCell>{meal.foodEntries.join(", ")}</TableCell>
                <TableCell><Badge variant="outline">{meal.mealType}</Badge></TableCell>
                <TableCell>{new Date(meal.date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(meal.date).toLocaleTimeString()}</TableCell>
                <TableCell>{meal.calories.reduce((a, b) => a + b, 0)}</TableCell>
                <TableCell>
                  <MealEditDialog meal={meal} onSave={fetchMeals} onCancel={() => setEditMeal(null)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </CardContent>
    </Card>
  );
}
