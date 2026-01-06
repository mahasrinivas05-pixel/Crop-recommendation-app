
import React, { useState } from 'react';
import InputSection from './components/InputSection';
import CropResult from './components/CropResult';
import DataViz from './components/DataViz';
import { Recommendation } from './types';
import { getCropRecommendation } from './services/geminiService';

const App: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(25);
  const [rainfall, setRainfall] = useState<number>(1000);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCropRecommendation({ temperature, rainfall });
      setRecommendation(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-emerald-100 pb-20">
      {/* Header */}
      <header className="bg-emerald-800 text-white py-12 px-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900 rounded-full translate-y-1/2 -translate-x-1/4 opacity-30 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                AI Powered
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4">
              <i className="fas fa-leaf text-emerald-300"></i>
              AgriSmart Recommender
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl max-w-xl opacity-90 leading-relaxed">
              Optimizing crop yields using Decision Tree classification models. 
              Find the perfect match for your local climate data.
            </p>
          </div>
          
          <div className="hidden lg:block bg-emerald-700/30 backdrop-blur-md p-6 rounded-2xl border border-emerald-600/50 max-w-sm">
            <h3 className="text-sm font-bold uppercase mb-2 text-emerald-200">System Criteria</h3>
            <ul className="text-sm space-y-2 text-emerald-50">
              <li className="flex items-center gap-2">
                <i className="fas fa-check-circle text-emerald-400"></i> Decision Tree Classification
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-check-circle text-emerald-400"></i> Real-time Grounding
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-check-circle text-emerald-400"></i> Multi-variant Analysis
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs & Viz */}
          <div className="lg:col-span-5 space-y-8">
            <InputSection 
              temperature={temperature}
              rainfall={rainfall}
              onTemperatureChange={setTemperature}
              onRainfallChange={setRainfall}
              onSubmit={handleAnalyze}
              loading={loading}
            />
            
            <DataViz />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3 mb-6">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            {!recommendation && !loading && (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 border-dashed">
                <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-search text-3xl text-stone-300"></i>
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">Ready for Analysis</h3>
                <p className="text-stone-500">
                  Select your environmental parameters on the left and click "Generate Recommendation" to see the magic happen.
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-6">
                <div className="flex justify-center">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-stone-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                </div>
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-stone-100 rounded-full w-48 mx-auto"></div>
                  <div className="h-3 bg-stone-100 rounded-full w-32 mx-auto"></div>
                </div>
                <p className="text-stone-500 font-medium">Processing through Decision Tree model...</p>
              </div>
            )}

            {recommendation && !loading && (
              <CropResult recommendation={recommendation} />
            )}
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 border-t border-stone-200 pt-10 text-center">
        <p className="text-stone-400 text-sm flex items-center justify-center gap-2">
          Designed for Excellence in Agriculture <i className="fas fa-shield-alt"></i> 2024
        </p>
      </footer>
    </div>
  );
};
import streamlit as st
import time

st.title("🌾 AgriSmart Recommender")
st.write("Optimizing crop yields using Decision Tree classification models.")

# Sidebar inputs
temperature = st.sidebar.slider("Temperature (°C)", 0, 50, 25)
rainfall = st.sidebar.slider("Rainfall (mm)", 0, 300, 100)

# Recommendation logic
def get_crop_recommendation(temp, rain):
    if temp > 30 and rain < 50:
        return "🌽 Maize"
    elif rain > 200:
        return "🌾 Rice"
    else:
        return "🥬 Vegetables"

# Button to generate recommendation
if st.button("Generate Recommendation"):
    st.info("Processing…")
    time.sleep(1)
    recommendation = get_crop_recommendation(temperature, rainfall)
    st.success(f"Recommended Crop: {recommendation}")
export default App;
