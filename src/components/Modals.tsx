import React, { useState } from 'react';
import { Apartment, Roommate } from '../types';
import { 
  X, Check, Send, Phone, Mail, MapPin, Navigation, 
  Bed, Bath, Sparkles, Building2, ShieldCheck, Heart, 
  Calendar, CheckCircle, Wifi, Flame, Wind
} from 'lucide-react';

interface ApartmentDetailModalProps {
  apartment: Apartment | null;
  onClose: () => void;
  onContact: (apt: Apartment) => void;
  onToggleSave: (apt: Apartment) => void;
  isSaved: boolean;
}

export const ApartmentDetailModal: React.FC<ApartmentDetailModalProps> = ({
  apartment,
  onClose,
  onContact,
  onToggleSave,
  isSaved,
}) => {
  if (!apartment) return null;
  const [activeImg, setActiveImg] = useState<string>(apartment.image);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-xs transition-colors"
          aria-label="დახურვა"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery */}
        <div className="relative aspect-16/9 bg-slate-900">
          <img
            src={activeImg}
            alt={apartment.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex gap-2">
            {apartment.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImg === img ? 'border-white scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold">
                  {apartment.district}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ვერიფიცირებული
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {apartment.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{apartment.address}</span>
              </p>
            </div>

            {/* Price block */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0 sm:text-right">
              <span className="text-xs text-slate-500 font-medium block">ფასი 1 ადამიანზე:</span>
              <span className="text-2xl font-extrabold text-indigo-700 font-mono">
                ₾{apartment.pricePerPerson}
              </span>
              <span className="text-xs text-slate-500"> / თვე</span>
              <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
                სრული ქირა: ₾{apartment.priceTotal}
              </span>
            </div>
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block">უნივერსიტეტი:</span>
              <span className="font-semibold">{apartment.nearestUniversity}</span>
              <span className="text-[10px] text-emerald-600 block">{apartment.walkingTimeToUni} წთ ფეხით</span>
            </div>
            <div>
              <span className="text-slate-400 block">საძინებლები:</span>
              <span className="font-semibold">{apartment.bedrooms} საძინებელი</span>
            </div>
            <div>
              <span className="text-slate-400 block">ადგილები:</span>
              <span className="font-semibold text-emerald-700">დარჩენილია {apartment.availableSpots} / {apartment.totalSpots}</span>
            </div>
            <div>
              <span className="text-slate-400 block">ფართობი:</span>
              <span className="font-semibold font-mono">{apartment.area} მ²</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              ბინის აღწერა
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {apartment.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              კეთილმოწყობა & პირობები
            </h4>
            <div className="flex flex-wrap gap-2">
              {apartment.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Landlord Contact Info */}
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-indigo-700 font-bold uppercase tracking-wider">
                მესაკუთრე / საკონტაქტო პირი:
              </span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{apartment.landlord.name}</p>
              <div className="text-xs text-slate-600 flex items-center gap-4 mt-1 font-mono">
                <span>{apartment.landlord.phone}</span>
                <span>{apartment.landlord.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(apartment)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title={isSaved ? 'შენახულია' : 'შენახვა'}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={() => {
                  onContact(apartment);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                დაჯავშნე დათვალიერება
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// CONTACT MODAL
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  targetType: 'roommate' | 'landlord';
  onSend: (name: string, message: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  targetName,
  targetType,
  onSend,
}) => {
  if (!isOpen) return null;

  const defaultMsg = targetType === 'roommate'
    ? `გამარჯობა ${targetName}! ვნახე შენი პროფილი RoomieUni-ზე და ქვიზით მაღალი თავსებადობა გვაქვს. გცალია ბინის ვარიანტებზე დავილაპარაკოთ?`
    : `გამარჯობა ${targetName}! მაინტერესებს თქვენი ბინის დათვალიერება უახლოეს დღეებში.`;

  const [message, setMessage] = useState(defaultMsg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(targetName, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <Send className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            შეტყობინების გაგზავნა
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ადრესატი: <span className="font-semibold text-slate-800">{targetName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              შეტყობინების ტექსტი:
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              placeholder="დაწერე შეტყობინება..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>გაგზავნა</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// AUTH MODAL
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;
  const [email, setEmail] = useState('zaza.ichkitidze.1@btu.edu.ge');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess('ზაზა იჩქიტიძე');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white mx-auto flex items-center justify-center mb-3 shadow-md shadow-indigo-200">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            RoomieUni ავტორიზაცია
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            შედით თქვენი სტუდენტური ან პირადი ელფოსტით
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              სტუდენტური ელფოსტა (.edu.ge):
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              პაროლი:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>სტუდენტური პროფილი: ზაზა იჩქიტიძე (BTU)</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all"
          >
            სისტემაში შესვლა
          </button>
        </form>
      </div>
    </div>
  );
};

// TOAST
interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-bottom-5 duration-200 border border-slate-700">
      <CheckCircle className="w-4 h-4 text-emerald-400" />
      <span>{message}</span>
    </div>
  );
};
