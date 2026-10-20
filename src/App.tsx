import React, { useState } from 'react';
import { ViewMode, Apartment, Roommate, MessageItem } from './types';
import { INITIAL_APARTMENTS, INITIAL_ROOMMATES, INITIAL_MESSAGES, CURRENT_USER } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureCards } from './components/FeatureCards';
import { RoommateQuiz } from './components/RoommateQuiz';
import { ApartmentsView } from './components/ApartmentsView';
import { ProfileView } from './components/ProfileView';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ApartmentDetailModal, ContactModal, AuthModal, Toast } from './components/Modals';
import { Building2, Users, ArrowRight, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  
  // Data states
  const [apartments] = useState<Apartment[]>(INITIAL_APARTMENTS);
  const [roommates] = useState<Roommate[]>(INITIAL_ROOMMATES);
  const [savedApartmentIds, setSavedApartmentIds] = useState<string[]>(['apt-1', 'apt-3']);
  const [savedRoommateIds, setSavedRoommateIds] = useState<string[]>(['rm-1', 'rm-2']);
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  
  // Modals & Overlays
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [contactTarget, setContactTarget] = useState<{ name: string; type: 'roommate' | 'landlord' } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleSaveApartment = (apt: Apartment) => {
    if (savedApartmentIds.includes(apt.id)) {
      setSavedApartmentIds(savedApartmentIds.filter((id) => id !== apt.id));
      showToast(`ბინა ამოიშალა რჩეულებიდან`);
    } else {
      setSavedApartmentIds([...savedApartmentIds, apt.id]);
      showToast(`ბინა "${apt.title}" შენახულია რჩეულებში!`);
    }
  };

  const handleToggleSaveRoommate = (rm: Roommate) => {
    if (savedRoommateIds.includes(rm.id)) {
      setSavedRoommateIds(savedRoommateIds.filter((id) => id !== rm.id));
      showToast(`თანამცხოვრებელი ამოიშალა რჩეულებიდან`);
    } else {
      setSavedRoommateIds([...savedRoommateIds, rm.id]);
      showToast(`${rm.name} შენახულია რჩეულებში!`);
    }
  };

  const handleSendMessage = (receiverName: string, text: string) => {
    const newMessage: MessageItem = {
      id: `msg-${Date.now()}`,
      senderName: receiverName,
      senderAvatar: receiverName === CURRENT_USER.name 
        ? CURRENT_USER.avatar 
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      date: 'ახლახანს',
      lastMessage: text,
      unread: false,
      university: 'RoomieUni Chat',
    };
    setMessages([newMessage, ...messages]);
    showToast(`შეტყობინება წარმატებით გაეგზავნა: ${receiverName}`);
  };

  const savedApartmentsList = apartments.filter((a) => savedApartmentIds.includes(a.id));
  const savedRoommatesList = roommates.filter((r) => savedRoommateIds.includes(r.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      
      {/* Sticky Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        savedApartmentsCount={savedApartmentIds.length}
        unreadMessagesCount={messages.filter((m) => m.unread).length}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME (Landing Page) */}
        {currentView === 'home' && (
          <div>
            {/* Minimalist Hero Section */}
            <HeroSection
              onStartQuiz={() => setCurrentView('roommates')}
              onExploreApartments={() => setCurrentView('apartments')}
              onNavigate={setCurrentView}
            />

            {/* Features & Cards Section */}
            <FeatureCards
              onStartQuiz={() => setCurrentView('roommates')}
              onExploreApartments={() => setCurrentView('apartments')}
            />

            {/* Featured Apartments Showcase on Landing Page */}
            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mb-2">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>რჩეული ბინები უნივერსიტეტებთან</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      ახალი განცხადებები თბილისში
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      საბურთალო, ვაკე და ძველი თბილისი — 5-10 წუთში BTU, თსუ და ილიაუნიდან
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentView('apartments')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>ყველა ბინის ნახვა ({apartments.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3 Marquee Apartment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apartments.slice(0, 3).map((apt) => (
                    <div
                      key={apt.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                          <img
                            src={apt.image}
                            alt={apt.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-bold shadow-xs">
                            {apt.district}
                          </div>
                          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur-xs text-white text-xs font-medium">
                            {apt.availableSpots} თავისუფალი ადგილი
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-baseline justify-between mb-2">
                            <div>
                              <span className="text-xl font-extrabold text-indigo-700 font-mono">
                                ₾{apt.pricePerPerson}
                              </span>
                              <span className="text-xs text-slate-500 font-medium"> / თვეში (1 კაცზე)</span>
                            </div>
                            <span className="text-xs text-slate-400 font-mono">სულ ₾{apt.priceTotal}</span>
                          </div>

                          <h3 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {apt.title}
                          </h3>

                          <p className="text-xs text-emerald-700 font-medium mb-3">
                            {apt.nearestUniversity} · {apt.walkingTimeToUni} წთ ფეხით
                          </p>

                          <p className="text-xs text-slate-500 line-clamp-2">
                            {apt.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedApartment(apt)}
                          className="flex-1 py-2 text-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                        >
                          დეტალები
                        </button>
                        <button
                          onClick={() => setContactTarget({ name: apt.landlord.name, type: 'landlord' })}
                          className="flex-1 py-2 text-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                        >
                          კონტაქტი
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clean horizontal separator divider line */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
                <div className="border-b border-slate-200/80"></div>
              </div>
            </section>

            {/* Roommate Matching Quiz Callout */}
            <section className="bg-slate-50 py-16 sm:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>მხოლოდ სტუდენტური კომუნა</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                      არ იცი ვისთან ერთად იქირაო ბინა?
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      გაიარე თავსებადობის ქვიზი. შეარჩიე მეწყვილე ბიუჯეტის, ძილის განრიგისა და სისუფთავის სტანდარტის მიხედვით 2 წუთში.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setCurrentView('roommates')}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
                      >
                        <span>ქვიზის დაწყება და მეწყვილის პოვნა</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full lg:w-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 p-2">
                    <img
                      src="/src/assets/images/quiz_roommates_1792524936828.jpg"
                      alt="Roommate compatibility"
                      referrerPolicy="no-referrer"
                      className="w-full rounded-xl object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Clean horizontal separator divider line */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
                <div className="border-b border-slate-200/80"></div>
              </div>
            </section>

            {/* FAQ Section */}
            <FaqSection />
          </div>
        )}

        {/* VIEW 2: ROOMMATES QUIZ & MATCHES */}
        {currentView === 'roommates' && (
          <RoommateQuiz
            candidates={roommates}
            onSelectRoommate={(rm) => {
              setContactTarget({ name: rm.name, type: 'roommate' });
            }}
            onContactRoommate={(rm) => {
              setContactTarget({ name: rm.name, type: 'roommate' });
            }}
            onToggleSaveRoommate={handleToggleSaveRoommate}
            savedRoommateIds={savedRoommateIds}
          />
        )}

        {/* VIEW 3: APARTMENTS CATALOG */}
        {currentView === 'apartments' && (
          <ApartmentsView
            apartments={apartments}
            onSelectApartment={setSelectedApartment}
            onContactLandlord={(apt) => {
              setContactTarget({ name: apt.landlord.name, type: 'landlord' });
            }}
            onToggleSaveApartment={handleToggleSaveApartment}
            savedApartmentIds={savedApartmentIds}
          />
        )}

        {/* VIEW 4: USER DASHBOARD / PROFILE FOR ZAZA ICHKITIDZE */}
        {currentView === 'profile' && (
          <ProfileView
            savedApartments={savedApartmentsList}
            savedRoommates={savedRoommatesList}
            messages={messages}
            onRemoveSavedApartment={(id) => {
              setSavedApartmentIds((prev) => prev.filter((item) => item !== id));
              showToast('ბინა ამოიშალა რჩეულებიდან');
            }}
            onRemoveSavedRoommate={(id) => {
              setSavedRoommateIds((prev) => prev.filter((item) => item !== id));
              showToast('თანამცხოვრებელი ამოიშალა რჩეულებიდან');
            }}
            onSelectApartment={setSelectedApartment}
            onSendMessage={handleSendMessage}
            onShowToast={showToast}
          />
        )}

      </main>

      {/* Redesigned Footer */}
      <Footer
        onNavigate={setCurrentView}
        onOpenContact={() => setContactTarget({ name: 'ზაზა იჩქიტიძე', type: 'roommate' })}
      />

      {/* MODALS */}
      <ApartmentDetailModal
        apartment={selectedApartment}
        onClose={() => setSelectedApartment(null)}
        onContact={(apt) => setContactTarget({ name: apt.landlord.name, type: 'landlord' })}
        onToggleSave={handleToggleSaveApartment}
        isSaved={selectedApartment ? savedApartmentIds.includes(selectedApartment.id) : false}
      />

      <ContactModal
        isOpen={contactTarget !== null}
        onClose={() => setContactTarget(null)}
        targetName={contactTarget?.name || ''}
        targetType={contactTarget?.type || 'roommate'}
        onSend={(name, msg) => handleSendMessage(name, msg)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(name) => {
          showToast(`მოგესალმებით, ${name}!`);
        }}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
