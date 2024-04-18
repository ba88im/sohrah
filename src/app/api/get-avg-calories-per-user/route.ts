// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import { meals } from "@/lib/db/schema";
// import { avg } from "drizzle-orm";

// // /api/get-avg-calories-per-user
// export async function GET(req: Request, res: Response) {
//     try {
//         // Calculate the average calories for all meals in the database
//         // const result = await db
//         //     .select(avg(meals.calories).as('avgCalories'))
//         //     .from(meals);

//         // // Extract the average calories value
//         // const avgCalories = result[0].avgCalories;

//         // // Assuming you have a way to fetch all user IDs
//         // const users = await db
//         // .select()
//         // .from(meals)
//         // .where(userId)

//         // // Create an array with average calories for each user
//         // const avgCaloriesPerUser = users.map(user => ({
//         //     userId: user.userId,
//         //     avgCalories: avgCalories
//         // }));

//         // // Successful response
//         // return NextResponse.json(
//         //     avgCaloriesPerUser,
//         //     { status: 200 }
//         // );

//     } catch (error) {
//         console.error("Error calculating average calories: ", error);
//         // Error response
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }
