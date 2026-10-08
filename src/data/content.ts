// ─── REPLACE THESE VALUES WITH YOUR ACTUAL CHURCH DETAILS ───────────────────
export const CHURCH_NAME = 'Grace Community Church'
export const YOUTH_NAME = 'PULSE Youth'
export const TAGLINE_EN = 'Faith. Fire. Future.'
export const TAGLINE_SW = 'Imani. Moto. Mustakabali.'
export const LOCATION = 'Nakuru, Rift Valley, Kenya'
export const ADDRESS = 'Grace Community Church, Kenyatta Ave, Nakuru 20100, Kenya'
export const PHONE = '+254 700 123 456' // REPLACE
export const EMAIL = 'pulse.youth@gracecc.or.ke' // REPLACE
export const WHATSAPP_NUMBER = '254700123456' // REPLACE (no + sign)
export const INSTAGRAM = 'pulseyouth_nakuru' // REPLACE
export const TIKTOK = 'pulseyouth' // REPLACE
export const YOUTUBE = 'PULSEYouthNakuru' // REPLACE
export const MPESA_PAYBILL = '123456' // REPLACE
export const MPESA_ACCOUNT = 'PULSEYOUTH' // REPLACE
export const MPESA_TILL = '1234567' // REPLACE
export const MEETING_DAY = 'Every Friday'
export const MEETING_TIME = '5:00 PM – 7:00 PM'
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Nakuru+Kenya' // REPLACE
// ─────────────────────────────────────────────────────────────────────────────

export interface Event {
  id: string
  title: string
  titleSw: string
  date: string
  time: string
  location: string
  cost: string
  type: 'weekly' | 'retreat' | 'outreach' | 'social' | 'worship'
  description: string
  leader: string
  leaderPhone: string
  image?: string
  featured?: boolean
}

export const events: Event[] = [
  {
    id: 'friday-service',
    title: 'Weekly Friday Youth Service',
    titleSw: 'Ibada ya Vijana ya Ijumaa',
    date: '2026-10-03',
    time: '5:00 PM – 7:00 PM',
    location: 'Grace Community Church Main Hall',
    cost: 'Free',
    type: 'weekly',
    description: 'Our flagship weekly gathering — worship, the Word, small group discussion, and fellowship. Bring a friend!',
    leader: 'Pastor David Kamau',
    leaderPhone: '+254700123456',
    featured: true,
  },
  {
    id: 'game-night',
    title: 'Epic Game Night',
    titleSw: 'Usiku wa Michezo',
    date: '2026-10-08',
    time: '4:00 PM – 8:00 PM',
    location: 'Grace Community Church Grounds',
    cost: 'Free',
    type: 'social',
    description: 'Board games, outdoor games, food, and fun! A great evening to hang out with friends old and new.',
    leader: 'Brian Ochieng',
    leaderPhone: '+254700123457',
  },
  {
    id: 'outreach-childrens-home',
    title: 'Community Outreach — Nakuru Children\'s Home',
    titleSw: 'Huduma ya Jamii — Nyumba ya Watoto',
    date: '2026-10-12',
    time: '9:00 AM – 1:00 PM',
    location: 'Nakuru Children\'s Home, Section 58',
    cost: 'Free (bring a small gift or snack to share)',
    type: 'outreach',
    description: 'Join us as we visit, play, pray, and share God\'s love with the children at Nakuru Children\'s Home.',
    leader: 'James Mutua',
    leaderPhone: '+254700123458',
  },
  {
    id: 'worship-night',
    title: 'Worship Night: Pour Out',
    titleSw: 'Usiku wa Ibada: Mwaga',
    date: '2026-10-15',
    time: '6:00 PM – 9:00 PM',
    location: 'Grace Community Church Sanctuary',
    cost: 'Free',
    type: 'worship',
    description: 'A night of extended worship, prayer, and God\'s presence. Come as you are and encounter Jesus.',
    leader: 'Sarah Wanjiru',
    leaderPhone: '+254700123459',
    featured: true,
  },
  {
    id: 'lake-naivasha-retreat',
    title: 'Lake Naivasha Youth Retreat 2026',
    titleSw: 'Retreat ya Vijana Ziwa Naivasha 2026',
    date: '2026-10-18',
    time: 'Sat 7:00 AM – Mon 5:00 PM',
    location: 'YMCA Naivasha Conference Centre',
    cost: 'Ksh 3,500 (full board, transport included)',
    type: 'retreat',
    description: 'Our annual retreat at the beautiful shores of Lake Naivasha. Three days of teaching, worship, fun, team building, and genuine life transformation.',
    leader: 'Pastor David Kamau',
    leaderPhone: '+254700123456',
    featured: true,
  },
  {
    id: 'creative-arts-showcase',
    title: 'Creative Arts Showcase',
    titleSw: 'Onyesho la Sanaa za Ubunifu',
    date: '2026-10-25',
    time: '3:00 PM – 6:00 PM',
    location: 'Grace Community Church Hall',
    cost: 'Free',
    type: 'social',
    description: 'Spoken word, drama, visual art, and dance — celebrating the God-given creativity in our youth. Everyone is welcome to watch or participate!',
    leader: 'Grace Akinyi',
    leaderPhone: '+254700123460',
  },
]

