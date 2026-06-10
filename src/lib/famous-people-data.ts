export type FamousPerson = {
  initials: string
  name: string
  field: string
  fieldLabel: string
  description: string
  community?: boolean
  fieldClass: string
}

export const famousPeople: FamousPerson[] = [
  {
    initials: 'MC',
    name: 'Mariah Carey',
    field: 'music',
    fieldLabel: 'Music',
    fieldClass: 'f-music',
    description:
      'Diagnosed with bipolar II in 2001, she kept it private for nearly two decades — afraid it would end her career — before speaking openly and getting back to the music she loves.',
  },
  {
    initials: 'SG',
    name: 'Selena Gomez',
    field: 'music',
    fieldLabel: 'Music & screen',
    fieldClass: 'f-music',
    description:
      "Spoke publicly about her diagnosis in 2020, describing the relief of finally having a name for what she'd been facing — and using her platform to make it less frightening for others.",
  },
  {
    initials: 'BR',
    name: 'Bebe Rexha',
    field: 'music',
    fieldLabel: 'Music',
    fieldClass: 'f-music',
    description:
      "Shared her diagnosis in 2019. The fear she'd carried became openness — and a refusal to let a label shrink her ambition.",
  },
  {
    initials: 'HA',
    name: 'Halsey',
    field: 'music',
    fieldLabel: 'Music',
    fieldClass: 'f-music',
    description:
      'Diagnosed as a teenager, the singer has spoken candidly about living and creating with bipolar disorder rather than hiding it.',
  },
  {
    initials: 'CF',
    name: 'Carrie Fisher',
    field: 'screen',
    fieldLabel: 'Screen & writing',
    fieldClass: 'f-screen',
    description:
      "The Star Wars icon was diagnosed in the early 1980s and became one of her generation's most fearless, funny, and beloved mental-health advocates. (In memoriam.)",
  },
  {
    initials: 'CZ',
    name: 'Catherine Zeta-Jones',
    field: 'screen',
    fieldLabel: 'Screen',
    fieldClass: 'f-screen',
    description:
      "Disclosed her bipolar II diagnosis in 2011, choosing to speak up specifically so others wouldn't feel they had to suffer in silence.",
  },
  {
    initials: 'PD',
    name: 'Patty Duke',
    field: 'screen',
    fieldLabel: 'Screen',
    fieldClass: 'f-screen',
    description:
      'One of the first major stars to go public — in the 1980s — she wrote a landmark book and testified before Congress about living with the illness. (In memoriam.)',
  },
  {
    initials: 'SF',
    name: 'Stephen Fry',
    field: 'writing',
    fieldLabel: 'Writing',
    fieldClass: 'f-writing',
    description:
      'The writer and broadcaster has lived with bipolar disorder for decades and made a celebrated documentary about it, helping a generation talk openly about mental health.',
  },
  {
    initials: 'JP',
    name: 'Jane Pauley',
    field: 'writing',
    fieldLabel: 'Writing & news',
    fieldClass: 'f-writing',
    description:
      'The veteran journalist shared her diagnosis in her memoir and speaks plainly about the value of steady, consistent treatment.',
  },
  {
    initials: 'TC',
    name: 'Terri Cheney',
    field: 'writing',
    fieldLabel: 'Writing',
    fieldClass: 'f-writing',
    description:
      'A high-powered entertainment lawyer who concealed severe bipolar disorder for years, then wrote about it with unflinching honesty in two acclaimed books.',
  },
  {
    initials: 'EF',
    name: 'Ellen Forney',
    field: 'writing',
    fieldLabel: 'Writing & art',
    fieldClass: 'f-writing',
    description:
      'The cartoonist turned her diagnosis into warm, practical, widely loved graphic memoirs that have helped countless readers feel less alone.',
  },
  {
    initials: 'MH',
    name: 'Marya Hornbacher',
    field: 'writing',
    fieldLabel: 'Writing',
    fieldClass: 'f-writing',
    description:
      'Author of a searing memoir about living at the severe end of the bipolar spectrum — and finding a way to a meaningful life anyway.',
  },
  {
    initials: 'TT',
    name: 'Ted Turner',
    field: 'business',
    fieldLabel: 'Business',
    fieldClass: 'f-business',
    description:
      'The founder of CNN has spoken about being treated for bipolar disorder — a reminder that the condition reaches the boardroom, not only the arts.',
  },
  {
    initials: 'AD',
    name: 'Andy Dunn',
    field: 'business',
    fieldLabel: 'Business',
    fieldClass: 'f-business',
    description:
      'Co-founder of Bonobos, he built a major company while managing bipolar disorder and later wrote a candid memoir about the cost of hiding it.',
  },
  {
    initials: 'PE',
    name: 'Paul English',
    field: 'business',
    fieldLabel: 'Business',
    fieldClass: 'f-business',
    community: true,
    description:
      "Co-founder of Kayak and subject of Tracy Kidder's A Truck Full of Money — and a leader in our own community.",
  },
  {
    initials: 'SS',
    name: 'Sara Schley',
    field: 'business',
    fieldLabel: 'Business',
    fieldClass: 'f-business',
    community: true,
    description:
      'A corporate consultant who kept her diagnosis secret for decades before telling her story in Brain Storm — and a member of our community.',
  },
  {
    initials: 'KJ',
    name: 'Kay Redfield Jamison',
    field: 'science',
    fieldLabel: 'Science',
    fieldClass: 'f-science',
    description:
      'A clinical psychologist at Johns Hopkins who studies the illness she lives with. Her memoir reshaped how the world understands bipolar disorder.',
  },
  {
    initials: 'GM',
    name: 'Gregg Martin',
    field: 'leadership',
    fieldLabel: 'Leadership',
    fieldClass: 'f-leadership',
    community: true,
    description:
      'A retired U.S. Army major general who led troops in Iraq before a late-onset diagnosis — and who now writes and speaks openly. A member of our community.',
  },
]

