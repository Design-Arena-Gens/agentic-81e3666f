'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onIngredientsDetected: (ingredients: string[]) => void;
}

export default function ImageUpload({ onIngredientsDetected }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const base64 = reader.result as string;
      setPreview(base64);

      setLoading(true);
      try {
        const response = await fetch('/api/analyze-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });

        const data = await response.json();
        if (data.ingredients && data.ingredients.length > 0) {
          onIngredientsDetected(data.ingredients);
        } else {
          alert('No ingredients detected. Please try another image or add ingredients manually.');
        }
      } catch (error) {
        console.error('Error analyzing image:', error);
        alert('Failed to analyze image. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  }, [onIngredientsDetected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false,
    maxSize: 10485760, // 10MB
  });

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-3 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            {isDragActive ? (
              <Camera className="w-16 h-16 text-primary-500" />
            ) : (
              <Upload className="w-16 h-16 text-gray-400" />
            )}
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragActive ? 'Drop your image here' : 'Upload ingredient photo'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag & drop or click to select (PNG, JPG, WEBP)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl"
          />
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
              <div className="text-white text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-2" />
                <p className="font-semibold">Analyzing ingredients...</p>
              </div>
            </div>
          )}
          {!loading && (
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
