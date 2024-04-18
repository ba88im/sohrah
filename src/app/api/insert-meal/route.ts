
import { db } from "@/lib/db";  // Adjust the path as needed
import { meals } from "@/lib/db/schema";  // Ensure the schema is correctly imported
import { auth } from "@clerk/nextjs";  // Clerk for user authentication
import { NextResponse } from "next/server";

// /api/insert-meal
export async function POST(req: Request, res: Response) {
  // Authentication check
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log(body);

    const { mealType, entries } = body;
    const foodEntries = entries.map((entry: any) => entry.foodName);
    const calories = entries.map((entry: any) => parseFloat(entry.calories));
    const date = new Date(entries[0].dateTime);  // Assuming the date is the same for all entries

    console.log({ mealType, foodEntries, calories, date });
    
    // Insert data into the meals table
    const meal_id = await db
      .insert(meals)
      .values({
        userId: userId,
        mealType: mealType,
        date: date,
        foodEntries: foodEntries,
        calories: calories,
        createdAt: new Date()  // Current time as the creation time
      })
      .returning({
        insertedId: meals.id,
      });

    // Successful response
    return NextResponse.json(
      {
        meal_id: meal_id[0].insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    // Error response
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
