import React, { useState } from 'react';
import { Apartment, District } from '../types';
import { 
  Building2, MapPin, Search, SlidersHorizontal, Heart, 
  CheckCircle2, Bed, Bath, Sparkles, Navigation, Phone, 
  Eye, Check, Wifi, Wind, Flame, Compass
} from 'lucide-react';

interface ApartmentsViewProps {
  apartments: Apartment[];
  onSelectApartment: (apt: Apartment) => void;
  onContactLandlord: (apt: Apartment) => void;
  onToggleSaveApartment: (apt: Apartment) => void;
  savedApartmentIds: string[];
}

export const ApartmentsView: React.FC<ApartmentsViewProps> = ({
  apartments,
  onSelectApartment,
  onContactLandlord,
  onToggleSaveApartment,
  savedApartmentIds,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | 'ყველა'>('ყველა');
  const [maxPricePerPerson, setMaxPricePerPerson] = useState<number>(1000);
  const [onlyNearMetro, setOnlyNearMetro] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUni, setSelectedUni] = useState<string>('ყველა');

  const districts: (District | 'ყველა')[] = [
    'ყველა',
    'საბურთალო',
    'ვაკე',
    'ძველი თბილისი',
    'დიდი დიღომი',
    'ისანი',
  ];

  const filteredApartments = apartments.filter((apt) => {
    // District filter
    if (selectedDistrict !== 'ყველა' && apt.district !== selectedDistrict) {
      return false;
    }
    // Price filter
    if (apt.pricePerPerson > maxPricePerPerson) {
      return false;
    }
    // Metro filter
    if (onlyNearMetro && !apt.nearMetro) {
      return false;
    }
    // University filter
    if (selectedUni !== 'ყველა' && !apt.nearestUniversity.toLowerCase().includes(selectedUni.toLowerCase())) {
      return false;
    }
    // Text search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = apt.title.toLowerCase().includes(q);
      const matchAddress = apt.address.toLowerCase().includes(q);
      const matchUni = apt.nearestUniversity.toLowerCase().includes(q);
      if (!matchTitle && !matchAddress && !matchUni) return false;
    }

    return true;
  });

  return (
    <section className="bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>გადამოწმებული საცხოვრებელი ფართები</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              სტუდენტური ბინები თბილისში
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              შეარჩიე ბინა უნივერსიტეტთან ახლოს, გაიყავი ქირა თანამცხოვრებელთან და დაზოგე ყოველთვიურად.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            ნაპოვნია <span className="font-bold text-slate-900 font-mono">{filteredApartments.length}</span> განცხადება
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs mb-8 space-y-4">
          
          {/* Search Input + University dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="მოძებნე ქუჩა, მეტრო ან უნივერსიტეტი..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="md:col-span-5">
              <select
                value={selectedUni}
                onChange={(e) => setSelectedUni(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="ყველა">ყველა უნივერსიტეტის სიახლოვეს</option>
                <option value="BTU">BTU (ვაკე/პოლიტკოვსკაია)</option>
                <option value="თსუ">თსუ (ჭავჭავაძე/უნივერსიტეტის ქ.)</option>
                <option value="ილიაუნი">ილიაუნი (ჭავჭავაძე/ვაკე)</option>
                <option value="სტუ">სტუ (კოსტავა/საბურთალო)</option>
                <option value="თავისუფალი">თავისუფალი / აგრარული (დიღომი)</option>
                <option value="სეუ">სეუ (ისანი)</option>
              </select>
            </div>
          </div>

          {/* District Selector & Price Slider */}
          <div className="pt-3 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Districts pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> უბანი:
              </span>
              {districts.map((district) => (
                <button
                  key={district}
                  type="button"
                  onClick={() => setSelectedDistrict(district)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedDistrict === district
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>

            {/* Price Slider + Metro Toggle */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="text-xs text-slate-600 font-medium">
                  მაქს. ფასი / ადამიანი:
                </span>
                <span className="text-xs font-bold text-indigo-600 font-mono">
                  ₾{maxPricePerPerson}
                </span>
                <input
                  type="range"
                  min="400"
                  max="1200"
                  step="50"
                  value={maxPricePerPerson}
                  onChange={(e) => setMaxPricePerPerson(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-indigo-600 cursor-pointer"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyNearMetro}
                  onChange={(e) => setOnlyNearMetro(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>მხოლოდ მეტროსთან</span>
              </label>
            </div>
          </div>

        </div>

        {/* Apartments Grid */}
        {filteredApartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApartments.map((apt) => {
              const isSaved = savedApartmentIds.includes(apt.id);

              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Apartment Image with badges */}
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                      <img
                        src={apt.image}
                        alt={apt.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-bold shadow-xs">
                          {apt.district}
                        </span>
                        {apt.nearMetro && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-semibold backdrop-blur-xs">
                            მეტროსთან
                          </span>
                        )}
                      </div>

                      {/* Bookmark button */}
                      <button
                        onClick={() => onToggleSaveApartment(apt)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
                          isSaved
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/80 hover:bg-white text-slate-700'
                        }`}
                        title={isSaved ? 'შენახულია' : 'შენახვა'}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                      </button>

                      {/* Available Spots overlay */}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur-xs text-white text-xs font-medium">
                        დარჩენილია {apt.availableSpots} ადგილი ({apt.totalSpots}-დან)
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      {/* Price per person */}
                      <div className="flex items-baseline justify-between mb-2">
                        <div>
                          <span className="text-xl font-extrabold text-indigo-700 font-mono">
                            ₾{apt.pricePerPerson}
                          </span>
                          <span className="text-xs text-slate-500 font-medium"> / თვეში (1 კაცზე)</span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          სულ ₾{apt.priceTotal}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {apt.title}
                      </h3>

                      {/* Nearest University */}
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mb-3 bg-emerald-50/70 px-2.5 py-1 rounded-md border border-emerald-100">
                        <Navigation className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{apt.nearestUniversity} — {apt.walkingTimeToUni} წთ ფეხით</span>
                      </div>

                      {/* Address */}
                      <p className="text-xs text-slate-500 mb-4 line-clamp-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{apt.address}</span>
                      </p>

                      {/* Specs */}
                      <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.bedrooms} საძინებელი</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.bathrooms} სვ. წერტილი</span>
                        </div>
                        <div className="font-mono text-slate-500">
                          {apt.area} მ²
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectApartment(apt)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>დათვალიერება</span>
                    </button>

                    <button
                      onClick={() => onContactLandlord(apt)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>დაკავშირება</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">
              ბინა მითითებული ფილტრებით ვერ მოიძებნა
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              სცადე ფასის ლიმიტის გაზრდა ან სხვა უბნის შერჩევა.
            </p>
            <button
              onClick={() => {
                setSelectedDistrict('ყველა');
                setMaxPricePerPerson(1200);
                setOnlyNearMetro(false);
                setSelectedUni('ყველა');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-colors"
            >
              ფილტრების გასუფთავება
            </button>
          </div>
        )}

      </div>

      {/* Clean horizontal separator divider line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
        <div className="border-b border-slate-200/80"></div>
      </div>
    </section>
  );
};
