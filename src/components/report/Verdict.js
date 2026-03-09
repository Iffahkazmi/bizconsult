export default function Verdict({ data }) {
  const verdictConfig = {
    go: {
      color: 'bg-green-500',
      icon: '✓',
      title: 'GO - Proceed with This Idea',
      description: 'This idea shows strong potential and viability',
    },
    nogo: {
      color: 'bg-red-500',
      icon: '✗',
      title: 'NO-GO - Reconsider This Idea',
      description: 'This idea faces significant challenges',
    },
    pivot: {
      color: 'bg-yellow-500',
      icon: '↻',
      title: 'PIVOT - Modify Your Approach',
      description: 'This idea needs refinement before proceeding',
    },
  };

  const config = verdictConfig[data.verdict.decision];

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Final Verdict</h2>
      
      <div className={`${config.color} text-white rounded-lg p-8 mb-6`}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{config.icon}</span>
          <div>
            <h3 className="text-2xl font-bold">{config.title}</h3>
            <p className="text-white/90">{config.description}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Reasoning</h3>
        <p className="text-gray-700 leading-relaxed">
          {data.verdict.reasoning}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-gray-500 uppercase">
          Confidence Level:
        </h3>
        <span className={`px-4 py-1 rounded-full font-medium ${
          data.verdict.confidence === 'high' ? 'bg-green-100 text-green-800' :
          data.verdict.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {data.verdict.confidence.toUpperCase()}
        </span>
      </div>
    </div>
  );
}