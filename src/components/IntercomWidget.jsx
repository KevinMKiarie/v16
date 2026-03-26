import { useEffect } from 'react';

export default function IntercomWidget() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Dynamically import and initialize Intercom
    import('@intercom/messenger-js-sdk').then((module) => {
      const Intercom = module.default || module;
      if (typeof Intercom === 'function') {
        Intercom({
          app_id: 'a4bnry3o',
        });
      }
    }).catch((error) => {
      console.warn('Failed to load Intercom SDK, using fallback:', error);
      // Fallback: Manual Intercom script injection
      if (!document.getElementById('intercom-script')) {
        (function() {
          var w = window;
          var d = document;
          var i = function() {
            i.c(arguments);
          };
          i.q = [];
          i.c = function(args) {
            i.q.push(args);
          };
          w.Intercom = i;
          var l = function() {
            var s = d.createElement('script');
            s.id = 'intercom-script';
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.intercom.io/widget/a4bnry3o';
            var x = d.getElementsByTagName('script')[0];
            if (x && x.parentNode) {
              x.parentNode.insertBefore(s, x);
            } else {
              d.head.appendChild(s);
            }
          };
          if (document.readyState === 'complete') {
            l();
          } else if (w.attachEvent) {
            w.attachEvent('onload', l);
          } else {
            w.addEventListener('load', l, false);
          }
        })();
      }
      if (window.Intercom) {
        window.Intercom('boot', {
          app_id: 'a4bnry3o',
        });
      }
    });
  }, []);

  return null; // This component doesn't render anything
}

