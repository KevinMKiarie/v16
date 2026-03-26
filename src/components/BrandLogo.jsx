import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function BrandLogo({ className = "", showText = false }) {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        // Try multiple domain variations for Brandfetch
        const domains = ['nexuscale.ai', 'nexuscale.com', 'www.nexuscale.ai'];
        
        for (const domain of domains) {
          try {
            const response = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
              headers: {
                'Accept': 'application/json',
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              
              // Try to get the logo - Brandfetch returns logos in different formats
              if (data.logos && data.logos.length > 0) {
                // Prefer icon first, then logo
                const icon = data.logos.find(logo => logo.type === 'icon') || 
                            data.logos.find(logo => logo.type === 'logo') ||
                            data.logos[0];
                
                if (icon && icon.image) {
                  setLogoUrl(icon.image);
                  setLoading(false);
                  return;
                }
              }
            }
          } catch (err) {
            // Try next domain
            continue;
          }
        }
      } catch (error) {
        console.log('Could not fetch logo from Brandfetch, using fallback');
      }
      setLoading(false);
    };

    fetchLogo();
  }, []);

  if (loading || !logoUrl) {
    // Fallback to gradient icon matching the design - square with rounded corners, blue-purple gradient
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/10">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {showText && (
          <span className="font-bold text-white text-xl tracking-tight">Nexuscale</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoUrl} 
        alt="Nexuscale" 
        className="w-10 h-10 object-contain rounded-xl"
        onError={() => {
          // Fallback if image fails to load
          setLogoUrl(null);
        }}
      />
      {showText && (
        <span className="font-bold text-white text-xl tracking-tight">Nexuscale</span>
      )}
    </div>
  );
}
