export type BookCategory =
  | 'Memoir'
  | 'Practical Guide'
  | 'For Families'
  | 'Science & Culture'
  | 'Clinical Reference'

export type Book = {
  title: string
  author: string
  category: BookCategory
  bscCommunity?: boolean
  buyUrl: string
  blurb: string
}

export const readingList: { section: string; books: Book[] }[] = [
  {
    section: 'Community & Curated Picks',
    books: [
      {
        title: 'A Truck Full of Money',
        author: 'Tracy Kidder',
        category: 'Memoir',
        bscCommunity: true,
        buyUrl: 'https://www.amazon.com/dp/0812985354',
        blurb:
          "The inspiring biography of Paul English — beloved BSC community leader and co-founder of Kayak — who grew up in working-class Boston, built a travel empire sold for nearly $2 billion, and navigated the journey with undiagnosed bipolar disorder.",
      },
      {
        title: 'Brain Storm: From Broken to Blessed on the Bipolar Spectrum',
        author: 'Sara Schley',
        category: 'Memoir',
        bscCommunity: true,
        buyUrl: 'https://www.amazon.com/BrainStorm-Broken-Blessed-Bipolar-Spectrum/dp/B09QJ4Y6MF',
        blurb:
          'International business consultant Sara Schley — a leader in our group — kept her Bipolar II diagnosis secret for decades while leading organizational transformations worldwide.',
      },
      {
        title: 'Bipolar General: My Forever War with Mental Illness',
        author: 'Maj. Gen. (Ret.) Gregg Martin',
        category: 'Memoir',
        bscCommunity: true,
        buyUrl: 'https://www.amazon.com/dp/1682473805',
        blurb:
          'General Gregg Martin led thousands of combat engineers to Baghdad in 2003 — not yet knowing the Iraq War was triggering late-onset bipolar disorder.',
      },
      {
        title: 'An Unquiet Mind',
        author: 'Kay Redfield Jamison',
        category: 'Memoir',
        buyUrl: 'https://www.amazon.com/dp/0679763309',
        blurb:
          "One of the most celebrated memoirs ever written about mental illness. Dr. Jamison — a world-renowned psychiatrist at Johns Hopkins — weaves her personal battles with manic depression together with her clinical expertise.",
      },
      {
        title: 'Touched with Fire: Manic-Depressive Illness and the Artistic Temperament',
        author: 'Kay Redfield Jamison',
        category: 'Science & Culture',
        buyUrl: 'https://www.amazon.com/dp/0684831600',
        blurb:
          'Jamison explores the historical overlap between manic-depressive illness and artistic genius — with appropriate caution about retrospective attribution.',
      },
      {
        title: 'Fires in the Dark: Healing the Unquiet Mind',
        author: 'Kay Redfield Jamison',
        category: 'Science & Culture',
        buyUrl: 'https://www.amazon.com/dp/0593444906',
        blurb:
          'Jamison explores what it means to heal — not just manage — a troubled mind, examining modern psychiatry and the role of love and community.',
      },
      {
        title: 'The Mood Cure',
        author: 'Julia Ross',
        category: 'Practical Guide',
        buyUrl: 'https://www.amazon.com/dp/0142003646',
        blurb:
          'A science-backed plan for addressing dietary and biochemical roots of mood instability — a complement to traditional treatment, not a replacement.',
      },
      {
        title: 'Marbles: Mania, Depression, Michelangelo & Me',
        author: 'Ellen Forney',
        category: 'Memoir',
        buyUrl: 'https://www.amazon.com/dp/1592407617',
        blurb:
          'Cartoonist Ellen Forney tells her story of being diagnosed with bipolar disorder at 30 in this acclaimed graphic memoir.',
      },
      {
        title: 'Rock Steady: Brilliant Advice from My Bipolar Life',
        author: 'Ellen Forney',
        category: 'Practical Guide',
        buyUrl: 'https://www.amazon.com/dp/1683690567',
        blurb:
          'A practical, illustrated guide to managing bipolar disorder day-to-day — mood tracking, medication, wellness toolbox, and resilience.',
      },
      {
        title: 'Burn Rate: Launching a Startup and Losing My Mind',
        author: 'Andy Dunn',
        category: 'Memoir',
        buyUrl: 'https://www.amazon.com/dp/1984880764',
        blurb:
          'The co-founder of Bonobos on building a major company while secretly battling bipolar disorder.',
      },
      {
        title: 'Manic: A Memoir',
        author: 'Terri Cheney',
        category: 'Memoir',
        buyUrl: 'https://www.amazon.com/dp/0061451746',
        blurb:
          'Hollywood entertainment lawyer Terri Cheney on concealing severe bipolar disorder for years — visceral, no-holds-barred.',
      },
      {
        title: 'A First-Rate Madness: Uncovering the Links Between Leadership and Mental Illness',
        author: 'Nassir Ghaemi',
        category: 'Science & Culture',
        buyUrl: 'https://www.amazon.com/dp/0143120107',
        blurb:
          "Ghaemi's provocative argument about leadership and mood disorders — read with the usual caution about historical interpretation.",
      },
      {
        title: 'Understanding Bipolar Disorder: The Essential Family Guide',
        author: 'Aimee Daramus',
        category: 'For Families',
        buyUrl: 'https://www.amazon.com/dp/1683732286',
        blurb:
          'A compassionate guide for families and loved ones — diagnosis, treatments, and day-to-day realities in plain language.',
      },
      {
        title: 'Take Charge of Bipolar Disorder',
        author: 'Julie A. Fast & John Preston',
        category: 'Practical Guide',
        buyUrl: 'https://www.amazon.com/dp/0446697079',
        blurb:
          'A structured program for managing bipolar disorder — medication adherence, lifestyle, mood charting, and crisis planning.',
      },
      {
        title: 'Loving Someone with Bipolar Disorder',
        author: 'Julie A. Fast & John D. Preston',
        category: 'For Families',
        buyUrl: 'https://www.amazon.com/dp/157224767X',
        blurb:
          'For partners and spouses — managing episodes, boundaries, intimacy, and caregiver burnout.',
      },
      {
        title: 'The Hypomanic Edge',
        author: 'John D. Gartner',
        category: 'Science & Culture',
        buyUrl: 'https://www.amazon.com/dp/0743227298',
        blurb:
          'An argument about hypomanic temperaments and entrepreneurial culture — provocative, not prescriptive.',
      },
    ],
  },
  {
    section: 'More Recommended Reading',
    books: [
      {
        title: 'The Bipolar Disorder Survival Guide',
        author: 'David J. Miklowitz',
        category: 'Clinical Reference',
        buyUrl: 'https://www.amazon.com/dp/1462525636',
        blurb:
          'The gold-standard clinical guide for people with bipolar disorder and their families.',
      },
      {
        title: 'Madness: A Bipolar Life',
        author: 'Marya Hornbacher',
        category: 'Memoir',
        buyUrl: 'https://www.amazon.com/dp/0547237804',
        blurb:
          'One of the most honest accounts of severe bipolar illness ever published — visceral power and dark wit.',
      },
      {
        title: 'Electroboy: A Memoir of Mania',
        author: 'Andy Behrman',
        category: 'Memoir',
        buyUrl: 'https://www.amazon.com/dp/0812971043',
        blurb:
          'Years of hidden mania behind a larger-than-life personality — and eventually, electroconvulsive therapy.',
      },
      {
        title: 'Manic-Depressive Illness: Bipolar Disorders and Recurrent Depression',
        author: 'Frederick Goodwin & Kay Redfield Jamison',
        category: 'Clinical Reference',
        buyUrl: 'https://www.amazon.com/dp/0195135792',
        blurb:
          'The definitive clinical textbook — for readers who want deep understanding of the illness and treatment options.',
      },
      {
        title: 'Bipolar, Not So Much',
        author: 'Christopher Aiken & James Phelps',
        category: 'Practical Guide',
        buyUrl: 'https://www.amazon.com/dp/0393711870',
        blurb:
          'For symptoms in the softer bipolar spectrum — cycling moods, recurrent depression, or hypomania that may not fit strict Bipolar I or II.',
      },
      {
        title: 'Mental: Lithium, Love, and Losing My Mind',
        author: 'Jaime Lowe',
        category: 'Memoir',
        buyUrl: 'https://www.amazon.com/dp/006241819X',
        blurb:
          'Journalist Jaime Lowe on lithium — the simple salt at the cornerstone of bipolar treatment.',
      },
      {
        title: "Modern Madness: An Owner's Manual to Mental Illness",
        author: 'Terri Cheney',
        category: 'Practical Guide',
        buyUrl: 'https://www.amazon.com/dp/0316458929',
        blurb:
          "Cheney's follow-up to Manic — practical concepts framed as Instructions for Use, Troubleshooting, Maintenance.",
      },
    ],
  },
]

export const allBooks = readingList.flatMap((s) => s.books)

export const bookCategories: BookCategory[] = [
  'Memoir',
  'Practical Guide',
  'For Families',
  'Science & Culture',
  'Clinical Reference',
]
