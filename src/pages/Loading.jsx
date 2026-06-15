import { useEffect } from "react";

export default function Loading() {

  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.setItem("ai_loaded", "true");
      window.location.reload(); 
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white">
      
      {/* CORE */}
      <div className="relative w-24 h-24 flex justify-center items-center">
        
        <div className="absolute w-full h-full rounded-full border-2 border-cyan-400 animate-spin"></div>
        
        <div className="absolute w-20 h-20 rounded-full border-2 border-blue-500 animate-spin [animation-direction:reverse]"></div>
        
        <div className="w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]"></div>
      </div>

      <h2 className="mt-6 text-xl tracking-widest text-cyan-300">
        Booting AI Interface
      </h2>

      <p className="text-sm text-indigo-400 mt-2">
        Coders Club • AI Department
      </p>
    </div>
  );
}