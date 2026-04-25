import { useEffect, useState } from 'react';

// Display Ad Component (Responsive)
export const DisplayAd = ({ slot, format = 'auto', responsive = true }) => {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      // Check if adsbygoogle is available
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
      setAdError(true);
    }
  }, []);

  // Don't render anything if there's an error
  if (adError) return null;

  return (
    <div className="adsense-container my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1991868249892836"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </div>
  );
};

// In-Article Ad Component
export const InArticleAd = ({ slot }) => {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
      setAdError(true);
    }
  }, []);

  if (adError) return null;

  return (
    <div className="adsense-container my-6">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-1991868249892836"
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout="in-article"
      ></ins>
    </div>
  );
};

// Sidebar Ad Component
export const SidebarAd = ({ slot }) => {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
      setAdError(true);
    }
  }, []);

  if (adError) return null;

  return (
    <div className="adsense-container sticky top-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1991868249892836"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

// Horizontal Banner Ad
export const BannerAd = ({ slot }) => {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
      setAdError(true);
    }
  }, []);

  if (adError) return null;

  return (
    <div className="adsense-container my-4 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '728px', height: '90px' }}
        data-ad-client="ca-pub-1991868249892836"
        data-ad-slot={slot}
      ></ins>
    </div>
  );
};

// Multiplex Ad (Related Content)
export const MultiplexAd = ({ slot }) => {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
      setAdError(true);
    }
  }, []);

  if (adError) return null;

  return (
    <div className="adsense-container my-6">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1991868249892836"
        data-ad-slot={slot}
        data-ad-format="autorelaxed"
      ></ins>
    </div>
  );
};

export default DisplayAd;
