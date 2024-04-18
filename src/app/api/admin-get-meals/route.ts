
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

  console.log("api get-meals route");

  try {

    const allUserMeals = await db
    .select()
    .from(meals)

    console.log(allUserMeals);

    // Successful response
    return NextResponse.json(
        {allUserMeals},
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
