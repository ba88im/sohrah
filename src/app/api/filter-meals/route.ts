
import { db } from "@/lib/db";  
import { eq, desc, and, gte, lte} from "drizzle-orm";

import { meals } from "@/lib/db/schema";  
import { auth } from "@clerk/nextjs"; 
import { NextResponse } from "next/server";
import { useSearchParams } from 'next/navigation'


// /api/filter-meals
export async function GET(req: Request, res: Response) {
    // Authentication check
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Hello from filter-meals route");
    const url = new URL(req.url, `http://${req.url}`);
    const startDate = url.searchParams.get('start');
    const endDate = url.searchParams.get('end');
  
    console.log("Start Date: ", startDate);
    console.log("End Date: ", endDate);

    // Check if startDate and endDate are not null before using them
    if (startDate === null || endDate === null) {
        return NextResponse.json({ error: "Missing start or end date" }, { status: 400 });
    }

    console.log("Hello from filter-meals route");
    console.log("Start Date: ", startDate);
    console.log("End Date: ", endDate);

    try {
        const filteredMeals = await db
        .select()
        .from(meals)
        .where(
            and(
                eq(meals.userId, userId),
                gte(meals.date, new Date(startDate)),
                lte(meals.date, new Date(endDate))
            )
        );
        // Successful response
        return NextResponse.json(
            { filteredMeals },
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