export interface Leader {
  id: string
  name: string
  role: string
  roleSw: string
  bio: string
  phone: string
  email: string
  ministries: string[]
}

export const leaders: Leader[] = [
  {
    id: 'david-kamau',
    name: 'Pastor David Kamau',
    role: 'Youth Pastor',
    roleSw: 'Mchungaji wa Vijana',
    bio: 'David has been serving PULSE Youth for 7 years. He\'s passionate about helping young people discover their identity in Christ, and loves football, hiking, and terrible jokes.',
    phone: '+254700123456',
    email: 'david@gracecc.or.ke',
    ministries: ['Weekly Service', 'Mentorship', 'Retreats'],
  },
  {
    id: 'sarah-wanjiru',
    name: 'Sarah Wanjiru',
    role: 'Worship Leader',
    roleSw: 'Kiongozi wa Ibada',
    bio: 'Sarah leads our worship team with incredible energy and a heart after God. She has been part of PULSE since she was 16 and is now studying music at KU.',
    phone: '+254700123459',
    email: 'sarah@gracecc.or.ke',
    ministries: ['Worship Team', 'Creative Arts'],
  },
  {
    id: 'brian-ochieng',
    name: 'Brian Ochieng',
    role: 'Media & Tech Lead',
    roleSw: 'Kiongozi wa Midia na Teknolojia',
    bio: 'Brian runs all things digital — livestreams, social media, photography, and sound. Software engineer by day, tech minister by weekend.',
    phone: '+254700123457',
    email: 'brian@gracecc.or.ke',
    ministries: ['Media Team', 'Tech Team', 'Livestream'],
  },
  {
    id: 'faith-nyambura',
    name: 'Faith Nyambura',
    role: 'Small Groups Coordinator',
    roleSw: 'Mratibu wa Vikundi Vidogo',
    bio: 'Faith coordinates all our small group Bible studies and ensures every young person has a community where they belong. She loves baking and reading.',
    phone: '+254700123461',
    email: 'faith@gracecc.or.ke',
    ministries: ['Small Groups', 'Discipleship'],
  },
  {
    id: 'james-mutua',
    name: 'James Mutua',
    role: 'Outreach Lead',
    roleSw: 'Kiongozi wa Uinjilisti',
    bio: 'James organizes our community outreach, children\'s home visits, street evangelism, and environmental projects. His motto: "Faith without works is dead."',
    phone: '+254700123458',
    email: 'james@gracecc.or.ke',
    ministries: ['Outreach', 'Evangelism'],
  },
  {
    id: 'grace-akinyi',
    name: 'Grace Akinyi',
    role: 'Creative Arts Lead',
    roleSw: 'Kiongozi wa Sanaa za Ubunifu',
    bio: 'Grace leads drama, spoken word, dance, and visual arts. She believes every form of creativity is worship, and is committed to raising a generation of Kingdom artists.',
    phone: '+254700123460',
    email: 'grace@gracecc.or.ke',
    ministries: ['Drama', 'Spoken Word', 'Dance', 'Visual Arts'],
  },
]

export interface Group {
  id: string
  name: string
  nameSw: string
  description: string
  descriptionSw: string
  meetingTime: string
  leader: string
  ageGroup: string
  category: 'bible-study' | 'worship' | 'media' | 'outreach' | 'creative' | 'service'
  size: number
  open: boolean
}

