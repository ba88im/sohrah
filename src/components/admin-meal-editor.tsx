import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from 'react-hot-toast';

export function MealEditDialog({ meal, onSave, onCancel }) {
    const [mealType, setMealType] = useState(null);
    const [calories, setCalories] = useState(null);

  


    console.log(meal);

    const handleSave = async () => {
      const updatedMeal = {
        id: meal,
        mealType,
        calories: calories,
      };
  
      try {
        await fetch(`/api/edit-meal`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedMeal)
        });
        onSave();
        onCancel();
        toast.success("Meal updated successfully!");

      } catch (error) {
        console.error('Failed to save meal', error);
      }
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Meal</DialogTitle>
            <DialogDescription>Update the meal type and calories here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="mealType">Meal Type</Label>
            <Input id="mealType" value={mealType} onChange={(e) => setMealType(e.target.value)} />
            <Label htmlFor="calories">Calories</Label>
            <Input id="calories" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Save changes</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  