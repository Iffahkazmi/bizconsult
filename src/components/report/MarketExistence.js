export default function MarketExistence({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Existence</h2>
      
      <div className="mb-6">
        {data.marketExistence.exists ? (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <p className="text-lg font-medium text-gray-900">
              Similar solutions already exist in the market
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-lg font-medium text-gray-900">
              No direct competitors found - untapped market
            </p>
          </div>
        )}
      </div>

      {data.marketExistence.competitors && data.marketExistence.competitors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Competitors</h3>
          <div className="space-y-4">
            {data.marketExistence.competitors.map((competitor, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">{competitor.name}</h4>
                <p className="text-gray-700 mb-3">{competitor.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-green-700 mb-1">Strengths</p>
                    <p className="text-sm text-gray-600">{competitor.strengths}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-700 mb-1">Weaknesses</p>
                    <p className="text-sm text-gray-600">{competitor.weaknesses}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}