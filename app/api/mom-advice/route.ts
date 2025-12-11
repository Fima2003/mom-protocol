import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { activities } = await request.json();

    if (!activities || activities.length === 0) {
      return NextResponse.json({
        message: "Start with some water, sweetheart. Stay hydrated!",
        face: '😔'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const activityList = activities.map((a: { type: string; detail: string; timestamp: number }) => 
      `- ${a.type}: ${a.detail}`
    ).join('\n');

    const prompt = `You are a caring, warm mother taking care of her sick child. Based on these activities they've done today:

${activityList}

Give motherly advice in EXACTLY 10-12 words. Either:
1) Tell them what to do next (like "Now rest a bit" or "Drink more water")
2) Give a warm wish (like "Good job sweetie, you're doing great")

Be loving, supportive, and natural like a real mom. Keep it brief and warm.

Response (10-12 words only):`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let message = response.text().trim();

    // Remove quotes if present
    message = message.replace(/^["']|["']$/g, '');

    // Determine emoji based on activity count
    let face = '😔';
    if (activities.length > 5) {
      face = '😊';
    } else if (activities.length > 2) {
      face = '😐';
    }

    return NextResponse.json({ message, face });
  } catch (error) {
    console.error('Error getting mom advice:', error);
    return NextResponse.json({
      message: "Mom loves you, dear. Just rest and take care.",
      face: '💝'
    });
  }
}
