export const AuroraBackground = ({ mousePosition = { x: 0, y: 0 } }) => {
  const safeX = mousePosition?.x || 0;
  const safeY = mousePosition?.y || 0;
  const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const height = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  const xOffset = (safeX / width - 0.5) * 20; 
  const yOffset = (safeY / height - 0.5) * 20;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-[#020203] overflow-hidden">
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse-slow mix-blend-screen transition-transform duration-700 ease-out"
        style={{ transform: `translate(${xOffset * -2}px, ${yOffset * -2}px)` }}
      />
      <div 
        className="absolute top-[10%] right-[-20%] w-[50%] h-[50%] rounded-full bg-violet-600/15 blur-[140px] animate-pulse-slow animation-delay-2000 mix-blend-screen transition-transform duration-700 ease-out"
        style={{ transform: `translate(${xOffset * 2}px, ${yOffset * 2}px)` }}
      />
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow animation-delay-4000 mix-blend-screen transition-transform duration-700 ease-out"
        style={{ transform: `translate(${xOffset}px, ${yOffset}px)` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_80%,transparent_100%)]" />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
};

