import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-[#0f1226] text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f1226]/60 via-[#0f1226]/70 to-[#0f1226]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0f1226]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <Rocket size={14} className="text-[#58C4DD]" />
          ConceptCast · AI Educational Video Platform
        </div>
        <h1 className="mt-6 bg-gradient-to-r from-[#58C4DD] via-white to-[#8B5CF6] bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl">
          Turn Research Papers into 3Blue1Brown-style Videos
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-gray-300 sm:text-base">
          Upload a PDF, get a professionally narrated animated video with an interactive AI tutor that answers questions in real time.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#upload"
            className="inline-flex items-center gap-2 rounded-lg bg-[#58C4DD] px-5 py-3 text-sm font-semibold text-[#0b1020] shadow-lg shadow-[#58C4DD]/20 transition hover:brightness-110"
          >
            Get Started
          </a>
          <a
            href="#player"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            <PlayCircle size={18} />
            See the Experience
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
