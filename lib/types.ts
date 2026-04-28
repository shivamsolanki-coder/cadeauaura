export type Relationship = 'Partner' | 'Parent' | 'Sibling' | 'Friend' | 'Mentor' | 'Colleague' | 'Grandparent';
export type Occasion =
  | 'Birthday'
  | 'Anniversary'
  | 'Graduation'
  | 'Festival'
  | 'Thank You'
  | 'Just Because'
  | 'New Beginning';
export type Emotion =
  | 'Gratitude'
  | 'Love'
  | 'Pride'
  | 'Comfort'
  | 'Joy'
  | 'Hope';
export type Culture = 'Global' | 'Indian' | 'Japanese' | 'Middle Eastern' | 'African' | 'Latin';
export type Personality = 'Minimalist' | 'Sentimental' | 'Creative' | 'Elegant' | 'Traditional' | 'Adventurous';
export type GestureFeeling = 'Quiet' | 'Warm' | 'Grand' | 'Reflective' | 'Playful';

export interface GiftIdea {
  id: number;
  title: string;
  summary: string;
  relationships: Relationship[];
  occasions: Occasion[];
  emotions: Emotion[];
  cultures: Culture[];
  personalities: Personality[];
  gestures: GestureFeeling[];
  meaning: string;
  careNote: string;
}

export interface MeaningCardItem {
  title: string;
  reflection: string;
}
