export default function Sources({ data }) {
  if (!data.sources || data.sources.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sources & References</h2>
      
      <p className="text-gray-600 mb-6">
        This analysis was based on the following sources:
      </p>

      <div className="space-y-3">
        {data.sources.map((source, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-blue-600 font-semibold">[{index + 1}]</span>
            <div>
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {source.title}
              </a>
              <p className="text-xs text-gray-500 mt-1">{source.url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}