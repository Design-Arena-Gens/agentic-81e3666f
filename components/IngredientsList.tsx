'use client';

import { useState } from 'react';
import { Plus, X, Edit2, Check } from 'lucide-react';

interface Ingredient {
  name: string;
  quantity: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  onAdd: (name: string, quantity: string) => void;
  onUpdate: (index: number, name: string, quantity: string) => void;
  onRemove: (index: number) => void;
}

export default function IngredientsList({
  ingredients,
  onAdd,
  onUpdate,
  onRemove,
}: IngredientsListProps) {
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      onAdd(newName.trim(), newQuantity.trim() || '1 unit');
      setNewName('');
      setNewQuantity('');
    }
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditName(ingredients[index].name);
    setEditQuantity(ingredients[index].quantity);
  };

  const saveEdit = () => {
    if (editIndex !== null && editName.trim()) {
      onUpdate(editIndex, editName.trim(), editQuantity.trim() || '1 unit');
      setEditIndex(null);
      setEditName('');
      setEditQuantity('');
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditName('');
    setEditQuantity('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Your Ingredients</h3>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ingredient name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="text"
          placeholder="Quantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleAdd}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>

      {ingredients.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No ingredients yet. Upload a photo or add manually.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition-colors"
            >
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    className="w-28 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={saveEdit}
                    className="text-green-600 hover:text-green-700 p-1"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-600 hover:text-gray-700 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 font-medium text-gray-800">
                    {ingredient.name}
                  </span>
                  <span className="text-sm text-gray-600 w-28">
                    {ingredient.quantity}
                  </span>
                  <button
                    onClick={() => startEdit(index)}
                    className="text-blue-600 hover:text-blue-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemove(index)}
                    className="text-red-600 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
