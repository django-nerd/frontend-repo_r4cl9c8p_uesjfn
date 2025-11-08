import React from 'react';

const mockProjects = [
  {
    id: '1',
    title: 'Neural ODEs for Time-Series Modeling',
    concepts: 12,
    created: '2025-03-01',
    hook: 'Differential equations meet neural networks to model dynamics.',
    thumb: 'https://images.unsplash.com/photo-1534759846116-57968b1635f5?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Attention Is All You Need',
    concepts: 9,
    created: '2025-02-14',
    hook: 'Transformers and the magic of self-attention explained.',
    thumb: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Diffusion Models Demystified',
    concepts: 10,
    created: '2025-01-20',
    hook: 'From noise to photoreal images with step-wise refinement.',
    thumb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  },
];

const Dashboard = () => {
  return (
    <section className="w-full bg-[#0f1226] py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Your Projects</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-300">
              A gallery of generated videos with quick metadata.
            </p>
          </div>
          <a href="#upload" className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/20">
            Upload New
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="aspect-video w-full overflow-hidden">
                <img src={p.thumb} alt={p.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-1 text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-300">{p.hook}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <span>{p.concepts} concepts</span>
                  <span>{new Date(p.created).toLocaleDateString()}</span>
                </div>
                <a href="#player" className="mt-4 inline-block rounded-md bg-[#8B5CF6] px-3 py-2 text-sm font-semibold text-white hover:brightness-110">
                  Open Player
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
