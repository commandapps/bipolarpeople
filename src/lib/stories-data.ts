export type PublishedStory = {
  id: string
  category: string
  categoryId: string
  title: string
  excerpt: string
  author: string
  authorInitials: string
  detail: string
  readTime: string
  publishedDate: string
  featured?: boolean
  community?: boolean
  /** Paragraphs separated by blank lines. Lines starting with ## are headings. */
  content: string
}

export type StoryListing = Omit<PublishedStory, 'content'> & {
  hasFullStory: boolean
}

export const publishedStories: PublishedStory[] = [
  {
    id: 'marcus-disclosure',
    category: 'Disclosure',
    categoryId: 'work',
    title: 'I built my life around a secret. Telling it set me free.',
    excerpt:
      '"I planned my whole life around not being found out. The day I finally said it out loud, the planning stopped — and the living started."',
    author: 'Marcus',
    authorInitials: 'M',
    detail: '41 · Bipolar I · diagnosed at 33',
    readTime: '8 min',
    publishedDate: '2025-11-12',
    featured: true,
    content: `For twenty years, I treated my diagnosis like a security clearance I didn't have. I built a career in consulting — the kind where you're always on, always sharp, always "on brand." I was good at it. I was also exhausted in a way I couldn't explain to anyone who didn't already know.

The secret wasn't just that I had bipolar disorder. It was that I'd organized my entire life around making sure no one could tell. I skipped drinks after work because alcohol and meds don't mix well. I turned down travel when I was cycling. I said I was "introverted" when I needed to disappear for a weekend to reset. Every decision ran through a filter: will this expose me?

## The version in my head

I'd rehearsed disclosure a hundred times. In every version, I lost the client. Or the promotion. Or the respect of people whose opinions I'd spent years earning. I watched colleagues talk openly about anxiety or ADHD and thought: that's brave, but it's not the same. Bipolar still carries a different weight in people's minds — mania, instability, unpredictability. I didn't trust the room to hold the full picture.

So I performed stability. High-functioning on the outside. Managing on the inside. It worked, mostly. Until it didn't.

## What actually happened

I didn't plan a big reveal. A project went sideways during a hypomanic stretch — I was moving too fast, talking over people, missing details I normally catch. My manager pulled me aside. Not angry. Concerned. She asked if everything was okay at home.

I could have deflected. I had a decade of practice. Instead I said: "I have bipolar disorder. I think I'm not well right now, and I need to slow down."

The silence lasted maybe three seconds. It felt like three hours.

She said: "Thank you for telling me. What do you need?"

That was it. No firing. No whisper campaign. We adjusted deadlines. I saw my psychiatrist within the week. The project recovered. More importantly, I stopped spending half my energy on concealment.

## What changed after

Disclosure didn't fix everything. I still have episodes. I still need medication and sleep and boundaries. But the constant bracing — the low-grade panic that someone would find out — lifted. I could use that energy for actual management instead of performance.

Some colleagues know. Some don't. That's fine. I'm not evangelizing. I'm just not hiding anymore.

## If you're where I was

You don't owe anyone your medical history. Disclosure is a choice, not a moral requirement. But if you're spending your life in preemptive damage control, ask yourself what you'd do with the energy you get back. For me, the answer was: live more honestly, and give myself room to be human on the hard days.

*This story reflects one person's experience. It is not medical advice. If you're struggling, please reach out to your care team or call 988.*`,
  },
  {
    id: 'priya-diagnosis-map',
    category: 'Newly diagnosed',
    categoryId: 'diagnosis',
    title: 'The diagnosis I dreaded was the map I needed.',
    excerpt:
      '"For a year I thought I was just bad at being a person. A name changed everything."',
    author: 'Priya',
    authorInitials: 'P',
    detail: '26 · Bipolar II',
    readTime: '4 min',
    publishedDate: '2025-10-03',
    content: `I spent my final year of college sleeping through alarms, crying in bathroom stalls, and then somehow finishing papers in frantic all-nighters that felt like superpowers. I thought everyone lived like this. I thought I was lazy, undisciplined, broken in a generic way that didn't deserve a name.

When a campus counselor said "bipolar II," I felt like the floor dropped out. I'd seen the headlines. I'd heard the jokes. This wasn't supposed to be me — I was the reliable one, the planner, the friend who remembered birthdays.

## The first month was grief

I mourned the version of myself I thought I was supposed to become. I googled at 2 a.m. and scared myself half to death. I didn't tell my parents for six weeks because I couldn't figure out how to say it without sounding like I was failing at adulthood.

What helped wasn't inspiration-poster optimism. It was structure. A psychiatrist who explained hypomania in plain language. A mood chart that made my patterns visible for the first time. Reading stories from people who weren't cautionary tales — people with jobs and relationships and messy, ordinary lives.

## The map part

The diagnosis didn't fix me. It oriented me. Instead of "why can't I keep it together," I could ask "am I in a depressive stretch, and what usually helps?" Instead of shame about the all-nighters, I could recognize hypomania and talk to my doctor before I crashed.

I'm still learning. Some semesters are harder than others. But I'm not fighting myself in the dark anymore.

*Shared with consent. Not a substitute for professional care.*`,
  },
  {
    id: 'dana-early-signs',
    category: 'Family & relationships',
    categoryId: 'family',
    title: 'My partner learned my early warning signs before I did.',
    excerpt:
      '"Now when he says \'you seem a little fast today,\' I\'ve learned to listen."',
    author: 'Dana',
    authorInitials: 'D',
    detail: '38 · Bipolar I',
    readTime: '6 min',
    publishedDate: '2025-09-18',
    content: `My partner Alex is not a clinician. He's a person who has lived with me through three hospitalizations and a lot of ordinary Tuesdays. Early in our relationship, I resented it when he noticed I was "off." I read it as surveillance. As if he was waiting for me to break.

I was wrong about that. He was waiting for me to listen.

## What he noticed first

Before I feel manic, I talk faster. I start three projects. I sleep two hours less and call it productivity. I get impatient with questions — not angry, exactly, but brittle. Alex learned these signs before I had language for them. When he says, gently, "you seem a little fast today," my instinct is still to argue. My better instinct, the one I'm still building, is to pause.

We have a plan now. Not dramatic. Practical. If he flags early signs, I check in with my psychiatrist within 48 hours. We reduce stimulation — fewer late nights, less caffeine, no major purchases. I don't always want to. Mania can feel like clarity. That's part of why the outside perspective matters.

## Trust on both sides

This only works because I asked him to tell me, and because he tells me without panic or judgment. He doesn't say "you're manic" as an accusation. He says "I'm worried about the pattern I'm seeing." That difference matters.

I also had to learn that his worry isn't an attack on my competence. Loving someone with bipolar disorder is hard. Letting them love me back — including the monitoring — was part of my recovery.

*Every relationship is different. Work with your own care team on warning signs and safety plans.*`,
  },
  {
    id: 'reuben-turning-point',
    category: 'Hospitalization',
    categoryId: 'hospital',
    title: "The ward wasn't the end of my story. It was a turning point.",
    excerpt:
      '"I was so ashamed to be there. Looking back, it\'s where I finally got to put things down."',
    author: 'Reuben',
    authorInitials: 'R',
    detail: '52 · Bipolar I',
    readTime: '8 min',
    publishedDate: '2025-08-22',
    content: `I was admitted during a mixed episode I didn't have words for at the time — agitated, sleepless, hopeless, and somehow still moving at full speed. I'd been holding up a business and a marriage and a story about being the strong one. The ward felt like admitting defeat in public.

The first two days, I barely spoke. Shame is loud even when you're quiet.

## What the ward actually gave me

It wasn't healing in a cinematic sense. It was interruption. Medication adjustments under supervision. Sleep I couldn't negotiate away. Nurses who'd seen this before and didn't flinch. Group sessions where nobody asked me to perform wellness.

I met a retired teacher who made dark jokes that made me laugh for the first time in weeks. I met a kid who wrote poetry on napkins. I wasn't special or doomed. I was a person in a crisis bed, same as them.

## After discharge

Leaving wasn't a montage. I went home to paperwork, follow-ups, and a marriage that needed honest conversation. But I stopped pretending I could white-knuckle my way through every episode alone. I built a crisis plan. I gave my wife permission to call my doctor if she saw the pattern returning.

Hospitalization isn't failure. For me, it was the first time I treated the illness as serious as it actually is.

*If you or someone you love is in crisis, call 988 or go to your nearest emergency department.*`,
  },
  {
    id: 'jordan-five-years',
    category: 'Recovery & hope',
    categoryId: 'recovery',
    title: "Five years stable. I almost can't believe that sentence.",
    excerpt:
      '"Steady used to sound boring. Now it sounds like everything I fought for."',
    author: 'Jordan',
    authorInitials: 'J',
    detail: '29 · Bipolar I',
    readTime: '5 min',
    publishedDate: '2025-07-14',
    content: `When I was twenty-two, "stable" sounded like a consolation prize. I wanted my old hypomanic productivity back — the charisma, the late nights, the feeling that I could outrun anything. Stability felt like someone had turned the volume down on my life.

Five years later, I understand what I was actually chasing. It wasn't greatness. It was unreliability dressed up as brilliance.

## What stable actually looks like

It's not perfect mood every day. I still have rough weeks. I still adjust medications sometimes. Stable means episodes are shorter, farther apart, and don't destroy the life I've built between them. It means my friends trust that I'll show up. It means I sleep mostly normal hours and don't make catastrophic decisions when I'm elevated.

The boring parts — routines, sleep hygiene, taking meds even when I feel fine — those are the whole game.

## Hope without toxic positivity

I'm not "cured." I don't give talks about overcoming bipolar disorder like it's a obstacle course with a finish line. I manage it. Some days that's graceful. Some days it's just getting through.

If you're in the thick of it, steady might sound impossible. I wouldn't have believed this sentence five years ago either. I'm saying it anyway, in case you need one data point that isn't disaster.

*Recovery looks different for everyone.*`,
  },
]

