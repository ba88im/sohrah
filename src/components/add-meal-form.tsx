"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from './ui/button';
import toast, { Toaster } from 'react-hot-toast';

const mealConfig = {
  breakfast: 3,
  lunch: 5,
  dinner: 2
};

export function AddMealForm() {
  const [mealType, setMealType] = useState('breakfast');
  const { register, handleSubmit, watch, setValue, reset, formState } = useForm({
    defaultValues: {
      mealType: 'breakfast',
      dateTime: '',
      entries: Array(mealConfig.breakfast).fill({ foodName: '', calories: 0 })
    }
  });

  // Watch the `mealType` and `entries`
  const dateTime = watch('dateTime');
  const entries = watch('entries');

  // Update entries when mealType changes
  useEffect(() => {
    const newEntries = Array(mealConfig[mealType]).fill({ foodName: '', calories: 0 });
    reset({ ...formState.values, entries: newEntries }); // Preserve other form values
  }, [mealType, reset, formState.values]);

  const onSubmit = async (data) => {
    // Format the data to match the expected API structure
    const formattedData = {
      ...data,
      entries: data.entries.map(entry => ({
        ...entry,
        dateTime: data.dateTime // Assign the single dateTime to all entries
      }))
    };

    try {
      const response = await fetch('/api/insert-meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success("Meal added successfully!");
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error("Failed to add meal.");
    }
  };

  return (
    <Card className="dashboard-05-chunk-4">
      <CardHeader>
        <CardTitle className="text-xl">Add a Meal</CardTitle>
        <CardDescription>Keep track of your intake with sohrah</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <Label htmlFor="mealType">Meal Type</Label>
            <select id="mealType" {...register('mealType')} onChange={(e) => setMealType(e.target.value)} className="p-2 rounded border-gray-300">
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
            <Label htmlFor="dateTime">Date/Time</Label>
            <Input type="datetime-local" {...register('dateTime')} />
            {entries.map((_, index) => (
              <div key={index} className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`entries.${index}.foodName`}>Food Name</Label>
                  <Input type="text" {...register(`entries.${index}.foodName`)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`entries.${index}.calories`}>Calories</Label>
                  <Input type="number" {...register(`entries.${index}.calories`)} />
                </div>
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full bg-green-900 hover:bg-green-950 text-white font-bold py-2 px-4 rounded">
            Add Meal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
