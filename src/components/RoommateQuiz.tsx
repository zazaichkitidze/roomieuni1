import React, { useState } from 'react';
import { Roommate, QuizState } from '../types';
import { 
  Sparkles, ArrowRight, ArrowLeft, Check, RotateCcw, 
  Heart, MessageSquare, ShieldCheck, Moon, Sun, 
  DollarSign, MapPin, GraduationCap, AlertCircle, Sparkle 
} from 'lucide-react';

interface RoommateQuizProps {
  candidates: Roommate[];
  onSelectRoommate: (roommate: Roommate) => void;
  onContactRoommate: (roommate: Roommate) => void;
  onToggleSaveRoommate: (roommate: Roommate) => void;
  savedRoommateIds: string[];
}

export const RoommateQuiz: React.FC<RoommateQuizProps> = ({
  candidates,
  onSelectRoommate,
  onContactRoommate,
  onToggleSaveRoommate,
  savedRoommateIds,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Form State
  const [quizState, setQuizState] = useState<QuizState>({
    budgetMax: 700,
    university: 'BTU',
    preferredDistrict: 'საბურთალო',
    cleanliness: 'ძალიან მაღალი',
    sleepSchedule: 'დილის ადამიანი (Early Bird)',
    guestPolicy: 'შაბათ-კვირას შეთანხმებით',
    smokingPreference: 'არამწეველი',
    petPreference: 'არ მყავს, მაგრამ თანახმა ვარ',
  });

  // Calculate compatibility for each candidate based on answers
  const calculateMatches = (): Roommate[] => {
    return candidates.map((candidate) => {
      let score = 50; // base score

      // Budget proximity (+20 max)
      const budgetDiff = Math.abs(candidate.budget - quizState.budgetMax);
      if (budgetDiff <= 50) score += 20;
      else if (budgetDiff <= 150) score += 12;
      else score += 5;

      // Cleanliness (+15)
      if (candidate.cleanliness === quizState.cleanliness) {
        score += 15;
      } else {
        score += 5;
      }

      // Sleep schedule (+15)
      if (candidate.sleepSchedule === quizState.sleepSchedule) {
        score += 15;
      } else if (candidate.sleepSchedule === 'მოქნილი' || quizState.sleepSchedule === 'მოქნილი') {
        score += 10;
      }

      // District match (+10)
      if (candidate.preferredDistricts.includes(quizState.preferredDistrict)) {
        score += 10;
      }

      // University affinity (+5)
      if (candidate.university.includes(quizState.university)) {
        score += 5;
      }

      // Clamp between 68% and 98%
      const matchPercentage = Math.min(98, Math.max(68, score));
      return {
        ...candidate,
        matchPercentage,
      };
    }).sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setShowResults(false);
  };

  const matchedRoommates = calculateMatches();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>RoomieMatch™ ჭკვიანი ალგორითმი</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          თანამცხოვრებლის თავსებადობის ქვიზი
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          უპასუხე 3 მოკლე კითხვას ბიუჯეტზე, სისუფთავესა და რეჟიმზე. ჩვენი სისტემა გამოითვლის თავსებადობას თბილისის სტუდენტებთან.
        </p>
      </div>

      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Visual Illustration */}
          <div className="lg:col-span-5 bg-gradient-to-b from-indigo-50/70 to-emerald-50/50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between overflow-hidden shadow-xs">
            <div>
              <div className="relative rounded-xl overflow-hidden mb-6 aspect-4/3 bg-white border border-slate-200/80">
                <img
                  src="/quiz_roommates_1792524936828.jpg"
                  alt="Roommate Quiz Illustration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                იდეალური მეწყვილის შერჩევა
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ერთად ცხოვრება გაცილებით მარტივია, როცა თქვენი ჩვევები, ძილის გრაფიკი და ხარჯების მოლოდინი წინასწარ ემთხვევა ერთმანეთს.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>არანაირი უხერხული სიურპრიზები</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>მხოლოდ რეალური უნივერსიტეტის სტუდენტები</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>პირდაპირი ჩათი და კონტაქტი</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs">
                  {currentStep}
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  ნაბიჯი {currentStep} 3-დან
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full transition-all ${
                      step === currentStep
                        ? 'w-8 bg-indigo-600'
                        : step < currentStep
                        ? 'w-5 bg-emerald-500'
                        : 'w-5 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Budget & University / District */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    1. ბიუჯეტი და სასურველი უბანი
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    მიუთითე მაქსიმალური თანხა, რისი გადახდაც გსურს თვეში ერთ ადამიანზე.
                  </p>
                </div>

                {/* Budget Slider */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">
                      მაქსიმალური ბიუჯეტი თვეში:
                    </label>
                    <span className="text-lg font-bold text-indigo-600 font-mono">
                      ₾{quizState.budgetMax} / თვე
                    </span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="1200"
                    step="50"
                    value={quizState.budgetMax}
                    onChange={(e) => setQuizState({ ...quizState, budgetMax: Number(e.target.value) })}
                    className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span>₾400 (ეკონომიური)</span>
                    <span>₾700 (სტანდარტული)</span>
                    <span>₾1200+ (პრემიუმი)</span>
                  </div>
                </div>

                {/* Preferred District */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    სასურველი უბანი:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['საბურთალო', 'ვაკე', 'ძველი თბილისი', 'დიდი დიღომი', 'ისანი', 'ბაგები'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setQuizState({ ...quizState, preferredDistrict: d })}
                        className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                          quizState.preferredDistrict === d
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* University */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    შენი უნივერსიტეტი:
                  </label>
                  <select
                    value={quizState.university}
                    onChange={(e) => setQuizState({ ...quizState, university: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="BTU">BTU (ბიზნესისა და ტექნოლოგიების უნივერსიტეტი)</option>
                    <option value="თსუ">თსუ (ივანე ჯავახიშვილის სახელმწიფო უნივერსიტეტი)</option>
                    <option value="ილიაუნი">ილიაუნი (ილიას სახელმწიფო უნივერსიტეტი)</option>
                    <option value="სტუ">სტუ (საქართველოს ტექნიკური უნივერსიტეტი)</option>
                    <option value="თავისუფალი">თავისუფალი / აგრარული უნივერსიტეტი</option>
                    <option value="სეუ">სეუ (საქართველოს ეროვნული უნივერსიტეტი)</option>
                    <option value="კავკასია">კავკასიის უნივერსიტეტი (CU)</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 2: Cleanliness & House Rules */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    2. სისუფთავე და საცხოვრებელი წესები
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    საერთო სივრცის მოწესრიგება და ყოველდღიური ჰარმონია.
                  </p>
                </div>

                {/* Cleanliness selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    სისუფთავის სტანდარტი ბინაში:
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        value: 'ძალიან მაღალი',
                        title: 'ძალიან მაღალი (ჭურჭელი მაშინვე ირეცხება, ყოველდღიური წესრიგი)',
                      },
                      {
                        value: 'საშუალო/ნორმალური',
                        title: 'საშუალო (კვირაში ერთხელ საერთო დალაგება, მოქნილი გრაფიკი)',
                      },
                      {
                        value: 'მშვიდი/ლიბერალური',
                        title: 'ლიბერალური (მშვიდი მიდგომა, მთავარია სამუშაო მაგიდა იყოს სუფთა)',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setQuizState({ ...quizState, cleanliness: opt.value })}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${
                          quizState.cleanliness === opt.value
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-medium ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{opt.title}</span>
                        {quizState.cleanliness === opt.value && (
                          <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pets policy */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    შინაური ცხოველები:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'თანახმა ვარ (მიყვარს ცხოველები)',
                      'არასასურველია (ალერგია ან დისკომფორტი)',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQuizState({ ...quizState, petPreference: opt })}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          quizState.petPreference === opt
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Smoking */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    მოწევა:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['არამწეველი / მხოლოდ აივანზე', 'მწეველი'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQuizState({ ...quizState, smokingPreference: opt })}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          quizState.smokingPreference === opt
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Sleep Schedule & Study Environment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    3. ძილის რეჟიმი და მეცადინეობა
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    განრიგის თანხვედრა საუკეთესო თანაცხოვრების გარანტიაა.
                  </p>
                </div>

                {/* Sleep Schedule */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    შენი ძილის ტიპიური გრაფიკი:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        value: 'დილის ადამიანი (Early Bird)',
                        desc: '07:30 - 23:00',
                        icon: Sun,
                      },
                      {
                        value: 'ღამის ადამიანი (Night Owl)',
                        desc: '11:00 - 02:30',
                        icon: Moon,
                      },
                      {
                        value: 'მოქნილი',
                        desc: 'ლექციების მიხედვით',
                        icon: Sparkle,
                      },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setQuizState({ ...quizState, sleepSchedule: opt.value })}
                          className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                            quizState.sleepSchedule === opt.value
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold ring-1 ring-indigo-500'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <Icon className="w-5 h-5 text-indigo-600" />
                          <span className="text-xs font-bold">{opt.value}</span>
                          <span className="text-[10px] text-slate-500">{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Guest policy */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    სტუმრები და წვეულებები:
                  </label>
                  <div className="space-y-2">
                    {[
                      'მხოლოდ წინასწარი შეთანხმებით, მშვიდი შეხვედრები',
                      'შაბათ-კვირას მეგობრული შეკრებები მისაღებია',
                      'ბინა მხოლოდ დასვენებისა და სწავლისთვისაა (სტუმრების გარეშე)',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQuizState({ ...quizState, guestPolicy: opt })}
                        className={`w-full p-3 rounded-lg border text-left text-xs transition-all ${
                          quizState.guestPolicy === opt
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>უკან</span>
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <span>{currentStep === 3 ? 'შედეგების გამოთვლა' : 'შემდეგი'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* RESULTS VIEW */
        <div className="space-y-8 max-w-5xl mx-auto">
          
          {/* Summary Box */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                <Check className="w-3.5 h-3.5" />
                <span>ქვიზი წარმატებით დასრულდა!</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                შენთვის ნაპოვნია {matchedRoommates.length} თავსებადი სტუდენტი
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                პრიორიტეტი: ბიუჯეტი ₾{quizState.budgetMax}-მდე · {quizState.preferredDistrict} · {quizState.sleepSchedule}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ქვიზის თავიდან გავლა</span>
            </button>
          </div>

          {/* Roommate Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedRoommates.map((rm) => {
              const isSaved = savedRoommateIds.includes(rm.id);
              const percentage = rm.matchPercentage || 85;

              return (
                <div
                  key={rm.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div className="p-5">
                    {/* Top Row: Avatar & Match Score */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={rm.avatar}
                          alt={rm.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-xs"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-slate-900 text-base leading-tight">
                              {rm.name}
                            </h4>
                            {rm.verifiedStudent && (
                              <span title="ვერიფიცირებული სტუდენტი" className="inline-flex">
                                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">
                            {rm.age} წლის · {rm.university}
                          </span>
                        </div>
                      </div>

                      {/* Match Badge */}
                      <div className="flex flex-col items-end">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold font-mono">
                          {percentage}%
                        </span>
                        <span className="text-[10px] text-emerald-600 font-medium mt-0.5">
                          თავსებადობა
                        </span>
                      </div>
                    </div>

                    {/* Faculty */}
                    <p className="text-xs text-slate-600 font-medium mb-3 line-clamp-1">
                      {rm.faculty}
                    </p>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      "{rm.bio}"
                    </p>

                    {/* Key Attributes */}
                    <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">ბიუჯეტი:</span>
                        <span className="font-semibold text-slate-800 font-mono">₾{rm.budget}/თვე</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">უბნები:</span>
                        <span className="font-medium text-slate-800">{rm.preferredDistricts.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">სისუფთავე:</span>
                        <span className="font-medium text-slate-800">{rm.cleanliness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">რეჟიმი:</span>
                        <span className="font-medium text-slate-800 truncate max-w-[140px]">{rm.sleepSchedule}</span>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                      {rm.interests.map((interest, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                        >
                          #{interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onToggleSaveRoommate(rm)}
                      className={`p-2 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-rose-50 border-rose-200 text-rose-600'
                          : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                      }`}
                      title={isSaved ? 'რჩეულებიდან ამოშლა' : 'რჩეულებში შენახვა'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                    </button>

                    <button
                      onClick={() => onContactRoommate(rm)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>მიწერე შეტყობინება</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Clean horizontal separator divider line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
        <div className="border-b border-slate-200/80"></div>
      </div>
    </div>
  );
};
