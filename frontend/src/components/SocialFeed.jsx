import React, { useEffect } from 'react';

export default function SocialFeed() {
  useEffect(() => {
    // Inject the script provided by Curator
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'UTF-8';
    script.src = "https://cdn.curator.io/published/2d82eaf4-5c26-4e9f-bd70-b5e835c95fc3.js";

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    return () => {
      // Clean up script when leaving the page
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Community Updates</h2>
          <p className="text-gray-500 font-medium">Follow us on social media to see the latest success stories and tech news.</p>
        </div>
        
        {/* Curator Feed Container */}
        <div id="curator-feed-default-feed-layout" className="rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg">
          <a href="https://curator.io" target="_blank" rel="noreferrer" className="crt-logo crt-tag">
            Powered by Curator.io
          </a>
        </div>
      </div>
    </section>
  );
}