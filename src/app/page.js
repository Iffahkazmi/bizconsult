import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/layout/Hero';
import HowItWorks from '@/components/layout/HowItWorks';
import Pricing from '@/components/layout/Pricing';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'BizConsult AI - AI-Powered Business Idea Analysis',
  description: 'Get instant AI-powered market research, competitor analysis, and feasibility reports for your business idea. Free first report, results in 5 minutes.',
  keywords: 'business idea validation, market research, AI analysis, startup feasibility, competitor analysis',
  openGraph: {
    title: 'BizConsult AI - Validate Your Business Idea',
    description: 'AI-powered market research and competitor analysis in minutes',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}