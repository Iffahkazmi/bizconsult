export default function MarketDemand({ data }) {
  const demandColors = {
    high: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Demand Analysis</h2>
      
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
          Demand Level
        </h3>
        <span className={`inline-block px-6 py-3 rounded-lg border-2 font-bold text-lg uppercase ${demandColors[data.marketDemand.level]}`}>
          {data.marketDemand.level} Demand
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
          Market Trends
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {data.marketDemand.trends}
        </p>
      </div>

      {data.marketDemand.searchVolume && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Search Interest
          </h3>
          <p className="text-gray-700">
            {data.marketDemand.searchVolume}
          </p>
        </div>
      )}
    </div>
  );
}