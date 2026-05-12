import Image from 'next/image';
import Link from 'next/link';

import { HeroAuraCanvas } from '@/components/HeroAuraCanvas';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionLabel } from '@/components/SectionLabel';
import { giftIdeas } from '@/data/giftIdeas';
import { productCategories } from '@/data/productCategories';

const pillars = [
  {
    title: 'Heartfelt Idea Finder',
    text: 'A guided emotional lens that transforms relationships, moments, and traditions into deeply thoughtful suggestions.',
    href: '/gift-finder'
  },
  {
    title: 'Meaning Cards',
    text: 'Poetic reflections that help every gesture feel remembered, witnessed, and beautifully personal.',
    href: '/meaning-cards'
  },
  {
    title: 'Culture & Tradition',
    text: 'Respectful storytelling cues for honoring rituals, family values, and modern celebrations with grace.',
    href: '/culture-tradition'
  }
];

const storyFrames = [
  {
    title: 'A quiet thought becomes a luminous idea.',
    image: '/images/cadeauaura-keepsake.svg'
  },
  {
    title: 'The person, the moment, and the feeling move into focus.',
    image: '/images/cadeauaura-anniversary.svg'
  },
  {
    title: 'CadeauAura shapes the gesture into a memory with emotional depth.',
    image: '/images/cadeauaura-festival.svg'
  }
];

const previewImages = ['/images/cadeauaura-anniversary.svg', '/images/cadeauaura-birthday.svg', '/images/cadeauaura-festival.svg'];
const featuredIdeas = giftIdeas.slice(0, 3);
const whatsappHref = 'https://wa.me/15551234567?text=Hello%20CadeauAura%2C%20I%20would%20love%20help%20choosing%20a%20meaningful%20gift%20idea.';

