'use client';

import { useEffect } from 'react';
import { Languages } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,es,zh-CN,zh-TW,vi,ko,fr,pt,ar,ru,de,it,ja,hi,bn,pa,te,mr,ta,ur,gu,kn,ml,or,pl,uk,ro,nl,tr,th,fil,id,ms,fa,he,sw,am,ne,si,km,my,lo,hy,ka,ti,yo,ha,ig,zu,so,rw,lg,sn,ny,mg,eu,gl,ca,lb,is,ga,cy,mt,sq,bs,hr,sr,mk,bg,be,az,kk,uz,ky,tg,tk,mn,ps,ku,sd,dv,ckb,ug',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Check if script already exists
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }

    return () => {
      // Cleanup on unmount
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-gray-400" />
      <div id="google_translate_element" className="google-translate-wrapper"></div>
      <style jsx global>{`
        .google-translate-wrapper {
          display: inline-block;
        }

        /* Hide Google Translate banner */
        .goog-te-banner-frame {
          display: none !important;
        }

        body {
          top: 0 !important;
        }

        /* Style the Google Translate dropdown */
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
        }

        .goog-te-gadget > span {
          display: none !important;
        }

        .goog-te-gadget .goog-te-combo {
          padding: 6px 8px;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: #374151;
          background-color: white;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
        }

        .goog-te-gadget .goog-te-combo:hover {
          border-color: #d1d5db;
        }

        .goog-te-gadget .goog-te-combo:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Remove Google Translate attribution */
        .goog-logo-link {
          display: none !important;
        }

        .goog-te-gadget > div > a {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
