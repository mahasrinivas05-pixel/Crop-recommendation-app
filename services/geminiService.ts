
import { GoogleGenAI, Type } from "@google/genai";
import { Recommendation, EnvironmentalData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCropRecommendation = async (data: EnvironmentalData): Promise<Recommendation> => {
  const prompt = `Based on a Temperature of ${data.temperature}°C and annual Rainfall of ${data.rainfall}mm, recommend the single most suitable crop using a Decision Tree logic. 
  Explain why this crop is chosen given these specific environmental constraints.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cropName: { type: Type.STRING, description: "Name of the crop" },
          confidence: { type: Type.NUMBER, description: "Confidence score 0-1" },
          description: { type: Type.STRING, description: "Detailed explanation of suitability" },
          plantingSeason: { type: Type.STRING, description: "Optimal planting season" },
          idealRainfall: { type: Type.STRING, description: "Ideal rainfall range" },
          idealTemperature: { type: Type.STRING, description: "Ideal temperature range" },
        },
        required: ["cropName", "confidence", "description", "plantingSeason", "idealRainfall", "idealTemperature"],
      },
    },
  });

  const rawText = response.text;
  const parsed = JSON.parse(rawText);

  // Extract grounding URLs if available
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || 'External Source',
    uri: chunk.web?.uri || '#'
  })) || [];

  return {
    ...parsed,
    sources
  };
};
