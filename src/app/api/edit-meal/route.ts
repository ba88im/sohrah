
import { db } from "@/lib/db";  
import { eq, desc, and, gte, lte} from "drizzle-orm";

import { meals } from "@/lib/db/schema";  
import { auth } from "@clerk/nextjs"; 
import { NextResponse } from "next/server";


// /api/edit-meal
export async function POST(req: Request, res: Response) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("---- edit-meal route");

  
    const { id, mealType, calories } = await req.json();
    const caloriesArray = Array.isArray(calories) ? calories : [calories];

    console.log(id, mealType, calories);  

    try {
        const updated = await db.update(meals)
        .set({ 
            mealType:mealType, 
            calories:caloriesArray
         })
        .where(eq(meals.id, id))
        .returning({ updatedCalories: meals.calories });

        console.log("Updated calories: ", updated);


        return NextResponse.json(
            { status: 200 }
        );
    } catch (error) {
      console.error(error);
      NextResponse.json({ error: "Internal Server Error" });
    }
  }
  