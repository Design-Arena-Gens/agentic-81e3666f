'use client';

import { Clock, Users, ChefHat } from 'lucide-react';

interface Recipe {
  name: string;
  description: string;
  prepTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  tips?: string;
}

interface RecipeResultsProps {
  recipes: Recipe[];
  loading: boolean;
}

export default function RecipeResults({ recipes, loading }: RecipeResultsProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Creating your recipes...</p>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-gray-500">
          <ChefHat className="w-20 h-20 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Add ingredients and click "Get Recipe Recommendations" to start</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Recipe Recommendations</h2>

      <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-orange-50 border border-orange-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{recipe.name}</h3>
            <p className="text-gray-600 mb-4">{recipe.description}</p>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className="w-4 h-4 text-primary-600" />
                <span>{recipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Users className="w-4 h-4 text-primary-600" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <ChefHat className="w-4 h-4 text-primary-600" />
                <span className="capitalize">{recipe.difficulty}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Ingredients:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="text-sm">{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {recipe.instructions.map((instruction, i) => (
                  <li key={i} className="text-sm">{instruction}</li>
                ))}
              </ol>
            </div>

            {recipe.tips && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-yellow-800">Pro Tip:</strong> {recipe.tips}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
