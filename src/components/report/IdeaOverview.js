export default function IdeaOverview({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Idea Overview</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Business Concept
          </h3>
          <p className="text-gray-900">{data.ideaOverview.restatedIdea}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Category
          </h3>
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
            {data.ideaOverview.category}
          </span>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Target Audience
          </h3>
          <p className="text-gray-900">{data.ideaOverview.targetAudience}</p>
        </div>
      </div>
    </div>
  );
}