export default function HomePage() {
  return (
    <div className="space-y-24 overflow-hidden">
      <section className="relative grid min-h-[720px] items-center gap-10 rounded-[2.5rem] border border-white/10 bg-aura-radial p-6 shadow-aura md:grid-cols-[1.04fr_0.96fr] md:p-10 lg:p-14">
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-gold-200/20 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-luxury-purple/25 blur-3xl" />

        <div className="relative z-10">
          <SectionLabel label="Cinematic gift intelligence" />
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.95] text-stone-text sm:text-6xl lg:text-7xl">
            Make every moment feel <span className="text-gold-gradient">seen, sacred, and unforgettable.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-text/72">
            CadeauAura turns emotion into atmosphere: meaningful gift ideas, heartfelt message lines, and culturally respectful inspiration wrapped in a premium storytelling experience.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/gift-finder"
              className="rounded-full bg-gold-200 px-6 py-3 text-sm font-semibold text-midnight-black shadow-[0_0_34px_rgba(246,213,138,0.34)] transition hover:-translate-y-1 hover:bg-gold-100"
            >
              Explore Heartfelt Idea Finder
            </Link>
            <a
              href={whatsappHref}
              className="rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-gold-100 backdrop-blur transition hover:-translate-y-1 hover:border-gold-200/50"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative z-10 min-h-[520px]">
          <div className="absolute inset-0 animate-float-slow opacity-70">
            <HeroAuraCanvas />
          </div>
          <div className="relative ml-auto max-w-[440px] rounded-[2rem] border border-gold-200/25 bg-black/35 p-4 shadow-aura backdrop-blur-xl">
            <Image
              src="/images/cadeauaura-hero-gift.svg"
              alt="Premium CadeauAura gift box with glowing ribbon"
              width={900}
              height={760}
              priority
              className="rounded-[1.5rem] object-cover"
            />
            <div className="glass-panel mt-4 rounded-3xl p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold-200/70">Featured moment</p>
              <p className="mt-2 font-serif text-2xl text-gold-100">A tangible gift, wrapped in emotion, tradition, and memory.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {pillars.map((item, index) => (
          <ScrollReveal key={item.title} delay={index * 120}>
            <article className="cinematic-card h-full">
              <p className="text-xs uppercase tracking-[0.28em] text-gold-200/55">0{index + 1}</p>
              <h2 className="mt-5 font-serif text-3xl text-gold-100">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-stone-text/70">{item.text}</p>
              <Link href={item.href} className="premium-link mt-6 inline-block text-sm font-semibold">
                Enter the scene →
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl md:p-10">
        <ScrollReveal>
          <SectionLabel label="Gift categories" />
          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl font-serif text-4xl text-gold-100 md:text-5xl">Browse visual paths for the moments that matter.</h2>
            <Link href="/categories" className="premium-link text-sm font-semibold">
              Explore all categories →
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {productCategories.slice(0, 4).map((category, index) => (
            <ScrollReveal key={category.slug} delay={index * 90}>
              <Link href={`/categories/${category.slug}`} className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-glass transition duration-500 hover:-translate-y-2 hover:border-gold-200/45 hover:shadow-aura">
                <Image src={category.image} alt={`${category.name} preview`} width={720} height={540} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="p-5">
                  <h3 className="font-serif text-2xl text-gold-100">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-text/65">{category.description}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <ScrollReveal>
          <div className="sticky top-28 rounded-[2.5rem] border border-gold-200/20 bg-aura-radial p-8 shadow-aura">
            <SectionLabel label="Gift previews" />
            <h2 className="mt-5 font-serif text-4xl text-gold-100 md:text-5xl">Real ideas with a cinematic soul.</h2>
            <p className="mt-4 text-sm leading-7 text-stone-text/70">
              Keep the glow and motion, but let people see the kinds of thoughtful keepsakes, rituals, and memory pieces CadeauAura can guide them toward.
            </p>
            <a href={whatsappHref} className="mt-7 inline-flex rounded-full bg-gold-200 px-6 py-3 text-sm font-semibold text-midnight-black transition hover:-translate-y-1 hover:bg-gold-100">
              Start a WhatsApp enquiry
            </a>
          </div>
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
          {featuredIdeas.map((idea, index) => (
            <ScrollReveal key={idea.id} delay={index * 100}>
              <article className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-glass transition duration-500 hover:-translate-y-2 hover:border-gold-200/45 md:grid-cols-[0.85fr_1.15fr]">
                <Image src={previewImages[index]} alt={`${idea.title} gift preview`} width={720} height={540} className="h-full min-h-64 w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-gold-200/55">Meaningful preview</p>
                  <h3 className="mt-4 font-serif text-3xl text-gold-100">{idea.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-text/70">{idea.summary}</p>
                  <p className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-stone-text/72">
                    <span className="font-semibold text-gold-200">Why it matters:</span> {idea.meaning}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl md:p-10">
        <ScrollReveal>
          <SectionLabel label="Video-style storytelling" />
          <h2 className="mt-5 max-w-3xl font-serif text-4xl text-gold-100 md:text-5xl">
            A premium journey from feeling to unforgettable gesture.
          </h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {storyFrames.map((frame, index) => (
            <ScrollReveal key={frame.title} delay={index * 140}>
              <article className="group relative min-h-80 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-purple-950/20">
                <Image src={frame.image} alt={`${frame.title} visual story`} width={720} height={540} className="h-56 w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold-200/55">Scene {index + 1}</p>
                  <h3 className="mt-4 font-serif text-3xl text-stone-text">{frame.title}</h3>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className="relative overflow-hidden rounded-[2.5rem] border border-gold-200/20 bg-gradient-to-r from-gold-200/15 via-luxury-purple/15 to-black p-8 text-center shadow-aura md:p-12">
          <div className="absolute left-1/2 top-0 h-32 w-2/3 -translate-x-1/2 rounded-full bg-gold-200/20 blur-3xl" />
          <SectionLabel label="Begin the aura" />
          <h2 className="relative mx-auto mt-5 max-w-3xl font-serif text-4xl text-gold-100 md:text-5xl">
            Let CadeauAura guide the feeling before the moment arrives.
          </h2>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/categories" className="inline-flex rounded-full bg-gold-200 px-7 py-3 text-sm font-semibold text-midnight-black transition hover:-translate-y-1 hover:bg-gold-100">
              Explore Categories
            </Link>
            <a href={whatsappHref} className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-7 py-3 text-sm font-semibold text-gold-100 backdrop-blur transition hover:-translate-y-1 hover:border-gold-200/50">
              WhatsApp Enquiry
            </a>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
