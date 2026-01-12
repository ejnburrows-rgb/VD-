import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface RequestBody {
  text: string;
  language: string;
}

export async function POST(request: Request) {
  try {
    const { text, language }: RequestBody = await request.json();

    if (!text || !language) {
      return NextResponse.json(
        { error: 'Missing text or language' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze the following decima in ${language} language:\n\n${text}\n\nProvide the following in JSON format: {"analysis": "<overall_analysis>", "structure": "<structure_description>", "themes": "<themes_list>", "rhymeScheme": "<rhyme_scheme>", "improvements": "<suggested_improvements>"}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    // Parse the JSON response from Gemini
    let analysisJson;
    try {
      analysisJson = JSON.parse(analysis);
    } catch (e) {
      return NextResponse.json(
        { error: 'Failed to parse analysis response' },
        { status: 500 }
      );
    }

    return NextResponse.json(analysisJson);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 503 }
    );
  }
}
