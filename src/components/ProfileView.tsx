import React, { useState } from 'react';
import { CURRENT_USER } from '../data/mockData';
import { Apartment, Roommate, MessageItem } from '../types';
import { 
  User, Mail, Phone, MapPin, GraduationCap, ShieldCheck, 
  Heart, Building2, MessageSquare, Edit3, Check, Send, 
  Calendar, Coffee, Sparkles, Trash2, ExternalLink
} from 'lucide-react';

interface ProfileViewProps {
  savedApartments: Apartment[];
  savedRoommates: Roommate[];
  messages: MessageItem[];
  onRemoveSavedApartment: (id: string) => void;
  onRemoveSavedRoommate: (id: string) => void;
  onSelectApartment: (apt: Apartment) => void;
  onSendMessage: (receiverName: string, text: string) => void;
  onShowToast: (msg: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  savedApartments,
  savedRoommates,
  messages,
  onRemoveSavedApartment,
  onRemoveSavedRoommate,
  onSelectApartment,
  onSendMessage,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'preferences' | 'saved-apts' | 'saved-roommates' | 'messages'>('info');
  
  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(CURRENT_USER.bio);
  const [budget, setBudget] = useState(CURRENT_USER.budget);
  const [phone, setPhone] = useState(CURRENT_USER.phone);
  
  // Messaging state
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(messages[0] || null);
  const [replyText, setReplyText] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    onShowToast('პროფილის მონაცემები წარმატებით განახლდა!');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;
    onSendMessage(selectedMessage.senderName, replyText);
    setReplyText('');
    onShowToast(`შეტყობინება გაეგზავნა: ${selectedMessage.senderName}`);
  };

  return (
    <div className="bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Student Avatar */}
            <div className="relative">
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full border-2 border-white" title="ვერიფიცირებული სტუდენტი">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {CURRENT_USER.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                  BTU სტუდენტი
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" /> ვერიფიცირებული
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>{CURRENT_USER.faculty}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="font-mono">{CURRENT_USER.email}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl pt-1">
                {bio}
              </p>
            </div>

            {/* Edit Profile Action */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isEditing ? 'რედაქტირების დახურვა' : 'პროფილის რედაქტირება'}</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 font-medium">სასურველი ბიუჯეტი</span>
              <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">₾{budget}/თვე</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 font-medium">სასურველი უბნები</span>
              <p className="text-sm font-bold text-slate-900 mt-1">ვაკე, საბურთალო</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 font-medium">შენახული ბინები</span>
              <p className="text-lg font-bold text-indigo-600 font-mono mt-0.5">{savedApartments.length}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 font-medium">შეტყობინებები</span>
              <p className="text-lg font-bold text-emerald-600 font-mono mt-0.5">{messages.length}</p>
            </div>
          </div>
        </div>

        {/* Edit Modal / Expandable Panel */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-sm mb-8 space-y-4">
            <h3 className="text-base font-bold text-slate-900">პირადი მონაცემების რედაქტირება</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ტელეფონის ნომერი:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">სასურველი მაქსიმალური ბიუჯეტი (₾):</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">მოკლე ბიოგრაფია / თანამცხოვრებლის მოლოდინი:</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                გაუქმება
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs"
              >
                ცვლილებების შენახვა
              </button>
            </div>
          </form>
        )}

