export default function CustomerPainPoints({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Pain Points</h2>
      
      <p className="text-gray-600 mb-6">
        Key problems your target audience is experiencing that your idea could solve:
      </p>

      <div className="space-y-4">
        {data.customerPainPoints.map((painPoint, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-orange-50 border-l-4 border-orange-400 rounded">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <p className="text-gray-700 flex-1">{painPoint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}