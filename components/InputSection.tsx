
import React from 'react';

interface InputSectionProps {
  temperature: number;
  rainfall: number;
  onTemperatureChange: (val: number) => void;
  onRainfallChange: (val: number) => void;
  onSubmit: () => void;
  loading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  temperature,
  rainfall,
  onTemperatureChange,
  onRainfallChange,
  onSubmit,
  loading,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-stone-800 mb-6 flex items-center gap-2">
        <i className="fas fa-seedling text-emerald-600"></i>
        Environmental Parameters
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-2">
            Average Temperature (°C)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="-10"
              max="50"
              step="0.5"
              value={temperature}
              onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-lg font-bold text-emerald-700 w-12">{temperature}°</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-2">
            Annual Rainfall (mm)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={rainfall}
              onChange={(e) => onRainfallChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-lg font-bold text-emerald-700 w-16">{rainfall}</span>
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={loading}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
            loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg'
          }`}
        >
          {loading ? (
            <><i className="fas fa-circle-notch fa-spin"></i> Analyzing...</>
          ) : (
            <><i className="fas fa-magic"></i> Generate Recommendation</>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
