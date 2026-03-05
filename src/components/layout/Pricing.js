export default function Pricing() {
  const plans = [
    {
      name: 'Free Trial',
      price: '₹0',
      priceUSD: '$0',
      description: 'Perfect to test the platform',
      features: [
        '1 full business analysis',
        'Comprehensive market research',
        'Competitor analysis',
        'Downloadable PDF report',
        'AI-powered insights',
      ],
      cta: 'Start Free',
      highlighted: false,
    },
    {
      name: 'Per Session',
      price: '₹199',
      priceUSD: '$2.99',
      description: 'Pay as you go',
      features: [
        'Everything in Free Trial',
        '24-hour AI chat session',
        'Deep-dive Q&A on your report',
        'Follow-up questions',
        'Export chat history',
      ],
      cta: 'Get Started',
      highlighted: true,
    },
    {
      name: 'Monthly',
      price: '₹999/mo',
      priceUSD: '$12.99/mo',
      description: 'Best for serious founders',
      features: [
        'Everything in Per Session',
        'Unlimited reports',
        'Unlimited AI chat sessions',
        'Priority support',
        'Early access to new features',
      ],
      cta: 'Subscribe Now',
      highlighted: false,
    },
  ];

  return (
    <div id="pricing" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.highlighted
                  ? 'border-2 border-blue-600 shadow-xl transform scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-500 ml-2">
                  ({plan.priceUSD})
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="/signup"
                className={`block w-full py-3 px-6 text-center font-semibold rounded-lg transition ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Fine Print */}
        <p className="text-center text-gray-500 mt-12 text-sm">
          All prices include applicable taxes. Cancel anytime, no questions asked.
        </p>
      </div>
    </div>
  );
}