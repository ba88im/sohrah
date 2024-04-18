import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { meals } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { OpenAI } from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// api/generate-analysis
export async function GET(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("---- generate-analysis route");
    try {
    const pastMeals = await db.select().from(meals).where(eq(meals.userId, userId));
    const pastMealsString = pastMeals.map(meal => `Meal: ${meal.foodEntries}, Calories: ${meal.calories}`).join('\n');

    console.log("pastMeals", pastMeals)

    const prompt = {
      content: `
      You will analyize the users past meals and show them how  they can reach their goal of eating healthier and mainting a healthy calorie intake.
      You assistant will analyze the user's past meals and provide insights and suggestions.
      START PAST MEALS BLOCK
      ${pastMealsString}
      END OF PAST MEALS BLOCK
      Response in plain text not markdown.
      `,
    };

    console.log("prompt", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "system", content: prompt.content }],
    });

    console.log("response", response.choices[0].message.content);

    // Returning the AI's response as a JSON object in the HTTP response
    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in /api/generate-analysis:", error);

    // Return an error response
    return new NextResponse("Error processing request", {
      status: 500, // Internal Server Error
    });
  }
}
