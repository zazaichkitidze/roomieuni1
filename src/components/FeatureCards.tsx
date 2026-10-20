import React from 'react';
import { Sparkles, MapPin, ShieldCheck, Wallet, ArrowRight, HeartHandshake, BookOpen } from 'lucide-react';

interface FeatureCardsProps {
  onStartQuiz: () => void;
  onExploreApartments: () => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onStartQuiz, onExploreApartments }) => {
  const features = [
    {
      icon: Sparkles,
      iconBg: 'bg-indigo-50 text-indigo-600',
      title: 'ჭკვიანი თავსებადობის ქვიზი',
      desc: 'ბიუჯეტის, ძილის განრიგის, სისუფთავის ჩვევებისა და ჰობის მიხედვით დათვლილი პროცენტული თავსებადობა.',
      badge: '90%+ დამთხვევა',
      actionText: 'გაიარე ქვიზი',
      onClick: onStartQuiz,
    },
    {
      icon: MapPin,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'უნივერსიტეტებთან სიახლოვე',
      desc: 'ბინები ვაკეში, საბურთალოზე, ვერასა და დიდ დიღომში — BTU, თსუ, ილიაუნი და სტუ-ს კამპუსებიდან 5-10 წუთში.',
      badge: 'ფეხით სავალი',
      actionText: 'ბინების რუკა',
      onClick: onExploreApartments,
    },
    {
      icon: ShieldCheck,
      iconBg: 'bg-slate-100 text-slate-800',
      title: '100% ვერიფიცირებული სტუდენტები',
      desc: 'უსაფრთხო გარემო და სტუდენტური სტატუსის დადასტურება უნივერსიტეტის ელფოსტით (@btu.edu.ge, @tsu.ge და ა.შ.).',
      badge: 'საიმედო საზოგადოება',
      actionText: 'გაიგე მეტი',
      onClick: onStartQuiz,
    },
    {
      icon: Wallet,
      iconBg: 'bg-emerald-50 text-emerald-700',
      title: 'ხარჯების 50%-ით განახევრება',
      desc: 'ბინის ქირის, კომუნალურებისა და მაღალსიჩქარიანი ინტერნეტის ხარჯების თანაბარი გაყოფა სანდო თანამცხოვრებელთან.',
      badge: 'ბიუჯეტური ეკონომია',
      actionText: 'ბინების ფასები',
      onClick: onExploreApartments,
    },
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>რატომ RoomieUni?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            სტუდენტური ცხოვრება უფრო მარტივი და ხელმისაწვდომია ერთად
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            ჩვენ დაგეხმარებით იპოვოთ ადამიანი, რომელთან ერთადაც ბინის გაზიარება იქნება კომფორტული და უსაფრთხო.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={feat.onClick}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>{feat.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight quote banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-slate-900">
                "RoomieUni-ს საშუალებით ვიპოვე ბინა BTU-სთან 3 წუთში და თანამცხოვრებელი, რომელიც ჩემსავით პროგრამირებას სწავლობს."
              </p>
              <div className="text-xs text-slate-500 mt-1">
                — ზაზა იჩქიტიძე, ბიზნესისა და ტექნოლოგიების უნივერსიტეტი (BTU)
              </div>
            </div>
          </div>

          <button
            onClick={onStartQuiz}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors"
          >
            გაიარე თავსებადობის ქვიზი
          </button>
        </div>

      </div>

      {/* Clean horizontal separator divider line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="border-b border-slate-200/80"></div>
      </div>
    </section>
  );
};
