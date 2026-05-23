// src/pages/landing.jsx
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#2b1616]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, #5a3333 0%, transparent 70%)',
          opacity: 0.6,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full bg-[#3d2020]/70 border border-[#7a4a4a]/40 text-[#f0e0c8] text-sm backdrop-blur-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20V4H6.5A2.5 2.5 0 004 6.5v13z" />
            <path d="M4 19.5A2.5 2.5 0 016.5 22H20v-5H6.5A2.5 2.5 0 004 19.5z" />
          </svg>
          Bookroll
        </span>

        <h1 className="font-serif font-bold text-white leading-[1.05] text-5xl md:text-6xl lg:text-7xl mb-6">
          Tu espacio para
          <br />
          amar{' '}
          <span className="bg-gradient-to-r from-[#d4a574] to-[#a07050] bg-clip-text text-transparent">
            la lectura
          </span>
        </h1>

        <p className="text-[#f0e0c8]/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Organiza tus lecturas favoritas, sigue tu progreso y crea tu
          biblioteca personal. Un lugar acogedor donde cada libro tiene su
          historia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="px-8 py-3.5 rounded-full bg-[#f0e0c8] text-[#2b1616] font-semibold hover:bg-[#e8d5b7] transition-all hover:scale-[1.02] inline-flex items-center justify-center gap-2"
          >
            Comenzar gratis
            <span aria-hidden>→</span>
          </Link>
          <Link
            to="/signin"
            className="px-8 py-3.5 rounded-full bg-[#6B2737] text-white font-semibold hover:bg-[#7d3247] transition-all hover:scale-[1.02] inline-flex items-center justify-center"
          >
            Ya tengo cuenta
          </Link>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;