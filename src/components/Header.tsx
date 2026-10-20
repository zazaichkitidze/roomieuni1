import React, { useState } from 'react';
import { ViewMode } from '../types';
import { Home, Users, Building2, User, Menu, X, Sparkles, Smartphone, CheckCircle } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  savedApartmentsCount: number;
  unreadMessagesCount: number;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  savedApartmentsCount,
  unreadMessagesCount,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Left Brand Lockup + Mobile Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 -m-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Roomie<span className="text-indigo-600">Uni</span>
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline -mt-0.5 font-medium">
                  სტუდენტური პლატფორმა
                </span>
              </div>
            </button>

            {/* Requested "მობილური ვერსია" pill badge on the left */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>მობილური ვერსია</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'home'
                  ? 'bg-slate-100 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>მთავარი</span>
            </button>

            <button
              onClick={() => handleNavClick('roommates')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'roommates'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>თანამცხოვრებლის ძებნა</span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-100 text-indigo-700 rounded-md">
                ქვიზი
              </span>
            </button>

            <button
              onClick={() => handleNavClick('apartments')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'apartments'
                  ? 'bg-slate-100 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>ბინები</span>
              {savedApartmentsCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-700 rounded-md">
                  {savedApartmentsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('profile')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === 'profile'
                  ? 'bg-slate-100 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>პროფილი</span>
              {unreadMessagesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white"></span>
              )}
            </button>
          </nav>

          {/* Right Action: Distinct Indigo Accent Login / Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('profile')}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-xs text-slate-700 transition-colors"
              title="შესულია: ზაზა იჩქიტიძე"
            >
              <img
                src="/src/assets/images/student_avatar_1792524938900.jpg"
                alt="ზაზა იჩქიტიძე"
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover border border-emerald-400"
              />
              <span className="font-medium text-slate-900">ზაზა იჩქიტიძე</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-semibold">BTU</span>
            </button>

            <button
              onClick={onOpenAuth}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-300/40 active:scale-98 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">შესვლა / რეგისტრაცია</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="მენიუს გახსნა"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-xs text-slate-600 mb-2">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-slate-800">მობილური ვერსია ჩართულია</span>
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5" />
              <span>მთავარი</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('roommates')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'roommates' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span>თანამცხოვრებლის ძებნა</span>
            </div>
            <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
              ქვიზი
            </span>
          </button>

          <button
            onClick={() => handleNavClick('apartments')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'apartments' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5" />
              <span>ბინები</span>
            </div>
            {savedApartmentsCount > 0 && (
              <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                {savedApartmentsCount} შენახული
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('profile')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentView === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5" />
              <span>პროფილი (ზაზა იჩქიტიძე)</span>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> BTU
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
