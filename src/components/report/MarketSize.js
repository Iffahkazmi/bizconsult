export default function MarketSize({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Size & Revenue Potential</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-blue-600 uppercase mb-2">
            TAM
          </h3>
          <p className="text-xs text-gray-600 mb-3">Total Addressable Market</p>
          <p className="text-lg font-bold text-gray-900">
            {data.marketSize.tam}
          </p>
        </div>

        <div className="bg-indigo-50 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-indigo-600 uppercase mb-2">
            SAM
          </h3>
          <p className="text-xs text-gray-600 mb-3">Serviceable Addressable Market</p>
          <p className="text-lg font-bold text-gray-900">
            {data.marketSize.sam}
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-purple-600 uppercase mb-2">
            SOM
          </h3>
          <p className="text-xs text-gray-600 mb-3">Serviceable Obtainable Market</p>
          <p className="text-lg font-bold text-gray-900">
            {data.marketSize.som}
          </p>
        </div>
      </div>
    </div>
  );
}