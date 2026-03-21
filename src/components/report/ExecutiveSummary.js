export default function ExecutiveSummary({ data }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        {data.executiveSummary}
      </p>
    </div>
  );
}