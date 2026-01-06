
export interface Recommendation {
  cropName: string;
  confidence: number;
  description: string;
  plantingSeason: string;
  idealRainfall: string;
  idealTemperature: string;
  sources: Array<{ title: string; uri: string }>;
}

export interface EnvironmentalData {
  temperature: number;
  rainfall: number;
}

export interface CropDataPoint {
  name: string;
  minTemp: number;
  maxTemp: number;
  minRain: number;
  maxRain: number;
}
