# AI-Powered Recipe Recommendation System

An intelligent web application that generates personalized recipe recommendations using computer vision and natural language processing. Upload photos of your ingredients or enter them manually, and let AI create delicious recipes tailored to what you have.

## Features

- **Image Recognition**: Upload photos of ingredients and AI automatically detects them using GPT-4 Vision
- **Manual Input**: Add and edit ingredients manually with customizable quantities
- **Dynamic Recipe Generation**: Get 3 personalized recipe recommendations based on your available ingredients
- **Smart Recipe Details**: Each recipe includes prep time, servings, difficulty level, complete instructions, and pro tips
- **Responsive Design**: Beautiful, modern UI that works on desktop and mobile
- **Real-time Updates**: Modify ingredient quantities and regenerate recipes instantly

## Technology Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI/ML**: OpenAI GPT-4 Vision & GPT-4 for ingredient detection and recipe generation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## How It Works

1. **Ingredient Input**: Users can either:
   - Upload/drag-drop photos of ingredients (AI detects them automatically)
   - Manually type ingredient names and quantities

2. **Image Analysis**: When an image is uploaded, GPT-4 Vision analyzes it and extracts visible ingredients

3. **Recipe Generation**: Based on the ingredient list, GPT-4 generates 3 diverse, practical recipes with:
   - Complete ingredient lists (including common pantry items)
   - Step-by-step instructions
   - Preparation time and difficulty level
   - Professional cooking tips

4. **Dynamic Updates**: Users can modify ingredients and regenerate recipes instantly

## Why Web App?

This application is built as a web app (rather than mobile or desktop) because:

- **Universal Accessibility**: Works on any device with a browser (desktop, mobile, tablet)
- **No Installation Required**: Users can access instantly without app store downloads
- **Easy Updates**: Changes deploy globally without user action
- **Cross-Platform**: Single codebase works on iOS, Android, Windows, Mac, Linux
- **SEO & Shareability**: Recipes can be easily shared via URLs
- **Cost Effective**: Simpler deployment and maintenance than native apps

## Demo Mode

The app includes fallback demo data if the OpenAI API key is not configured, allowing you to test the UI without an API key.

## License

MIT
