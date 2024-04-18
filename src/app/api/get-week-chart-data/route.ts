
import { db } from "@/lib/db";  
import { eq, desc, and, gte, lte, lt} from "drizzle-orm";

import { meals } from "@/lib/db/schema";  
import { auth } from "@clerk/nextjs"; 
import { NextResponse } from "next/server";

// /api/get-week-chart-data
export async function GET() {
  // Authentication check
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("--- api/get-week-chart-data");

  try {

    const today = new Date();
    const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
    const lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const thisWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  
    console.log(lastWeekStart, lastWeekEnd, thisWeekStart, today);    
    
    const lastWeekData = await db
      .select()
      .from(meals)
      .where(
          and(
              eq(meals.userId, userId),
              gte(meals.createdAt, lastWeekStart),
              lte(meals.createdAt, lastWeekEnd)
          )
      );

  
    console.log("Last Week Data: ", lastWeekData);

    const thisWeekData = await db
    .select()
    .from(meals)
    .where(
        and(
            gte(meals.createdAt, thisWeekStart),
            lte(meals.createdAt, today)
        )
    );
  
      console.log("This Week Data: ", thisWeekData);
  
      // Successful response
    return NextResponse.json(
        {lastWeekData, thisWeekData},
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
