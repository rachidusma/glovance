"use client";

interface CountryData {
  name: string;
  visits: number;
}

interface VisitCountriesProps {
  data: CountryData[] | null;
}

export default function VisitCountries({ data }: VisitCountriesProps) {
  if (!data || data.length === 0) return (
    <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800 col-span-1 lg:col-span-1 flex flex-col items-center justify-center text-gray-400 h-full min-h-[300px]">
      <span className="material-icons-outlined text-4xl mb-2 opacity-50">public</span>
      <p>No country data available yet.</p>
    </div>
  );

  const totalVisits = data.reduce((acc, curr) => acc + curr.visits, 0);

  return (
    <div className="bg-[#112240] rounded-2xl p-6 border border-gray-800 col-span-1 lg:col-span-1 flex flex-col h-full">
      <h2 className="text-white font-semibold flex items-center gap-2 mb-6">
        <span className="material-icons-outlined text-green-400">public</span>
        Top Countries
      </h2>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[250px] custom-scrollbar">
        {data.map((country, index) => {
          const percentage = totalVisits > 0 ? (country.visits / totalVisits) * 100 : 0;
          
          return (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300 font-medium truncate max-w-[150px]" title={country.name}>
                  {country.name}
                </span>
                <span className="text-gray-400 font-semibold">{country.visits} ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
