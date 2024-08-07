import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        //Message from the user
        const { message } = await request.json();
        const { searchParams } = new URL(request.url);
        const prompt = searchParams.get('prompt');

        if (!prompt) {
            throw new Error('Prompt is required');
        }

        //API info
        const API_KEY = process.env.OPENAI_API_KEY;
        const API_URL = 'https://api.openai.com/v1/chat/completions';
        
        //Headers needed
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        };

        //Data for OpenAI model containes user's message
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: prompt},
                { role: 'user', content: message},
            ],
            max_tokens: 60,
        };
        //Wait for response that includes header and data
        const response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to get response');
        }

        const aiResponse = await response.json();
        return NextResponse.json(aiResponse);

    } catch (error) {
        console.error('Error fetching AI response:', error);
        return NextResponse.json({ error: 'Failed to fetch AI response' + error}, { status: 500 });
    }
}