/** Teaser-only cards shown in the community grid without a detail page yet. */
export const storyTeasers: Omit<StoryListing, 'content'>[] = [
  {
    id: '',
    category: 'Work & career',
    categoryId: 'work',
    title: 'I told my manager. It went better than the version in my head.',
    excerpt:
      '"I\'d rehearsed getting fired a hundred times. Instead, she asked how she could help."',
    author: 'Anonymous',
    authorInitials: 'A',
    detail: 'Bipolar I',
    readTime: '5 min',
    publishedDate: '',
    hasFullStory: false,
  },
  {
    id: '',
    category: 'Treatment',
    categoryId: 'treatment',
    title: "It took four tries to find what worked. I'm glad I didn't quit at three.",
    excerpt:
      '"Finding the right plan felt like failing, over and over. It wasn\'t. It was the work."',
    author: 'Anonymous',
    authorInitials: 'A',
    detail: 'Bipolar II',
    readTime: '7 min',
    publishedDate: '',
    hasFullStory: false,
  },
  {
    id: '',
    category: 'Newly diagnosed',
    categoryId: 'diagnosis',
    title: 'Finishing my degree on my own timeline.',
    excerpt:
      '"I stopped measuring myself against everyone else\'s clock. It changed how I study, and how I rest."',
    author: 'Lena',
    authorInitials: 'L',
    detail: '23 · Bipolar II',
    readTime: '4 min',
    publishedDate: '',
    hasFullStory: false,
  },
  {
    id: '',
    category: 'Family & relationships',
    categoryId: 'family',
    title: 'Telling my kids, in words they could hold.',
    excerpt:
      '"I worried I\'d scare them. Instead, naming it gave all of us a little more room to breathe."',
    author: 'Anonymous',
    authorInitials: 'A',
    detail: 'Bipolar II',
    readTime: '6 min',
    publishedDate: '',
    hasFullStory: false,
  },
  {
    id: '',
    category: 'Recovery & hope',
    categoryId: 'recovery',
    title: 'I stopped editing myself out of my own life.',
    excerpt:
      '"Hiding took more energy than the illness ever did. Letting people in gave it back."',
    author: 'Sam',
    authorInitials: 'S',
    detail: '45 · Bipolar I',
    readTime: '7 min',
    publishedDate: '',
    hasFullStory: false,
    community: true,
  },
]

