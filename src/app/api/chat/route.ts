import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = <string>process.env.GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(apiKey)

export async function POST(req: Request) {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash'
        })

        const chat = model.startChat({
            generationConfig: {
                maxOutputTokens: 100
            }
        })

        const message = await req.json()

        const result = await chat.sendMessageStream(message.messageText)

        let text = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            text += chunkText;
        }

        return NextResponse.json( result )

    } catch (error) {
        console.error("Error in API route", error)

        return NextResponse.json(
            { error: 'An error occurred while processing your request.' },
            { status: 500 }
        )
    }
}