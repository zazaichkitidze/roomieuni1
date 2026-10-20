import React from 'react';
import { ViewMode } from '../types';
import { ArrowRight, Compass, Search, Building2, Users, ShieldCheck, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onStartQuiz: () => void;
  onExploreApartments: () => void;
  onNavigate: (view: ViewMode) => void;
  onSearchSubmit?: (filters: { district: string; university: string; maxPrice: number }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onExploreApartments,
}) => {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-14 sm:pt-14 sm:pb-20">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-10 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Minimalist Hero Block */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Main Georgian Headline strictly as requested */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
            იპოვე შენი იდეალური თანამცხოვრებელი და ბინა უნივერსიტეტთან ახლოს
          </h1>

          {/* Subtitle with clear value proposition */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            გაიარე 2-წუთიანი თავსებადობის ქვიზი, იპოვე შენი ცხოვრების სტილის მეწყვილე და შეარჩიე გადამოწმებული ბინა თბილისის საუკეთესო უბნებში.
          </p>

          {/* Primary Action Button (minimalist & prominent) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onStartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 active:scale-98 transition-all"
            >
              <span>დაიწყე ძებნა და გაიარე ქვიზი</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreApartments}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-base transition-colors"
            >
              <Building2 className="w-4 h-4 text-slate-600" />
              <span>ბინების კატალოგი</span>
            </button>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ვერიფიცირებული სტუდენტები</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>თბილისის უნივერსიტეტებთან</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>90%+ თავსებადობის ალგორითმი</span>
            </div>
          </div>
        </div>

        {/* Hero Visual: Architectural Photography Style Image */}
        <div className="mt-10 sm:mt-14 relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl shadow-slate-200/50 bg-slate-100 aspect-16/9">
          <img
            src="/src/assets/images/hero_apartment_1792524936695.jpg"
            alt="სტუდენტური ბინა თბილისში"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform hover:scale-101 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-semibold mb-2 backdrop-blur-xs">
                <span>BTU · თსუ · ილიაუნი · სტუ · CU</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                კომფორტული საერთო საცხოვრებელი მეგობრულ სტუდენტებთან ერთად
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                დაზოგე ბინის ქირის 50% და იცხოვრე ადამიანთან, ვისთანაც სწავლა და დასვენება ერთნაირად სასიამოვნოა.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Clean horizontal separator divider line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
        <div className="border-b border-slate-200/80"></div>
      </div>
    </section>
  );
};
