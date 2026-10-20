export type ViewMode = 'home' | 'roommates' | 'apartments' | 'profile';

export type District = 
  | 'საბურთალო'
  | 'ვაკე'
  | 'ძველი თბილისი'
  | 'დიდი დიღომი'
  | 'ისანი'
  | 'ბაგები'
  | 'ყველა';

export type University = 
  | 'BTU'
  | 'თსუ (TSU)'
  | 'ილიაუნი (ISU)'
  | 'სტუ (GTU)'
  | 'თავისუფალი (FreeUni)'
  | 'სეუ (SEU)'
  | 'კავკასია (CU)'
  | 'ყველა';

export interface Roommate {
  id: string;
  name: string;
  age: number;
  university: string;
  faculty: string;
  avatar: string;
  budget: number; // in GEL
  preferredDistricts: string[];
  cleanliness: 'ძალიან მაღალი' | 'საშუალო/ნორმალური' | 'მშვიდი/ლიბერალური';
  sleepSchedule: 'დილის ადამიანი (Early Bird)' | 'ღამის ადამიანი (Night Owl)' | 'მოქნილი';
  studyHabit: 'სრული სიჩუმე' | 'მუსიკა/მეგობრული' | 'ბიბლიოთეკაში სწავლა';
  smoking: boolean;
  pets: boolean;
  bio: string;
  interests: string[];
  matchPercentage?: number;
  phone: string;
  email: string;
  telegram?: string;
  verifiedStudent: boolean;
}

export interface Apartment {
  id: string;
  title: string;
  district: District;
  address: string;
  nearestUniversity: string;
  walkingTimeToUni: number; // minutes
  priceTotal: number; // in GEL
  pricePerPerson: number; // in GEL
  totalSpots: number;
  availableSpots: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // sq m
  image: string;
  gallery: string[];
  amenities: string[];
  isVerified: boolean;
  nearMetro: boolean;
  metroStation?: string;
  description: string;
  landlord: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface QuizState {
  budgetMax: number;
  university: string;
  preferredDistrict: string;
  cleanliness: string;
  sleepSchedule: string;
  guestPolicy: string;
  smokingPreference: string;
  petPreference: string;
}

export interface MessageItem {
  id: string;
  senderName: string;
  senderAvatar: string;
  date: string;
  lastMessage: string;
  unread: boolean;
  university: string;
}