export const groups: Group[] = [
  {
    id: 'bible-girls',
    name: 'Girls\' Bible Study',
    nameSw: 'Masomo ya Biblia ya Wasichana',
    description: 'A safe, honest space for young women to dig into Scripture, share life, and grow together. Topics include identity, relationships, and purpose.',
    descriptionSw: 'Nafasi salama na ya uaminifu kwa wanawake vijana kusoma Biblia na kukua pamoja.',
    meetingTime: 'Saturdays, 10:00 AM',
    leader: 'Faith Nyambura',
    ageGroup: '13–25',
    category: 'bible-study',
    size: 18,
    open: true,
  },
  {
    id: 'bible-guys',
    name: 'Guys\' Bible Study',
    nameSw: 'Masomo ya Biblia ya Wavulana',
    description: 'Real talk for young men — accountability, manhood, leadership, and what it looks like to follow Jesus in today\'s world.',
    descriptionSw: 'Mazungumzo ya kweli kwa vijana wanaume — uwajibikaji, uanaume, na uongozi.',
    meetingTime: 'Saturdays, 10:00 AM',
    leader: 'Pastor David Kamau',
    ageGroup: '13–25',
    category: 'bible-study',
    size: 22,
    open: true,
  },
  {
    id: 'worship-team',
    name: 'Worship Team',
    nameSw: 'Timu ya Ibada',
    description: 'Musicians, vocalists, and worshippers who lead the congregation in Spirit-filled praise every Friday. Auditions held quarterly.',
    descriptionSw: 'Wanamuziki, waimbaji, na waabudu wanaoongoza ibada kila Ijumaa.',
    meetingTime: 'Thursdays, 4:00 PM (rehearsal)',
    leader: 'Sarah Wanjiru',
    ageGroup: '15–25',
    category: 'worship',
    size: 14,
    open: false,
  },
  {
    id: 'media-team',
    name: 'Media & Tech Team',
    nameSw: 'Timu ya Midia na Teknolojia',
    description: 'Photography, video, livestreaming, sound, and social media. If you love tech and want to serve, this is your place.',
    descriptionSw: 'Picha, video, livestreaming, sauti, na mitandao ya kijamii.',
    meetingTime: 'Fridays (service day)',
    leader: 'Brian Ochieng',
    ageGroup: '14–25',
    category: 'media',
    size: 9,
    open: true,
  },
  {
    id: 'outreach-team',
    name: 'Outreach & Missions Team',
    nameSw: 'Timu ya Uinjilisti na Misheni',
    description: 'Monthly outreaches to children\'s homes, prisons youth programs, street ministry, and environmental cleanups across Nakuru.',
    descriptionSw: 'Uinjilisti wa kila mwezi kwa nyumba za watoto, gerezani, na usafi wa mazingira.',
    meetingTime: 'Second Sunday of every month',
    leader: 'James Mutua',
    ageGroup: '16–25',
    category: 'outreach',
    size: 25,
    open: true,
  },
  {
    id: 'creative-arts',
    name: 'Creative Arts Ministry',
    nameSw: 'Huduma ya Sanaa za Ubunifu',
    description: 'Drama, spoken word, dance, painting, and digital art — expressing faith through creativity. No experience needed, just a willing heart.',
    descriptionSw: 'Mchezo wa kuigiza, maneno ya kuimba, dansi, na sanaa — kuonyesha imani kwa ubunifu.',
    meetingTime: 'Sundays, 2:00 PM',
    leader: 'Grace Akinyi',
    ageGroup: '13–25',
    category: 'creative',
    size: 16,
    open: true,
  },
]

export interface Sermon {
  id: string
  title: string
  speaker: string
  date: string
  series: string
  topic: string[]
  format: 'video' | 'audio' | 'written'
  duration: string
  description: string
  youtubeId?: string
  audioUrl?: string
  notesUrl?: string
}

