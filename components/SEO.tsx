import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = [], 
  canonicalUrl = window.location.href,
  type = 'website'
}) => {
  useEffect(() => {
    document.title = `${title} | DSP-JAR`;
    
    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateOgMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords.join(', '));
    updateOgMeta('og:title', title);
    updateOgMeta('og:description', description);
    updateOgMeta('og:type', type);
    updateOgMeta('og:url', canonicalUrl);
    
    // Structured Data (JSON-LD)
    const scriptId = 'json-ld-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? "ScholarlyArticle" : "WebSite",
      "headline": title,
      "description": description,
      "publisher": {
        "@type": "Organization",
        "name": "Delta State Polytechnic Journal of Academic Research"
      }
    };
    
    script.text = JSON.stringify(structuredData);

  }, [title, description, keywords, canonicalUrl, type]);

  return null; // This component handles side effects only
};

export default SEO;