export const fieldFilters = [
  { id: 'all', label: 'All' },
  { id: 'music', label: 'Music' },
  { id: 'screen', label: 'Screen' },
  { id: 'writing', label: 'Writing' },
  { id: 'business', label: 'Business' },
  { id: 'science', label: 'Science' },
  { id: 'leadership', label: 'Leadership' },
]

export const historicalFigures = [
  {
    name: 'Vincent van Gogh',
    era: 'Painter · 1853–1890',
    description:
      'His letters describe soaring energy and crushing lows. Whether that was bipolar disorder, epilepsy, or something else is still debated — his only diagnosis in life was "acute mania." World Bipolar Day falls on his birthday.',
  },
  {
    name: 'Virginia Woolf',
    era: 'Writer · 1882–1941',
    description:
      'Her diaries document intense mood swings that many later scholars have linked to bipolar disorder, though she was never formally diagnosed.',
  },
  {
    name: 'Robert Schumann',
    era: 'Composer · 1810–1856',
    description:
      'His own letters vividly capture manic and fallow stretches — a favorite case for psychiatrists, with the usual caution about diagnosing the dead.',
  },
  {
    name: 'Ernest Hemingway',
    era: 'Author · 1899–1961',
    description:
      "The Nobel laureate's mood struggles are widely discussed in biographical and medical writing, though any diagnosis remains retrospective.",
  },
  {
    name: 'Lord Byron',
    era: 'Poet · 1788–1824',
    description:
      'The Romantic poet is frequently cited in discussions of mood and creativity — suggestive, but far from settled.',
  },
  {
    name: 'Winston Churchill',
    era: 'Statesman · 1874–1965',
    description:
      'His "black dog" depression is well documented; some argue for a bipolar pattern, but historians disagree.',
  },
]

export const monoGradients: Record<string, string> = {
  'f-music': 'linear-gradient(135deg, var(--indigo), var(--rose))',
  'f-screen': 'linear-gradient(135deg, var(--indigo), var(--accent))',
  'f-writing': 'linear-gradient(135deg, var(--amber), var(--accent))',
  'f-business': 'linear-gradient(135deg, var(--indigo), var(--amber))',
  'f-science': 'linear-gradient(135deg, #2c6e72, var(--accent))',
  'f-leadership': 'linear-gradient(135deg, var(--ground), var(--indigo))',
}
