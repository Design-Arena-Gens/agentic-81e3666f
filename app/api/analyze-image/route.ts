import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key',
});

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Use GPT-4 Vision to analyze the image
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this image and identify all food ingredients visible. List only the ingredient names, one per line. Be specific (e.g., "red bell pepper" not just "pepper"). If you see packaged items, identify the ingredient inside. Only list actual food ingredients, not utensils or containers.',
            },
            {
              type: 'image_url',
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || '';
    const ingredients = content
      .split('\n')
      .map(line => line.replace(/^[-*•]\s*/, '').trim())
      .filter(line => line.length > 0 && !line.match(/^(ingredients?|found|detected|visible)/i));

    return NextResponse.json({ ingredients });
  } catch (error: any) {
    console.error('Error analyzing image:', error);

    // Fallback to demo mode if API key is not configured
    if (error?.status === 401 || !process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        ingredients: ['tomatoes', 'onions', 'garlic', 'olive oil', 'basil'],
        demo: true,
      });
    }

    return NextResponse.json(
      { error: 'Failed to analyze image', details: error.message },
      { status: 500 }
    );
  }
}