export const sermons: Sermon[] = [
  {
    id: 'who-am-i',
    title: 'Who Am I? Finding Identity in Christ',
    speaker: 'Pastor David Kamau',
    date: '2026-09-26',
    series: 'Rooted',
    topic: ['identity', 'purpose'],
    format: 'video',
    duration: '38 min',
    description: 'In a world that tells you to perform, achieve, and prove yourself — discover what God says about who you already are.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE with real YouTube ID
    notesUrl: '#',
  },
  {
    id: 'school-stress',
    title: 'When School Gets Hard: Faith Under Pressure',
    speaker: 'Faith Nyambura',
    date: '2026-09-19',
    series: 'Rooted',
    topic: ['school', 'stress', 'faith'],
    format: 'video',
    duration: '32 min',
    description: 'KCSE, university applications, peer pressure, academic failure — how do you trust God when the pressure is real?',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE
    notesUrl: '#',
  },
  {
    id: 'real-friends',
    title: 'Real Friends: The Friendships God Wants for You',
    speaker: 'Sarah Wanjiru',
    date: '2026-09-12',
    series: 'Rooted',
    topic: ['friendships', 'community'],
    format: 'audio',
    duration: '41 min',
    description: 'How do you know which friendships are healthy? What does it mean to be a godly friend? Scripture has more to say than you think.',
    audioUrl: '#', // REPLACE
    notesUrl: '#',
  },
  {
    id: 'social-media-soul',
    title: 'Social Media and My Soul',
    speaker: 'Brian Ochieng',
    date: '2026-09-05',
    series: 'Digital & Devoted',
    topic: ['social-media', 'identity', 'mental-health'],
    format: 'video',
    duration: '35 min',
    description: 'TikTok, Instagram, comparison, FOMO — a practical, honest conversation about how to live faithfully in the digital age.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE
    notesUrl: '#',
  },
  {
    id: 'purpose',
    title: 'What Am I Here For? Discovering Your Calling',
    speaker: 'Pastor David Kamau',
    date: '2026-08-29',
    series: 'Rooted',
    topic: ['purpose', 'calling', 'gifts'],
    format: 'written',
    duration: '15 min read',
    description: 'You were not an accident. God has placed specific gifts, passions, and a calling inside you. Let\'s find them together.',
    notesUrl: '#',
  },
  {
    id: 'dealing-with-doubt',
    title: 'It\'s Okay to Have Questions: Dealing with Doubt',
    speaker: 'Pastor David Kamau',
    date: '2026-08-22',
    series: 'Real Talk',
    topic: ['doubt', 'faith', 'questions'],
    format: 'video',
    duration: '44 min',
    description: 'Doubt is not the opposite of faith. Jesus welcomed Thomas\'s questions — and He welcomes yours too.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE
    notesUrl: '#',
  },
]

export interface BlogPost {
  id: string
  title: string
  category: 'announcement' | 'recap' | 'reflection' | 'devotional'
  date: string
  author: string
  summary: string
  body: string
  image?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'retreat-recap-2026',
    title: 'Lake Naivasha Retreat 2025 — What God Did',
    category: 'recap',
    date: '2025-10-28',
    author: 'Pastor David Kamau',
    summary: 'Over 60 young people encountered God in three powerful days at Lake Naivasha. Here\'s what happened.',
    body: 'Last weekend, 63 of our young people packed into buses and headed to Lake Naivasha for our annual retreat. What followed was three days that none of us will forget. From the sunrise prayer walk to the late-night worship sessions, God showed up in ways we could not have scripted...',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop&auto=format',
  },
  {
    id: 'new-small-groups',
    title: 'New Small Groups Starting October — Join One!',
    category: 'announcement',
    date: '2026-09-29',
    author: 'Faith Nyambura',
    summary: 'We are launching two new Bible study groups this October. Here\'s how to join.',
    body: 'We are excited to announce that we are opening two new small groups this October — one for Form 3 and 4 students, and a new group for university students and young professionals aged 20–25...',
  },
  {
    id: 'finding-purpose',
    title: 'Finding Purpose When Life Feels Unclear',
    category: 'reflection',
    date: '2026-09-22',
    author: 'Grace Akinyi',
    summary: 'A personal reflection on navigating the uncertainty of your early twenties with faith.',
    body: 'I remember sitting in my Form 6 results queue wondering if I\'d made the wrong choices, praying for signs and getting what felt like silence. What I didn\'t know then is that God was shaping me through the uncertainty, not despite it...',
  },
  {
    id: 'outreach-childrens-home-recap',
    title: 'Our Visit to Nakuru Children\'s Home',
    category: 'recap',
    date: '2026-09-14',
    author: 'James Mutua',
    summary: 'Twenty-five of our young people spent a Saturday morning sharing love, games, and God\'s Word at the children\'s home.',
    body: 'It was just a Saturday morning. But for the children at Nakuru Children\'s Home, and for our young people too, it was one they\'ll carry with them for a long time...',
  },
]

