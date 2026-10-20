import React from 'react';
import { ViewMode } from '../types';
import { 
  Building2, Mail, Phone, MapPin, Github, Linkedin, 
  Send, Heart, Shield, CheckCircle2, Globe
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Roomie<span className="text-indigo-400">Uni</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              სტუდენტური თანამცხოვრებლების (Roommate) ძიებისა და ბინების ინოვაციური პლატფორმა თბილისში. იპოვე შენი იდეალური თანამცხოვრებელი უნივერსიტეტთან ახლოს.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>ვერიფიცირებული სტუდენტური სივრცე</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              ნავიგაცია
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  მთავარი გვერდი
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roommates')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  თანამცხოვრებლის ძებნა
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('apartments')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  ბინების კატალოგი
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-white transition-colors text-slate-400"
                >
                  პირადი პროფილი
                </button>
              </li>
            </ul>
          </div>

          {/* Universities & Districts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              უნივერსიტეტები
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>BTU (ბიზნესი და ტექნოლოგიები)</li>
              <li>თსუ (ივანე ჯავახიშვილი)</li>
              <li>ილიაუნი (ილიას უნივერსიტეტი)</li>
              <li>სტუ (ტექნიკური უნივერსიტეტი)</li>
              <li>SEU & თავისუფალი უნივერსიტეტი</li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              კონტაქტი & ავტორი
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:zaza.ichkitidze.1@btu.edu.ge" className="hover:text-white transition-colors truncate">
                  zaza.ichkitidze.1@btu.edu.ge
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+995 599 12 34 56</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>თბილისი, საქართველო</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar strictly with Zaza Ichkitidze copyright info */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 RoomieUni. შექმნილია <span className="text-slate-300 font-semibold">ზაზა იჩქიტიძე</span>-ს მიერ. ყველა უფლება დაცულია.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">კონფიდენციალურობა</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">წესები და პირობები</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">დახმარება</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
