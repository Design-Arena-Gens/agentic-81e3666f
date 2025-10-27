import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key',
});

interface Ingredient {
  name: string;
  quantity: string;
}

export async function POST(request: NextRequest) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'No ingredients provided' },
        { status: 400 }
      );
    }

    const ingredientsList = ingredients
      .map((ing: Ingredient) => `${ing.name} (${ing.quantity})`)
      .join(', ');

    const prompt = `You are an expert chef and recipe creator. Given the following ingredients: ${ingredientsList}

Create 3 diverse, delicious recipes that use as many of these ingredients as possible. For each recipe, provide:

1. Recipe name
2. Brief description (1-2 sentences)
3. Preparation time
4. Number of servings
5. Difficulty level (easy/medium/hard)
6. Complete ingredient list with measurements (can include common pantry items like salt, pepper, oil)
7. Step-by-step instructions
8. One helpful cooking tip

Format the response as valid JSON with this structure:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "description": "Description",
      "prepTime": "30 minutes",
      "servings": 4,
      "difficulty": "medium",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "instructions": ["step 1", "step 2"],
      "tips": "Helpful tip"
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional chef who creates delicious, practical recipes. Always respond with valid JSON only, no additional text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content || '{"recipes":[]}';
    const recipesData = JSON.parse(content);

    return NextResponse.json(recipesData);
  } catch (error: any) {
    console.error('Error generating recipes:', error);

    // Fallback to demo mode if API key is not configured
    if (error?.status === 401 || !process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        recipes: [
          {
            name: 'Classic Tomato Basil Pasta',
            description: 'A simple yet delicious Italian pasta dish with fresh ingredients and aromatic herbs.',
            prepTime: '25 minutes',
            servings: 4,
            difficulty: 'easy',
            ingredients: [
              '400g pasta',
              '4 large tomatoes, diced',
              '3 cloves garlic, minced',
              '1/4 cup olive oil',
              'Fresh basil leaves',
              'Salt and pepper to taste',
              'Parmesan cheese (optional)',
            ],
            instructions: [
              'Bring a large pot of salted water to boil and cook pasta according to package directions.',
              'While pasta cooks, heat olive oil in a large pan over medium heat.',
              'Add minced garlic and sauté for 1 minute until fragrant.',
              'Add diced tomatoes and cook for 8-10 minutes until they break down.',
              'Season with salt and pepper, then stir in torn basil leaves.',
              'Drain pasta and toss with the tomato sauce.',
              'Serve hot with grated Parmesan if desired.',
            ],
            tips: 'Use the ripest tomatoes you can find for the best flavor. San Marzano tomatoes work exceptionally well.',
          },
        ],
        demo: true,
      });
    }

    return NextResponse.json(
      { error: 'Failed to generate recipes', details: error.message },
      { status: 500 }
    );
  }
}