export interface Testimony {
  id: string
  name: string
  ageGroup: string
  title: string
  story: string
  approved: boolean
  featured: boolean
  date: string
}

export const testimonies: Testimony[] = [
  {
    id: 'amina-story',
    name: 'Amina W.',
    ageGroup: '19',
    title: 'From Alone to Belonging',
    story: 'I moved to Nakuru at 18 and knew nobody. I almost didn\'t come to youth on that first Friday. I was 20 minutes late and stood at the door thinking about leaving. A girl named Faith walked up and said "You made it! Come sit with us." That was two years ago. Now I can\'t imagine my life without this family.',
    approved: true,
    featured: true,
    date: '2026-09-01',
  },
  {
    id: 'kevin-story',
    name: 'Kevin O.',
    ageGroup: '22',
    title: 'God Saved My KCSE',
    story: 'I was struggling badly in Form 4 — depression, skipping school, feeling hopeless about the future. I came to the Retreat not expecting much. A message on identity hit me so hard I cried for the first time in years. I came back, joined a small group, and had someone praying for me through exams. I got a B+ and I know God was in it.',
    approved: true,
    featured: false,
    date: '2026-08-15',
  },
  {
    id: 'cynthia-story',
    name: 'Cynthia M.',
    ageGroup: '17',
    title: 'I Found My Purpose in the Media Team',
    story: 'I always loved photography but thought it was just a hobby, not something useful for God. Brian showed me how media is ministry — every photo, every reel, every story we post is someone\'s first encounter with our church. Now I lead the photography subteam and I\'ve never felt more alive on a Sunday morning.',
    approved: true,
    featured: false,
    date: '2026-07-20',
  },
  {
    id: 'daniel-story',
    name: 'Daniel K.',
    ageGroup: '21',
    title: 'Doubt Didn\'t Destroy My Faith — It Deepened It',
    story: 'University gave me a hundred reasons to abandon faith. I almost did. Pastor David\'s sermon "It\'s Okay to Have Questions" gave me permission to wrestle with God honestly. Now I have a faith that\'s mine — not just inherited — and it\'s stronger than it\'s ever been.',
    approved: true,
    featured: false,
    date: '2026-09-10',
  },
]

export interface Prayer {
  id: string
  name: string
  request: string
  date: string
  isPublic: boolean
  category: 'health' | 'school' | 'family' | 'faith' | 'general'
}

export const publicPrayers: Prayer[] = [
  {
    id: 'p1',
    name: 'Anonymous',
    request: 'Please pray for my KCSE exams next month. I\'m anxious and need peace and clarity.',
    date: '2026-09-28',
    isPublic: true,
    category: 'school',
  },
  {
    id: 'p2',
    name: 'T.W.',
    request: 'Praying for my parents — they are going through a difficult season. Please pray for their peace and our family\'s unity.',
    date: '2026-09-27',
    isPublic: true,
    category: 'family',
  },
  {
    id: 'p3',
    name: 'Anonymous',
    request: 'I\'ve been struggling with my faith and feeling far from God. Please pray that I find my way back.',
    date: '2026-09-25',
    isPublic: true,
    category: 'faith',
  },
  {
    id: 'p4',
    name: 'J.M.',
    request: 'Job interview next week — praying for God\'s favor and the right words.',
    date: '2026-09-24',
    isPublic: true,
    category: 'general',
  },
]

