export interface ProductCategory {
  name: string;
  slug: string;
  description: string;
}

export const productCategories: ProductCategory[] = [
  {
    name: 'Anniversary Gifts',
    slug: 'anniversary-gifts',
    description: 'Meaningful ideas to honor shared years, milestones, and lasting love.'
  },
  {
    name: 'Birthday Gifts',
    slug: 'birthday-gifts',
    description: 'Warm, joyful ideas to celebrate personality, growth, and cherished memories.'
  },
  {
    name: 'Wedding Gifts',
    slug: 'wedding-gifts',
    description: 'Thoughtful gestures that celebrate new beginnings and togetherness.'
  },
  {
    name: 'Graduation Gifts',
    slug: 'graduation-gifts',
    description: 'Encouraging keepsakes for proud transitions and bright next chapters.'
  },
  {
    name: 'Festival Gifts',
    slug: 'festival-gifts',
    description: 'Respectful, festive ideas inspired by tradition, gratitude, and joy.'
  },
  {
    name: 'Thank You Gifts',
    slug: 'thank-you-gifts',
    description: 'Heartfelt ways to express appreciation with sincerity and care.'
  },
  {
    name: 'New Baby Gifts',
    slug: 'new-baby-gifts',
    description: 'Tender keepsakes and supportive gestures for growing families.'
  },
  {
    name: 'Housewarming Gifts',
    slug: 'housewarming-gifts',
    description: 'Comforting ideas to welcome loved ones into a new home with warmth.'
  }
];