        {/* Profile Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 mb-6">
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'info'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            პროფილის მიმოხილვა
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'preferences'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            ჩემი პრეფერენციები
          </button>

          <button
            onClick={() => setActiveTab('saved-apts')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'saved-apts'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>შენახული ბინები</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] font-mono">
              {savedApartments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('saved-roommates')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'saved-roommates'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>შენახული მეწყვილეები</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] font-mono">
              {savedRoommates.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'messages'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>შეტყობინებები</span>
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-mono">
              {messages.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">სტუდენტური სტატუსი და ვერიფიკაცია</h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400">უნივერსიტეტი:</span>
                  <span className="font-semibold text-slate-800">BTU (ბიზნესისა და ტექნოლოგიების უნივერსიტეტი)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400">ფაკულტეტი:</span>
                  <span className="font-semibold text-slate-800">ინფორმაციული ტექნოლოგიები</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400">კურსი:</span>
                  <span className="font-semibold text-slate-800">III კურსი (ბაკალავრიატი)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400">სტუდენტური ელფოსტა:</span>
                  <span className="font-mono text-indigo-600">{CURRENT_USER.email}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">ტელეგრამი:</span>
                  <span className="font-mono text-slate-700">{CURRENT_USER.telegram}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">ინტერესები და ცხოვრების სტილი</h3>
              <div className="flex flex-wrap gap-2">
                {CURRENT_USER.interests.map((it, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
                    #{it}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  რატომ ვარ კარგი თანამცხოვრებელი:
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>ვიცავ სისუფთავეს სამზარეულოსა და საერთო სივრცეში</li>
                  <li>დროულად და პასუხისმგებლობით ვიხდი ბინისა და კომუნალურების გადასახადებს</li>
                  <li>პატივს ვცემ მეწყვილის სწავლისა და დასვენების დროს</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Preferences */}
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">თანამცხოვრებლის მოთხოვნები და პრეფერენციები</h3>
              <p className="text-xs text-slate-500 mt-1">
                ეს პარამეტრები გამოიყენება თავსებადობის ქვიზის შედეგების დასათვლელად.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">სისუფთავის სტანდარტი</span>
                <p className="text-sm font-bold text-slate-900 mt-1">ძალიან მაღალი</p>
                <p className="text-[11px] text-slate-500 mt-1">ყოველდღიური წესრიგი და სუფთა სამუშაო კუთხე</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">ძილის რეჟიმი</span>
                <p className="text-sm font-bold text-slate-900 mt-1">მოქნილი / 23:30 - 08:30</p>
                <p className="text-[11px] text-slate-500 mt-1">ღამით მშვიდი გარემო</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">მოწევა და ალკოჰოლი</span>
                <p className="text-sm font-bold text-slate-900 mt-1">მხოლოდ აივანზე / არამწეველი</p>
                <p className="text-[11px] text-slate-500 mt-1">ოთახებში მოწევის გარეშე</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">შინაური ცხოველები</span>
                <p className="text-sm font-bold text-slate-900 mt-1">თანახმა ვარ (მშვიდი კატა/ძაღლი)</p>
                <p className="text-[11px] text-slate-500 mt-1">ალერგია არ მაქვს</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">სწავლის გარემო</span>
                <p className="text-sm font-bold text-slate-900 mt-1">სრული სიჩუმე მეცადინეობისას</p>
                <p className="text-[11px] text-slate-500 mt-1">დისტანციური სამუშაო ლეპტოპით</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">სტუმრები</span>
                <p className="text-sm font-bold text-slate-900 mt-1">წინასწარი შეთანხმებით</p>
                <p className="text-[11px] text-slate-500 mt-1">შაბათ-კვირას მეგობრების მიღება</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Saved Apartments */}
        {activeTab === 'saved-apts' && (
          <div>
            {savedApartments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedApartments.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-4 flex flex-col justify-between">
                    <div>
                      <img
                        src={apt.image}
                        alt={apt.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-44 object-cover rounded-xl mb-3"
                      />
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-indigo-600">{apt.district}</span>
                        <span className="font-bold text-slate-900 font-mono">₾{apt.pricePerPerson}/თვეში</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{apt.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">{apt.address}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectApartment(apt)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        დეტალების ნახვა
                      </button>
                      <button
                        onClick={() => onRemoveSavedApartment(apt.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="შენახულებიდან ამოშლა"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
                <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">შენახული ბინები ჯერ არ გაქვთ</h4>
                <p className="text-xs text-slate-500 mt-1">დააჭირეთ გულის ხატულას ბინების კატალოგში რჩეულების დასამატებლად.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Saved Roommates */}
        {activeTab === 'saved-roommates' && (
          <div>
            {savedRoommates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRoommates.map((rm) => (
                  <div key={rm.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={rm.avatar}
                          alt={rm.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{rm.name}</h4>
                          <span className="text-xs text-slate-500">{rm.university}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg line-clamp-2">
                        "{rm.bio}"
                      </p>
                      <div className="text-xs text-slate-500 mt-3 space-y-1">
                        <div>ბიუჯეტი: <span className="font-mono font-semibold text-slate-800">₾{rm.budget}</span></div>
                        <div>უბნები: <span className="font-medium text-slate-800">{rm.preferredDistricts.join(', ')}</span></div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedMessage({
                            id: `msg-saved-${rm.id}`,
                            senderName: rm.name,
                            senderAvatar: rm.avatar,
                            date: 'ახალი',
                            lastMessage: '',
                            unread: false,
                            university: rm.university,
                          });
                          setActiveTab('messages');
                        }}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        ჩათის გახსნა
                      </button>
                      <button
                        onClick={() => onRemoveSavedRoommate(rm.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="რჩეულებიდან წაშლა"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
                <User className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">შენახული თანამცხოვრებლები არ არის</h4>
                <p className="text-xs text-slate-500 mt-1">ქვიზის გავლის შემდეგ შეგიძლიათ შეინახოთ თავსებადი სტუდენტების პროფილები.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Messages */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
            
            {/* Left list of conversations */}
            <div className="md:col-span-5 border-r border-slate-200">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h4 className="font-bold text-slate-900 text-sm">აქტიური ჩათები</h4>
              </div>
              <div className="divide-y divide-slate-100 overflow-y-auto max-h-[450px]">
                {messages.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMessage(m)}
                    className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                      selectedMessage?.id === m.id ? 'bg-indigo-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={m.senderAvatar}
                      alt={m.senderName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
                          {m.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">{m.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{m.lastMessage || 'ახალი საუბარი'}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right conversation view */}
            <div className="md:col-span-7 flex flex-col justify-between p-4 sm:p-6 bg-slate-50/50">
              {selectedMessage ? (
                <>
                  <div>
                    {/* Header of chat */}
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-200 mb-4 bg-white p-3 rounded-xl">
                      <img
                        src={selectedMessage.senderAvatar}
                        alt={selectedMessage.senderName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{selectedMessage.senderName}</h4>
                        <span className="text-xs text-slate-500">{selectedMessage.university}</span>
                      </div>
                    </div>

                    {/* Messages thread mockup */}
                    <div className="space-y-3 mb-4">
                      {selectedMessage.lastMessage && (
                        <div className="flex items-start gap-2 max-w-[80%]">
                          <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-800 shadow-xs">
                            {selectedMessage.lastMessage}
                            <span className="block text-[9px] text-slate-400 mt-1">{selectedMessage.date}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-end justify-end">
                        <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none text-xs max-w-[80%] shadow-xs">
                          გამარჯობა! მადლობა დაინტერესებისთვის. დეტალებს სიამოვნებით განვიხილავ.
                          <span className="block text-[9px] text-indigo-200 mt-1">ახლახანს</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendReply} className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="დაწერე პასუხი..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">გაგზავნა</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-20 text-slate-400 text-xs">
                  აირჩიეთ საუბარი სიიდან
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