export interface GalleryAlbum {
  id: string
  title: string
  date: string
  coverIndex: number
  photos: { url: string; alt: string; isPlaceholder?: boolean }[]
}

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'retreat-2025',
    title: 'Lake Naivasha Retreat 2025',
    date: 'October 2025',
    coverIndex: 0,
    photos: [
      { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&auto=format', alt: 'Youth retreat group photo at Lake Naivasha' },
      { url: 'https://images.unsplash.com/photo-1609234656430-feba4e91df9c?w=800&h=600&fit=crop&auto=format', alt: 'Worship session at the retreat' },
      { url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop&auto=format', alt: 'Small group discussion at the retreat' },
      { url: '', alt: 'REPLACE: Your real photo from the retreat', isPlaceholder: true },
      { url: '', alt: 'REPLACE: Your real photo from the retreat', isPlaceholder: true },
    ],
  },
  {
    id: 'outreach-sept-2026',
    title: 'Community Outreach — September 2026',
    date: 'September 2026',
    coverIndex: 0,
    photos: [
      { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&auto=format', alt: 'Youth outreach community service' },
      { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop&auto=format', alt: 'Young people serving the community' },
      { url: '', alt: 'REPLACE: Your real outreach photo', isPlaceholder: true },
    ],
  },
  {
    id: 'worship-night-aug-2026',
    title: 'Worship Night: Pour Out — August 2026',
    date: 'August 2026',
    coverIndex: 0,
    photos: [
      { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&auto=format', alt: 'Youth worship night' },
      { url: '', alt: 'REPLACE: Your real worship night photo', isPlaceholder: true },
      { url: '', alt: 'REPLACE: Your real worship night photo', isPlaceholder: true },
    ],
  },
  {
    id: 'game-night-july-2026',
    title: 'Epic Game Night — July 2026',
    date: 'July 2026',
    coverIndex: 0,
    photos: [
      { url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop&auto=format', alt: 'Youth game night fun' },
      { url: '', alt: 'REPLACE: Your real game night photo', isPlaceholder: true },
    ],
  },
]

export const translations = {
  en: {
    nav: {
      home: 'Home',
      firstVisit: 'First Visit',
      events: 'Events',
      leaders: 'Leaders',
      groups: 'Groups',
      sermons: 'Sermons',
      blog: 'Blog',
      gallery: 'Gallery',
      testimonies: 'Testimonies',
      prayer: 'Prayer',
      serve: 'Serve',
      resources: 'Resources',
      parents: 'Parents',
      giving: 'Give',
      contact: 'Contact',
      members: 'Members',
      joinUs: 'Join Us',
      more: 'More',
    },
    hero: {
      welcome: 'Welcome to',
      subtitle: 'A community of young people on fire for God, for each other, and for Nakuru.',
      joinBtn: 'Join Us This Friday',
      visitBtn: 'Plan Your First Visit',
    },
    meetingInfo: {
      heading: 'When & Where We Meet',
      day: 'Every Friday',
      time: '5:00 PM – 7:00 PM',
      location: 'Grace Community Church, Nakuru',
      mapLink: 'Get Directions',
    },
    events: {
      heading: 'Upcoming Events',
      viewAll: 'View All Events',
      rsvp: 'RSVP',
      addCal: 'Add to Calendar',
      free: 'Free',
    },
    footer: {
      tagline: 'Young people on fire for God.',
      quickLinks: 'Quick Links',
      connect: 'Connect',
      meetUs: 'Meet Us',
      rights: 'All rights reserved.',
    },
    lang: 'SW',
  },
  sw: {
    nav: {
      home: 'Nyumbani',
      firstVisit: 'Ziara ya Kwanza',
      events: 'Matukio',
      leaders: 'Viongozi',
      groups: 'Vikundi',
      sermons: 'Mahubiri',
      blog: 'Blogu',
      gallery: 'Picha',
      testimonies: 'Ushuhuda',
      prayer: 'Maombi',
      serve: 'Huduma',
      resources: 'Rasilimali',
      parents: 'Wazazi',
      giving: 'Kutoa',
      contact: 'Wasiliana',
      members: 'Wanachama',
      joinUs: 'Jiunge Nasi',
      more: 'Zaidi',
    },
    hero: {
      welcome: 'Karibu',
      subtitle: 'Jamii ya vijana wanaowaka kwa Mungu, kwa wenzao, na kwa Nakuru.',
      joinBtn: 'Jiunge Nasi Ijumaa',
      visitBtn: 'Panga Ziara Yako ya Kwanza',
    },
    meetingInfo: {
      heading: 'Tunakutana Lini na Wapi',
      day: 'Kila Ijumaa',
      time: '5:00 PM – 7:00 PM',
      location: 'Grace Community Church, Nakuru',
      mapLink: 'Pata Maelekezo',
    },
    events: {
      heading: 'Matukio Yanayokuja',
      viewAll: 'Ona Matukio Yote',
      rsvp: 'Jibu Mwaliko',
      addCal: 'Ongeza Kwa Kalenda',
      free: 'Bure',
    },
    footer: {
      tagline: 'Vijana wanaowaka kwa Mungu.',
      quickLinks: 'Viungo vya Haraka',
      connect: 'Unganika',
      meetUs: 'Tukutane',
      rights: 'Haki zote zimehifadhiwa.',
    },
    lang: 'EN',
  },
}

export const DAILY_VERSE = {
  text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',
  reference: 'Jeremiah 29:11 (NIV)',
}

export const serveRoles = [
  { id: 'music', label: 'Music', icon: '🎵', desc: 'Vocals, instruments, or sound engineering' },
  { id: 'tech', label: 'Tech & Media', icon: '📱', desc: 'Photography, video, livestream, social media' },
  { id: 'design', label: 'Design', icon: '🎨', desc: 'Graphic design, posters, digital content' },
  { id: 'ushering', label: 'Ushering', icon: '🤝', desc: 'Welcoming and guiding visitors' },
  { id: 'hospitality', label: 'Hospitality', icon: '🍽️', desc: 'Refreshments, events setup, catering' },
  { id: 'outreach', label: 'Outreach', icon: '🌍', desc: 'Community service and evangelism' },
  { id: 'drama', label: 'Drama & Arts', icon: '🎭', desc: 'Acting, dance, spoken word, creative arts' },
  { id: 'teaching', label: 'Teaching/Mentoring', icon: '📖', desc: 'Leading discussions or mentoring younger members' },
]

export const campaigns = [
  {
    id: 'camp2026',
    title: 'Lake Naivasha Retreat 2026',
    target: 200000,
    raised: 143500,
    desc: 'Help sponsor youth who cannot afford the retreat fee — no young person should miss out due to finances.',
    currency: 'KES',
  },
  {
    id: 'equipment',
    title: 'Sound & Media Equipment Fund',
    target: 150000,
    raised: 87000,
    desc: 'New microphones, mixer, and camera for our media team to level up the quality of our ministry.',
    currency: 'KES',
  },
  {
    id: 'outreach-fund',
    title: 'Monthly Outreach Fund',
    target: 30000,
    raised: 21700,
    desc: 'Covers transport, snacks, and supplies for our monthly community outreaches around Nakuru.',
    currency: 'KES',
  },
]

export const readingPlans = [
  { title: 'Identity in Christ — 7 Days', desc: 'Who God says you are. For anyone wrestling with self-worth or purpose.', link: '#', days: 7 },
  { title: 'Overcoming Anxiety — 5 Days', desc: 'Practical scripture-based guidance for school and life stress.', link: '#', days: 5 },
  { title: 'What Does Love Look Like? — 10 Days', desc: 'Relationships, boundaries, and God\'s design for love and friendship.', link: '#', days: 10 },
  { title: 'Knowing Your Purpose — 14 Days', desc: 'Discovering the gifts, calling, and season God has placed you in.', link: '#', days: 14 },
]

export const recommendedBooks = [
  { title: 'Mere Christianity', author: 'C.S. Lewis', desc: 'A solid, accessible case for Christian faith.', genre: 'Apologetics' },
  { title: 'The Purpose Driven Life', author: 'Rick Warren', desc: 'What on earth am I here for? 40 days to clarity.', genre: 'Purpose' },
  { title: 'I Am Not But I Know I AM', author: 'Louie Giglio', desc: 'Finding your place in a universe centered on God.', genre: 'Identity' },
  { title: 'You Are What You Love', author: 'James K.A. Smith', desc: 'How our habits and desires shape who we become.', genre: 'Spiritual Formation' },
  { title: 'Get Out of Your Head', author: 'Jennie Allen', desc: 'Stopping the spiral of toxic thoughts.', genre: 'Mental Health / Faith' },
]

export const playlists = [
  { title: 'PULSE Worship Favourites', platform: 'Spotify', link: '#', desc: 'The songs we love to sing on Friday nights.' }, // REPLACE link
  { title: 'Friday Night Setlist — September 2026', platform: 'YouTube', link: '#', desc: 'Full worship recordings from our weekly service.' }, // REPLACE
  { title: 'Quiet Time Playlist', platform: 'Spotify', link: '#', desc: 'For your morning devotions and personal worship.' }, // REPLACE
]
