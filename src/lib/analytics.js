/**
 * Google Analytics setup
 * Add your GA4 Measurement ID before launch
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track report generation
export const trackReportGenerated = (ideaCategory) => {
  event({
    action: 'report_generated',
    category: 'engagement',
    label: ideaCategory,
  });
};

// Track chat message
export const trackChatMessage = () => {
  event({
    action: 'chat_message_sent',
    category: 'engagement',
  });
};

// Track signup
export const trackSignup = (method) => {
  event({
    action: 'sign_up',
    category: 'conversion',
    label: method,
  });
};