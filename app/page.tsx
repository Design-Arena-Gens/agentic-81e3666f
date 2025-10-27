'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import IngredientsList from '@/components/IngredientsList';
import RecipeResults from '@/components/RecipeResults';
import { ChefHat, Sparkles } from 'lucide-react';

export default function Home() {
  const [ingredients, setIngredients] = useState<Array<{ name: string; quantity: string }>>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleIngredientsDetected = (detectedIngredients: string[]) => {
    const newIngredients = detectedIngredients.map(name => ({
      name,
      quantity: '1 unit'
    }));
    setIngredients(prev => [...prev, ...newIngredients]);
  };

  const handleAddIngredient = (name: string, quantity: string) => {
    setIngredients(prev => [...prev, { name, quantity }]);
  };

  const handleUpdateIngredient = (index: number, name: string, quantity: string) => {
    setIngredients(prev => {
      const updated = [...prev];
      updated[index] = { name, quantity };
      return updated;
    });
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleGetRecipes = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Failed to get recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-12 h-12 text-primary-600" />
            <h1 className="text-5xl font-bold text-gray-900">AI Recipe Recommender</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload photos or enter ingredients manually, and let AI create personalized recipes just for you
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary-600" />
                Add Ingredients
              </h2>
              <ImageUpload onIngredientsDetected={handleIngredientsDetected} />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <IngredientsList
                ingredients={ingredients}
                onAdd={handleAddIngredient}
                onUpdate={handleUpdateIngredient}
                onRemove={handleRemoveIngredient}
              />

              {ingredients.length > 0 && (
                <button
                  onClick={handleGetRecipes}
                  disabled={loading}
                  className="w-full mt-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating Recipes...
                    </>
                  ) : (
                    <>
                      <ChefHat className="w-5 h-5" />
                      Get Recipe Recommendations
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <RecipeResults recipes={recipes} loading={loading} />
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>Powered by AI Vision & Natural Language Processing</p>
        </footer>
      </div>
    </div>
  );
}
