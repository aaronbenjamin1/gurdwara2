export type PostSection = {
  heading?: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  keywords: string[];
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "what-is-a-gurdwara",
    title: "What is a Gurdwara? A Guide to the Sikh House of Worship",
    description:
      "Learn what a Gurdwara is, what happens inside, and what to expect when visiting one. Gurdwara Nanaksar Fresno welcomes everyone — regardless of faith, background, or belief.",
    date: "2025-03-10",
    category: "About Sikhism",
    readTime: "5 min read",
    keywords: [
      "what is a gurdwara",
      "sikh temple",
      "gurdwara Fresno",
      "sikh house of worship",
      "gurdwara meaning",
    ],
    sections: [
      {
        paragraphs: [
          "A Gurdwara — from the Punjabi words \"Gur\" (Guru) and \"Dwara\" (door or gateway) — is the Sikh place of worship. Literally translated, it means \"the door to the Guru.\" Gurdwaras are open to everyone, regardless of religion, caste, gender, or background. They are sacred spaces of prayer, community, and service.",
          "Gurdwara Nanaksar Fresno, located at 3060 S Cherry Ave in Fresno, California, serves as a spiritual home for the Sikh community throughout the Central Valley. Whether you are Sikh or simply curious about the faith, you are always welcome.",
        ],
      },
      {
        heading: "The Four Doors of the Gurdwara",
        paragraphs: [
          "Traditionally, a Gurdwara has four doors — one on each side of the building — symbolizing that it is open to people from all four directions of the world. These doors represent the core Sikh values of equality, learning, grace, and nourishment.",
          "No one is turned away. The Gurdwara exists to serve all of humanity, and this spirit of inclusivity is central to the Sikh way of life.",
        ],
      },
      {
        heading: "What Happens Inside a Gurdwara",
        paragraphs: [
          "At the heart of every Gurdwara is the Darbar Sahib — the main prayer hall — where the Sri Guru Granth Sahib Ji, the eternal Sikh scripture and living Guru, is placed. The Granth is treated with the highest reverence, as it is considered the embodiment of divine wisdom.",
          "Worship centers around Kirtan, the devotional singing of Gurbani (sacred hymns) from the Guru Granth Sahib Ji. Congregants sit on the floor as equals, facing the Granth, and listen to or participate in the hymns. Ardas (communal prayer) is offered at the close of each service.",
          "There is no paid clergy. All service at the Gurdwara — from reading Gurbani to cooking langar — is performed voluntarily by members of the Sangat (congregation) as an act of selfless service, known as Seva.",
        ],
      },
      {
        heading: "Langar: The Community Kitchen",
        paragraphs: [
          "Every Gurdwara operates a Langar — a free, communal kitchen that serves vegetarian meals to anyone who walks through the door. Langar was instituted by Guru Nanak Dev Ji in the 15th century as a powerful statement of human equality: everyone eats together, sitting side by side on the floor, regardless of social status.",
          "At Gurdwara Nanaksar Fresno, Langar is served following every service. The food is prepared and served by volunteers, and it is offered to all at no cost.",
        ],
      },
      {
        heading: "Visit Us in Fresno",
        paragraphs: [
          "Gurdwara Nanaksar Fresno holds regular Darbar (services) throughout the week. Whether you are Sikh, exploring spirituality, or simply looking for community, you are welcome to join us at 3060 S Cherry Ave, Fresno, CA 93706.",
          "We ask that visitors cover their head, remove their shoes at the entrance, and come with an open heart. Everything else will take care of itself.",
        ],
      },
    ],
  },
  {
    slug: "langar-sikh-community-meals-fresno",
    title: "Langar: The Sikh Tradition of Free Community Meals",
    description:
      "Langar is the Sikh tradition of serving free vegetarian meals to all people, regardless of background. Learn how Gurdwara Nanaksar Fresno carries this tradition forward in the Central Valley.",
    date: "2025-04-02",
    category: "Community",
    readTime: "4 min read",
    keywords: [
      "langar",
      "free meals Fresno",
      "sikh community kitchen",
      "gurdwara langar",
      "free food Fresno",
      "seva",
    ],
    sections: [
      {
        paragraphs: [
          "Langar is one of the most distinctive and beloved traditions in Sikhism. It is a free, vegetarian meal served to every person who enters a Gurdwara — no questions asked, no payment required. Rich or poor, believer or skeptic, every person is welcomed to sit together and share a meal as equals.",
          "At Gurdwara Nanaksar Fresno, Langar is served after every service. Hundreds of community members and guests are fed each week entirely through the voluntary contributions of time, ingredients, and love from the Sangat.",
        ],
      },
      {
        heading: "The Origin of Langar",
        paragraphs: [
          "The institution of Langar was established by Guru Nanak Dev Ji, the founder of Sikhism, in the 15th century. At a time when Indian society was deeply stratified by caste, Guru Nanak insisted that all people sit together on the floor — as equals — and eat the same food. It was a radical act of social justice.",
          "The tradition was further developed by subsequent Gurus, and it remains one of the most visible expressions of Sikhi's commitment to equality, community, and selfless service.",
        ],
      },
      {
        heading: "How Langar Works",
        paragraphs: [
          "The food served in Langar is always vegetarian, ensuring that it is accessible to people of all dietary backgrounds and religious traditions. It is cooked fresh by volunteers known as Sevadars, who donate their time as an act of worship.",
          "No one is paid to prepare or serve Langar. It is funded through voluntary donations (Dasvandh — the Sikh practice of contributing one-tenth of one's earnings) from members of the Sangat. The spirit behind every pot of dal and every piece of roti is one of love and gratitude.",
        ],
      },
      {
        heading: "Langar in Fresno's Central Valley",
        paragraphs: [
          "The Central Valley of California is home to one of the largest Sikh communities outside of Punjab. Gurdwara Nanaksar Fresno has long been a gathering place for this community, and the Langar hall is at the heart of that gathering.",
          "Beyond its spiritual significance, Langar also serves a practical community function — providing nourishing meals to anyone who needs them. During times of hardship, the Gurdwara's kitchen doors remain open.",
        ],
      },
      {
        heading: "Volunteer and Do Seva",
        paragraphs: [
          "Langar could not exist without volunteers. If you would like to contribute your time — whether cooking, serving, or cleaning — you are warmly invited to join in the Seva. No experience is necessary. Just show up, and the Sangat will welcome you.",
          "To get involved, visit us at 3060 S Cherry Ave, Fresno, CA 93706, or reach out through the contact form on this website.",
        ],
      },
    ],
  },
  {
    slug: "first-visit-to-a-gurdwara",
    title: "What to Expect on Your First Visit to a Gurdwara",
    description:
      "Visiting a Gurdwara for the first time? Here is everything you need to know — what to wear, what to do, and what to expect when you walk through the doors of Gurdwara Nanaksar Fresno.",
    date: "2025-04-18",
    category: "Visiting",
    readTime: "6 min read",
    keywords: [
      "visiting a gurdwara",
      "gurdwara etiquette",
      "first time gurdwara",
      "what to wear at a gurdwara",
      "sikh temple visit guide",
      "gurdwara Fresno California",
    ],
    sections: [
      {
        paragraphs: [
          "If you have never visited a Gurdwara before, you may be wondering what to expect. The answer is simple: warmth, openness, and welcome. Gurdwaras are among the most inclusive spiritual spaces in the world, and Gurdwara Nanaksar Fresno is no exception.",
          "Here is a simple guide to help you feel comfortable and prepared on your first visit.",
        ],
      },
      {
        heading: "Cover Your Head",
        paragraphs: [
          "The most important thing to know before entering a Gurdwara is that your head must be covered as a sign of respect in the presence of the Guru Granth Sahib Ji. You can use a scarf, bandana, or any piece of cloth.",
          "If you don't have anything to cover your head, don't worry — the Gurdwara will have scarves available near the entrance for visitors to use.",
        ],
      },
      {
        heading: "Remove Your Shoes",
        paragraphs: [
          "Before entering the Darbar Sahib (main prayer hall), you will remove your shoes. There is a designated area near the entrance, often with shelves or cubbies. This is a sign of humility and respect, similar to removing shoes before entering a mosque or Hindu temple.",
        ],
      },
      {
        heading: "Wash Your Hands",
        paragraphs: [
          "There is typically a hand-washing station near the entrance. Washing your hands before entering is a sign of cleanliness and mindfulness.",
        ],
      },
      {
        heading: "Entering the Darbar Sahib",
        paragraphs: [
          "When you enter the main hall, walk toward the front and bow before the Guru Granth Sahib Ji — this is called Matha Tek. You touch your forehead to the floor as a gesture of humility before the Guru. This is not required of non-Sikhs, but it is welcomed if you feel moved to do so.",
          "Then take a seat on the floor. Men typically sit on one side, women on the other, though practices can vary by Gurdwara. Chairs may be available along the sides for those who cannot sit on the floor.",
        ],
      },
      {
        heading: "Kirtan and the Service",
        paragraphs: [
          "Once seated, you will hear Kirtan — the devotional singing of sacred hymns from the Guru Granth Sahib Ji. You do not need to understand Punjabi or Gurmukhi to feel the peace of the music. Simply sit, listen, and be present.",
          "The service will include Ardas (communal prayer) and the reading of a Hukamnama — a random passage from the Guru Granth Sahib Ji that serves as the Guru's message for the day.",
        ],
      },
      {
        heading: "Karah Prasad",
        paragraphs: [
          "At the end of the service, Karah Prasad is distributed — a warm, sweet offering made from flour, butter, and sugar. It is given to everyone, regardless of faith. Receive it with both hands cupped together.",
        ],
      },
      {
        heading: "Langar",
        paragraphs: [
          "After the service, you are invited to stay for Langar — a free vegetarian meal served to all. Sit on the floor with the Sangat and enjoy the meal. It is one of the most meaningful parts of any Gurdwara visit.",
          "We hope to see you at Gurdwara Nanaksar Fresno soon. Our doors at 3060 S Cherry Ave are always open.",
        ],
      },
    ],
  },
  {
    slug: "gurdwara-nanaksar-fresno-central-valley",
    title: "Gurdwara Nanaksar Fresno: Serving the Sikh Community of the Central Valley",
    description:
      "Gurdwara Nanaksar Fresno has been a spiritual home for Sikhs in the Central Valley for decades. Learn about our history, weekly services, and how we serve the broader Fresno community.",
    date: "2025-05-01",
    category: "Our Gurdwara",
    readTime: "4 min read",
    keywords: [
      "gurdwara Fresno",
      "sikh temple Fresno California",
      "nanaksar Fresno",
      "Central Valley sikh community",
      "gurdwara near me Fresno",
      "punjabi community Fresno",
    ],
    sections: [
      {
        paragraphs: [
          "Nestled in the heart of Fresno, California, Gurdwara Nanaksar Fresno stands as a beacon of faith, community, and seva for Sikhs throughout the Central Valley. Located at 3060 S Cherry Ave, our Gurdwara is a place where all are welcome — from lifelong members of the Sangat to first-time visitors from any walk of life.",
        ],
      },
      {
        heading: "Our Mission",
        paragraphs: [
          "The mission of Gurdwara Nanaksar Fresno is rooted in the core teachings of Sikhi: Naam Japo (meditate on God's name), Kirat Karo (earn an honest living), and Vand Chhako (share with others). Everything we do — from Kirtan to Langar to community outreach — flows from these three pillars.",
          "We strive to be a place where the Sikh community can deepen their faith, where families can raise their children in the traditions of Guru Nanak, and where the broader Fresno community can find nourishment and belonging.",
        ],
      },
      {
        heading: "Weekly Services",
        paragraphs: [
          "Darbar Sahib services are held throughout the week, with Nitnem (daily prayers) in the early morning and evening. Sunday Diwan is our largest weekly gathering, bringing together the Sangat for extended Kirtan, Katha (spiritual discourse), and Langar.",
          "Special programs are held for Gurpurabs — the anniversaries of the Sikh Gurus — as well as Amrit Sanchar (the Sikh initiation ceremony) and other significant observances in the Sikh calendar.",
        ],
      },
      {
        heading: "Youth and Education",
        paragraphs: [
          "We are committed to nurturing the next generation of Sikhs. Our youth programs include Gurmukhi classes (to learn the script of the Guru Granth Sahib Ji), Kirtan training, and Gatka — the traditional Sikh martial art. These programs help young people stay connected to their heritage while growing up in the Central Valley.",
        ],
      },
      {
        heading: "Come Visit Us",
        paragraphs: [
          "Whether you are Sikh or simply curious, we invite you to experience the peace and community of Gurdwara Nanaksar Fresno. Come for the Kirtan. Stay for the Langar. Leave feeling a little more connected to something greater than yourself.",
          "We are located at 3060 S Cherry Ave, Fresno, CA 93706. For service times and upcoming events, visit the Schedule and Events sections of this website.",
        ],
      },
    ],
  },
];

  {
    slug: "sikh-gurdwara-near-me",
    title: "Sikh Gurdwara Near Me: Find Your Community in Fresno and the Central Valley",
    description:
      "Looking for a Sikh Gurdwara near you in Fresno or the Central Valley? Gurdwara Nanaksar Fresno is open to everyone — Sikh or not — for prayer, langar, and community.",
    date: "2025-05-05",
    category: "Find Us",
    readTime: "4 min read",
    keywords: [
      "sikh gurdwara near me",
      "gurdwara near me",
      "sikh temple near me Fresno",
      "nearest gurdwara California",
      "gurdwara Central Valley",
    ],
    sections: [
      {
        paragraphs: [
          "If you've searched \"Sikh Gurdwara near me\" and found yourself in Fresno or the Central Valley of California, you're in the right place. Gurdwara Nanaksar Fresno is located at 3060 S Cherry Ave, Fresno, CA 93706 — and our doors are open to everyone.",
          "Whether you are a Sikh looking for a spiritual home, someone curious about Sikhism, or simply seeking community, you are warmly welcome here. No appointment needed. No prior knowledge required.",
        ],
      },
      {
        heading: "Where to Find Us",
        paragraphs: [
          "Gurdwara Nanaksar Fresno is conveniently located on the south side of Fresno, easily accessible from Highway 99 and surrounding communities including Clovis, Madera, Visalia, Tulare, and Hanford.",
          "We are open daily for morning and evening Nitnem (prayers), with Sunday Diwan being our largest weekly gathering. Langar — free vegetarian meals — is served after every service.",
        ],
      },
      {
        heading: "What to Expect When You Arrive",
        paragraphs: [
          "When you arrive, you will be greeted by members of the Sangat (congregation). Cover your head — scarves are available at the entrance if needed — and remove your shoes before entering the prayer hall.",
          "You do not need to be Sikh to attend. The Gurdwara has always been a place for all of humanity. Simply come with an open heart.",
        ],
      },
      {
        heading: "The Sikh Community of the Central Valley",
        paragraphs: [
          "The Central Valley of California is home to one of the largest Sikh communities in the United States. Sikh farmers have worked this land for over a century, and Gurdwaras like Nanaksar Fresno serve as anchor institutions for this community — providing spiritual grounding, cultural continuity, and social support.",
          "If you are new to the area, recently moved, or have never visited a Gurdwara, this is a wonderful place to start.",
        ],
      },
      {
        heading: "Come Visit Us",
        paragraphs: [
          "Gurdwara Nanaksar Fresno is at 3060 S Cherry Ave, Fresno, CA 93706. We hold services throughout the week. You can reach us through the contact form on this site or simply show up — you will always be welcome.",
        ],
      },
    ],
  },
  {
    slug: "fresno-gurdwara",
    title: "Fresno Gurdwara: Your Complete Guide to Gurdwara Nanaksar Fresno",
    description:
      "Gurdwara Nanaksar Fresno is the heart of the Sikh community in Fresno, CA. Learn about services, langar, history, and how to visit this welcoming Sikh house of worship.",
    date: "2025-05-08",
    category: "Our Gurdwara",
    readTime: "5 min read",
    keywords: [
      "fresno gurdwara",
      "gurdwara in fresno ca",
      "sikh temple fresno california",
      "fresno sikh community",
      "nanaksar fresno",
    ],
    sections: [
      {
        paragraphs: [
          "Gurdwara Nanaksar Fresno is the spiritual center of the Sikh community in Fresno, California. Situated at 3060 S Cherry Ave, it has served generations of Sikhs in the Central Valley and remains one of the most active Gurdwaras in the region.",
          "This guide covers everything you need to know about visiting or connecting with this Fresno Gurdwara — from weekly services and langar to youth programs and community events.",
        ],
      },
      {
        heading: "Daily and Weekly Services",
        paragraphs: [
          "Nitnem — the daily recitation of Gurbani — takes place every morning and evening at the Gurdwara. Sunday Diwan is the main weekly congregation, drawing Sangat from across Fresno and surrounding communities for extended Kirtan, Katha (spiritual discourse), and Ardas.",
          "Special services are held for all major Gurpurabs (Sikh holy days), including the birthdays of the Gurus and significant dates in the Sikh calendar.",
        ],
      },
      {
        heading: "Langar at Gurdwara Nanaksar Fresno",
        paragraphs: [
          "True to the tradition established by Guru Nanak Dev Ji, Langar is served at every service — completely free of charge, to anyone who comes. The meals are vegetarian, freshly prepared by volunteers, and served to all equally.",
          "If you have never experienced Langar, it is one of the most moving expressions of the Sikh value of equality. Rich and poor, young and old, Sikh and non-Sikh all sit together and share the same meal.",
        ],
      },
      {
        heading: "Youth Programs in Fresno",
        paragraphs: [
          "Gurdwara Nanaksar Fresno runs active programs for children and youth, including Gurmukhi language classes, Kirtan training, and Gatka — the traditional Sikh martial art. These programs help young Sikhs in Fresno stay connected to their heritage and develop a deep sense of identity.",
        ],
      },
      {
        heading: "How to Get There",
        paragraphs: [
          "Gurdwara Nanaksar Fresno is located at 3060 S Cherry Ave, Fresno, CA 93706 — accessible from Highway 99 and central to communities across the Central Valley. Free parking is available on site.",
          "We invite you to come as you are. Whether this is your first visit to any Gurdwara or you are returning home after time away, you will find the same warmth and welcome that has always defined this space.",
        ],
      },
    ],
  },
  {
    slug: "sikh-temple-near-me",
    title: "Sikh Temple Near Me: What to Know Before Your First Visit",
    description:
      "Searching for a Sikh temple near you? Learn what a Sikh temple (Gurdwara) is, what happens inside, and why Gurdwara Nanaksar Fresno welcomes visitors of all backgrounds.",
    date: "2025-05-10",
    category: "Visiting",
    readTime: "5 min read",
    keywords: [
      "sikh temple near me",
      "sikh mandir near me",
      "nearest sikh temple",
      "sikh worship near me",
      "sikh temple california",
    ],
    sections: [
      {
        paragraphs: [
          "When people search for a \"Sikh temple near me,\" they are often looking for more than just a building — they are looking for community, spiritual grounding, or a deeper understanding of a tradition that may be new to them. Whatever brings you here, you are welcome.",
          "In Sikhism, a house of worship is called a Gurdwara — not a temple. But regardless of what you call it, the experience inside is one of the most open and welcoming in any spiritual tradition. Gurdwara Nanaksar Fresno at 3060 S Cherry Ave is that place for Fresno and the Central Valley.",
        ],
      },
      {
        heading: "What Is a Sikh Temple (Gurdwara)?",
        paragraphs: [
          "The word Gurdwara means \"the door to the Guru.\" It is a place where the Sikh scripture — the Sri Guru Granth Sahib Ji — is enshrined and revered as the living Guru. Services center on Kirtan (devotional music), Gurbani readings, and Ardas (communal prayer).",
          "Unlike many houses of worship, there are no paid clergy at a Gurdwara. All service is performed by volunteers as Seva — selfless service — which is one of the core pillars of Sikh life.",
        ],
      },
      {
        heading: "Is It Open to Non-Sikhs?",
        paragraphs: [
          "Absolutely. The Gurdwara has four doors, symbolizing that it is open to people from all four directions of the world, from every background and belief. You do not need to be Sikh, know any Punjabi, or follow any particular religion to enter.",
          "Thousands of non-Sikhs visit Gurdwaras across the world every year and are welcomed with the same warmth as lifelong members of the Sangat.",
        ],
      },
      {
        heading: "Simple Etiquette for Your Visit",
        paragraphs: [
          "There are just a few things to keep in mind: cover your head before entering (scarves are provided), remove your shoes at the entrance, and wash your hands if you can. Beyond that, simply be present and respectful.",
          "You will likely be invited to receive Karah Prasad — a sweet offering distributed at the end of the service — and to stay for Langar, the free community meal. Both are open to everyone.",
        ],
      },
      {
        heading: "Find Your Nearest Sikh Temple in Fresno",
        paragraphs: [
          "If you are in Fresno or the broader Central Valley and looking for a Sikh temple near you, Gurdwara Nanaksar Fresno is here. We are open daily and hold services throughout the week.",
          "Come visit us at 3060 S Cherry Ave, Fresno, CA 93706. No prior knowledge, no reservation, no dress code beyond a head covering — just bring yourself.",
        ],
      },
    ],
  },

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
