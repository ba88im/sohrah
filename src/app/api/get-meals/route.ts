
import { db } from "@/lib/db";  
import { eq, desc } from "drizzle-orm";

import { meals } from "@/lib/db/schema";  
import { auth } from "@clerk/nextjs"; 
import { NextResponse } from "next/server";

// /api/get-meals
export async function GET() {
  // Authentication check
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("Heelo from get-meals route");

  try {

    const userMeals = await db
    .select()
    .from(meals)
    .where(eq(meals.userId, userId))

    // Successful response
    return NextResponse.json(
        {userMeals},
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
