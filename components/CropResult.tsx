
import React from 'react';
import { Recommendation } from '../types';

interface CropResultProps {
  recommendation: Recommendation;
}

const CropResult: React.FC<CropResultProps> = ({ recommendation }) => {
  const placeholderImage = `https://picsum.photos/seed/${recommendation.cropName}/800/400`;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200">
        <div className="relative h-64 w-full">
          <img 
            src={placeholderImage} 
            alt={recommendation.cropName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <h3 className="text-4xl font-bold text-white drop-shadow-md">
              {recommendation.cropName}
            </h3>
          </div>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <i className="fas fa-calendar-alt"></i> {recommendation.plantingSeason}
            </div>
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <i className="fas fa-cloud-showers-heavy"></i> {recommendation.idealRainfall}
            </div>
            <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <i className="fas fa-thermometer-half"></i> {recommendation.idealTemperature}
            </div>
          </div>

          <div className="prose prose-stone max-w-none">
            <p className="text-lg text-stone-700 leading-relaxed italic border-l-4 border-emerald-500 pl-4 py-2">
              {recommendation.description}
            </p>
          </div>

          {recommendation.sources.length > 0 && (
            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">Verification Sources</h4>
              <ul className="space-y-2">
                {recommendation.sources.map((source, idx) => (
                  <li key={idx}>
                    <a 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-2 transition-colors"
                    >
                      <i className="fas fa-external-link-alt text-xs"></i>
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropResult;
