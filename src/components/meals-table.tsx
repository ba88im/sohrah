"use client";
import React, { useEffect, useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RotateCw } from 'lucide-react';
import { DatePickerWithRange } from './ui/date-picker';
import { DateRange } from 'react-day-picker';

export function MealsTable() {
    // Define the Meal type
    interface Meal {
        foodEntries: string[];
        mealType: string;
        date: string; // Assuming date is a string, adjust the type as necessary
        calories: number[];
    }

    // Specify the type of the state
    const [meals, setMeals] = useState<Meal[]>([]); // Initialize with the specific type
    const [dateRange, setDateRange] = useState<DateRange | undefined>();


    const fetchMeals = async () => {
        const response = await fetch('/api/get-meals');
        if (response.ok) {
            const data = await response.json(); // Get the full response JSON
            if (data.userMeals && Array.isArray(data.userMeals)) { // Ensure that userMeals exists and is an array
                setMeals(data.userMeals); // Set the meals state to the userMeals array
            } else {
                console.error('userMeals is not an array');
            }
        } else {
            console.error('Failed to fetch meals');
        }
    };

    // function to fetch meals based on date range
    const fetchMealsByDateRange = async () => {
        console.log("Date range state: ", dateRange);
        if (dateRange?.from && dateRange?.to) {
            const query = `/api/filter-meals?start=${dateRange.from.toISOString()}&end=${dateRange.to.toISOString()}`;
            console.log("Query: ", query); 
            const response = await fetch(query);
            if (response.ok) {
                const data = await response.json();
                console.log("Filtered meals: ", data.filteredMeals);
                if (data.filteredMeals && Array.isArray(data.filteredMeals)) { // Ensure that userMeals exists and is an array
                    setMeals(data.filteredMeals); // Set the meals state to the userMeals array
                } else {
                    console.error('userMeals is not an array');
                }
                }
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []); // Runs only once on mount
    

    console.log(meals);
    return (
        <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Meals</CardTitle>
                <CardDescription>Recent meals</CardDescription>
            </div>

            <div className="flex-1 md:grow-0">
                    <div className="flex items-center gap-2 ml-4">
                        <DatePickerWithRange onDateChange={(range) => {
                            console.log("New date range selected:", range);
                            setDateRange(range);
                        }} />
                        <Button variant="outline" onClick={fetchMealsByDateRange} className="ml-2">Filter Dates</Button>
                    </div>
            </div>

          <Button variant="outline" onClick={() => fetchMeals()}>
            Refresh
            <RotateCw className='w-4 h-4 ml-2' />
          </Button>

         </div>
      </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dishes</TableHead>
                  <TableHead className="hidden sm:table-cell">Meal</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead className="text-right">Total Calories</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meals.map((meal, index) => (
                  <TableRow key={index} className="">
                    <TableCell>{meal.foodEntries.join(" - ")}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="outline">
                            {meal.mealType}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(meal.date).toLocaleDateString()}</TableCell>
                    <TableCell className="hidden sm:table-cell">{new Date(meal.date).toLocaleTimeString()}</TableCell>
                    <TableCell className="text-right">{meal.calories.reduce((a, b) => a + b, 0)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
}
