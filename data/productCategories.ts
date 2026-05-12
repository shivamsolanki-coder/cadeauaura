export interface ProductCategory {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const productCategories: ProductCategory[] = [
  {
    name: 'Anniversary Gifts',
    slug: 'anniversary-gifts',
    description: 'Meaningful ideas to honor shared years, milestones, and lasting love.',
    image: '/images/cadeauaura-anniversary.svg'
  },
  {
    name: 'Birthday Gifts',
    slug: 'birthday-gifts',
    description: 'Warm, joyful ideas to celebrate personality, growth, and cherished memories.',
    image: '/images/cadeauaura-birthday.svg'
  },
  {
    name: 'Wedding Gifts',
    slug: 'wedding-gifts',
    description: 'Thoughtful gestures that celebrate new beginnings and togetherness.',
    image: '/images/cadeauaura-keepsake.svg'
  },
  {
    name: 'Graduation Gifts',
    slug: 'graduation-gifts',
    description: 'Encouraging keepsakes for proud transitions and bright next chapters.',
    image: '/images/cadeauaura-keepsake.svg'
  },
  {
    name: 'Festival Gifts',
    slug: 'festival-gifts',
    description: 'Respectful, festive ideas inspired by tradition, gratitude, and joy.',
    image: '/images/cadeauaura-festival.svg'
  },
  {
    name: 'Thank You Gifts',
    slug: 'thank-you-gifts',
    description: 'Heartfelt ways to express appreciation with sincerity and care.',
    image: '/images/cadeauaura-hero-gift.svg'
  },
  {
    name: 'New Baby Gifts',
    slug: 'new-baby-gifts',
    description: 'Tender keepsakes and supportive gestures for growing families.',
    image: '/images/cadeauaura-keepsake.svg'
  },
  {
    name: 'Housewarming Gifts',
    slug: 'housewarming-gifts',
    description: 'Comforting ideas to welcome loved ones into a new home with warmth.',
    image: '/images/cadeauaura-home.svg'
  }
];