export const storyFilters = [
  { id: 'all', label: 'All' },
  { id: 'diagnosis', label: 'Newly diagnosed' },
  { id: 'work', label: 'Work & career' },
  { id: 'family', label: 'Family & relationships' },
  { id: 'treatment', label: 'Treatment' },
  { id: 'hospital', label: 'Hospitalization' },
  { id: 'recovery', label: 'Recovery & hope' },
]

export function toListing(story: PublishedStory): StoryListing {
  const { content, ...rest } = story
  void content
  return { ...rest, hasFullStory: true }
}

export function getAllStoryListings(): StoryListing[] {
  const published = publishedStories.map(toListing)
  return [...published, ...storyTeasers]
}

export function getStoryById(id: string): PublishedStory | undefined {
  return publishedStories.find((s) => s.id === id)
}

export function getFeaturedStory(): PublishedStory {
  return publishedStories.find((s) => s.featured) ?? publishedStories[0]
}

export function getRelatedStories(id: string, limit = 2): PublishedStory[] {
  const current = getStoryById(id)
  if (!current) return publishedStories.filter((s) => s.id !== id).slice(0, limit)
  return publishedStories
    .filter((s) => s.id !== id && s.categoryId === current.categoryId)
    .concat(publishedStories.filter((s) => s.id !== id && s.categoryId !== current.categoryId))
    .slice(0, limit)
}
