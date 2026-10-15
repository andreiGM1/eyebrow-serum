import React from 'react';
import { motion } from 'framer-motion';

export default function EyebrowSerumLanding() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-900 overflow-x-hidden">
      {/* Top Announcement Bar */}
      <div className="bg-[#B78860] text-white text-center py-2 text-sm tracking-widest uppercase font-medium">
        Livrare gratuită la comenzile peste 150 RON
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8E1D9] transition-all top-[36px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="text-3xl font-serif italic text-[#B78860]">
            BrowLash
          </div>
          <div className="hidden md:flex space-x-8 text-sm tracking-widest uppercase font-medium">
            <a href="#beneficii" className="hover:text-[#B78860] transition-colors">Beneficii</a>
            <a href="#rezultate" className="hover:text-[#B78860] transition-colors">Rezultate</a>
            <a href="#magazin" className="hover:text-[#B78860] transition-colors">Magazin</a>
          </div>
          <a href="#magazin" className="bg-stone-900 text-white px-6 py-2.5 tracking-widest text-sm uppercase hover:bg-[#B78860] transition-all shadow-lg">
            Cumpără Acum
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-stone-900"
            >
              Sprâncene mai <br />
              <span className="italic text-[#B78860]">pline & dese</span> <br />
              în doar 4 săptămâni.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-stone-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Serul nostru infuzat cu peptide și biotină stimulează creșterea naturală a firelor de păr, oferindu-ți sprâncenele la care ai visat dintotdeauna, fără proceduri dureroase.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a href="#magazin" className="bg-[#B78860] text-white px-10 py-5 tracking-widest text-sm uppercase hover:bg-stone-900 transition-all shadow-xl shadow-[#B78860]/20 w-full sm:w-auto text-center">
                Descoperă Serul
              </a>
              <div className="flex items-center gap-2 text-sm text-stone-500 font-medium mt-4 sm:mt-0">
                <span className="flex text-yellow-400 text-lg">★★★★★</span>
                <span>Peste 10,000+ cliente fericite</span>
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1 w-full relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[#E8E1D9] flex items-center justify-center text-[#B78860]">
                <span className="text-6xl">✨👁️</span>
                <p className="absolute bottom-10 font-serif italic text-xl">Placeholder: Model cu sprâncene perfecte</p>
              </div>
            </motion.div>
            {/* Decorative Badge */}
            <div className="absolute -bottom-8 -left-8 bg-stone-900 text-white w-32 h-32 rounded-full flex flex-col items-center justify-center text-center p-4 shadow-xl border-4 border-[#FDFBF7] animate-[spin_10s_linear_infinite]">
              <span className="font-bold text-lg leading-tight uppercase tracking-widest">100%</span>
              <span className="text-[10px] tracking-widest uppercase">Vegan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section id="beneficii" className="py-12 bg-stone-900 text-[#E8E1D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between gap-8 text-center">
            {[
              { title: 'Fără Hormoni', icon: '🌿' },
              { title: 'Cruelty Free', icon: '🐰' },
              { title: 'Testat Dermatologic', icon: '🩺' },
              { title: 'Rezultate Garantate', icon: '⏱️' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-3xl">{item.icon}</span>
                <span className="tracking-widest uppercase text-sm font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop / Product Section */}
      <section id="magazin" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 w-full relative">
              <div className="aspect-square bg-[#FDFBF7] rounded-3xl border border-[#E8E1D9] flex items-center justify-center p-12">
                 <div className="w-full h-full border-2 border-dashed border-[#B78860]/30 rounded-2xl flex items-center justify-center text-[#B78860]">
                    <span className="text-4xl">🧴</span>
                    <p className="ml-2 font-medium">Poza Produs (Sticluță)</p>
                 </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-4xl font-serif mb-4 text-stone-900">Advanced Brow Growth Serum</h2>
              <div className="flex items-center gap-2 mb-6">
                <span className="flex text-yellow-400 text-lg">★★★★★</span>
                <span className="text-stone-500 text-sm underline">(428 Recenzii)</span>
              </div>
              <p className="text-3xl font-light text-[#B78860] mb-8">129 RON <span className="text-lg text-stone-400 line-through ml-2">189 RON</span></p>
              
              <p className="text-stone-600 mb-8 font-light leading-relaxed">
                Formula noastră revoluționară conține un complex puternic de 5 peptide, biotină și extract de ceai verde. Aplică o dată pe zi, seara, și observă diferența.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between p-4 border border-[#E8E1D9] rounded-xl cursor-pointer hover:border-[#B78860] transition-colors bg-[#FDFBF7]">
                  <div className="flex items-center gap-4">
                    <input type="radio" name="pack" defaultChecked className="w-5 h-5 accent-[#B78860]" />
                    <div>
                      <h4 className="font-bold text-stone-900">1 x Flacon (1 Lună)</h4>
                      <p className="text-sm text-stone-500">Pentru testare</p>
                    </div>
                  </div>
                  <span className="font-bold">129 RON</span>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-[#B78860] rounded-xl cursor-pointer bg-[#B78860]/5 relative">
                  <div className="absolute -top-3 right-4 bg-[#B78860] text-white text-xs px-2 py-1 rounded uppercase tracking-widest">Recomandat</div>
                  <div className="flex items-center gap-4">
                    <input type="radio" name="pack" className="w-5 h-5 accent-[#B78860]" />
                    <div>
                      <h4 className="font-bold text-stone-900">3 x Flacoane (Tratament Complet)</h4>
                      <p className="text-sm text-[#B78860] font-medium">-25% Reducere</p>
                    </div>
                  </div>
                  <span className="font-bold">289 RON</span>
                </div>
              </div>
              
              <button className="w-full bg-stone-900 text-white py-5 rounded-xl font-bold tracking-widest uppercase hover:bg-[#B78860] transition-all shadow-2xl">
                Adaugă în Coș
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-stone-500 text-sm">
                <span>🔒 Plată 100% Securizată</span>
                <span>•</span>
                <span>🚚 Livrare în 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#FDFBF7] py-12 text-center text-stone-500 border-t border-[#E8E1D9] text-sm">
        <p>© 2026 BrowLash Cosmetics. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
}
